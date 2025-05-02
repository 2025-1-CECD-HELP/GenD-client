import React from 'react';
import {useState, useMemo} from 'react';
import {useBottomSheet} from '@/contexts/bottomSheet/BottomSheetContext';
import {AddScheduleSheet} from '../components/AddScheduleSheet';
import {Schedule, MarkedDates} from '../types';
import {useSchedule} from './useSchedule';
import {useTheme} from '@/contexts/theme/ThemeContext';
interface UseCalendarReturn {
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  filteredSchedules: Schedule[];
  handleOpenAddSchedule: () => void;
  currentMarkedDates: MarkedDates;
  calendarKey: string;
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

  return {
    selectedDate,
    setSelectedDate,
    filteredSchedules,
    handleOpenAddSchedule,
    currentMarkedDates,
    calendarKey,
  };
};
