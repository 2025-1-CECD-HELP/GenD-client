import {getAccessToken} from '@/utils/auth';
import {APP_SERVER_URL} from '@env';
import axios, {AxiosInstance} from 'axios';
import {applyPublicInterceptors} from './publicInterceptor';
import {applyPrivateInterceptors} from './privateInterceptor';
/**
 * 공개 API 인스턴스 설정
 * 토큰이 필요없는 API 요청에 사용
 * @author 홍규진
 */
export const publicInstance: AxiosInstance = axios.create({
  baseURL: APP_SERVER_URL,
});

/**
 * 인증이 필요한 API 인스턴스 설정
 * 토큰이 필요한 API 요청에 사용
 * @author 홍규진
 */
export const privateInstance: AxiosInstance = axios.create({
  baseURL: APP_SERVER_URL,
  headers: {
    Authorization: `Bearer ${getAccessToken()}`,
  },
  withCredentials: true,
});

// 인터셉터 적용
applyPublicInterceptors(publicInstance);
applyPrivateInterceptors(privateInstance);
