import {useModal} from '@contexts/modal/ModalContext';
import {Button} from '../Button';
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
import {useThemeColors} from '@/contexts/theme/ThemeContext';

import LottieView from 'lottie-react-native';
import React from 'react';

/**
 * 가장 일반적인 경우에 사용하는 모달 컴포넌트입니다.
 * 모달 컴포넌트는 모달 컨텍스트 내부에서 사용되어야 합니다.
 * 모달 내부의 버튼은 공통 Button 컴포넌트로 구현하였습니다.
 * 모달 타입은 다음과 같습니다.
 * - default: 기본 모달
 * - check: 체크 모달
 * - confirm: 확인 모달
 * - input: 입력 모달
 * - isCenter: 중앙 정렬 여부
 * @author 홍규진, 이정선
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
  children?: React.ReactNode;
}

export const CommonModal: React.FC<ICommonModalProps> = ({
  type,
  title,
  content,
  onConfirm,
  onCancel,
  isCenter,
  children,
}) => {
  const {setModalContent, setIsOpen} = useModal();
  const {textDisabled} = useThemeColors();
  // 모달 닫기 핸들러
  const handleClose = () => {
    setModalContent(null);
    setIsOpen(false);
    if (onCancel) onCancel();
  };

  // 확인 버튼 클릭 핸들러
  const handleConfirm = () => {
    setModalContent(null);
    setIsOpen(false);
    if (onConfirm) onConfirm();
  };

  // 버튼 타입(double, single)
  const buttonType =
    type === 'default' || type === 'input' ? 'double' : 'single';

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

        {/* children이 있으면 children, 아니면 기존 content 렌더 */}
        {children ? (
          children
        ) : type === 'input' ? (
          <StyledTextInput placeholder="input content" />
        ) : (
          <Content>{content}</Content>
        )}

        <ButtonContainer buttonType={buttonType}>
          {(type === 'default' || type === 'input') && (
            <StyledButton>
              <Button
                onPress={handleClose}
                text="취소"
                shape="square"
                variant="disabled"
              />
            </StyledButton>
          )}
          <StyledButton buttonType={buttonType}>
            <Button
              onPress={handleConfirm}
              text="확인"
              shape="square"
              variant="filled"
            />
          </StyledButton>
        </ButtonContainer>
      </ModalContent>
    </CommonModalContainer>
  );
};

export default CommonModal;
