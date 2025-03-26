import {View, Text, Button} from 'react-native';
import useTypeSafeNavigation from '@/hooks/useTypeSafeNavigaion';
import {ROUTE_NAMES} from '@constants/routes';
import {useModal} from '@/contexts/modal/ModalContext';
import CommonModal from '@/components/CommonModal';
/**
 * 홈 페이지입니다.
 * @author 홍규진
 */
export const HomeScreen = () => {
  const navigation = useTypeSafeNavigation();
  const {isOpen, setIsOpen, setModalContent} = useModal();

  function handlePressOpenModal() {
    setIsOpen(true);
    setModalContent(
      <CommonModal
        type="check"
        title="Title"
        content="Content"
        isCenter={true}
        key={isOpen ? 'open' : 'close'}
      />,
    );
  }
  return (
    <View>
      <Text>HomeScreen</Text>
      <Button
        title="LANDING"
        onPress={() => navigation.replace(ROUTE_NAMES.LANDING, {})}
      />
      <Button title="OPEN MODAL" onPress={handlePressOpenModal} />
    </View>
  );
};
