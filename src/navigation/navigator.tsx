import {TRouteParams} from '@/navigation/types';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AuthWrappedHomeScreen} from './AuthScreen';
import {LandingScreen, LoginScreen} from '@/screens';

const Stack = createNativeStackNavigator<TRouteParams>();

/**
 * 라우트 네비게이터입니다.
 * 인증이 필요한 화면은 AuthWrapper로 래핑후, AuthWrapped~~로 명명합니다.
 * @author 홍규진
 */
export default function AppNavigator() {
  return (
    <NavigationContainer>
      {/* 렌딩 페이지의 Depth 가 있을 경우 초기 라우트를 설정합니다. */}
      <Stack.Navigator initialRouteName="LANDING">
        <Stack.Screen name="LANDING" component={LandingScreen} />
        <Stack.Screen name="HOME" component={AuthWrappedHomeScreen} />
        <Stack.Screen name="LOGIN" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
