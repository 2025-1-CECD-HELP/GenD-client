import React from 'react';
import {useState, useMemo} from 'react';
import {useBottomSheet} from '@/contexts/bottomSheet/BottomSheetContext';
import {AddScheduleSheet} from '../components/AddScheduleSheet';
import {DayPressEventData, Month} from '../types';
import {useTheme} from '@/contexts/theme/ThemeContext';
import {DUMMY_SCHEDULES, TYPE_COLORS} from '../constants/calendar';
import {getMonth, isSameMonth} from '../utils/formatDate';
import {TPostScheduleRequest} from '@/services/calendar/types';
import {createSchedule} from '@/services/calendar';
import {useCalendarQuery} from './useCalendarQuery';

export const useCalendar = () => {
  const {openBottomSheet, closeBottomSheet} = useBottomSheet();
  const theme = useTheme();

  // 선택된 달
  const [selectedMonth, setSelectedMonth] = useState<string>(
    getMonth(new Date()),
  );

  // 선택된 날짜
  const [focusedDate, setFocusedDate] = useState<string | null>(null);

  // TODO-[규진] 워크스페이스 관련 로직 끝나면 이걸로 맞게 추가
  const {data: scheduleListData} = useCalendarQuery('1');

  // markedDates 생성
  const currentMarkedDates = useMemo(() => {
    const marked: Record<
      string,
      {dots: {key: string; color: string}[]; selected?: boolean}
    > = {};
    scheduleListData.forEach(schedule => {
      const dateStr = schedule.startSchedule.toISOString().split('T')[0];
      if (!marked[dateStr]) marked[dateStr] = {dots: []};
      marked[dateStr].dots.push({
        key: schedule.type || '',
        color: TYPE_COLORS[schedule.type || ''] || 'blue',
      });
    });
    // 선택된 날짜 강조
    if (focusedDate) {
      if (!marked[focusedDate]) marked[focusedDate] = {dots: []};
      marked[focusedDate].selected = true;
    }
    return marked;
  }, [focusedDate, scheduleListData]);

  // filteredSchedules: focusedDate가 있으면 해당 날짜, 없으면 달
  const filteredSchedules = useMemo(() => {
    if (!focusedDate) {
      return DUMMY_SCHEDULES.filter(s =>
        isSameMonth(s.startSchedule, selectedMonth),
      );
    }
    return DUMMY_SCHEDULES.filter(
      s => s.startSchedule.toISOString().split('T')[0] === focusedDate,
    );
  }, [focusedDate, selectedMonth]);

  // 달력 날짜 클릭
  const handleDayPress = (day: DayPressEventData) => {
    setFocusedDate(day.dateString);
  };

  // 달 이동 시
  const handleMonthChange = (monthObj: Month) => {
    setSelectedMonth(getMonth(monthObj.dateString));
    setFocusedDate(null);
  };

  const addSchedule = async (newSchedule: TPostScheduleRequest) => {
    //일정 추가 API 구현
    //TODO-[규진] workSpace 관련 로직 끝나면 이걸로 맞게 추가
    await createSchedule({
      ...newSchedule,
    });
  };

  const handleOpenAddSchedule = () => {
    openBottomSheet(
      React.createElement(AddScheduleSheet, {
        onSubmit: (newSchedule: TPostScheduleRequest) => {
          addSchedule(newSchedule);
          closeBottomSheet();
        },
      }),
    );
  };

  const calendarKey = React.useMemo(
    () => JSON.stringify(theme.colors),
    [theme.colors],
  );

  const calendarTheme = React.useMemo(() => {
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
    selectedMonth,
    setSelectedMonth,
    focusedDate,
    setFocusedDate,
    handleDayPress,
    handleMonthChange,
    currentMarkedDates,
    filteredSchedules,
    handleOpenAddSchedule,
    calendarTheme,
    calendarKey,
  };
};
