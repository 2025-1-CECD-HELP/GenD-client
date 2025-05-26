/**
 * 공통 responseDTO
 * Backend 에서 받는 응답 형식입니다.
 * 현재는 성공 여부, 코드, 메시지, 결과 값을 받습니다.
 * @author 홍규진
 */

import {InternalAxiosRequestConfig} from 'axios';

type TError = {
  code: number;
  message: string;
};

export type TGetResponse<T> = {
  success: boolean;
  error: TError;
  data: T;
};

export type TAnotherToken = {
  accessToken: string;
};

export type TAuthResponse = {
  accessToken: string;
  refreshToken: string;
};

/**
 * Axios를 통해 불필요한 재전송을 방지합니다.
 * InternalAxiosRequestConfig를 extneds 하는 방식을 택합니다.
 * API 엔드포인트의 instance 화를 통해서 instance 별 interceptor를 구현합니다.
 * 토큰 갱신을 interceptor 내부에 구현합니다.
 * @author 홍규진
 */

export interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}
