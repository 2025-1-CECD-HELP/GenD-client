import React from 'react';
import {KakaoIcon, AppleIcon, EmailIcon} from '@/assets/images/svg/login';
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
import {useLogin} from './hooks/useLogin';

export const LoginScreen = () => {
  const theme = useTheme();
  const {fcmToken, kakaoLogin, appleLogin, goToEmailLogin} = useLogin();

  return (
    <LinearGradient
      colors={theme.colors.backgroundGradient}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
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
          <SocialButton
            provider="kakao"
            activeOpacity={0.8}
            onPress={() => kakaoLogin()}
            disabled={!fcmToken}>
            <KakaoIcon width={24} height={24} />
            <SocialText provider="kakao">카카오톡으로 시작하기</SocialText>
          </SocialButton>
          <SocialButton
            provider="apple"
            activeOpacity={0.8}
            onPress={() => appleLogin()}
            disabled={!fcmToken}>
            <AppleIcon width={24} height={24} />
            <SocialText provider="apple">Apple로 시작하기</SocialText>
          </SocialButton>
          <SocialButton activeOpacity={0.8} onPress={goToEmailLogin}>
            <EmailIcon
              width={20}
              height={20}
              fill={theme.colors.white}
              stroke={theme.colors.white}
            />
            <SocialText provider="email">이메일로 로그인하기</SocialText>
          </SocialButton>
        </BottomSection>
      </Container>
    </LinearGradient>
  );
};
