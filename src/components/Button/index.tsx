import React from 'react';
import {ButtonContainer, ButtonText} from './index.style';

/**
 * variant, shape를 입력받아 다양한 형태로 만들 수 있는 버튼 컴포넌트입니다.
 * shape은 square과 round로 나뉘며 버튼의 모양을 결정합니다.
 * variant는 다음과 같습니다
 * - filled: 파란색 기본 버튼
 * - outline: 파란색 아웃라인 버튼
 * - disabled: 회색 아웃라인 버튼
 * @author 이정선
 */

export type ButtonProps = {
  onPress: () => void;
  text: string;
  variant: 'filled' | 'outline' | 'disabled';
  shape: 'square' | 'round';
};

export const Button = ({text, onPress, variant, shape}: ButtonProps) => (
  <ButtonContainer
    activeOpacity={0.9}
    variant={variant}
    shape={shape}
    onPress={onPress}>
    <ButtonText variant={variant}>{text}</ButtonText>
  </ButtonContainer>
);
