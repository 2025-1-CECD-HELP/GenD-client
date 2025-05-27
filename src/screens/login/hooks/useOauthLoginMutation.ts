import useTypeSafeNavigation from '@/hooks/useTypeSafeNavigaion';
import {afterKakaoLogin, initiateKakaoLogin} from '@/services/auth';
import {setAccessToken, setRefreshToken} from '@/utils/auth';
import {useMutation} from '@tanstack/react-query';

/**
 * 카카오 로그인 뮤테이션 훅입니다.
 * 카카오 로그인 요청을 처리합니다.
 * https://github.com/crossplatformkorea/react-native-kakao-login?tab=readme-ov-file
 * 카카오 로그인 요청 후 받은 accessToken 값으로, 백엔드에 토큰 요청합니다. 이때, 성공 시 토큰을 저장합니다.
 * @returns {object} mutate, isLoading, isError 상태 반환
 * @author 홍규진
 */
export const useKakaoLoginMutation = (fcmToken: string) => {
  const navigation = useTypeSafeNavigation();
  const mutation = useMutation({
    mutationKey: ['kakaoLogin'],
    mutationFn: () => initiateKakaoLogin(),
    onSuccess: async data => {
      // 로그인 성공 시 처리
      if (!data) {
        throw new Error('카카오 로그인 토큰이 없습니다.');
      }
      const loginResponse = await afterKakaoLogin(data, fcmToken);
      if (loginResponse) {
        // 토큰 저장
        console.log('로그인 성공! loginResponse', loginResponse);
        setAccessToken(loginResponse.jwtTokenDto.accessToken);
        console.log('accessToken', loginResponse.jwtTokenDto.accessToken);
        setRefreshToken(loginResponse.jwtTokenDto.refreshToken);
        console.log('refreshToken', loginResponse.jwtTokenDto.refreshToken);
        // 500ms 후에 워크스페이스 초기화 페이지로 이동
        setTimeout(() => {
          navigation.navigate('INIT_WORKSPACE', {});
          console.log('INIT_WORKSPACE으로 리디렉션');
        }, 500);
      }
    },
    onError: (error: Error) => {
      // 로그인 실패 시 처리
      console.error('로그인 실패:', error);
    },
  });

  return mutation;
};
