import {useSuspenseQuery} from '@tanstack/react-query';
import {useAtom} from 'jotai';
import {workspaceState} from '@/atoms/workspace';
import {userQuery} from '@/constants/queryKeys';

/**
 * 유저 조회 쿼리 훅 입니다.
 * @author 홍규진
 */
export const useUserQuery = () => {
  const [workspace] = useAtom(workspaceState);
  const {data, isLoading, error, refetch} = useSuspenseQuery({
    queryKey: userQuery(workspace.workspaceId).queryKey,
    queryFn: userQuery(workspace.workspaceId).queryFn,
  });

  return {data, isLoading, error, refetch};
};
