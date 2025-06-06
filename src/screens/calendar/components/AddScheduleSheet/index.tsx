import React, {useState} from 'react';
import {Button} from '@/components/Button';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useSchedule} from '../../hooks/useSchedule';
import {TYPE_LABELS, ScheduleType} from '../../types';
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
import {ALARM_OPTIONS} from '../../constants/calendar';
import {useThemeColors} from '@/contexts/theme/ThemeContext';
import {Text, ScrollView} from 'react-native';
import {useCreateScheduleMutation} from '../../hooks/useCalendarMuation';
import {useAtomValue} from 'jotai';
import {workspaceState} from '@/atoms/workspace';

export const AddScheduleSheet: React.FC = () => {
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [showAlarmDropdown, setShowAlarmDropdown] = useState(false);
  const [selectedAlarmOffset, setSelectedAlarmOffset] = useState<number | null>(
    null,
  );

  const {textDisabled, blue, textPrimary} = useThemeColors();
  const workspace = useAtomValue(workspaceState);
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
    setAlarmTimeFromOffset,
    resetForm,
    getKoreanSchedule,
  } = useSchedule();

  const {mutate} = useCreateScheduleMutation();

  const handleStartDatePickerChange = (event: any, selectedDate?: Date) => {
    if (selectedDate) {
      handleStartDateChange(selectedDate);
    }
  };

  const handleEndDatePickerChange = (event: any, selectedDate?: Date) => {
    if (selectedDate) {
      handleEndDateChange(selectedDate);
    }
  };

  const handleSubmit = () => {
    const {
      startDate: koreanStartDate,
      endDate: koreanEndDate,
      alarmTime: koreanAlarmTime,
    } = getKoreanSchedule();
    mutate({
      scheduleTitle: title,
      startSchedule: koreanStartDate,
      endSchedule: koreanEndDate,
      type: category,
      scheduleDescription: memo,
      isAlarm: isAlarm,
      startAlarm: koreanAlarmTime,
      workspaceId: workspace.workspaceId,
    });
    resetForm();
  };

  const handleCategorySelect = (type: ScheduleType) => {
    handleCategoryChange(type);
  };

  const handleAlarmTimeSelect = (minutesBefore: number) => {
    setSelectedAlarmOffset(minutesBefore);
    setAlarmTimeFromOffset(minutesBefore);
    setShowAlarmDropdown(false);
  };

  return (
    <ScrollView>
      <AddScheduleContainer>
        <AddScheduleTitle>워크스페이스 일정 등록하기</AddScheduleTitle>

        <HeaderContainer>
          <CategoryContainer>
            <CategoryButton
              category={category}
              onPress={toggleCategoryDropdown}>
              <CategoryButtonText>{TYPE_LABELS[category]}</CategoryButtonText>
            </CategoryButton>
            {showCategoryDropdown && (
              <Dropdown>
                {/* Meeting -> 회의, Presentation -> 발표, Activity -> 활동, Study -> 공부 */}
                {Object.entries(TYPE_LABELS).map(([type, label]) => (
                  <CategoryOption
                    key={type}
                    category={type}
                    onPress={() => handleCategorySelect(type as ScheduleType)}>
                    <CategoryOptionText selected={category === type}>
                      {label}
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
            {showStartPicker && (
              <Text
                onPress={() => setShowStartPicker(false)}
                style={{color: blue}}>
                확인
              </Text>
            )}
          </SpaceBetweenRow>
          {showStartPicker && (
            <DateTimePicker
              value={startDate}
              textColor={textPrimary}
              mode="datetime"
              display="spinner"
              onChange={handleStartDatePickerChange}
            />
          )}

          <SpaceBetweenRow>
            <DateTimeText>종료:</DateTimeText>
            <DateTimeButton onPress={() => setShowEndPicker(prev => !prev)}>
              <DateTimeText>{formatDateTime(endDate)}</DateTimeText>
            </DateTimeButton>
            {showEndPicker && (
              <Text
                onPress={() => setShowEndPicker(false)}
                style={{color: blue}}>
                확인
              </Text>
            )}
          </SpaceBetweenRow>
          {showEndPicker && (
            <DateTimePicker
              value={endDate}
              textColor={textPrimary}
              mode="datetime"
              display="spinner"
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
                  {selectedAlarmOffset !== null
                    ? ALARM_OPTIONS.find(
                        opt => opt.value === selectedAlarmOffset,
                      )?.label
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
    </ScrollView>
  );
};
