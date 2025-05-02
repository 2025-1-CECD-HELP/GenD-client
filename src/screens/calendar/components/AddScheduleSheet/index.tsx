import React, {useState} from 'react';
import {Button} from '@/components/Button';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useSchedule} from '../../hooks/useSchedule';
import {ScheduleCategory} from '../../types';
import {
  AddScheduleContainer,
  AddScheduleTitle,
  InputLabel,
  Input,
  HeaderContainer,
  CategoryContainer,
  TitleInput,
  DateTimeContainer,
  DateTimeButton,
  DateTimeText,
  AlarmContainer,
  AlarmLabel,
  MemoContainer,
  StyledSwitch,
  CategoryOption,
  CategoryOptionText,
  CategoryButton,
  CategoryButtonText,
  SpaceBetweenRow,
  Dropdown,
  AlarmButton,
  AlarmButtonText,
  AlarmOption,
  AlarmOptionText,
} from './index.style';
import {formatDateTime} from '../../utils/formatDate';
import {ALARM_OPTIONS, CATEGORIES} from '../../constants/calendar';
import {useThemeColors} from '@/contexts/theme/ThemeContext';

interface AddScheduleSheetProps {
  onSubmit: () => void;
  selectedDate: string;
}

export const AddScheduleSheet: React.FC<AddScheduleSheetProps> = ({
  onSubmit,
  selectedDate,
}) => {
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [showAlarmDropdown, setShowAlarmDropdown] = useState(false);
  const [selectedAlarmTime, setSelectedAlarmTime] = useState<number | null>(
    null,
  );

  const {textDisabled} = useThemeColors();

  const {
    category,
    title,
    startDate,
    endDate,
    isAlarm,
    memo,
    handleCategoryChange,
    handleTitleChange,
    handleStartDateChange,
    handleEndDateChange,
    handleToggleAlarm,
    handleMemoChange,
    toggleCategoryDropdown,
    showCategoryDropdown,
    addSchedule,
  } = useSchedule(selectedDate);

  const handleStartDatePickerChange = (event: any, selectedDate?: Date) => {
    setShowStartPicker(false);
    if (selectedDate) {
      handleStartDateChange(selectedDate);
    }
  };

  const handleEndDatePickerChange = (event: any, selectedDate?: Date) => {
    setShowEndPicker(false);
    if (selectedDate) {
      handleEndDateChange(selectedDate);
    }
  };

  const handleSubmit = () => {
    addSchedule();
    onSubmit();
  };

  const handleCategorySelect = (selectedCategory: ScheduleCategory) => {
    handleCategoryChange(selectedCategory);
  };

  const handleAlarmTimeSelect = (value: number) => {
    setSelectedAlarmTime(value);
    setShowAlarmDropdown(false);
  };

  return (
    <AddScheduleContainer>
      <AddScheduleTitle>워크스페이스 일정 등록하기</AddScheduleTitle>

      <HeaderContainer>
        <CategoryContainer>
          <CategoryButton category={category} onPress={toggleCategoryDropdown}>
            <CategoryButtonText>{category}</CategoryButtonText>
          </CategoryButton>
          {showCategoryDropdown && (
            <Dropdown>
              {CATEGORIES.map(cat => (
                <CategoryOption
                  key={cat}
                  category={cat}
                  onPress={() => handleCategorySelect(cat)}>
                  <CategoryOptionText selected={category === cat}>
                    {cat}
                  </CategoryOptionText>
                </CategoryOption>
              ))}
            </Dropdown>
          )}
        </CategoryContainer>
        <TitleInput
          placeholder="일정 제목을 입력해주세요"
          placeholderTextColor={textDisabled}
          value={title}
          onChangeText={handleTitleChange}
        />
      </HeaderContainer>

      <DateTimeContainer>
        <InputLabel>날짜</InputLabel>

        <SpaceBetweenRow>
          <DateTimeText>시작:</DateTimeText>
          <DateTimeButton onPress={() => setShowStartPicker(prev => !prev)}>
            <DateTimeText>{formatDateTime(startDate)}</DateTimeText>
          </DateTimeButton>
        </SpaceBetweenRow>
        {showStartPicker && (
          <DateTimePicker
            value={startDate}
            mode="datetime"
            display="default"
            onChange={handleStartDatePickerChange}
          />
        )}

        <SpaceBetweenRow>
          <DateTimeText>종료:</DateTimeText>
          <DateTimeButton onPress={() => setShowEndPicker(prev => !prev)}>
            <DateTimeText>{formatDateTime(endDate)}</DateTimeText>
          </DateTimeButton>
        </SpaceBetweenRow>
        {showEndPicker && (
          <DateTimePicker
            value={endDate}
            mode="datetime"
            display="default"
            onChange={handleEndDatePickerChange}
          />
        )}
      </DateTimeContainer>

      <SpaceBetweenRow>
        <AlarmLabel>푸시 알림</AlarmLabel>
        <StyledSwitch value={isAlarm} onValueChange={handleToggleAlarm} />
      </SpaceBetweenRow>

      {isAlarm && (
        <AlarmContainer>
          <AlarmLabel>알림 시간</AlarmLabel>
          <CategoryContainer>
            <AlarmButton onPress={() => setShowAlarmDropdown(prev => !prev)}>
              <AlarmButtonText>
                {selectedAlarmTime
                  ? ALARM_OPTIONS.find(opt => opt.value === selectedAlarmTime)
                      ?.label
                  : '알림 시간 선택'}
              </AlarmButtonText>
            </AlarmButton>
            {showAlarmDropdown && (
              <Dropdown>
                {ALARM_OPTIONS.map(option => (
                  <AlarmOption
                    key={option.value}
                    onPress={() => handleAlarmTimeSelect(option.value)}>
                    <AlarmOptionText>{option.label}</AlarmOptionText>
                  </AlarmOption>
                ))}
              </Dropdown>
            )}
          </CategoryContainer>
        </AlarmContainer>
      )}

      <MemoContainer>
        <InputLabel>메모</InputLabel>
        <Input
          placeholder="메모를 입력하세요"
          placeholderTextColor={textDisabled}
          value={memo}
          onChangeText={handleMemoChange}
          multiline
          numberOfLines={4}
        />
      </MemoContainer>

      <Button
        text="저장"
        variant="filled"
        shape="round"
        onPress={handleSubmit}
      />
    </AddScheduleContainer>
  );
};
