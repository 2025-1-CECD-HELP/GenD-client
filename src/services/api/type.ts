/**
 * 공통 responseDTO
 * Backend 에서 받는 응답 형식입니다.
 * 현재는 성공 여부, 코드, 메시지, 결과 값을 받습니다.
 * @author 홍규진
 */

type TError = {
  code: number;
  message: string;
};

export type TGetResponse<T> = {
  success: boolean;
  error: TError;
  data: T;
};
