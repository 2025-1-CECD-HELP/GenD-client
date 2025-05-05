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
import {MemberIcon, MoreIcon} from '@/assets/images/svg/home';
import {useThemeColors} from '@/contexts/theme/ThemeContext';

/**
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
