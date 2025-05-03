import React from 'react';
import {useState, useMemo} from 'react';
import {useBottomSheet} from '@/contexts/bottomSheet/BottomSheetContext';
import {AddScheduleSheet} from '../components/AddScheduleSheet';
import {Schedule, MarkedDates, CalendarTheme} from '../types';
import {useSchedule} from './useSchedule';
import {useTheme} from '@/contexts/theme/ThemeContext';
interface UseCalendarReturn {
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  filteredSchedules: Schedule[];
  handleOpenAddSchedule: () => void;
  currentMarkedDates: MarkedDates;
  calendarKey: string;
  calendarTheme: CalendarTheme;
}

export const useCalendar = (): UseCalendarReturn => {
  const {openBottomSheet, closeBottomSheet} = useBottomSheet();
  const theme = useTheme();
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0],
  );
  const {filteredSchedules} = useSchedule(selectedDate);

  const currentMarkedDates = useMemo(() => {
    const markedDates: {[key: string]: {marked: boolean}} = {};
    filteredSchedules.forEach(schedule => {
      const date = new Date(schedule.startDate).toISOString().split('T')[0];
      markedDates[date] = {marked: true};
    });
    return markedDates;
  }, [filteredSchedules]);

  const addSchedule = (newSchedule: Omit<Schedule, 'id'>) => {
    //일정 추가 API 구현
    console.log(newSchedule);
  };

  const handleOpenAddSchedule = () => {
    openBottomSheet(
      React.createElement(AddScheduleSheet, {
        onSubmit: (newSchedule: Omit<Schedule, 'id'>) => {
          addSchedule(newSchedule);
          closeBottomSheet();
        },
      }),
    );
  };

  const calendarKey = useMemo(
    () => JSON.stringify(theme.colors),
    [theme.colors],
  );

  const calendarTheme = useMemo(() => {
    return {
      arrowColor: theme.colors.blue,
      backgroundColor: theme.colors.background,
      calendarBackground: theme.colors.background,
      todayBackgroundColor: theme.colors.background,
      reservationsBackgroundColor: theme.colors.background,
      selectedDayBackgroundColor: theme.colors.blue,
      selectedDayTextColor: theme.colors.white,
      textMonthFontSize: 22,
      textDayFontSize: 16,
      textDayHeaderFontSize: 14,
      dayTextColor: theme.colors.textPrimary,
      textDisabledColor: theme.colors.textDisabled,
      dotColor: theme.colors.textPrimary,
      selectedDotColor: theme.colors.white,
      monthTextColor: theme.colors.textPrimary,
      textSectionTitleColor: theme.colors.textPrimary,
      todayTextColor: theme.colors.textPrimary,
      disabledArrowColor: theme.colors.textDisabled,
    };
  }, [theme]);
  return {
    selectedDate,
    setSelectedDate,
    filteredSchedules,
    handleOpenAddSchedule,
    currentMarkedDates,
    calendarKey,
    calendarTheme,
  };
};
