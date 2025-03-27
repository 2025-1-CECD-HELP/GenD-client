import styled from '@emotion/native';

export const ButtonContainer = styled.TouchableOpacity<{
  variant: 'filled' | 'outline' | 'disabled';
  shape: 'square' | 'round';
}>`
  padding: 10px 15px;
  border-radius: 4px;
  background-color: ${({variant, theme}) =>
    variant === 'filled' ? theme.colors.blue : theme.colors.background};
  border: ${({variant, theme}) => {
    if (variant === 'filled') return 'none';
    if (variant === 'outline') return `1px solid ${theme.colors.blue}`;
    if (variant === 'disabled') return `1px solid ${theme.colors.textDisabled}`;
  }};
  border-radius: ${({shape}) => (shape === 'round' ? '100px' : '5px')};
  display: flex;
  align-items: center;
  width: 100%;
`;

export const ButtonText = styled.Text<{
  variant: 'filled' | 'outline' | 'disabled';
}>`
  color: ${({variant, theme}) => {
    if (variant === 'filled') return theme.colors.white;
    if (variant === 'outline') return theme.colors.blue;
    if (variant === 'disabled') return theme.colors.textDisabled;
  }};
  ${({theme}) => theme.fonts.title5};
`;
