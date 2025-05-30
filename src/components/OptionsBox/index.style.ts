// src/components/OptionsBox/index.style.ts
import styled from '@emotion/native';
import {LayoutRectangle} from 'react-native';

export const Wrapper = styled.View<{
  menuLayout: LayoutRectangle;
  position: 'top' | 'bottom';
  align: 'left' | 'right';
  offset: number;
}>`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1000;
  transform: ${({menuLayout, position, align, offset}) => {
    const y =
      position === 'bottom'
        ? menuLayout.y + menuLayout.height + offset
        : menuLayout.y - offset;
    const x = align === 'left' ? menuLayout.x : menuLayout.x + menuLayout.width;
    return `translate(${x}px, ${y}px)`;
  }};
`;

export const Container = styled.View`
  width: 100%;
  background-color: white;
  border-radius: 8px;
  padding: 8px 0;
  min-width: 120px;
`;

export const OptionItem = styled.TouchableOpacity<{disabled?: boolean}>`
  padding: 12px 0px;
  opacity: ${props => (props.disabled ? 0.5 : 1)};
`;

export const OptionText = styled.Text`
  font-size: 14px;
  color: #333;
`;

export const Divider = styled.View`
  height: 1px;
  background-color: #eee;
  margin: 4px 0;
`;
