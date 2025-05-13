/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {initializeApp} from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';

// Firebase 초기화
initializeApp();

// 포그라운드 메시지 핸들러
messaging().onMessage(async remoteMessage => {
  console.log('Received foreground notification:', remoteMessage);
});

// 백그라운드 메시지 핸들러
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Received background notification:', remoteMessage);
});

AppRegistry.registerComponent(appName, () => App);
