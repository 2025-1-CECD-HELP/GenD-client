import {View, Text, Button} from 'react-native';
import useTypeSafeNavigation from '@/hooks/useTypeSafeNavigaion';
import {ROUTE_NAMES} from '@constants/routes';
/**
 * 홈 페이지입니다.
 * @author 홍규진
 */
export const HomeScreen = () => {
  const navigation = useTypeSafeNavigation();
  return (
    <View>
      <Text>HomeScreen</Text>
      <Button
        title="Landing"
        onPress={() => navigation.replace(ROUTE_NAMES.LANDING)}
      />
    </View>
  );
};
