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
      logRequest(config);
      return config;
    },
    (error: AxiosError): Promise<AxiosError> => {
      logError(error);
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

      // 재시도 여부 확인
      if (error.response?.status !== 401 || originalRequest._retry) {
        return Promise.reject(error);
      }

      // 재시도 플래그 설정
      originalRequest._retry = true;

      // 리프레시 토큰 가져오기
      const refreshToken = await getRefreshToken();

      try {
        // accessToken 갱신 시도
        const response: AxiosResponse<TAuthResponse, TAnotherToken> =
          await instance.post('/auth/reissue', {
            refreshToken: refreshToken,
          });

        // 실패 처리
        if (response.status !== 200) {
          return Promise.reject(error);
        }

        const newAccessToken = response.data.accessToken;
        const newRefreshToken = response.data.refreshToken;
        await setAccessToken(newAccessToken);
        await setRefreshToken(newRefreshToken);

        if (originalRequest.headers) {
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        }

        return instance(originalRequest);
      } catch (refreshError) {
        await EncryptedStorage.removeItem('accessToken');
        console.error('🚨Refresh Error:', refreshError);
        useTypeSafeNavigation().navigate(ROUTE_NAMES.LOGIN, {});
        return Promise.reject(refreshError);
      }
    },
  );
};
