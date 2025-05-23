import {Schedule} from '@/screens/calendar/types';

/**
 * 일정 생성 요청 타입
 */
export type TPostScheduleRequest = Omit<
  Schedule,
  'scheduleId' | 'scheduleWriter'
> & {
  workspaceId: string;
};

/**
 * 일정 조회 응답 타입
 */
export type TGetScheduleResponse = Schedule[];
