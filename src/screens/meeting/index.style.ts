import styled from '@emotion/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.colors.background};
  padding: 20px;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  align-self: center;
  margin-bottom: 16px;
`;

export const Title = styled.Text`
  ${({theme}) => theme.fonts.title2};
  color: ${({theme}) => theme.colors.textPrimary};
`;

export const GuideText = styled.Text`
  ${({theme}) => theme.fonts.text1};
  text-align: center;
  color: ${({theme}) => theme.colors.textPrimary};
  padding-bottom: 16px;
`;

export const ButtonContainer = styled.View`
  padding-bottom: 16px;
`;
