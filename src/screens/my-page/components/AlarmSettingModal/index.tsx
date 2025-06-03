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
import {useUserAlarmMutation} from '../../hooks/useMypageMutation';
import {useAtom} from 'jotai';
import {userState} from '@/atoms/user';

interface AlarmSettingModalProps {
  workspaceImage: string;
  workspaceName: string;
  visible: boolean;
  onClose: () => void;
  onConfirm: (schedule: boolean, post: boolean) => void;
}

export const AlarmSettingModal: React.FC<AlarmSettingModalProps> = ({
  workspaceImage,
  workspaceName,
  visible,
  onClose,
}) => {
  const [user] = useAtom(userState);
  const {mutateAsync: updateUserAlarm} = useUserAlarmMutation();
  const [scheduleAlarm, setScheduleAlarm] = useState(true);
  const [postAlarm, setPostAlarm] = useState(true);
  const {blue, textSecondary} = useThemeColors();

  if (!visible) return null;

  return (
    <CommonModal
      type="default"
      title="알림 설정"
      onCancel={onClose}
      onConfirm={() => {
        updateUserAlarm({
          memberId: user?.memberId || -1,
          isPost: postAlarm,
          isSchedule: scheduleAlarm,
        });
      }}
      isCenter
      children={
        <>
          <ProfileCircle source={{uri: workspaceImage}} />
          <WorkspaceName>{workspaceName}</WorkspaceName>
          <SwitchRow>
            <SwitchLabel>일정 알림</SwitchLabel>
            <Switch
              value={scheduleAlarm}
              onValueChange={setScheduleAlarm}
              trackColor={{false: textSecondary, true: blue}}
              thumbColor={scheduleAlarm ? 'white' : blue}
            />
          </SwitchRow>
          <SwitchRow>
            <SwitchLabel>게시글 알림</SwitchLabel>
            <Switch
              value={postAlarm}
              onValueChange={setPostAlarm}
              trackColor={{false: textSecondary, true: blue}}
              thumbColor={postAlarm ? 'white' : blue}
            />
          </SwitchRow>
        </>
      }
    />
  );
};
