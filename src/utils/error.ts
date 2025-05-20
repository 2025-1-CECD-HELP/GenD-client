import {AxiosError} from 'axios';
/**
 * 에러 타입을 4가지로 나눠서 정의합니다.
 * 네트워크 오류, 파싱 오류, 렌더링 오류, 알 수 없는 오류
 * @author 홍규진
 */
export enum ErrorType {
  NETWORK = 'NETWORK',
  PARSING = 'PARSING',
  RENDERING = 'RENDERING',
  UNKNOWN = 'UNKNOWN',
}

/**
 * 에러에 따라서 다음과 같이 정보를 정의합니다.
 * 이는 Axios의 인터셉터 내에서 사용됩니다.
 * @author 홍규진
 */
export interface ErrorInfo {
  type: ErrorType;
  message: string;
  details?: string;
  statusCode?: number;
}

/**
 * 에러 타입을 판단하여 적절한 에러 정보를 반환합니다.
 * @author 홍규진
 */
export const getErrorInfo = (error: unknown): ErrorInfo => {
  if (error instanceof AxiosError) {
    return getAxiosErrorInfo(error);
  }

  if (error instanceof SyntaxError) {
    return {
      type: ErrorType.PARSING,
      message: '데이터 파싱 오류가 발생했습니다.',
      details: error.message,
    };
  }

  if (error instanceof TypeError) {
    return {
      type: ErrorType.RENDERING,
      message: '렌더링 오류가 발생했습니다.',
      details: error.message,
    };
  }

  if (error instanceof Error) {
    return {
      type: ErrorType.UNKNOWN,
      message: '알 수 없는 오류가 발생했습니다.',
      details: error.message,
    };
  }

  return {
    type: ErrorType.UNKNOWN,
    message: '알 수 없는 오류가 발생했습니다.',
  };
};

/**
 * Axios 에러에 따라서 에러의 상세 정보를 반환합니다.
 * @author 홍규진
 */
const getAxiosErrorInfo = (error: AxiosError): ErrorInfo => {
  const statusCode = error.response?.status;

  if (!statusCode) {
    return {
      type: ErrorType.NETWORK,
      message: '네트워크 연결에 실패했습니다.',
      details: error.message,
    };
  }

  switch (statusCode) {
    case 400:
      return {
        type: ErrorType.NETWORK,
        message: '잘못된 요청입니다.',
        details: '입력 값을 확인해주세요.',
        statusCode,
      };
    case 401:
      return {
        type: ErrorType.NETWORK,
        message: '인증이 필요합니다.',
        details: '다시 로그인해주세요.',
        statusCode,
      };
    case 403:
      return {
        type: ErrorType.NETWORK,
        message: '접근 권한이 없습니다.',
        statusCode,
      };
    case 404:
      return {
        type: ErrorType.NETWORK,
        message: '요청한 리소스를 찾을 수 없습니다.',
        statusCode,
      };
    case 500:
      return {
        type: ErrorType.NETWORK,
        message: '서버 오류가 발생했습니다.',
        details: '잠시 후 다시 시도해주세요.',
        statusCode,
      };
    default:
      return {
        type: ErrorType.NETWORK,
        message: '네트워크 오류가 발생했습니다.',
        details: `상태 코드: ${statusCode}`,
        statusCode,
      };
  }
};
