import {DEFAULT_WORKSPACE_ID} from '@/atoms/workspace/types';
import {postQuery} from '@/constants/queryKeys';
import {useWorkspace} from '@hooks/useWorkspace';
import {useQuery} from '@tanstack/react-query';

/**
 * 게시글 목록 조회 훅
 * @param workspaceId 워크스페이스 ID
 * @returns 게시글 목록과 refetch 함수
 * @author 홍규진
 */

export const usePostQuery = () => {
  const {workspaceId} = useWorkspace();
  const {data, refetch} = useQuery({
    queryKey: postQuery(workspaceId!).queryKey,
    queryFn: postQuery(workspaceId!).queryFn,
    enabled: workspaceId !== DEFAULT_WORKSPACE_ID,
  });

  return {
    data,
    refetch,
  };
};
