import React from 'react';
import {
  Container,
  ButtonContainer,
  WorkspaceDescription,
  WorkspaceName,
  ProfileContainer,
  ProfileImage,
} from './index.style';
import {LayoutChangeEvent} from 'react-native';
import {MemberIcon, MoreIcon} from '@assets/images/svg/home';
import {useThemeColors} from '@contexts/theme/ThemeContext';

/**
 * 홈 화면 상단의 워크스페이스 프로필 컴포넌트입니다.
 * 워크스페이스의 이름, 설명, 이미지를 표시하며,
 * 홈 화면 스크롤 제어를 위해 onLayout을 props로 받아 컴포넌트 높이를 측정합니다.
 * @author 이정선
 */

export type WorkspaceProfileProps = {
  name: string;
  description: string;
  imageUrl: string;
  onLayout: (e: LayoutChangeEvent) => void;
};

export const WorkspaceProfile = ({
  name,
  description,
  imageUrl,
  onLayout,
}: WorkspaceProfileProps) => {
  const {textPrimary} = useThemeColors();
  return (
    <Container onLayout={onLayout}>
      <ButtonContainer>
        <MemberIcon fill={textPrimary} width={21} height={21} />
        <MoreIcon fill={textPrimary} width={21} height={21} />
      </ButtonContainer>
      <ProfileContainer>
        <ProfileImage width={70} height={70} source={{uri: imageUrl}} />
        <WorkspaceName>{name}</WorkspaceName>
        <WorkspaceDescription>{description}</WorkspaceDescription>
      </ProfileContainer>
    </Container>
  );
};
