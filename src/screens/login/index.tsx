import React from 'react';
import {KakaoIcon, AppleIcon} from '@/assets/images/svg/login';
import {LogoIcon} from '@/assets/images/svg/common/index';
import {
  Container,
  TopSection,
  Slogan,
  GenDBold,
  BottomSection,
  SocialButton,
  SocialText,
} from './indes.style';
import LinearGradient from 'react-native-linear-gradient';
import {useTheme} from '@emotion/react';

export const LoginScreen = () => {
  const theme = useTheme();
  return (
    <LinearGradient
      colors={theme.colors.backgroundGradient}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      // eslint-disable-next-line react-native/no-inline-styles
      style={{flex: 1}}>
      <Container>
        <TopSection>
          <Slogan>
            단체라면 누구나!{'\n'}
            효율적인 문서 자동화 워크스페이스, <GenDBold>GenD</GenDBold>
          </Slogan>
          <LogoIcon width={100} height={100} />
        </TopSection>
        <BottomSection>
          <SocialButton kakao activeOpacity={0.8}>
            <KakaoIcon width={24} height={24} />
            <SocialText kakao>카카오톡으로 시작하기</SocialText>
          </SocialButton>
          <SocialButton activeOpacity={0.8}>
            <AppleIcon width={24} height={24} />
            <SocialText>Apple로 시작하기</SocialText>
          </SocialButton>
        </BottomSection>
      </Container>
    </LinearGradient>
  );
};
