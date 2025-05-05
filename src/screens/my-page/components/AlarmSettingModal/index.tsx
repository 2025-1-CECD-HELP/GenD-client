import React, {useState} from 'react';
import {Switch} from 'react-native';
import CommonModal from '@/components/CommonModal';
import {
  ProfileCircle,
  WorkspaceName,
  SwitchRow,
  SwitchLabel,
} from './index.style';
import {useThemeColors} from '@/contexts/theme/ThemeContext';

interface AlarmSettingModalProps {
  workspaceName: string;
  visible: boolean;
  onClose: () => void;
  onConfirm: (schedule: boolean, post: boolean) => void;
}

export const AlarmSettingModal: React.FC<AlarmSettingModalProps> = ({
  workspaceName,
  visible,
  onClose,
  onConfirm,
}) => {
  const [scheduleAlarm, setScheduleAlarm] = useState(true);
  const [postAlarm, setPostAlarm] = useState(true);
  const {blue, textSecondary} = useThemeColors();

  if (!visible) return null;

  return (
    <CommonModal
      type="default"
      title="알림 설정"
      onCancel={onClose}
      onConfirm={() => onConfirm(scheduleAlarm, postAlarm)}
      isCenter
      children={
        <>
          <ProfileCircle />
          <WorkspaceName>{workspaceName}</WorkspaceName>
          <SwitchRow>
            <SwitchLabel>일정 알림</SwitchLabel>
            <Switch
              value={scheduleAlarm}
              onValueChange={setScheduleAlarm}
              trackColor={{false: textSecondary, true: blue}}
              thumbColor={scheduleAlarm ? textSecondary : blue}
            />
          </SwitchRow>
          <SwitchRow>
            <SwitchLabel>게시글 알림</SwitchLabel>
            <Switch
              value={postAlarm}
              onValueChange={setPostAlarm}
              trackColor={{false: textSecondary, true: blue}}
              thumbColor={postAlarm ? textSecondary : blue}
            />
          </SwitchRow>
        </>
      }
    />
  );
};
