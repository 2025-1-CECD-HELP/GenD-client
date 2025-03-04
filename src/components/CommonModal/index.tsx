import {Text, Button} from 'react-native';
import {useModal} from '@contexts/modal/ModalContext';
import {CommonModalContainer} from './index.style.ts';

/**
 * 가장 일반적인 경우에 사용하는 모달 컴포넌트입니다.
 * 모달 컴포넌트는 모달 컨텍스트 내부에서 사용되어야 합니다.
 * 추후에 디자인이 확정되면, 이를 수정해야합니다.
 * @author 홍규진
 */

//TODO-[규진] 모달 컴포넌트 디자인 확정 후, 수정해야합니다.

export const CommonModal = () => {
  const {setIsOpen} = useModal();

  return (
    <CommonModalContainer>
      <Text>CommonModal</Text>
      <Button
        title="Close"
        onPress={() => {
          setIsOpen(false);
        }}
      />
    </CommonModalContainer>
  );
};
