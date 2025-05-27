import {DEFAULT_WORKSPACE_ID} from '@/atoms/workspace/types';
import {postQuery} from '@/constants/queryKeys';
import {useQuery} from '@tanstack/react-query';
import {useAtom} from 'jotai';
import {workspaceState} from '@/atoms/workspace';

/**
 * 게시글 목록 조회 훅
 * @param workspaceId 워크스페이스 ID
 * @returns 게시글 목록과 refetch 함수
 * @author 홍규진
 */

export const usePostQuery = () => {
  const [workspace] = useAtom(workspaceState);
  const {data, refetch} = useQuery({
    queryKey: postQuery(workspace.workspaceId).queryKey,
    queryFn: postQuery(workspace.workspaceId).queryFn,
    enabled: workspace.workspaceId !== DEFAULT_WORKSPACE_ID,
  });

  return {
    data,
    refetch,
  };
};
