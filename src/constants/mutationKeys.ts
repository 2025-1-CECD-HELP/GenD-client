import {TCreateWorkspaceRequest} from '@/services/workspace/types';
import {memberListQuery, workspaceListQuery} from './queryKeys';
import {createWorkspace} from '@/services/workspace';
import {TPostSubmitRecordRequest} from '@/services/meeting/types';
import {submitRecord} from '@/services/meeting';
import {TPostFinalTemplateContent} from '@/services/meeting/types';
import {finalSubmitRecord} from '@/services/meeting';
import {
  TDeleteMemberRequest,
  TUpdateMemberRequest,
} from '@/services/member/types';
import {deleteMember, updateMember} from '@/services/member';

/**
 * Tanstack Query 중 useMutation 사용시 편의성을 위해 키와 함수를 한 군데가 모아두는 파일입니다.
 * useMutation 사용시 성공 시 어떤 키를 무효화 할지 정의해야합니다.
 * 형식은 다음과 같습니다.
 * export const mutationKeys = () => {
 *   return {
 *     mutationKey: ['mutationKey'],
 *     mutationSuccessKey: [...getWorkSpacesQuery().queryKey],
 *     mutationFn: () => mutationFn(),
 *   };
 * };
 * @author 홍규진
 */

/**
 * 워크스페이스 생성 뮤테이션 키
 * @author 홍규진
 */
export const createWorkspaceMutationKey = () => {
  return {
    mutationKey: ['workspace'],
    mutationSuccessKey: [...workspaceListQuery().queryKey],
    mutationFn: (workspace: TCreateWorkspaceRequest) =>
      createWorkspace(workspace),
  };
};

/**
 * 회의록 저장 및 미리보기 받기 뮤테이션 키
 * 회의록 최초 저장 후 미리보기 데이터를 받지만, 이는 캐시에 저장되지 않습니다.
 * @author 홍규진
 */
export const submitRecordMutationKey = () => {
  return {
    mutationKey: ['submitRecord'],
    mutationSuccessKey: [],
    mutationFn: (request: TPostSubmitRecordRequest) => submitRecord(request),
  };
};

/**
 * 회의록 최종 저장 뮤테이션 키
 * //TODO-[규진] 최종 저장 후 회의록 목록 조회 캐시를 무효화합니다.
 * @author 홍규진
 */
export const finalSubmitRecordMutationKey = () => {
  return {
    mutationKey: ['finalSubmitRecord'],
    mutationSuccessKey: [],
    mutationFn: (request: TPostFinalTemplateContent) =>
      finalSubmitRecord(request),
  };
};

/**
 * 멤버 권한 변경 뮤테이션 키
 * @author 홍규진
 */
export const memberUpdateMutationKey = () => {
  return {
    mutationKey: ['memberUpdate'],
    mutationSuccessKey: [...memberListQuery().queryKey],
    mutationFn: (member: TUpdateMemberRequest) => updateMember('1', member),
  };
};

/**
 * 멤버 강퇴 뮤테이션 키
 * @author 홍규진
 */
export const memberDeleteMutationKey = () => {
  return {
    mutationKey: ['memberDelete'],
    mutationSuccessKey: [...memberListQuery().queryKey],
    mutationFn: (member: TDeleteMemberRequest) =>
      deleteMember(member.workspaceId, member.memberId),
  };
};
