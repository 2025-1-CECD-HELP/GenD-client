/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {initializeApp} from '@react-native-firebase/app';

// Firebase 초기화
initializeApp();

AppRegistry.registerComponent(appName, () => App);
