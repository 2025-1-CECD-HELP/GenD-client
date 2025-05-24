import {useMutation, useQueryClient} from '@tanstack/react-query';
import {TCreateWorkspaceRequest} from '@/services/workspace/types';
import {createWorkspaceMutationKey} from '@/constants/mutationKeys';

/**
 * 워크스페이스 생성 뮤테이션 훅입니다.
 * 워크스페이스 생성 요청을 처리합니다.
 * 워크스페이스 생성시에 워크스페이스 목록 조회 캐시를 무효화합니다.
 * @returns 워크스페이스 생성 뮤테이션 함수
 * @author 홍규진
 */
export const useCreateWorkspaceMutation = () => {
  const queryClient = useQueryClient();
  const {mutate} = useMutation({
    mutationKey: createWorkspaceMutationKey().mutationKey,
    mutationFn: (workspace: TCreateWorkspaceRequest) =>
      createWorkspaceMutationKey().mutationFn(workspace),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: createWorkspaceMutationKey().mutationSuccessKey,
      });
    },
  });

  return {
    mutate,
  };
};
