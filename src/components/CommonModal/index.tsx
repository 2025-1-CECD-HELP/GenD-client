import {useModal} from '@contexts/modal/ModalContext';
import {
  CommonModalContainer,
  ModalContent,
  Title,
  Content,
  StyledTextInput,
  ButtonContainer,
  CheckIconContainer,
  StyledButton,
} from './index.style';

import LottieView from 'lottie-react-native';

/**
 * 가장 일반적인 경우에 사용하는 모달 컴포넌트입니다.
 * 모달 컴포넌트는 모달 컨텍스트 내부에서 사용되어야 합니다.
 * 모달 타입은 다음과 같습니다.
 * - default: 기본 모달
 * - check: 체크 모달
 * - confirm: 확인 모달
 * - input: 입력 모달
 * - isCenter: 중앙 정렬 여부
 * @author 홍규진
 */

type ModalType = 'default' | 'check' | 'confirm' | 'input';

// CommonModal Props 정의
interface ICommonModalProps {
  type: ModalType;
  title: string;
  content?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  isCenter?: boolean;
}

export const CommonModal: React.FC<ICommonModalProps> = ({
  type,
  title,
  content,
  onConfirm,
  onCancel,
  isCenter,
}) => {
  const {setIsOpen} = useModal();

  // 모달 닫기 핸들러
  const handleClose = () => {
    setIsOpen(false);
    if (onCancel) onCancel();
  };

  // 확인 버튼 클릭 핸들러
  const handleConfirm = () => {
    setIsOpen(false);
    if (onConfirm) onConfirm();
  };

  return (
    <CommonModalContainer>
      <ModalContent isCenter={isCenter}>
        {type === 'check' && (
          <CheckIconContainer>
            <LottieView
              source={require('@assets/animations/check.json')}
              autoPlay
              loop={false}
              style={{width: 90, height: 90}}
            />
          </CheckIconContainer>
        )}
        <Title>{title}</Title>

        {type === 'input' ? (
          <StyledTextInput placeholder="input content" />
        ) : (
          <Content>{content}</Content>
        )}

        <ButtonContainer>
          {(type === 'default' || type === 'input') && (
            <StyledButton onPress={handleClose} title="취소" />
          )}
          <StyledButton onPress={handleConfirm} title="확인" />
        </ButtonContainer>
      </ModalContent>
    </CommonModalContainer>
  );
};

export default CommonModal;
