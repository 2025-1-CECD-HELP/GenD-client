import {
  AxiosError,
  AxiosResponse,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from 'axios';
import {logRequest, logResponse, logError} from '@/utils/debug';
import {getErrorInfo} from '@/utils/error';

/**
 * 공개 API 인터셉터 적용
 * @param instance 적용할 axios 인스턴스
 * @author 홍규진
 */
export const applyPublicInterceptors = (instance: AxiosInstance) => {
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
      logRequest(config);
      return config;
    },
    (error: AxiosError): Promise<AxiosError> => {
      logError(error);
      const errorInfo = getErrorInfo(error);
      return Promise.reject(new Error(errorInfo.message));
    },
  );

  instance.interceptors.response.use(
    (response: AxiosResponse): AxiosResponse => {
      logResponse(response);
      return response;
    },
    (error: AxiosError): Promise<AxiosError> => {
      logError(error);
      const errorInfo = getErrorInfo(error);
      return Promise.reject(new Error(errorInfo.message));
    },
  );
};
