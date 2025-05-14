import React, {useEffect} from 'react';
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
import {useKakaoLoginMutation} from './hooks/useOauthLoginMutation';
import {useFCM} from '@/screens/login/hooks/useFCM';

export const LoginScreen = () => {
  const theme = useTheme();
  const {fcmToken, requestUserPermission} = useFCM();
  const {mutate: kakaoLogin, isPending} = useKakaoLoginMutation(fcmToken || '');

  useEffect(() => {
    requestUserPermission();
  }, [requestUserPermission]);

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
            kakao
            activeOpacity={0.8}
            onPress={() => kakaoLogin()}
            disabled={isPending || !fcmToken}>
            <KakaoIcon width={24} height={24} />
            <SocialText kakao>
              {isPending ? '로그인 중...' : '카카오톡으로 시작하기'}
            </SocialText>
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
