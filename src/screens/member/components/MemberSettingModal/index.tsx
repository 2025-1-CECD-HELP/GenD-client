import React, {useState} from 'react';
import {
  ModalContainer,
  Title,
  ProfileImage,
  MemberName,
  Label,
  SwitchRow,
  DangerText,
} from './index.style';
import {Switch} from 'react-native';
import {Member} from '../../types';
import defaultProfileImage from '@/assets/images/png/defaultProfile.png';

/**
 * 멤버 설정 모달입니다.
 * 멤버 관리자 권한 부여, 강제 탈퇴 기능을 제공합니다.
 * @author 홍규진
 */

interface MemberSettingModalProps extends Member {
  onAdminChange: (isAdmin: boolean) => void;
  onDelete: () => void;
}

export const MemberSettingModal: React.FC<MemberSettingModalProps> = ({
  memberRole,
  memberName,
  memberImage,
  onAdminChange,
  onDelete,
}) => {
  const [admin, setAdmin] = useState(memberRole === 'eAdmin');

  const handleSwitch = (value: boolean) => {
    setAdmin(value);
    onAdminChange(value);
  };

  return (
    <ModalContainer>
      <Title>멤버 관리</Title>
      <ProfileImage
        source={memberImage ? {uri: memberImage} : defaultProfileImage}
      />
      <MemberName>{memberName}</MemberName>

      <SwitchRow>
        <Label>관리자 권한 부여</Label>
        <Switch value={admin} onValueChange={handleSwitch} />
      </SwitchRow>

      <DangerText onPress={onDelete}>강제 탈퇴</DangerText>
    </ModalContainer>
  );
};
