import styled from '@emotion/native';

export const Container = styled.TouchableOpacity<{isSelected: boolean}>`
  background-color: ${({isSelected, theme}) =>
    isSelected ? theme.colors.backgroundSelected : theme.colors.backgroundBase};
  border-color: ${({isSelected, theme}) =>
    isSelected ? theme.colors.blue : theme.colors.divider};
  border-width: 1.5px;
  border-radius: 12px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  gap: 8px;
`;
export const Icon = styled.Image`
  width: 30px;
  height: 30px;
`;
export const ContentContainer = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;
export const Title = styled.Text`
  ${({theme}) => theme.fonts.title4};
  color: ${({theme}) => theme.colors.textPrimary};
`;
export const Description = styled.Text`
  ${({theme}) => theme.fonts.text5};
`;

export const Button = styled.TouchableOpacity`
  border-radius: 4px;
  background-color: ${({theme}) => theme.colors.blue};
  padding: 4px 14px;
`;

export const ButtonText = styled.Text`
  color: ${({theme}) => theme.colors.white};
  ${({theme}) => theme.fonts.text5};
`;
