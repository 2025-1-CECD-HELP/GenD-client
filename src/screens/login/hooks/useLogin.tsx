import {useEffect} from 'react';
import {useTheme} from '@emotion/react';
import {useFCM} from '@/screens/login/hooks/useFCM';
import {
  useAppleLoginMutation,
  useKakaoLoginMutation,
} from './useOauthLoginMutation';
import useTypeSafeNavigation from '@/hooks/useTypeSafeNavigaion';

export const useLogin = () => {
  const theme = useTheme();
  const {fcmToken, requestUserPermission} = useFCM();
  const {mutate: kakaoLogin} = useKakaoLoginMutation(fcmToken || '');
  const {mutate: appleLogin} = useAppleLoginMutation(fcmToken || '');
  const navigation = useTypeSafeNavigation();

  useEffect(() => {
    requestUserPermission();
  }, [requestUserPermission]);

  const goToEmailLogin = () => {
    navigation.navigate('EMAIL_SIGN_IN', {mode: 'login'});
  };

  return {
    theme,
    fcmToken,
    kakaoLogin,
    appleLogin,
    goToEmailLogin,
  };
};
