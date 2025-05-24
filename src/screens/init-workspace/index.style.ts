import styled from '@emotion/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-start;
  padding: 80px 40px;
  background-color: ${({theme}) => theme.colors.backgroundGradient};
`;

export const Title = styled.Text`
  ${({theme}) => theme.fonts.title2};
  color: ${({theme}) => theme.colors.white};
  text-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);
  margin-bottom: 8px;
`;

export const SubTitle = styled.Text`
  ${({theme}) => theme.fonts.title1};
  color: ${({theme}) => theme.colors.white};
  text-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);
`;

export const CardText = styled.Text`
  ${({theme}) => theme.fonts.title1};
  color: ${({theme}) => theme.colors.white};
  text-align: center;
  margin-top: 20px;
`;

export const Card = styled.TouchableOpacity`
  width: 280px;
  height: 240px;
  background-color: rgba(227, 227, 227, 0.08);
  border-radius: 32px;
  align-items: center;
  justify-content: center;

  margin-bottom: 32px;
`;

export const CardImage = styled.Image`
  width: 94px;
  height: 94px;
  margin-bottom: 16px;
`;
