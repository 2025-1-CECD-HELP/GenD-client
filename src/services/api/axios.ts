import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosInstance,
} from 'axios';

import EncryptedStorage from 'react-native-encrypted-storage';
import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
} from '@/utils/auth';
import useTypeSafeNavigation from '@/hooks/useTypeSafeNavigaion';
import {ROUTE_NAMES} from '@/constants/routes';

import {APP_SERVER_URL} from '@env';

/**
 * Axios를 통해 불필요한 재전송을 방지합니다.
 * InternalAxiosRequestConfig를 extneds 하는 방식을 택합니다.
 * API 엔드포인트의 instance 화를 통해서 instance 별 interceptor를 구현합니다.
 * 토큰 갱신을 interceptor 내부에 구현합니다.
 * @author 홍규진
 */
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

type TAnotherToken = {
  accessToken: string;
};

type TAuthResponse = {
  accessToken: string;
  refreshToken: string;
};

export const instance: AxiosInstance = axios.create({
  baseURL: APP_SERVER_URL,
  headers: {
    Authorization: `Bearer ${getAccessToken()}`,
  },
  withCredentials: true,
});

/**
 * request시 항상 확인하는 interceptor입니다.
 * 현재 방식은 토큰이 필요한 uri 와 아닌 uri 를 구분할 필요가 있습니다.
 * 헤더에 토큰이 있는지 확인하고 없으면 토큰을 가져옵니다.
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
    return config;
  },
  (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
  },
);

/**
 * response시 항상 확인하는 interceptor입니다.
 * 에러 발생시 토큰 갱신을 위한 재시도 로직을 구현합니다.
 * @author 홍규진
 */
instance.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => response,
  async (error: AxiosError): Promise<AxiosResponse> => {
    const originalRequest = error.config as CustomAxiosRequestConfig;
    console.error('🚨Response Error:', error);

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
