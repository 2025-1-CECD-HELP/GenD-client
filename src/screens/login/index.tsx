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
import {useFCM} from '@/screens/login/hooks/useFCM';
import {useModal} from '@/contexts/modal/ModalContext';
import {WebView} from 'react-native-webview';
import {CommonModal} from '@/components';
import {
  useAppleLoginMutation,
  useKakaoLoginMutation,
} from './hooks/useOauthLoginMutation';
import {View} from 'react-native';

export const LoginScreen = () => {
  const theme = useTheme();
  const {fcmToken, requestUserPermission} = useFCM();
  const {setModalContent, setIsOpen} = useModal();
  const {mutate: kakaoLogin} = useKakaoLoginMutation(fcmToken || '');
  const {mutate: appleLogin} = useAppleLoginMutation(fcmToken || '');

  useEffect(() => {
    requestUserPermission();
  }, [requestUserPermission]);

  const handleLogin = (provider: 'kakao' | 'apple') => {
    console.log('handleLogin');
    setModalContent(
      <CommonModal
        title="GenD 이용약관"
        type="default"
        height={650}
        children={
          <View style={{flex: 1, width: '100%'}}>
            <WebView
              source={{uri: 'https://boiled-raisin-b3b.notion.site/gend'}}
              style={{
                width: '100%',
                height: 600,
              }}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              startInLoadingState={true}
              onLoadEnd={() => {
                console.log('WebView loaded successfully');
              }}
              onError={syntheticEvent => {
                const {nativeEvent} = syntheticEvent;
                console.warn('WebView error: ', nativeEvent);
              }}
            />
          </View>
        }
        onConfirm={() => {
          if (provider === 'kakao') {
            kakaoLogin();
          } else {
            appleLogin();
          }
        }}
      />,
    );
    setIsOpen(true);
  };

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
            onPress={() => handleLogin('kakao')}
            disabled={!fcmToken}>
            <KakaoIcon width={24} height={24} />
            <SocialText kakao>카카오톡으로 시작하기</SocialText>
          </SocialButton>
          <SocialButton
            activeOpacity={0.8}
            onPress={() => handleLogin('apple')}
            disabled={!fcmToken}>
            <AppleIcon width={24} height={24} />
            <SocialText>Apple로 시작하기</SocialText>
          </SocialButton>
        </BottomSection>
      </Container>
    </LinearGradient>
  );
};
