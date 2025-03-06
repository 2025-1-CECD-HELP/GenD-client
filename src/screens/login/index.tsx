import useTypeSafeNavigation from '@/hooks/useTypeSafeNavigaion';
import {View, Text, Button} from 'react-native';
import {ROUTE_NAMES} from '@constants/routes';

export const LoginScreen = () => {
  const navigation = useTypeSafeNavigation();
  return (
    <View>
      <Text>LoginScreen</Text>
      <Button
        title="LANDING"
        onPress={() => navigation.replace(ROUTE_NAMES.LANDING, {})}
      />
    </View>
  );
};
