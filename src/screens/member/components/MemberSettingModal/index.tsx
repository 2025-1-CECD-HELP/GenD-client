import React, {useState} from 'react';
import {
  ModalContainer,
  ProfileImage,
  MemberName,
  Label,
  SwitchRow,
  DangerText,
} from './index.style';
import {Switch} from 'react-native';
import {Member} from '../../types';
import defaultProfileImage from '@/assets/images/png/defaultProfile.png';
import {useModifyMemberRoleMutation} from '../../hooks/useMemberMutation';
import {useDeleteMemberMutation} from '../../hooks/useMemberMutation';
import {useAtom} from 'jotai';
import {workspaceState} from '@/atoms/workspace';

/**
 * 멤버 설정 모달입니다.
 * 멤버 관리자 권한 부여, 강제 탈퇴 기능을 제공합니다.
 * @author 홍규진
 */

interface MemberSettingModalProps extends Member {}

export const MemberSettingModal: React.FC<MemberSettingModalProps> = ({
  memberRole,
  memberName,
  memberImage,
  memberId,
}) => {
  const [admin, setAdmin] = useState(memberRole === 'eAdmin');
  const {mutateAsync: modifyMemberRole} = useModifyMemberRoleMutation();
  const {mutateAsync: deleteMember} = useDeleteMemberMutation();
  const [workspace] = useAtom(workspaceState);
  const handleSwitch = (value: boolean) => {
    setAdmin(value);
    modifyMemberRole({
      memberId,
      memberRole: value ? 'eAdmin' : 'eMember',
    });
  };
  const handleDelete = () => {
    deleteMember({workspaceId: workspace.workspaceId, memberId});
  };

  return (
    <ModalContainer>
      <ProfileImage
        source={memberImage ? {uri: memberImage} : defaultProfileImage}
      />
      <MemberName>{memberName}</MemberName>

      <SwitchRow>
        <Label>관리자 권한 부여</Label>
        <Switch value={admin} onValueChange={handleSwitch} />
      </SwitchRow>

      <DangerText onPress={handleDelete}>강제 탈퇴</DangerText>
    </ModalContainer>
  );
};
