import React from 'react';
import {
  Container,
  Title,
  SubTitle,
  Card,
  CardImage,
  CardText,
} from './index.style';

import makeWorkspaceImg from '@/assets/images/png/workspace/make_workspace.png';
import enterWorkspaceImg from '@/assets/images/png/workspace/enter_workspace.png';
import LinearGradient from 'react-native-linear-gradient';
import {useTheme} from '@/contexts/theme/ThemeContext';
import {GenDLogoIcon} from '@/assets/images/svg/common';
import useTypeSafeNavigation from '@/hooks/useTypeSafeNavigaion';
import {useWorkspaceBottomSheet} from '@/hooks/useWorkspaceBottomSheet';

export const InitWorkspaceScreen = () => {
  const theme = useTheme();
  const {handleOpenBottomSheet} = useWorkspaceBottomSheet();
  const navigation = useTypeSafeNavigation();

  return (
    <LinearGradient
      colors={theme.colors.backgroundGradient}
      start={{x: 0, y: 0}}
      end={{x: 1.5, y: 1}}
      style={{flex: 1}}>
      <Container>
        <Title>단체라면 누구나!</Title>
        <SubTitle>효율적인 문서 자동화 워크스페이스</SubTitle>
        <GenDLogoIcon width={100} height={100} />
        <Card onPress={() => navigation.navigate('CREATE_WORKSPACE', {})}>
          <CardImage source={makeWorkspaceImg} />
          <CardText>새 워크스페이스 생성하기</CardText>
        </Card>
        <Card onPress={handleOpenBottomSheet}>
          <CardImage source={enterWorkspaceImg} />
          <CardText>기존 워크스페이스 입장하기</CardText>
        </Card>
      </Container>
    </LinearGradient>
  );
};
