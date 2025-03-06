/**
 * 모든 화면 컴포넌트를 모아두는 파일입니다.
 * 외부에서 import 시에, 깔끔하게 사용할 수 있도록 합니다.
 * before) import {HomeScreen} from '@screens/home/index';
 *         import {LandingScreen} from '@screens/landing/index';
 
 * after) import {HomeScreen, LandingScreen} from '@screens/index';
 * @author 홍규진
 */
export * from './home';
export * from './landing';
export * from './login';
