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
import {useDeleteMemberMutation} from '../../hooks/useMemberMutation';

export const MemberSettingModal: React.FC<
  Member & {onAdminChange: (isAdmin: boolean) => void}
> = ({memberId, memberRole, memberName, memberImage, onAdminChange}) => {
  const [admin, setAdmin] = useState(memberRole === 'eAdmin');
  const {mutateAsync: deleteMember} = useDeleteMemberMutation();
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

      <DangerText
        onPress={() => {
          //TODO-[규진] 워크스페이스 ID 동적으로 바꾸기
          deleteMember({workspaceId: '1', memberId});
        }}>
        강제 탈퇴
      </DangerText>
    </ModalContainer>
  );
};
