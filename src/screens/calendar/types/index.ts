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
