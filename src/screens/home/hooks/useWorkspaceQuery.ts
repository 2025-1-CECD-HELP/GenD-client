import {DEFAULT_WORKSPACE_ID} from '@/atoms/workspace/types';
import {workspaceListQuery, workspaceQuery} from '@/constants/queryKeys';
import {useWorkspace} from '@hooks/useWorkspace';
import {useQuery, useSuspenseQuery} from '@tanstack/react-query';

/**
 * 워크스페이스 리스트 조회 훅
 * @returns 워크스페이스 리스트
 * @author 홍규진
 */
export const useWorkspaceListQuery = () => {
  const {data} = useSuspenseQuery({
    queryKey: workspaceListQuery().queryKey,
    queryFn: workspaceListQuery().queryFn,
  });
  return {
    data,
  };
};

/**
 * 워크스페이스 정보 조회 훅
 * @param workspaceId 워크스페이스 ID
 * @returns 워크스페이스 정보
 * @author 홍규진
 */

export const useWorkspaceQuery = () => {
  const {workspaceId} = useWorkspace();
  const {data, refetch} = useQuery({
    queryKey: workspaceQuery(workspaceId).queryKey,
    queryFn: workspaceQuery(workspaceId).queryFn,
    enabled: workspaceId !== DEFAULT_WORKSPACE_ID,
  });
  return {
    data,
    refetch,
  };
};
