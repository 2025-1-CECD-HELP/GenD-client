import React, {useMemo} from 'react';
import {Calendar} from 'react-native-calendars';
import {useCalendar} from './hooks/useCalendar';
import {
  Container,
  CalendarContainer,
  ScheduleContainer,
  ScheduleTitle,
  ScheduleItemContainer,
  ScheduleItemTitle,
  ScheduleItemTime,
  NoScheduleText,
  ScheduleMemo,
} from './index.style';
import {AddScheduleButton} from './components/AddScheduleButton';
import {formatDateTime} from './utils/formatDate';
import {CATEGORY_COLORS, DUMMY_SCHEDULES} from './constants/calendar';
import {useTheme} from '@/contexts/theme/ThemeContext';

/**
 * 캘린더 페이지입니다.
 * 캘린더 페이지는 일정을 추가하고 조회할 수 있습니다.
 * 캘린더 페이지는 캘린더 뷰와 일정 목록 뷰로 구성되어 있습니다.
 * 일정 등록은 관리자만 가능합니다.
 * @author 홍규진
 */

export const CalendarScreen = () => {
  const theme = useTheme();
  const {
    selectedDate,
    setSelectedDate,
    handleOpenAddSchedule,
    // currentMarkedDates,
  } = useCalendar();

  // const {filteredSchedules} = useSchedule(selectedDate);

  // markedDates 생성
  const currentMarkedDatesMemo = useMemo(() => {
    const marked: Record<
      string,
      {dots: {key: string; color: string}[]; selected?: boolean}
    > = {};
    DUMMY_SCHEDULES.forEach(schedule => {
      const dateStr = schedule.startDate.toISOString().split('T')[0];
      if (!marked[dateStr]) marked[dateStr] = {dots: []};
      marked[dateStr].dots.push({
        key: schedule.category,
        color: CATEGORY_COLORS[schedule.category] || 'blue',
      });
    });
    // 선택된 날짜 강조
    if (selectedDate) {
      if (!marked[selectedDate]) marked[selectedDate] = {dots: []};
      marked[selectedDate].selected = true;
    }
    return marked;
  }, [selectedDate]);

  // 선택된 날짜의 일정만 필터링
  const filteredSchedulesMemo = useMemo(
    () =>
      DUMMY_SCHEDULES.filter(
        s => s.startDate.toISOString().split('T')[0] === selectedDate,
      ),
    [selectedDate],
  );

  const calendarKey = useMemo(
    () => JSON.stringify(theme.colors),
    [theme.colors],
  );
  
  const calendarTheme = useMemo(
    () => ({
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
    }),
    [theme],
  );

  return (
    <Container>
      <CalendarContainer>
        <Calendar
          key={calendarKey}
          onDayPress={day => setSelectedDate(day.dateString)}
          enableSwipeMonths={true}
          markingType="multi-dot"
          markedDates={currentMarkedDatesMemo}
          monthFormat="yyyy년 MM월"
          theme={calendarTheme}
        />
      </CalendarContainer>
      <ScheduleContainer>
        <ScheduleTitle>일정</ScheduleTitle>
        {filteredSchedulesMemo.length > 0 ? (
          filteredSchedulesMemo.map(schedule => (
            <ScheduleItemContainer
              key={schedule.id}
              category={schedule.category}>
              <ScheduleItemTime>
                {formatDateTime(schedule.startDate)} ~{' '}
                {formatDateTime(schedule.endDate)}
              </ScheduleItemTime>
              <ScheduleItemTitle>{schedule.title}</ScheduleItemTitle>
              {/* <ScheduleItemMaker>{schedule.maker}</ScheduleItemMaker> */}
              {schedule.memo && <ScheduleMemo>{schedule.memo}</ScheduleMemo>}
            </ScheduleItemContainer>
          ))
        ) : (
          <NoScheduleText>등록된 일정이 없습니다.</NoScheduleText>
        )}
        <AddScheduleButton handleOpenAddSchedule={handleOpenAddSchedule} />
      </ScheduleContainer>
    </Container>
  );
};
