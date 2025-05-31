// src/components/OptionsBox/index.tsx
import React from 'react';
import {Container, OptionItem, OptionText, Divider} from './index.style';

export type Option = {
  label: string;
  onPress: () => void;
  color?: string;
  disabled?: boolean;
};

type OptionsBoxProps = {
  options: Option[];
};

export const OptionsBox = ({options}: OptionsBoxProps) => (
  <Container>
    {options.map((option, index) => (
      <React.Fragment key={option.label}>
        <OptionItem
          onPress={() => {
            if (!option.disabled) {
              option.onPress();
            }
          }}
          disabled={option.disabled}>
          <OptionText style={{color: option.disabled ? '#999' : option.color}}>
            {option.label}
          </OptionText>
        </OptionItem>
        {index < options.length - 1 && <Divider />}
      </React.Fragment>
    ))}
  </Container>
);
