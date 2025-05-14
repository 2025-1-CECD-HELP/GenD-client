/**
 * 환경변수 타입 정의
 * 환경 변수를 설정할 때에는 해당 파일에 타입을 정의해야 한다.
 * ------------------------
 * 사용 예시
 * import { APP_SERVER_URL } from '@env';
 * ------------------------
 * @author 홍규진
 */
declare module '@env' {
  export const APP_SERVER_URL: string;
}
