import {AxiosError} from 'axios';
import {getErrorInfo, ErrorType} from '@/utils/error';

/**
 * 네트워크 오류, 파싱 오류, 렌더링 오류, 알 수 없는 오류를 테스트합니다.
 * @author 홍규진
 */

describe('Error Handling Tests', () => {
  // Axios 에러 테스트
  describe('Axios Error Tests', () => {
    it('should handle network connection error', () => {
      const error = new AxiosError('Network Error');
      const errorInfo = getErrorInfo(error);

      expect(errorInfo.type).toBe(ErrorType.NETWORK);
      expect(errorInfo.message).toBe('네트워크 연결에 실패했습니다.');
    });

    it('should handle 401 unauthorized error', () => {
      const error = new AxiosError(
        'Unauthorized',
        '401',
        undefined,
        undefined,
        {
          status: 401,
          data: {message: '인증이 필요합니다.'},
        } as any,
      );
      const errorInfo = getErrorInfo(error);

      expect(errorInfo.type).toBe(ErrorType.NETWORK);
      expect(errorInfo.message).toBe('인증이 필요합니다.');
      expect(errorInfo.statusCode).toBe(401);
    });

    it('should handle 404 not found error', () => {
      const error = new AxiosError('Not Found', '404', undefined, undefined, {
        status: 404,
        data: {message: '리소스를 찾을 수 없습니다.'},
      } as any);
      const errorInfo = getErrorInfo(error);

      expect(errorInfo.type).toBe(ErrorType.NETWORK);
      expect(errorInfo.message).toBe('요청한 리소스를 찾을 수 없습니다.');
      expect(errorInfo.statusCode).toBe(404);
    });
  });

  // 파싱 에러 테스트
  describe('Parsing Error Tests', () => {
    it('should handle syntax error', () => {
      const error = new SyntaxError('Invalid JSON format');
      const errorInfo = getErrorInfo(error);

      expect(errorInfo.type).toBe(ErrorType.PARSING);
      expect(errorInfo.message).toBe('데이터 파싱 오류가 발생했습니다.');
      expect(errorInfo.details).toBe('Invalid JSON format');
    });
  });

  // 렌더링 에러 테스트
  describe('Rendering Error Tests', () => {
    it('should handle type error', () => {
      const error = new TypeError('Cannot read property of undefined');
      const errorInfo = getErrorInfo(error);

      expect(errorInfo.type).toBe(ErrorType.RENDERING);
      expect(errorInfo.message).toBe('렌더링 오류가 발생했습니다.');
      expect(errorInfo.details).toBe('Cannot read property of undefined');
    });
  });

  // 알 수 없는 에러 테스트
  describe('Unknown Error Tests', () => {
    it('should handle generic error', () => {
      const error = new Error('Something went wrong');
      const errorInfo = getErrorInfo(error);

      expect(errorInfo.type).toBe(ErrorType.UNKNOWN);
      expect(errorInfo.message).toBe('알 수 없는 오류가 발생했습니다.');
      expect(errorInfo.details).toBe('Something went wrong');
    });

    it('should handle non-Error object', () => {
      const error = 'String error';
      const errorInfo = getErrorInfo(error);

      expect(errorInfo.type).toBe(ErrorType.UNKNOWN);
      expect(errorInfo.message).toBe('알 수 없는 오류가 발생했습니다.');
    });
  });
});
