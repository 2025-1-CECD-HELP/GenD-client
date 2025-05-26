import styled from '@emotion/native';

export const IconButtonRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

export const IconButtonText = styled.Text`
  ${({theme}) => theme.fonts.text3};
  color: ${({theme}) => theme.colors.textPrimary};
`;
