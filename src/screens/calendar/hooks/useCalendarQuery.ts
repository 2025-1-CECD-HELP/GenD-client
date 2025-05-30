import {calendarQuery} from '@/constants/queryKeys';
import {useSuspenseQuery} from '@tanstack/react-query';

/**
 * 캘린더 일정 목록 조회 훅
 * @param workspaceId 워크스페이스 ID
 * @returns 캘린더 일정 목록
 * @author 홍규진
 */

export const useCalendarQuery = (workspaceId: string) => {
  const {data, refetch} = useSuspenseQuery({
    queryKey: calendarQuery(workspaceId).queryKey,
    queryFn: calendarQuery(workspaceId).queryFn,
  });

  return {
    data,
    refetch,
  };
};
