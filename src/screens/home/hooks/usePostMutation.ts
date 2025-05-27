import {useMutation, useQueryClient} from '@tanstack/react-query';

import {
  deletePostMutationKey,
  patchPostPinMutationKey,
} from '@/constants/mutationKeys';
import {TDeletePostRequest, TUpdatePostPinRequest} from '@/services/post/types';
import {ROUTE_NAMES} from '@/constants/routes';
import useTypeSafeNavigation from '@hooks/useTypeSafeNavigaion';
import {useAtom} from 'jotai';
import {workspaceState} from '@/atoms/workspace';

/**
 * 게시글 핀 박기 뮤테이션 훅입니다.
 * 여기서의 post는 게시글의 'post'를 의미합니다.
 * 게시글 핀 update 요청을 처리합니다.
 * 기존 게시글의 리스트 목록 조회 캐시를 무효화합니다.
 * @author 홍규진
 */
export const usePatchPostPinMutation = () => {
  const queryClient = useQueryClient();
  const [workspace] = useAtom(workspaceState);
  const {mutateAsync: patchPostPinMutation} = useMutation({
    mutationKey: patchPostPinMutationKey(workspace.workspaceId).mutationKey,
    mutationFn: (request: TUpdatePostPinRequest) =>
      patchPostPinMutationKey(workspace.workspaceId).mutationFn(request),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: patchPostPinMutationKey(workspace.workspaceId)
          .mutationSuccessKey,
      });
    },
  });
  return {patchPostPinMutation};
};

/**
 * 게시글 삭제 뮤테이션 훅입니다.
 * 게시글 삭제 요청을 처리합니다.
 * 기존 게시글의 리스트 목록 조회 캐시를 무효화합니다.
 * @author 홍규진
 */
export const useDeletePostMutation = () => {
  const queryClient = useQueryClient();
  const [workspace] = useAtom(workspaceState);
  const navigation = useTypeSafeNavigation();
  const {mutateAsync: deletePostMutation} = useMutation({
    mutationKey: deletePostMutationKey(workspace.workspaceId).mutationKey,
    mutationFn: (request: TDeletePostRequest) =>
      deletePostMutationKey(workspace.workspaceId).mutationFn(request),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: deletePostMutationKey(workspace.workspaceId)
          .mutationSuccessKey,
      });
      navigation.navigate(ROUTE_NAMES.LANDING, {});
    },
  });
  return {deletePostMutation};
};
