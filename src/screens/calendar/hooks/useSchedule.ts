import {useState} from 'react';
import {ScheduleCategory} from '../types';

export interface Schedule {
  id: string;
  category: ScheduleCategory;
  title: string;
  startDate: Date;
  endDate: Date;
  isAlarm: boolean;
  memo: string;
}

export const useSchedule = (selectedDate: string) => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [category, setCategory] = useState<ScheduleCategory>('회의');
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isAlarm, setIsAlarm] = useState(false);
  const [memo, setMemo] = useState('');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);


  const handleCategoryChange = (newCategory: ScheduleCategory) => {
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

  const addSchedule = () => {
    const newSchedule: Schedule = {
      id: Date.now().toString(),
      category,
      title,
      startDate,
      endDate,
      isAlarm,
      memo,
    };

    setSchedules(prev => [...prev, newSchedule]);
    resetForm();
  };

  const resetForm = () => {
    setCategory('회의');
    setTitle('');
    setStartDate(new Date());
    setEndDate(new Date());
    setIsAlarm(false);
    setMemo('');
    setShowCategoryDropdown(false);
  };

  const filteredSchedules = schedules.filter(schedule => {
    const scheduleDate = new Date(schedule.startDate)
      .toISOString()
      .split('T')[0];
    return scheduleDate === selectedDate;
  });

  return {
    schedules,
    filteredSchedules,
    category,
    title,
    startDate,
    endDate,
    isAlarm,
    memo,
    showCategoryDropdown,
    handleCategoryChange,
    handleTitleChange,
    handleStartDateChange,
    handleEndDateChange,
    handleToggleAlarm,
    handleMemoChange,
    toggleCategoryDropdown,
    addSchedule,
  };
};
