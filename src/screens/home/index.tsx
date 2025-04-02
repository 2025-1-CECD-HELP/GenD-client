import {View, Text, Button} from 'react-native';
import useTypeSafeNavigation from '@/hooks/useTypeSafeNavigaion';
import {ROUTE_NAMES} from '@constants/routes';
import {useModal} from '@/contexts/modal/ModalContext';
import CommonModal from '@/components/CommonModal';
import {useBottomSheet} from '@contexts/bottomSheet/BottomSheetContext';
/**
 * 홈 페이지입니다.
 * @author 홍규진
 */
export const HomeScreen = () => {
  const navigation = useTypeSafeNavigation();
  const {isOpen, setIsOpen, setModalContent} = useModal();
  const {openBottomSheet} = useBottomSheet();

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

  function handlePressOpenBottomSheet() {
    openBottomSheet(
      <>
        <Button title="Where Are you BottomSheet" />
        <Button title="Where Are you BottomSheet" />
        <Button title="Where Are you BottomSheet" />
        <Button title="Where Are you BottomSheet" />
        <Button title="Where Are you BottomSheet" />
        <Button title="Where Are you BottomSheet" />
      </>,
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
      <Button title="OPEN BOTTOM SHEET" onPress={handlePressOpenBottomSheet} />
    </View>
  );
};
