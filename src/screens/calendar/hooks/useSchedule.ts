import {useState} from 'react';
import {ScheduleType} from '../types';

export const useSchedule = () => {
  const [category, setCategory] = useState<ScheduleType>('Meeting');
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isAlarm, setIsAlarm] = useState(false);
  const [memo, setMemo] = useState('');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

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

  const resetForm = () => {
    setCategory('Meeting');
    setTitle('');
    setStartDate(new Date());
    setEndDate(new Date());
    setIsAlarm(false);
    setMemo('');
    setShowCategoryDropdown(false);
  };

  return {
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
    resetForm,
  };
};
