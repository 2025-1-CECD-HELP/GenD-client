import {privateAIInstance} from '../api/axios';
import {TGetResponse} from '../api/type';
import {TGetChattingResponse, TPostChattingRequest} from './types';

/**
 * 채팅 API 호출 함수입니다.
 * @param workspaceId 워크스페이스 ID
 * @param request 채팅 요청 데이터
 * @returns 채팅 응답
 * @author 홍규진
 */
export const chatting = async (
  workspaceId: string,
  request: TPostChattingRequest,
): Promise<TGetChattingResponse> => {
  const response = await privateAIInstance.post<
    TGetResponse<TGetChattingResponse>
  >(`/secretary/${workspaceId}`, request);
  return response.data.data;
};
