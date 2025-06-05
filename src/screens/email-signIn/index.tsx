import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {useTheme} from '@emotion/react';
import {
  Container,
  Title,
  Input,
  Button,
  ButtonText,
  TopSection,
  BottomSection,
  Slogan,
  GenDBold,
  SwitchButton,
  SwitchButtonText,
  SocialButton,
  SocialButtonText,
} from './index.style';
import {TRouteParams} from '@/navigation/types';
import {RouteProp, useRoute} from '@react-navigation/native';
import {LogoIcon} from '@/assets/images/svg/common';
import useTypeSafeNavigation from '@/hooks/useTypeSafeNavigaion';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {useEmailSignin} from './hooks/useEmailSignin';

export const EmailSignInScreen = () => {
  const theme = useTheme();
  const navigation = useTypeSafeNavigation();
  const {mode} = useRoute<RouteProp<TRouteParams, 'EMAIL_SIGN_IN'>>().params;
  const {email, setEmail, password, setPassword, name, setName, handleSubmit} =
    useEmailSignin(mode);
  const handleSwitchMode = () => {
    navigation.setParams({mode: mode === 'login' ? 'signup' : 'login'});
  };

  const handleGoSocial = () => {
    navigation.navigate('LOGIN', {});
  };

  return (
    <LinearGradient
      colors={theme.colors.backgroundGradient}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={{flex: 1}}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={{flexGrow: 1, paddingBottom: 32}}
            keyboardShouldPersistTaps="handled">
            <Container>
              <TopSection>
                <Slogan>
                  단체라면 누구나!{'\n'}
                  효율적인 문서 자동화 워크스페이스, <GenDBold>GenD</GenDBold>
                </Slogan>
                <LogoIcon width={100} height={100} />
              </TopSection>
              <TopSection>
                <Title>
                  {mode === 'login' ? 'E-mail 로그인' : 'E-mail 회원가입'}
                </Title>
              </TopSection>
              <BottomSection>
                {mode === 'login' ? null : (
                  <Input
                    placeholder="Name"
                    value={name}
                    onChangeText={setName}
                    placeholderTextColor={theme.colors.textDisabled}
                  />
                )}
                <Input
                  placeholder="E-mail"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  placeholderTextColor={theme.colors.textDisabled}
                />
                <Input
                  placeholder="Password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  placeholderTextColor={theme.colors.textDisabled}
                />
                <Button onPress={handleSubmit}>
                  <ButtonText>
                    {mode === 'login' ? '로그인' : '회원가입'}
                  </ButtonText>
                </Button>
                <SwitchButton onPress={handleSwitchMode}>
                  <SwitchButtonText>
                    {mode === 'login'
                      ? '아직 회원이 아니신가요? 회원가입'
                      : '이미 계정이 있으신가요? 로그인'}
                  </SwitchButtonText>
                </SwitchButton>
                {mode === 'signup' && (
                  <SocialButton onPress={handleGoSocial}>
                    <SocialButtonText>소셜 로그인 하러가기</SocialButtonText>
                  </SocialButton>
                )}
              </BottomSection>
            </Container>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};
