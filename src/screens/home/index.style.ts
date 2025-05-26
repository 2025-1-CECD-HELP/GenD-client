import styled from '@emotion/native';

export const ScrollContainer = styled.ScrollView`
  position: relative;
  width: 100%;
  background-color: ${({theme}) => theme.colors.background};
`;
export const ChattingIconContainer = styled.View`
  position: fixed;
  bottom: 100px;
  right: 0px;
  z-index: 1000;
`;
