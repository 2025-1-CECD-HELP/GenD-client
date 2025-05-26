// src/components/OptionsBox/index.tsx
import React from 'react';
import {
  Container,
  OptionItem,
  OptionText,
  Divider,
  Wrapper,
} from './index.style';

export type Option = {
  label: string;
  onPress: () => void;
  color?: string;
};

type OptionsBoxProps = {
  visible: boolean;
  onClose: () => void;
  options: Option[];
  position: {x: number; y: number; width: number; height: number};
};

export const OptionsBox = ({
  visible,
  onClose,
  options,
  position,
}: OptionsBoxProps) => {
  if (!visible) {
    return null;
  }

  return (
    <Wrapper onPress={onClose}>
      <Container position={position}>
        {options.map((option, index) => (
          <React.Fragment key={option.label}>
            <OptionItem
              onPress={e => {
                e.stopPropagation();
                option.onPress();
              }}>
              <OptionText style={{color: option.color}}>
                {option.label}
              </OptionText>
            </OptionItem>
            {index < options.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </Container>
    </Wrapper>
  );
};
