import {login} from '@react-native-seoul/kakao-login';
import {KakaoOAuthToken} from '@react-native-seoul/kakao-login';
import {privateServerInstance, publicServerInstance} from '../api/axios';
import {TGetResponse} from '../api/type';
import {
  TGetUserResponse,
  TLoginResponse,
  TUpdateUserAlarmRequest,
} from './types';
import appleAuth, {
  AppleRequestResponse,
} from '@invertase/react-native-apple-authentication';
import {} from './types';

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
): Promise<TLoginResponse | null> => {
  try {
    const response = await publicServerInstance.post<
      TGetResponse<TLoginResponse>
    >(
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

/**
 * 애플 로그인 SDK를 통해 애플 로그인 창 열기
 * @author 홍규진
 */
export const initiateAppleLogin =
  async (): Promise<AppleRequestResponse | null> => {
    try {
      // performs login request
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        // Note: it appears putting FULL_NAME first is important, see issue #293
        requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
      });

      // get current authentication state for user
      // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
      const credentialState = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse.user,
      );

      // use credentialState response to ensure the user is authenticated
      if (credentialState === appleAuth.State.AUTHORIZED) {
        // user is authenticated
        return appleAuthRequestResponse;
      }
      return null;
    } catch (err) {
      console.error('애플 로그인 에러:', err);
      return null;
    }
  };

/**
 * 애플 로그인 후 받은 토큰으로 백엔드에 요청하여 로그인 처리
 * @author 홍규진
 */
export const afterAppleLogin = async (
  token: AppleRequestResponse,
  fcmToken: string,
): Promise<TLoginResponse | null> => {
  try {
    const response = await publicServerInstance.post<
      TGetResponse<TLoginResponse>
    >(
      '/oauth/login/apple',
      {fcmToken: fcmToken},
      {headers: {Authorization: `Bearer ${token.identityToken}`}},
    );
    return response.data.data;
  } catch (err) {
    console.error('애플 로그인 에러:', err);
    return null;
  }
};

/**
 * 유저 정보 조회
 * @author 홍규진
 */
export const getUser = async (
  workspaceId: string,
): Promise<TGetUserResponse | null> => {
  const response = await privateServerInstance.get<
    TGetResponse<TGetUserResponse>
  >(`/api/v1/members/${workspaceId}/info`);
  return response.data.data;
};

/**
 * 유저 알람 설정 수정
 * @author 홍규진
 */
export const updateUserAlarm = async (request: TUpdateUserAlarmRequest) => {
  await privateServerInstance.patch<TGetResponse<void>>(
    '/api/v1/members/alarm',
    request,
  );
  return true;
};
