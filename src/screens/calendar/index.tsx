import React from 'react';
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
import {formatDateTime, getModeIcon} from './utils/formatDate';

/**
 * 캘린더 페이지입니다.
 * 캘린더 페이지는 일정을 추가하고 조회할 수 있습니다.
 * 캘린더 페이지는 캘린더 뷰와 일정 목록 뷰로 구성되어 있습니다.
 * 일정 등록은 관리자만 가능합니다.
 * @author 홍규진
 */

export const CalendarScreen = () => {
  const {
    handleOpenAddSchedule,
    calendarTheme,
    calendarKey,
    focusedDate,
    handleDayPress,
    handleMonthChange,
    currentMarkedDates,
    filteredSchedules,
  } = useCalendar();

  return (
    <Container>
      <CalendarContainer>
        <Calendar
          key={calendarKey}
          onDayPress={handleDayPress}
          onMonthChange={handleMonthChange}
          enableSwipeMonths={true}
          markingType="multi-dot"
          markedDates={currentMarkedDates}
          monthFormat="yyyy년 MM월"
          theme={calendarTheme}
        />
      </CalendarContainer>
      <ScheduleTitle>
        {getModeIcon(focusedDate ? 'day' : 'month')}
        {focusedDate ? '이 날의 일정' : '이 달의 일정'}
      </ScheduleTitle>
      <ScheduleContainer>
        {filteredSchedules.length > 0 ? (
          filteredSchedules.map(schedule => (
            <ScheduleItemContainer
              key={schedule.scheduleId}
              type={schedule.type || ''}>
              <ScheduleItemTime>
                {formatDateTime(schedule.startSchedule)} ~{' '}
                {formatDateTime(schedule.endSchedule)}
              </ScheduleItemTime>
              <ScheduleItemTitle>{schedule.scheduleTitle}</ScheduleItemTitle>
              {/* <ScheduleItemMaker>{schedule.maker}</ScheduleItemMaker> */}
              {schedule.scheduleDescription && (
                <ScheduleMemo>{schedule.scheduleDescription}</ScheduleMemo>
              )}
            </ScheduleItemContainer>
          ))
        ) : (
          <NoScheduleText>등록된 일정이 없습니다.</NoScheduleText>
        )}
      </ScheduleContainer>
      <AddScheduleButton handleOpenAddSchedule={handleOpenAddSchedule} />
    </Container>
  );
};
