import {useMutation, useQueryClient} from '@tanstack/react-query';
import {
  TDeleteMemberRequest,
  TUpdateMemberRequest,
} from '@/services/member/types';
import {useModal} from '@/contexts/modal/ModalContext';
import {
  memberDeleteMutationKey,
  memberUpdateMutationKey,
  memberAddMutationKey,
} from '@/constants/mutationKeys';
import {useWorkspace} from '@hooks/useWorkspace';

/**
 * 멤버 추가 뮤테이션 훅입니다.
 * 멤버 추가 요청을 처리합니다.
 * 멤버 추가시에 멤버 목록 조회 캐시를 무효화합니다.
 * @returns 멤버 추가 뮤테이션 함수
 * @author 홍규진
 */
export const useAddMemberMutation = () => {
  const {workspaceId} = useWorkspace();
  const queryClient = useQueryClient();
  const {mutateAsync} = useMutation({
    mutationKey: memberAddMutationKey(workspaceId!).mutationKey,
    mutationFn: ({workspaceId, email}: {workspaceId: string; email: string}) =>
      memberAddMutationKey(workspaceId!).mutationFn(workspaceId, email),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: memberAddMutationKey(workspaceId!).mutationSuccessKey,
      });
    },
  });
  return {
    mutateAsync,
  };
};

/**
 * 멤버 권한 변경 뮤테이션 훅입니다.
 * 멤버 권한 변경 요청을 처리합니다.
 * 멤버 권한 변경시에 멤버 목록 조회 캐시를 무효화합니다.
 * @returns 멤버 권한 변경 뮤테이션 함수
 * @author 홍규진
 */
export const useModifyMemberRoleMutation = () => {
  const {workspaceId} = useWorkspace();
  const queryClient = useQueryClient();
  const {mutateAsync} = useMutation({
    mutationKey: memberUpdateMutationKey(workspaceId!).mutationKey,
    mutationFn: (member: TUpdateMemberRequest) =>
      memberUpdateMutationKey(workspaceId!).mutationFn(member),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: memberUpdateMutationKey(workspaceId!).mutationSuccessKey,
      });
    },
  });

  return {
    mutateAsync,
  };
};

/**
 * 멤버 강제 탈퇴 뮤테이션 훅입니다.
 * 멤버 강제 탈퇴 요청을 처리합니다.
 * 멤버 강제 탈퇴시에 멤버 목록 조회 캐시를 무효화합니다.
 * @returns 멤버 강제 탈퇴 뮤테이션 함수
 * @author 홍규진
 */
export const useDeleteMemberMutation = () => {
  const {workspaceId} = useWorkspace();
  const queryClient = useQueryClient();
  const {setIsOpen} = useModal();
  const {mutateAsync} = useMutation({
    mutationKey: memberDeleteMutationKey(workspaceId!).mutationKey,
    mutationFn: ({workspaceId, memberId}: TDeleteMemberRequest) =>
      memberDeleteMutationKey(workspaceId!).mutationFn({workspaceId, memberId}),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: memberDeleteMutationKey(workspaceId!).mutationSuccessKey,
      });
      setIsOpen(false);
    },
  });
  return {
    mutateAsync,
  };
};
