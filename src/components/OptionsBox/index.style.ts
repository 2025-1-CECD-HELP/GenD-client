// src/components/OptionsBox/index.style.ts
import styled from '@emotion/native';

export const Wrapper = styled.TouchableOpacity`
  flex: 1;
  width: 100%;
  height: 100%;
  justify-content: flex-end;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const Container = styled.View<{
  position: {x: number; y: number; width: number; height: number};
}>`
  position: absolute;
  top: ${({position}) => position.y + position.height + 4}px;
  left: ${({position}) => position.x}px;
  min-width: 140px;
  z-index: 100;
  background-color: ${({theme}) => theme.colors.background};
  border-radius: 12px;
  padding: 12px 0;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
`;

export const OptionItem = styled.TouchableOpacity`
  padding: 16px 0;
  color: ${({theme}) => theme.colors.textPrimary};
`;

export const OptionText = styled.Text`
  font-size: 16px;
  text-align: center;
  color: ${({theme}) => theme.colors.textPrimary};
`;

export const Divider = styled.View`
  height: 1px;
  background-color: ${({theme}) => theme.colors.divider};
`;
