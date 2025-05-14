import {useCallback, useState} from 'react';
import messaging from '@react-native-firebase/messaging';

/**
 * FCM 관련 기능을 제공하는 커스텀 훅
 * @returns {object} FCM 토큰과 권한 요청 함수
 * @author 홍규진
 */
export const useFCM = () => {
  const [fcmToken, setFcmToken] = useState<string | null>(null);

  /**
   * FCM 권한 요청 및 토큰 가져오기
   */
  const requestUserPermission = useCallback(async () => {
    try {
      const authorizationStatus = await messaging().requestPermission();
      const enabled =
        authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        await messaging().registerDeviceForRemoteMessages();
        const token = await messaging().getToken();
        setFcmToken(token);
      }
    } catch (error) {
      console.error('FCM Permission Error:', error);
    }
  }, []);

  return {
    fcmToken,
    requestUserPermission,
  };
};
