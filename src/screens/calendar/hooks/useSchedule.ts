import {useState} from 'react';
import {ScheduleType} from '../types';

const convertToKoreanTime = (date: Date) => {
  return new Date(date.getTime() + 9 * 60 * 60 * 1000);
};

export const useSchedule = () => {
  const [category, setCategory] = useState<ScheduleType>('Meeting');
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isAlarm, setIsAlarm] = useState(false);
  const [memo, setMemo] = useState('');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [alarmTime, setAlarmTime] = useState<Date | null>(null);

  const handleCategoryChange = (newCategory: ScheduleType) => {
    setCategory(newCategory);
    setShowCategoryDropdown(false);
  };

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
  };

  const handleStartDateChange = (newDate: Date) => {
    setStartDate(newDate);
  };

  const handleEndDateChange = (newDate: Date) => {
    setEndDate(newDate);
  };

  const handleToggleAlarm = () => {
    setIsAlarm(prev => !prev);
  };

  const handleMemoChange = (newMemo: string) => {
    setMemo(newMemo);
  };

  const toggleCategoryDropdown = () => {
    setShowCategoryDropdown(prev => !prev);
  };

  const setAlarmTimeFromOffset = (minutesBefore: number) => {
    const newAlarmTime = new Date(
      startDate.getTime() - minutesBefore * 60 * 1000,
    );
    setAlarmTime(newAlarmTime);
  };

  const resetForm = () => {
    setCategory('Meeting');
    setTitle('');
    setStartDate(new Date());
    setEndDate(new Date());
    setIsAlarm(false);
    setMemo('');
    setShowCategoryDropdown(false);
    setAlarmTime(null);
  };

  const getKoreanSchedule = () => {
    return {
      startDate: convertToKoreanTime(startDate),
      endDate: convertToKoreanTime(endDate),
      alarmTime: alarmTime ? convertToKoreanTime(alarmTime) : undefined,
    };
  };

  return {
    category,
    title,
    startDate,
    endDate,
    isAlarm,
    memo,
    showCategoryDropdown,
    alarmTime,
    handleCategoryChange,
    handleTitleChange,
    handleStartDateChange,
    handleEndDateChange,
    handleToggleAlarm,
    handleMemoChange,
    toggleCategoryDropdown,
    setAlarmTimeFromOffset,
    resetForm,
    getKoreanSchedule,
  };
};
