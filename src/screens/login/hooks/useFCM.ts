import {useCallback, useEffect, useState} from 'react';
import messaging from '@react-native-firebase/messaging';
import {useSetAtom} from 'jotai';
import {alertState} from '@/atoms/alert';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';

/**
 * FCM 관련 기능을 제공하는 커스텀 훅
 * @returns {object} FCM 토큰과 권한 요청 함수
 * @author 홍규진
 */
export const useFCM = () => {
  const [fcmToken, setFcmToken] = useState<string | null>(null);
  const setAlerts = useSetAtom(alertState);

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
        console.log('FCM 권한 승인됨, 토큰:', token);
      }
    } catch (error) {
      console.error('FCM Permission Error:', error);
    }
  }, []);

  useEffect(() => {
    // 포그라운드 메시지 핸들러
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('포그라운드 메시지 수신:', remoteMessage);
      if (remoteMessage.notification) {
        const newAlert = {
          id: Date.now().toString(),
          title: remoteMessage.notification.title || '새로운 알림',
          content: remoteMessage.notification.body || '',
          timestamp: Date.now(),
          isRead: false,
        };
        setAlerts(prev => [newAlert, ...prev]);

        Alert.alert(
          remoteMessage.notification.title || '새로운 알림',
          remoteMessage.notification.body,
        );
      }
    });

    // 백그라운드 메시지 핸들러
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('백그라운드 메시지 수신:', remoteMessage);
      if (remoteMessage.notification) {
        const newAlert = {
          id: Date.now().toString(),
          title: remoteMessage.notification.title || '새로운 알림',
          content: remoteMessage.notification.body || '',
          timestamp: Date.now(),
          isRead: false,
        };
        // AsyncStorage를 사용하여 알림 저장
        try {
          const existingAlerts = await AsyncStorage.getItem('alerts');
          const alerts = existingAlerts ? JSON.parse(existingAlerts) : [];
          await AsyncStorage.setItem(
            'alerts',
            JSON.stringify([newAlert, ...alerts]),
          );
        } catch (error) {
          console.error('알림 저장 실패:', error);
        }
      }
    });

    // 앱이 종료된 상태에서 알림을 탭했을 때 처리
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log('종료 상태 알림 탭:', remoteMessage);
          if (remoteMessage.notification) {
            const newAlert = {
              id: Date.now().toString(),
              title: remoteMessage.notification.title || '새로운 알림',
              content: remoteMessage.notification.body || '',
              timestamp: Date.now(),
              isRead: false,
            };
            setAlerts(prev => [newAlert, ...prev]);
          }
        }
      });

    // 앱 시작 시 저장된 알림 로드
    const loadSavedAlerts = async () => {
      try {
        const savedAlerts = await AsyncStorage.getItem('alerts');
        if (savedAlerts) {
          const alerts = JSON.parse(savedAlerts);
          setAlerts(alerts);
          // 로드 후 저장소 비우기
          await AsyncStorage.removeItem('alerts');
        }
      } catch (error) {
        console.error('저장된 알림 로드 실패:', error);
      }
    };

    loadSavedAlerts();

    return unsubscribe;
  }, [setAlerts]);

  return {
    fcmToken,
    requestUserPermission,
  };
};
