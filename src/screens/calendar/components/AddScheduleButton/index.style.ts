import styled from '@emotion/native';

export const AddButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 24px;
  right: 24px;
  width: 56px;
  height: 56px;
  border-radius: 28px;
  background-color: ${({theme}) => theme.colors.blue};
  justify-content: center;
  align-items: center;
  shadow-color: ${({theme}) => theme.colors.blue};
  shadow-offset: 0px 0px;
  shadow-opacity: 0.3;
  shadow-radius: 8px;
  elevation: 5;
`;

export const AddButtonText = styled.Text`
  ${({theme}) => theme.fonts.title1};
  color: ${({theme}) => theme.colors.white};
`;
