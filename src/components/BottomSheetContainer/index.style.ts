import styled from '@emotion/native';

export const Container = styled.View`
  padding: 10px;
  background-color: ${({theme}) => theme.colors.background};
  color: ${({theme}) => theme.colors.textPrimary};
`;
