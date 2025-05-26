import {privateServerInstance} from '@/services/api/axios';

import {TGetMemberListResponse, TUpdateMemberRequest} from './types';
import {TGetResponse} from '../api/type';

/**
 * 멤버 목록 조회 API 호출 함수입니다.
 * @returns 멤버 목록
 * @author 홍규진
 */
export async function getMemberList(workspaceId: string) {
  const response = await privateServerInstance.get<
    TGetResponse<TGetMemberListResponse>
  >(`/api/v1/members/${workspaceId}`);
  return response.data.data.memberList;
}

/**
 * 멤버 추가 API 호출 함수입니다.
 * @param workspaceId 워크스페이스 ID
 * @param email 멤버 이메일
 * @returns 멤버 추가 응답 데이터
 * @author 홍규진
 */
export async function addMember(workspaceId: string, email: string) {
  await privateServerInstance.post<TGetResponse<void>>(
    `/api/v1/members/${workspaceId}`,
    {email},
  );
}

/**
 * 멤버 권한 변경 API 호출 함수입니다.
 * @param workspaceId 워크스페이스 ID
 * @param memberId 멤버 ID
 * @param member 멤버 권한 변경 요청 타입
 * @returns 멤버 권한 변경 응답 데이터
 * @author 홍규진
 */
export async function updateMember(
  workspaceId: string,
  member: TUpdateMemberRequest,
) {
  await privateServerInstance.patch<TGetResponse<void>>(
    `/api/v1/members/${workspaceId}/${member.memberId}`,
    {isAdmin: member.memberRole === 'eAdmin'},
  );
}

/**
 * 멤버 강퇴 API 호출 함수입니다.
 * @param workspaceId 워크스페이스 ID
 * @param memberId 멤버 ID
 * @returns 멤버 강퇴 응답 데이터
 * @author 홍규진
 */
export async function deleteMember(workspaceId: string, memberId: number) {
  const response = await privateServerInstance.delete<TGetResponse<boolean>>(
    `/api/v1/members/${workspaceId}/${memberId}`,
  );
  return response.data.data;
}
