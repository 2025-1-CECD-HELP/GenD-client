export interface Schedule {
  id: string;
  category: ScheduleCategory;
  title: string;
  startDate: Date;
  endDate: Date;
  isAlarm: boolean;
  memo: string;
}

export type ScheduleCategory = '회의' | '발표' | '활동' | '공부';

export interface MarkedDates {
  [date: string]: {
    marked?: boolean;
    selected?: boolean;
    dotColor?: string;
  };
}
