import {AxiosRequestConfig, AxiosResponse} from 'axios';

// 디버깅 모드 상태를 저장하는 변수
let isDebugMode = __DEV__;

/**
 * 디버깅 모드를 설정합니다. 개발 환경에서는 __DEV__ 변수가 true이므로 디버깅 모드가 켜집니다.
 * 이를 통해 디버깅 모드 켜기/끄기 가능
 * @author 홍규진
 * 억지로 디버깅 모드 켜기
 * setDebugMode(true);
 * 억지로 디버깅 모드 끄기
 * setDebugMode(false);
 */
export const setDebugMode = (mode: boolean) => {
  isDebugMode = mode;
};

/**
 * 현재 디버깅 모드 상태를 반환합니다.
 * @author 홍규진
 */
export const getDebugMode = () => isDebugMode;

/**
 * 디버깅 모드일 때만 로그를 출력합니다.
 * @param message 로그 메시지
 * @param data 로그 데이터
 * @author 홍규진
 */
export const debugLog = (message: string, data?: any) => {
  if (isDebugMode) {
    console.log(`🔍 ${message}`, data || '');
  }
};

/**
 * Axios 요청을 로깅합니다.
 * @param config Axios 요청 설정
 * @author 홍규진
 */
export const logRequest = (config: AxiosRequestConfig) => {
  if (!isDebugMode) return;

  const {method, url, data, headers} = config;
  debugLog('🚀 Request', {
    method,
    url,
    data,
    headers: {
      ...headers,
      Authorization: headers?.Authorization ? 'Bearer [REDACTED]' : undefined,
    },
  });
};

/**
 * Axios 응답을 로깅합니다.
 * @param response Axios 응답
 * @author 홍규진
 */
export const logResponse = (response: AxiosResponse) => {
  if (!isDebugMode) return;

  const {status, data, config} = response;
  debugLog('✅ Response', {
    status,
    url: config.url,
    method: config.method,
    data,
  });
};

/**
 * Axios 에러를 로깅합니다.
 * @param error Axios 에러
 * @author 홍규진
 */
export const logError = (error: any) => {
  if (!isDebugMode) return;

  debugLog('❌ Error', {
    message: error.message,
    response: error.response?.data,
    status: error.response?.status,
    url: error.config?.url,
    method: error.config?.method,
  });
};
