import styled from '@emotion/native';

export const ScrollContainer = styled.ScrollView`
  position: relative;
  width: 100%;
  background-color: ${({theme}) => theme.colors.background};
  height: 100%;
`;

export const ChattingIconContainer = styled.View`
  position: absolute;
  right: 20px;
  bottom: 20px;
  z-index: 1000;
`;
