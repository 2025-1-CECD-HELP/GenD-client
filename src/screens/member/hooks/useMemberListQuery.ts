import {useSuspenseQuery} from '@tanstack/react-query';
import {getMemberList} from '@/services/member';

/**
 * 멤버 목록 조회 쿼리 훅 입니다.
 * @author 홍규진
 */
export const useMemberListQuery = (workspaceId: string) => {
  const {data, isLoading, error, refetch} = useSuspenseQuery({
    queryKey: ['memberList', {workspaceId}],
    queryFn: () => getMemberList(workspaceId),
  });

  return {data, isLoading, error, refetch};
};
