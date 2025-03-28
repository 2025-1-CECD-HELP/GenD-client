import React from 'react';
import {useTheme} from '@emotion/react';
import {
  Container,
  ProfileContainer,
  ContentContainer,
  MemberName,
  ProfileImage,
  PositionTag,
  PositionText,
} from './index.style';
import {SettingIcon, CancelIcon} from '@/assets/images/svg/common';
import defaultProfileImage from '@/assets/images/png/defaultProfile.png';
import {MemberPosition} from './index.type';

/**
 * 멤버 페이지 혹은 멤버 추가 모달에 보여지는 멤버 프로필 컴포넌트입니다.
 * -> 멤버 페이지: 프로필 이미지, 이름, 권한, (선택적으로) 설정 아이콘을 표시합니다.
 * -> 멤버 추가 모달: 프로필 이미지, 이름, 취소 아이콘을 표시합니다.
 * 프로필 이미지가 없을 경우 기본 이미지(defaultProfileImage)를 사용합니다.
 * 아이콘 클릭 시 동작은 props로 전달받아 처리합니다.
 * @author 이정선
 */

interface MemberProfileProps {
  name: string;
  imageUrl?: string;
  position: MemberPosition;
  onSettingPress?: () => void; // Setting 아이콘 클릭 시 실행
  onCancelPress?: () => void; // Cancel 아이콘 클릭 시 실행
  isCurrentUserManager: boolean; // 현재 로그인된 유저가 해당 워크스페이스의 관리자인지 여부
}

export const MemberProfile: React.FC<MemberProfileProps> = ({
  name,
  imageUrl,
  position,
  onSettingPress,
  onCancelPress,
  isCurrentUserManager,
}) => {
  const displayImageUrl = imageUrl ? imageUrl : defaultProfileImage;

  const positionTextMap: Record<MemberPosition, string> = {
    member: '멤버',
    manager: '관리자',
    none: '',
  };
  const positionText = positionTextMap[position];

  const theme = useTheme();
  return (
    <Container>
      <ProfileContainer>
        <ProfileImage resizeMode="cover" source={displayImageUrl} />
        <ContentContainer>
          <MemberName>{name}</MemberName>
          {position !== 'none' && (
            <PositionTag position={position}>
              <PositionText position={position}>{positionText}</PositionText>
            </PositionTag>
          )}
        </ContentContainer>
      </ProfileContainer>
      {isCurrentUserManager && position !== 'none' && (
        <SettingIcon
          onPress={onSettingPress}
          fill={theme.colors.textSecondary}
          width={18}
          height={18}
        />
      )}
      {position === 'none' && (
        <CancelIcon
          onPress={onCancelPress}
          fill={theme.colors.textSecondary}
          width={18}
          height={18}
        />
      )}
    </Container>
  );
};

export default MemberProfile;
