import styled from '@emotion/native';
import {Animated} from 'react-native';

export const Ring = styled(Animated.View)<{color: string; size: number}>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border-radius: 999px;
  border-width: 2px;
  border-color: ${props => props.color};
  z-index: 0;
`;
