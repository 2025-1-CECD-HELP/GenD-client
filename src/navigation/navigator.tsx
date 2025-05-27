/* eslint-disable react/no-unstable-nested-components */
import {TRouteParams} from '@/navigation/types';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import BottomNavigator from '@/components/BottomNavigator';
import {
  FileScreen,
  CalendarScreen,
  MypageScreen,
  MeetingScreen,
  WriteScreen,
  PostDetailScreen,
  MemberScreen,
  LoginScreen,
  CreateWorkspaceScreen,
} from '@/screens';
import {Header} from '@/components/Header';
import {RecordingScreen} from '@/screens/recording';
import {InitWorkspaceScreen} from '@/screens/init-workspace';
import SecretaryScreen from '@/screens/secretary';
import {ChatProvider} from '@/screens/secretary/contexts/ChatContext';
import {AuthWrappedHomeScreen} from './AuthScreen';
import {createNavigationContainerRef} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export function navigate(name: string, params?: any) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

export function replace(name: string, params?: any) {
  if (navigationRef.isReady()) {
    navigationRef.reset({
      index: 0,
      routes: [{name, params}],
    });
  }
}

export function goBack() {
  if (navigationRef.isReady() && navigationRef.canGoBack()) {
    navigationRef.goBack();
  }
}

const Stack = createNativeStackNavigator<TRouteParams>();
const Tab = createBottomTabNavigator<TRouteParams>();

/**
 * 라우트 네비게이터입니다.
 * 인증이 필요한 화면은 AuthWrapper로 래핑후, AuthWrapped~~로 명명합니다.
 * @author 홍규진
 */
export default function AppNavigator() {
  return (
    <NavigationContainer ref={navigationRef}>
      {/* 렌딩 페이지의 Depth 가 있을 경우 초기 라우트를 설정합니다. */}
      <Stack.Navigator
        initialRouteName="INIT_WORKSPACE"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="LANDING" component={TabNavigator} />
        <Stack.Screen
          name="WRITE"
          component={WriteScreen}
          options={{headerShown: true, header: () => <Header />}}
        />
        <Stack.Screen
          name="POST_DETAIL"
          component={PostDetailScreen}
          options={{headerShown: true, header: () => <Header />}}
        />
        <Stack.Screen name="RECORDING" component={RecordingNavigator} />
        <Stack.Screen name="MEMBER" component={MemberNavigator} />
        <Stack.Screen
          name="INIT_WORKSPACE"
          component={WorkspaceNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="LOGIN"
          component={LoginNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SECRETARY"
          component={SecretaryNavigator}
          options={{headerShown: true, header: () => <Header />}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

/**
 * 바텀 탭 네비게이터입니다.
 * 메인 탭으로 사용할 화면들을 여기에 배치합니다.
 * 현재는 home, file, meeting ,calendar, mypage 탭이 있습니다.
 * 해당 페이지는 워크스페이스 정보가 없으면 INIT_WORKSPACE로 이동합니다.
 * @author 홍규진
 */
function TabNavigator() {
  return (
    <Tab.Navigator
      tabBar={props => <BottomNavigator {...props} />}
      screenOptions={{headerShown: true, header: () => <Header />}}>
      <Tab.Screen name="HOME" component={AuthWrappedHomeScreen} />
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

/**
 * 녹음 페이지의 네비게이터입니다.
 * 녹음 페이지는 템플릿 선택 후 회의록 작성 페이지로 이동합니다.
 * @author 홍규진
 */
function RecordingNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: true, header: () => <Header />}}>
      <Stack.Screen name="RECORDING" component={RecordingScreen} />
    </Stack.Navigator>
  );
}

/**
 * 멤버 페이지의 네비게이터입니다.
 * 멤버 페이지는 워크스페이스 멤버 목록을 조회합니다.
 * @author 홍규진
 */
function MemberNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: true, header: () => <Header />}}>
      <Stack.Screen name="MEMBER" component={MemberScreen} />
    </Stack.Navigator>
  );
}

/**
 * 워크스페이스 페이지의 네비게이터입니다.
 * 워크스페이스 페이지는 워크스페이스 생성 및 입장 페이지를 조회합니다.
 * @author 홍규진
 */
function WorkspaceNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="INIT_WORKSPACE" component={InitWorkspaceScreen} />
      <Stack.Screen name="CREATE_WORKSPACE" component={CreateWorkspaceScreen} />
    </Stack.Navigator>
  );
}

/**
 * 로그인 페이지의 네비게이터입니다.
 * 로그인 페이지는 로그인 페이지를 조회합니다.
 * @author 홍규진
 */
function LoginNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="LOGIN" component={LoginScreen} />
    </Stack.Navigator>
  );
}

/**
 * 비서 페이지의 네비게이터입니다.
 * 비서 페이지는 비서 페이지를 조회합니다.
 * @author 홍규진
 */
function SecretaryNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="SECRETARY"
        component={() => (
          <ChatProvider>
            <SecretaryScreen />
          </ChatProvider>
        )}
      />
    </Stack.Navigator>
  );
}
