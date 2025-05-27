import {AxiosError, AxiosResponse, AxiosInstance} from 'axios';
import {logRequest, logResponse, logError} from '@/utils/debug';
import {CustomAxiosRequestConfig} from './type';
import {getAccessToken} from '@/utils/auth';
import {getErrorInfo} from '@/utils/error';
import {setAccessToken, setRefreshToken} from '@/utils/auth';
import {replace} from '@/navigation/navigator';
import {ROUTE_NAMES} from '@/constants/routes';

// 401 에러 처리 상태를 추적하기 위한 플래그
let isHandling401 = false;

/**
 * 인증이 필요한 API 인터셉터 적용
 * @param instance 적용할 axios 인스턴스
 * @author 홍규진
 */
export const applyPrivateInterceptors = (instance: AxiosInstance) => {
  /**
   * 인증이 필요한 API 요청 인터셉터
   * 토큰 검증 및 갱신 로직 포함
   * @author 홍규진
   */
  instance.interceptors.request.use(
    async (
      config: CustomAxiosRequestConfig,
    ): Promise<CustomAxiosRequestConfig> => {
      const accessToken = await getAccessToken();
      if (accessToken && config.headers) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      console.info('[interceptor] accessToken', accessToken);
      logRequest(config);
      return config;
    },
    (error: AxiosError): Promise<AxiosError> => {
      logError(error);
      const errorInfo = getErrorInfo(error);
      error.message = errorInfo.message;
      return Promise.reject(error);
    },
  );

  /**
   * 인증이 필요한 API 응답 인터셉터
   * 토큰 만료 시 갱신 로직 포함
   * @author 홍규진
   */
  instance.interceptors.response.use(
    (response: AxiosResponse): AxiosResponse => {
      logResponse(response);
      return response;
    },
    async (error: AxiosError): Promise<AxiosResponse> => {
      const originalRequest = error.config as CustomAxiosRequestConfig;
      logError(error);

      const errorInfo = getErrorInfo(error);
      error.message = errorInfo.message;

      // 401 에러는 ErrorBoundary로 가지 않고 여기서 직접 처리
      if (error.response?.status === 401 && !isHandling401) {
        try {
          isHandling401 = true;
          console.log('401 에러 처리 시작');

          // 토큰 정리
          await setAccessToken('');
          await setRefreshToken('');

          replace(ROUTE_NAMES.LOGIN, {});
        } catch (e) {
          console.error('401 에러 처리 중 오류:', e);
        } finally {
          // 3초 후에 플래그 초기화 (연속된 401 에러 처리를 방지)
          setTimeout(() => {
            isHandling401 = false;
          }, 3000);
        }
      }

      // 재시도 플래그 설정
      originalRequest._retry = true;
      return Promise.reject(error);
    },
  );
};
