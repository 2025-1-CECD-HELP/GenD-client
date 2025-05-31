import React from 'react';
import {
  Container,
  ProfileContainer,
  ContentContainer,
  MemberName,
  ProfileImage,
  ProviderIcon,
  MemberEmail,
} from './index.style';
import defaultProfileImage from '@/assets/images/png/defaultProfile.png';
import {TGetUserResponse} from '@/services/auth/types';
import KakaoIcon from '@/assets/images/svg/login/kakao.svg';
import AppleIcon from '@/assets/images/svg/login/apple.svg';

/**
 * 멤버 페이지 혹은 멤버 추가 모달에 보여지는 멤버 프로필 컴포넌트입니다.
 * -> 멤버 페이지: 프로필 이미지, 이름, 로그인 프로바이더 아이콘을 표시합니다.
 * -> 멤버 추가 모달: 프로필 이미지, 이름, 로그인 프로바이더 아이콘을 표시합니다.
 * 프로필 이미지가 없을 경우 기본 이미지(defaultProfileImage)를 사용합니다.
 * @author 이정선, 홍규진
 */

export const MemberProfile: React.FC<{
  member: TGetUserResponse;
}> = ({member}) => {
  const displayImageUrl = defaultProfileImage;

  const renderProviderIcon = () => {
    switch (member.loginProvider) {
      case 'KAKAO':
        return <KakaoIcon width={16} height={16} />;
      case 'APPLE':
        return <AppleIcon width={16} height={16} />;
      default:
        return null;
    }
  };

  return (
    <Container>
      <ProfileContainer>
        <ProfileImage resizeMode="cover" source={displayImageUrl} />
        <ContentContainer>
          <MemberName>{member.memberName || '이름 없음'}</MemberName>
          <MemberEmail>{member.memberEmail || '이메일 없음'}</MemberEmail>
          <ProviderIcon>{renderProviderIcon()}</ProviderIcon>
        </ContentContainer>
      </ProfileContainer>
    </Container>
  );
};

export default MemberProfile;
