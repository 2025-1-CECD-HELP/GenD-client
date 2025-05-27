import {AxiosError, AxiosResponse, AxiosInstance} from 'axios';
import {logRequest, logResponse, logError} from '@/utils/debug';
import {CustomAxiosRequestConfig} from './type';
import {getAccessToken} from '@/utils/auth';
import {getErrorInfo} from '@/utils/error';
import {setAccessToken, setRefreshToken} from '@/utils/auth';
import {replace} from '@/navigation/navigator';
import {ROUTE_NAMES} from '@/constants/routes';

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
      // console.debug('accessToken', accessToken);
      if (accessToken && config.headers) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
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
      if (error.response?.status === 401) {
        // 전역 상태 업데이트나 이벤트 발생
        // ErrorBoundary를 거치지 않고 직접 처리

        // 토큰 정리 및 로그인 페이지 이동을 여기서 처리
        try {
          await setAccessToken('');
          await setRefreshToken('');
          // 전역 네비게이션 사용
          replace(ROUTE_NAMES.LOGIN, {});

          // 에러를 throw하지 않고 빈 응답 반환하거나 특별한 응답 반환
          return Promise.resolve({
            data: null,
            status: 401,
            statusText: 'Unauthorized - Handled',
            headers: {},
            config: originalRequest,
          } as AxiosResponse);
        } catch (authError) {
          console.error('401 에러 처리 실패:', authError);
        }
      }

      // 재시도 플래그 설정
      originalRequest._retry = true;
      return Promise.reject(error);
    },
  );
};
