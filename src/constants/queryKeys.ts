import {getScheduleList} from '@/services/calendar';

/**
 * Tanstack Query 중 useQuery / useSuspenseQuery 사용시 편의성을 위해 키와 함수를 한 군데가 모아두는 파일입니다.
 * 형식은 다음과 같습니다.
 * export const getWorkSpacesQuery = (id: string) => {
 *   return {
 *     queryKey: ['workSpaces', {filterId : id}],
 *     queryFn: () => getWorkSpaces(),
 *   };
 * };
 * @author 홍규진
 */

export const calendarQuery = (workspaceId: string) => {
  return {
    queryKey: ['calendar', {workspaceId}],
    queryFn: () => getScheduleList(workspaceId),
  };
};
