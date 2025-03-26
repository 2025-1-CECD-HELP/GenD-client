import React from 'react';
import {ButtonContainer, ButtonText} from './index.style';

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
