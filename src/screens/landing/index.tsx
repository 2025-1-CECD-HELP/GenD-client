import {View, Text, Button} from 'react-native';
import useTypeSafeNavigation from '@/hooks/useTypeSafeNavigaion';
import {ROUTE_NAMES} from '@constants/routes';
/**
 * 렌딩 페이지입니다. 초기 라우트로 사용됩니다.
 * @author 홍규진
 */
export const LandingScreen = () => {
  const navigation = useTypeSafeNavigation();
  return (
    <View>
      <Text>LandingScreen</Text>
      <Button
        title="Home"
        onPress={() => navigation.replace(ROUTE_NAMES.HOME)}
      />
    </View>
  );
};
