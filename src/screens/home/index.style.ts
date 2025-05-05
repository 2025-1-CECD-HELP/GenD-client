import styled from '@emotion/native';

export const Container = styled.View`
  width: 100%;
  flex: 1;
  background-color: ${({theme}) => theme.colors.background};
`;

export const ScrollContainer = styled.ScrollView`
  width: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;
`;
