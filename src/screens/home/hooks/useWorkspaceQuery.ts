import {DEFAULT_WORKSPACE_ID} from '@/atoms/workspace/types';
import {workspaceListQuery, workspaceQuery} from '@/constants/queryKeys';
import {useQuery} from '@tanstack/react-query';
import {useAtom} from 'jotai';
import {workspaceState} from '@/atoms/workspace';

/**
 * 워크스페이스 리스트 조회 훅
 * @returns 워크스페이스 리스트
 * @author 홍규진
 */
export const useWorkspaceListQuery = () => {
  const {data, isLoading} = useQuery({
    queryKey: workspaceListQuery().queryKey,
    queryFn: workspaceListQuery().queryFn,
  });

  return {
    data,
    isLoading,
  };
};

/**
 * 워크스페이스 정보 조회 훅
 * @param workspaceId 워크스페이스 ID
 * @returns 워크스페이스 정보
 * @author 홍규진
 */
export const useWorkspaceQuery = () => {
  const [workspace] = useAtom(workspaceState);
  const {data, refetch} = useQuery({
    queryKey: workspaceQuery(workspace.workspaceId).queryKey,
    queryFn: workspaceQuery(workspace.workspaceId).queryFn,
    enabled: workspace.workspaceId !== DEFAULT_WORKSPACE_ID,
  });
  return {
    data,
    refetch,
  };
};
