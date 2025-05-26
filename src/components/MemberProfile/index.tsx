import React, {useState} from 'react';
import {useThemeColors} from '@/contexts/theme/ThemeContext';
import {
  Container,
  ProfileContainer,
  ContentContainer,
  MemberName,
  ProfileImage,
  PositionTag,
  PositionText,
} from './index.style';
import {SettingIcon} from '@/assets/images/svg/common';
import defaultProfileImage from '@/assets/images/png/defaultProfile.png';
import {MemberRole} from '@/screens/member/types';
import {Member} from '@/screens/member/types';
import {useModal} from '@/contexts/modal/ModalContext';
import {MemberSettingModal} from '@/screens/member/components/MemberSettingModal';
import CommonModal from '../CommonModal';
import {
  useDeleteMemberMutation,
  useModifyMemberRoleMutation,
} from '@/screens/member/hooks/useMemberMutation';
import {useWorkspace} from '@/hooks/useWorkspace';

/**
 * 멤버 페이지 혹은 멤버 추가 모달에 보여지는 멤버 프로필 컴포넌트입니다.
 * -> 멤버 페이지: 프로필 이미지, 이름, 권한, (선택적으로) 설정 아이콘을 표시합니다.
 * -> 멤버 추가 모달: 프로필 이미지, 이름, 취소 아이콘을 표시합니다.
 * 프로필 이미지가 없을 경우 기본 이미지(defaultProfileImage)를 사용합니다.
 * 멤버 프로필 내에서 관련 함수들을 처리합니다.
 * @author 이정선, 홍규진
 */

interface MemberProfileProps extends Member {
  isCurrentUserManager: boolean;
}

export const MemberProfile: React.FC<MemberProfileProps> = ({
  memberId,
  memberRole,
  memberName,
  memberImage,
  isCurrentUserManager,
}) => {
  const displayImageUrl = memberImage ? memberImage : defaultProfileImage;
  const positionTextMap: Record<MemberRole, string> = {
    eMember: '멤버',
    eAdmin: '관리자',
  };
  const positionText = positionTextMap[memberRole];
  const {textSecondary} = useThemeColors();
  const [isAdmin, setIsAdmin] = useState(memberRole === 'eAdmin');
  const {setIsOpen, setModalContent} = useModal();
  const {mutateAsync: deleteMember} = useDeleteMemberMutation();
  const {mutateAsync: modifyMemberRole} = useModifyMemberRoleMutation();
  const {workspaceId} = useWorkspace();

  const handleSettingPress = () => {
    setModalContent(
      <CommonModal
        isCenter={true}
        title=""
        children={
          <MemberSettingModal
            memberId={memberId}
            memberRole={memberRole}
            memberName={memberName}
            memberImage={memberImage}
            onAdminChange={setIsAdmin}
            onDelete={() => {
              deleteMember({workspaceId: workspaceId!, memberId});
            }}
          />
        }
        onConfirm={() => {
          modifyMemberRole({
            memberId,
            memberRole: isAdmin ? 'eAdmin' : 'eMember',
          });
        }}
        onCancel={() => {
          console.log('cancel');
        }}
        type="default"
      />,
    );
    setIsOpen(true);
  };

  return (
    <Container>
      <ProfileContainer>
        <ProfileImage resizeMode="cover" source={displayImageUrl} />
        <ContentContainer>
          <MemberName>{memberName}</MemberName>
          {memberRole === 'eAdmin' && (
            <PositionTag position={memberRole}>
              <PositionText position={memberRole}>{positionText}</PositionText>
            </PositionTag>
          )}
        </ContentContainer>
      </ProfileContainer>
      {isCurrentUserManager && memberRole === 'eMember' && (
        <SettingIcon
          onPress={handleSettingPress}
          fill={textSecondary}
          width={18}
          height={18}
        />
      )}
    </Container>
  );
};

export default MemberProfile;
