import styled from '@emotion/native';

export const Container = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 0 0 48px 0;
  background-color: ${({theme}) => theme.colors.backgroundGradient};
`;

export const TopSection = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const Slogan = styled.Text`
  color: ${({theme}) => theme.colors.white};
  font-size: 18px;
  text-align: center;
  margin-top: 80px;
  margin-bottom: 32px;
  font-weight: 400;
`;

export const GenDBold = styled.Text`
  font-weight: bold;
  color: ${({theme}) => theme.colors.white};
`;

export const LogoText = styled.Text`
  font-size: 96px;
  color: ${({theme}) => theme.colors.white};
  font-weight: bold;
  margin-bottom: 32px;
`;

export const BottomSection = styled.View`
  width: 100%;
  align-items: center;
  margin-bottom: 32px;
`;

export const SocialButton = styled.TouchableOpacity<{
  provider?: 'kakao' | 'apple' | 'email';
}>`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 90%;
  height: 48px;
  border-radius: 12px;
  background-color: ${({provider}) =>
    provider === 'kakao'
      ? '#FEE500'
      : provider === 'apple'
      ? '#ffffff'
      : '#000000'};
  margin-bottom: 16px;
`;

export const SocialText = styled.Text<{provider?: 'kakao' | 'apple' | 'email'}>`
  color: ${({provider}) =>
    provider === 'kakao'
      ? '#191600'
      : provider === 'apple'
      ? '#000000'
      : '#ffffff'};
  font-size: 16px;
  font-weight: 600;
  margin-left: 8px;
`;
