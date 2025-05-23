import styled from '@emotion/native';

export const Container = styled.View`
  height: 58px;
  padding: 0 16px;
  background-color: ${({theme}) => theme.colors.background};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Side = styled.View`
  width: 50px;
  align-items: center;
  justify-content: center;
`;

export const TitleContainer = styled.View`
  flex: 1;
  align-items: center;
`;

export const Title = styled.Text`
  color: ${({theme}) => theme.colors.textPrimary};
  ${({theme}) => theme.fonts.title3};
`;
export const SubmitButton = styled.TouchableOpacity``;

export const ButtonText = styled.Text`
  color: ${({theme}) => theme.colors.blue};
  ${({theme}) => theme.fonts.text3};
`;
