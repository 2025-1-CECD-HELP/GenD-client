import React from 'react';
import {
  Container,
  Title,
  SubmitButton,
  ButtonText,
  Side,
  TitleContainer,
} from './index.style';
import {ArrowIcon} from '@/assets/images/svg/common';
import {useThemeColors} from '@/contexts/theme/ThemeContext';

interface TopBarProps {
  title: string;
  showBackButton?: boolean;
  showSubmitButton?: boolean;
  onPressSubmit?: () => void;
  submitButtonLabel?: string;
  onPressBack?: () => void;
}

/**
 * TopBar 컴포넌트입니다.
 * 뒤로가기 버튼과 등록 버튼의 여부를 Props로 받아 처리합니다.
 * 뒤로가기 버튼을 눌렀을 때, onPressBack 함수를 호출합니다.( 단순히 navigation.goBack()은 네비게이터 스택의 기본적인 룰을 위배하는 동작이므로 사용하지 않음)
 * @author 이정선, 홍규진
 */
export const TopBar = ({
  title,
  showBackButton = false,
  showSubmitButton = false,
  onPressBack,
  onPressSubmit,
  submitButtonLabel = '등록',
}: TopBarProps) => {
  const {textPrimary} = useThemeColors();

  const handleGoBack = () => {
    if (onPressBack) {
      onPressBack();
    }
  };

  return (
    <Container>
      <Side>
        {showBackButton && (
          <ArrowIcon
            width={23}
            height={23}
            onPress={handleGoBack}
            fill={textPrimary}
          />
        )}
      </Side>
      <TitleContainer>
        <Title>{title}</Title>
      </TitleContainer>
      <Side>
        {showSubmitButton && (
          <SubmitButton onPress={onPressSubmit}>
            <ButtonText>{submitButtonLabel}</ButtonText>
          </SubmitButton>
        )}
      </Side>
    </Container>
  );
};
