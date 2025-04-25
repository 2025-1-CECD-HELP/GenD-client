import styled from '@emotion/native';

export const Container = styled.View`
  width: 120px;
  height: auto;
  background-color: ${({theme}) => theme.colors.popup};
  border-radius: 4px;
`;

export const MenuContainer = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  padding: 16px 0px;
`;

export const MenuText = styled.Text<{color: string}>`
  color: ${({theme, color}) =>
    theme.colors[color as keyof typeof theme.colors]};
  white-space: nowrap;
  ${({theme}) => theme.fonts.text1}
`;

export const Divider = styled.View`
  height: 1px;
  background-color: ${({theme}) => theme.colors.divider};
  margin: 0px 4px;
`;
