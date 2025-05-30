import React from 'react';
import {useState, useMemo} from 'react';
import {useBottomSheet} from '@/contexts/bottomSheet/BottomSheetContext';
import {AddScheduleSheet} from '../components/AddScheduleSheet';
import {DayPressEventData, Month} from '../types';
import {useTheme} from '@/contexts/theme/ThemeContext';
import {TYPE_COLORS} from '../constants/calendar';
import {getMonth, isSameMonth} from '../utils/formatDate';
import {useCalendarQuery} from './useCalendarQuery';
import {useAtom} from 'jotai';
import {workspaceState} from '@/atoms/workspace';

/**
 * 캘린더 일정을 필터링하고, 생성하는 훅입니다.
 * @returns 캘린더 훅
 * @author 홍규진
 */
export const useCalendar = () => {
  const {openBottomSheet} = useBottomSheet();
  const [workspace] = useAtom(workspaceState);
  const theme = useTheme();

  // 선택된 달
  const [selectedMonth, setSelectedMonth] = useState<string>(
    getMonth(new Date()),
  );

  // 선택된 날짜
  const [focusedDate, setFocusedDate] = useState<string | null>(null);

  const {data: scheduleListData = []} = useCalendarQuery(workspace.workspaceId);

  // markedDates 생성
  const currentMarkedDates = useMemo(() => {
    const marked: Record<
      string,
      {dots: {key: string; color: string}[]; selected?: boolean}
    > = {};
    scheduleListData?.forEach(schedule => {
      // ISO 문자열을 한국 시간으로 변환
      const startDate = new Date(schedule.startSchedule);
      const endDate = new Date(schedule.endSchedule);

      // 날짜만 추출 (YYYY-MM-DD 형식)
      const formatDate = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      };

      const endDateStr = formatDate(endDate);

      // 시작일부터 종료일까지 모든 날짜에 마커 추가
      const currentDate = new Date(startDate);
      while (formatDate(currentDate) <= endDateStr) {
        const dateStr = formatDate(currentDate);
        if (!marked[dateStr]) marked[dateStr] = {dots: []};
        marked[dateStr].dots.push({
          key: `${schedule.scheduleId}-${schedule.type || ''}`,
          color: TYPE_COLORS[schedule.type || ''] || 'blue',
        });
        currentDate.setDate(currentDate.getDate() + 1);
      }
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
    if (!scheduleListData) return [];

    const formatDate = (date: Date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    if (!focusedDate) {
      return scheduleListData.filter(s => {
        const startDate = new Date(s.startSchedule);
        const endDate = new Date(s.endSchedule);

        // 시작일이 선택된 달에 있거나, 종료일이 선택된 달에 있거나,
        // 시작일과 종료일 사이에 선택된 달이 있는 경우
        return (
          isSameMonth(startDate, selectedMonth) ||
          isSameMonth(endDate, selectedMonth) ||
          (startDate < new Date(selectedMonth) &&
            endDate > new Date(selectedMonth))
        );
      });
    }

    return scheduleListData.filter(s => {
      const startDate = new Date(s.startSchedule);
      const endDate = new Date(s.endSchedule);

      // 시작일이 focusedDate보다 이전이고, 종료일이 focusedDate보다 이후인 경우
      return (
        formatDate(startDate) <= focusedDate &&
        formatDate(endDate) >= focusedDate
      );
    });
  }, [focusedDate, selectedMonth, scheduleListData]);

  // 달력 날짜 클릭
  const handleDayPress = (day: DayPressEventData) => {
    setFocusedDate(day.dateString);
  };

  // 달 이동 시
  const handleMonthChange = (monthObj: Month) => {
    setSelectedMonth(getMonth(monthObj.dateString));
    setFocusedDate(null);
  };

  const handleOpenAddSchedule = () => {
    openBottomSheet(React.createElement(AddScheduleSheet, {}));
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
