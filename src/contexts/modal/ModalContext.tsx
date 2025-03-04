import {createContext, useContext, useState} from 'react';
import {Modal} from 'react-native';
/**
 * 모달 컴포넌트를 위한 컨텍스트
 * 모달 컴포넌트는 모달 컨텍스트 내부에서 사용되어야 합니다.
 * Context API를 활용하여 전역적으로 모달 컴포넌트를 사용할 수 있도록 합니다.
 * react-native-modal 라이브러리를 사용하여 모달 컴포넌트를 구현합니다.
 * 대다수의 modal component 는 CommonModal 을 통해 구현하도록 노력합니다.
 * @author 홍규진
 */
type ModalContextType = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  modalContent: React.ReactNode | null; // 모달에 렌더링할 콘텐츠
  setModalContent: (content: React.ReactNode | null) => void; // 콘텐츠 설정 함수
};

const ModalContext = createContext<ModalContextType>({
  isOpen: false,
  setIsOpen: () => {},
  modalContent: null,
  setModalContent: () => {},
});

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

export const ModalProvider = ({children}: {children: React.ReactNode}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode | null>(
    null,
  );

  return (
    <ModalContext.Provider
      value={{isOpen, setIsOpen, modalContent, setModalContent}}>
      {children}
      <Modal visible={isOpen}>{modalContent}</Modal>
    </ModalContext.Provider>
  );
};
