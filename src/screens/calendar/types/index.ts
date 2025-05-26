export interface Schedule {
  scheduleId: string;
  isAlarm: boolean;
  type: string;
  scheduleWriter: string;
  scheduleTitle: string;
  startSchedule: Date;
  endSchedule: Date;
  startAlarm?: Date;
  scheduleDescription?: string;
}

export type ScheduleType = 'Study' | 'Presentation' | 'Meeting' | 'Activity';
// 타입 매핑 테이블
export const TYPE_LABELS: Record<ScheduleType, string> = {
  Study: '공부',
  Presentation: '발표',
  Meeting: '회의',
  Activity: '활동',
};
export interface MarkedDates {
  [date: string]: {
    marked?: boolean;
    selected?: boolean;
    dotColor?: string;
  };
}

// 타입 정의 (파일 상단에 위치시키는 것이 좋음)
export type DayPressEventData = {
  dateString: string;
  day: number;
  month: number;
  year: number;
  timestamp: number;
};

export type Month = {
  dateString: string;
  month: number;
  year: number;
  timestamp: number;
};

/* 캘린더 테마 */
export interface CalendarTheme {
  arrowColor: string;
  backgroundColor: string;
  calendarBackground: string;
  todayBackgroundColor: string;
  reservationsBackgroundColor: string;
  selectedDayBackgroundColor: string;
  selectedDayTextColor: string;
  textMonthFontSize: number;
  textDayFontSize: number;
  textDayHeaderFontSize: number;
  dayTextColor: string;
  textDisabledColor: string;
  dotColor: string;
  selectedDotColor: string;
  monthTextColor: string;
  textSectionTitleColor: string;
  todayTextColor: string;
  disabledArrowColor: string;
}
