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
import useTypeSafeNavigation from '@/hooks/useTypeSafeNavigaion';

interface TopBarProps {
  title: string;
  showBackButton?: boolean;
  showSubmitButton?: boolean;
  onPressSubmit?: () => void;
  submitButtonLabel?: string;
}

/**
 * TopBar 컴포넌트입니다.
 * 뒤로가기 버튼과 등록 버튼의 여부를 Props로 받아 처리합니다.
 * @author 이정선
 */
export const TopBar = ({
  title,
  showBackButton = false,
  showSubmitButton = false,
  onPressSubmit,
  submitButtonLabel = '등록',
}: TopBarProps) => {
  const {textPrimary} = useThemeColors();
  const navigation = useTypeSafeNavigation();

  const handleGoBack = () => {
    navigation.goBack();
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
