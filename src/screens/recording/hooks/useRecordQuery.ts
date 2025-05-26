import {useSuspenseQuery} from '@tanstack/react-query';
import {directoryListQuery} from '@/constants/queryKeys';

/**
 * 디렉토리 목록 조회 쿼리 훅 입니다.
 * @author 홍규진
 */
export const useDirectoryListQuery = (workspaceId: string) => {
  const {data, isLoading, error, refetch} = useSuspenseQuery({
    queryKey: directoryListQuery(workspaceId).queryKey,
    queryFn: directoryListQuery(workspaceId).queryFn,
  });

  return {data, isLoading, error, refetch};
};
