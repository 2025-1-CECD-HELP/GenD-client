import {useMutation, useQueryClient} from '@tanstack/react-query';
import {useAtom} from 'jotai';
import {userAlarmMutationKey} from '@/constants/mutationKeys';
import {workspaceState} from '@/atoms/workspace';

/**
 * 멤버 추가 뮤테이션 훅입니다.
 * 멤버 추가 요청을 처리합니다.
 * 멤버 추가시에 멤버 목록 조회 캐시를 무효화합니다.
 * @returns 멤버 추가 뮤테이션 함수
 * @author 홍규진
 */
export const useUserAlarmMutation = () => {
  const [workspace] = useAtom(workspaceState);
  const queryClient = useQueryClient();
  const {mutateAsync} = useMutation({
    mutationKey: userAlarmMutationKey(workspace.workspaceId).mutationKey,
    mutationFn: userAlarmMutationKey(workspace.workspaceId).mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: userAlarmMutationKey(workspace.workspaceId)
          .mutationSuccessKey,
      });
    },
  });
  return {
    mutateAsync,
  };
};
