import {Member, MemberRole} from '@/screens/member/types';

/**
 * 멤버 목록 조회 응답 타입
 * @author 홍규진
 */
export type TGetMemberListResponse = {
  memberList: Member[];
};

/**
 * 멤버 추가 요청 타입
 * @author 홍규진
 */
export type TAddMemberRequest = {
  email: string;
};

/**
 * 멤버 권한 변경 요청 타입
 * TODO-[규진] 명세서 완료되고 나서 수정 필요
 * @author 홍규진
 */
export type TUpdateMemberRequest = {
  memberId: number;
  memberRole: MemberRole;
};

export type TDeleteMemberRequest = {
  workspaceId: string;
  memberId: number;
};
