import {privateServerInstance} from '../api/axios';
import {TGetResponse} from '../api/type';
import {TGetScheduleResponse, TPostScheduleRequest} from './types';
import {Schedule} from '@/screens/calendar/types';
/**
 * 일정 생성 API 호출 함수입니다.
 * @author 홍규진
 */
export const createSchedule = async (
  request: TPostScheduleRequest,
): Promise<void> => {
  await privateServerInstance.post<TGetResponse<void>>(
    `/api/v1/schedule/${request.workspaceId}`,
    request,
  );
};

/**
 * 일정 목록 조회 API 호출 함수입니다.
 * @author 홍규진
 */
export const getScheduleList = async (
  workspaceId: string,
): Promise<Schedule[]> => {
  const response = await privateServerInstance.get<
    TGetResponse<TGetScheduleResponse>
  >(`/api/v1/schedule/${workspaceId}`);
  return response.data.data.scheduleList;
};
