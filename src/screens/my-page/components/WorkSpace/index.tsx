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
import defaultMemberImage from '@/assets/images/png/defaultProfile.png';
import useTypeSafeNavigation from '@/hooks/useTypeSafeNavigaion';

interface WorkSpaceProps {
  workspaceName: string;
  imageUrl?: string;
}

export const WorkSpace: React.FC<WorkSpaceProps> = ({
  workspaceName,
  imageUrl,
}) => {
  const {setModalContent, setIsOpen} = useModal();
  const handleAlarmSetting = () => {
    setModalContent(
      <AlarmSettingModal
        workspaceName={workspaceName}
        visible={true}
        onClose={() => setIsOpen(false)}
        onConfirm={() => setIsOpen(false)}
      />,
    );
    setIsOpen(true);
  };

  return (
    <WorkspaceColumn>
      <WorkspaceCircle
        source={imageUrl ? {uri: imageUrl} : defaultMemberImage}
        defaultSource={defaultMemberImage}
      />
      <WorkspaceName>{workspaceName}</WorkspaceName>
      <WorkspaceAlarmButton onPress={handleAlarmSetting}>
        <WorkspaceAlarmText>알림 설정</WorkspaceAlarmText>
      </WorkspaceAlarmButton>
    </WorkspaceColumn>
  );
};

export const CreateWorkspace = () => {
  const theme = useTheme();
  const navigation = useTypeSafeNavigation();
  const handleCreateWorkspace = () => {
    navigation.navigate('INIT_WORKSPACE', {
      screen: 'CREATE_WORKSPACE',
    });
  };
  return (
    <CreateWorkspaceBox onPress={handleCreateWorkspace}>
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
