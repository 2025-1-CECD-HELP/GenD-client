import styled from '@emotion/native';

export const Container = styled.TouchableOpacity<{
  isActive: boolean;
  variant: string;
}>`
  border-radius: ${({variant}) => (variant === 'plus' ? '10px' : '5px')};
  background-color: ${({theme, isActive}) =>
    isActive ? theme.colors.blueSecondary : theme.colors.backgroundElevated};
  padding: ${({variant}) => (variant === 'plus' ? '6px' : '6px 15px')};
`;

export const CategoryText = styled.Text`
  ${({theme}) => theme.fonts.text4};
  color: ${({theme}) => theme.colors.textSecondary};
`;
