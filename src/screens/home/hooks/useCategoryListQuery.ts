import {DEFAULT_WORKSPACE_ID} from '@/atoms/workspace/types';
import {categoryListQuery} from '@/constants/queryKeys';

import {useQuery} from '@tanstack/react-query';
import {useAtom} from 'jotai';
import {workspaceState} from '@/atoms/workspace';

/**
 * 카테고리 목록 조회 훅
 * @param workspaceId 워크스페이스 ID
 * @returns 카테고리 목록과 refetch 함수
 * @author 홍규진
 */

export const useCategoryListQuery = () => {
  const [workspace] = useAtom(workspaceState);
  const {data, refetch} = useQuery({
    queryKey: categoryListQuery(workspace.workspaceId).queryKey,
    queryFn: categoryListQuery(workspace.workspaceId).queryFn,
    enabled: workspace.workspaceId !== DEFAULT_WORKSPACE_ID,
  });

  return {
    data,
    refetch,
  };
};
