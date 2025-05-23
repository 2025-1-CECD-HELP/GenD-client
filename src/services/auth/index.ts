import {login} from '@react-native-seoul/kakao-login';
import {KakaoOAuthToken} from '@react-native-seoul/kakao-login';
import {publicServerInstance} from '../api/axios';
import {TGetResponse} from '../api/type';
import {TGetLoginResponse} from './types';
/**
 * 소셜 로그인 링크 열기
 * @author 홍규진
 */

/**
 * 카카오 로그인 SDK를 통해 카카오 로그인 창 열기
 * @author 홍규진
 */
export const initiateKakaoLogin = async (): Promise<KakaoOAuthToken | null> => {
  try {
    const token = await login();
    if (!token) {
      throw new Error('카카오 로그인 토큰이 없습니다.');
    }
    return token;
  } catch (err) {
    console.error('카카오 로그인 에러:', err);
    return null;
  }
};

/**
 * 카카오 로그인 후 받은 토큰으로 백엔드에 요청하여 로그인 처리
 * @author 홍규진
 */
export const afterKakaoLogin = async (
  token: KakaoOAuthToken,
  fcmToken: string,
): Promise<TGetLoginResponse | null> => {
  try {
    const response = await publicServerInstance.post<TGetResponse<TGetLoginResponse>>(
      '/oauth/login/kakao',
      {fcmToken: fcmToken},
      {headers: {Authorization: `Bearer ${token.accessToken}`}},
    );
    return response.data.data;
  } catch (err) {
    console.error('카카오 로그인 에러:', err);
    return null;
  }
};
