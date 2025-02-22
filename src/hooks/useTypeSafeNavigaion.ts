import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {TRouteParams} from '@/navigation/types';

/**
 * 타입 안정성을 확보한 네비게이션 훅입니다.
 * Navigation Prop을 NavigationProp<TRouteParams, ROUTE_NAMES> 형식으로 제한합니다.
 * 사용방법은 다음과 같습니다.
 * UX를 고려하여 Layer를 쌓아야 하는 경우엔 navigate를 사용합니다. (ex) 홈 화면에서 클릭시 워크 스페이스 화면으로 이동)
 * UX를 고려하여 Layer 자체를 변경해야 하는 경우엔 replace를 사용합니다. (ex) 회원가입 화면에서 홈 화면으로 이동)
 * @author 홍규진
 */

/**
 * 타입을 TRouteParams 타입으로 제한합니다.
 * @author 홍규진
 */
type TypeSafeNavigationProp = NativeStackNavigationProp<
  TRouteParams,
  keyof TRouteParams
>;

/**
 * 사용 방식은 다음과 같습니다.
 * const navigation = useTypeSafeNavigation();
 * navigation.navigate(ROUTE_NAMES.HOME, {});
 * @author 홍규진
 */
function useTypeSafeNavigation() {
  const navigation = useNavigation<TypeSafeNavigationProp>();
  return navigation;
}

export default useTypeSafeNavigation;
