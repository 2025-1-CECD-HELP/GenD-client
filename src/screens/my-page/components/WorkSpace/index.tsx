import React from 'react';
import {
  WorkspaceColumn,
  WorkspaceCircle,
  WorkspaceName,
  WorkspaceAlarmButton,
  WorkspaceAlarmText,
  CreateWorkspaceBox,
} from './index.style';
import {PlusIcon} from '@/assets/images/svg/common';
import {useTheme} from '@contexts/theme/ThemeContext';
import {useModal} from '@contexts/modal/ModalContext';
import {AlarmSettingModal} from '../AlarmSettingModal';

interface WorkSpaceProps {
  name: string;
  color: string;
}

export const WorkSpace: React.FC<WorkSpaceProps> = ({name, color}) => {
  const {setModalContent, setIsOpen} = useModal();

  const handleAlarmSetting = () => {
    setModalContent(
      <AlarmSettingModal
        workspaceName={name}
        visible={true}
        onClose={() => setIsOpen(false)}
        onConfirm={() => setIsOpen(false)}
      />,
    );
    setIsOpen(true);
  };

  return (
    <WorkspaceColumn>
      <WorkspaceCircle color={color} />
      <WorkspaceName>{name}</WorkspaceName>
      <WorkspaceAlarmButton onPress={handleAlarmSetting}>
        <WorkspaceAlarmText>알림 설정</WorkspaceAlarmText>
      </WorkspaceAlarmButton>
    </WorkspaceColumn>
  );
};

export const CreateWorkspace = () => {
  const theme = useTheme();
  return (
    <CreateWorkspaceBox>
      <PlusIcon
        width={24}
        height={24}
        key={theme.colors.textPrimary}
        color={theme.colors.textPrimary}
      />
      <WorkspaceName>생성하기</WorkspaceName>
    </CreateWorkspaceBox>
  );
};
