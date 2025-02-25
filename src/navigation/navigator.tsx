import {TRouteParams} from '@/navigation/types';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AuthWrappedHomeScreen} from './AuthScreen';
import {LandingScreen} from '@/screens';

const Stack = createNativeStackNavigator<TRouteParams>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      {/* 렌딩 페이지의 Depth 가 있을 경우 초기 라우트를 설정합니다. */}
      <Stack.Navigator initialRouteName="LANDING">
        <Stack.Screen name="LANDING" component={LandingScreen} />
        <Stack.Screen name="HOME" component={AuthWrappedHomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
