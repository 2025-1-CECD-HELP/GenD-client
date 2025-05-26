import {DEFAULT_WORKSPACE_ID} from '@/atoms/workspace/types';
import {categoryListQuery} from '@/constants/queryKeys';
import {useWorkspace} from '@/hooks/useWorkspace';
import {useQuery} from '@tanstack/react-query';

/**
 * 카테고리 목록 조회 훅
 * @param workspaceId 워크스페이스 ID
 * @returns 카테고리 목록과 refetch 함수
 * @author 홍규진
 */

export const useCategoryListQuery = () => {
  const {workspaceId} = useWorkspace();
  const {data, refetch} = useQuery({
    queryKey: categoryListQuery(workspaceId!).queryKey,
    queryFn: categoryListQuery(workspaceId!).queryFn,
    enabled: workspaceId !== DEFAULT_WORKSPACE_ID,
  });

  return {
    data,
    refetch,
  };
};
