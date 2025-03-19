import {TRouteParams} from '@/navigation/types';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import BottomNavigator from '@/components/BottomNavigator';
import {
  HomeScreen,
  FileScreen,
  CalendarScreen,
  MypageScreen,
  MeetingScreen,
} from '@/screens';
const Stack = createNativeStackNavigator<TRouteParams>();
const Tab = createBottomTabNavigator<TRouteParams>();

/**
 * 라우트 네비게이터입니다.
 * 인증이 필요한 화면은 AuthWrapper로 래핑후, AuthWrapped~~로 명명합니다.
 * @author 홍규진
 */
export default function AppNavigator() {
  return (
    <NavigationContainer>
      {/* 렌딩 페이지의 Depth 가 있을 경우 초기 라우트를 설정합니다. */}
      <Stack.Navigator
        initialRouteName="LANDING"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="LANDING" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

/**
 * 바텀 탭 네비게이터입니다.
 * 메인 탭으로 사용할 화면들을 여기에 배치합니다.
 * 현재는 home, file, meeting ,calendar, mypage 탭이 있습니다.
 * @author 홍규진
 */
function TabNavigator() {
  return (
    <Tab.Navigator
      tabBar={props => <BottomNavigator {...props} />}
      screenOptions={{headerShown: true}}>
      <Tab.Screen name="HOME" component={HomeScreen} />
      <Tab.Screen name="FILE" component={FileScreen} />
      <Tab.Screen
        name="MEETING"
        component={MeetingScreen}
        options={{
          tabBarButton: () => null, // 가운데 탭 버튼을 표시하지 않음
        }}
      />
      <Tab.Screen name="CALENDAR" component={CalendarScreen} />
      <Tab.Screen name="MYPAGE" component={MypageScreen} />
    </Tab.Navigator>
  );
}
