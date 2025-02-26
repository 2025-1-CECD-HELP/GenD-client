import {HomeScreen} from '@/screens';
import {AuthWrapper} from './AuthWrapper';

/**
 * 인증이 필요한 화면들은 AuthWrapper로 래핑합니다.
 * 인증이 필요한 화면은 isAuthNeed를 true로 설정합니다.
 * 인증이 필요하지 않은 화면은 이곳에서 따로 정의하지 않습니다.
 * @author 홍규진
 */
export const AuthWrappedHomeScreen = () => (
  <AuthWrapper component={HomeScreen} isAuthNeed={true} />
);
