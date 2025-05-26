import {AxiosError, AxiosResponse, AxiosInstance} from 'axios';
import {logRequest, logResponse, logError} from '@/utils/debug';
import {CustomAxiosRequestConfig, TAnotherToken, TAuthResponse} from './type';
import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
} from '@/utils/auth';
import EncryptedStorage from 'react-native-encrypted-storage';
import useTypeSafeNavigation from '@/hooks/useTypeSafeNavigaion';
import {ROUTE_NAMES} from '@/constants/routes';
import {getErrorInfo} from '@/utils/error';

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

      // 401 에러가 아니거나 이미 재시도한 경우
      if (error.response?.status !== 401 || originalRequest._retry) {
        return Promise.reject(error);
      }

      // 재시도 플래그 설정
      originalRequest._retry = true;

      try {
        // 리프레시 토큰 가져오기
        const refreshToken = await getRefreshToken();
        if (!refreshToken) {
          throw new Error('리프레시 토큰이 없습니다.');
        }

        // accessToken 갱신 시도
        const response: AxiosResponse<TAuthResponse, TAnotherToken> =
          await instance.post('/auth/reissue', {
            refreshToken: refreshToken,
          });

        if (response.status !== 200) {
          throw new Error('토큰 갱신에 실패했습니다.');
        }

        const {accessToken: newAccessToken, refreshToken: newRefreshToken} =
          response.data;

        // 새 토큰 저장
        await setAccessToken(newAccessToken);
        await setRefreshToken(newRefreshToken);

        // 원래 요청 재시도
        if (originalRequest.headers) {
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        }

        return instance(originalRequest);
      } catch (refreshError) {
        // 토큰 갱신 실패 시 로그아웃 처리
        await EncryptedStorage.removeItem('accessToken');
        await EncryptedStorage.removeItem('refreshToken');

        const refreshErrorInfo = getErrorInfo(refreshError);
        console.error('🚨Refresh Error:', refreshErrorInfo);

        useTypeSafeNavigation().navigate(ROUTE_NAMES.LOGIN, {});
        return Promise.reject(refreshError);
      }
    },
  );
};
