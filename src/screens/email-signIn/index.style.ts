import styled from '@emotion/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
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
export const TopSection = styled.View`
  width: 100%;
  align-items: center;
  margin-bottom: 32px;
`;

export const BottomSection = styled.View`
  width: 100%;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${({theme}) => theme.colors.white};
  margin-bottom: 16px;
`;

export const Input = styled.TextInput`
  width: 80%;
  max-width: 320px;
  padding: 14px;
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 8px;
  margin-bottom: 16px;
  font-size: 16px;
  color: ${({theme}) => theme.colors.textPrimary};
`;

export const Button = styled.TouchableOpacity`
  width: 80%;
  max-width: 320px;
  padding: 16px 0;
  background-color: ${({theme}) => theme.colors.textPrimary};
  border-radius: 12px;
  align-items: center;
  margin-bottom: 12px;
`;

export const ButtonText = styled.Text`
  color: ${({theme}) => theme.colors.white};
  font-size: 18px;
  font-weight: 600;
`;

export const SwitchButton = styled.TouchableOpacity`
  width: 80%;
  max-width: 320px;
  padding: 14px 0;

  border-radius: 12px;
  align-items: center;
  margin-bottom: 12px;
  background-color: white;
`;

export const SwitchButtonText = styled.Text`
  color: ${({theme}) => theme.colors.textPrimary};
  font-size: 16px;
  font-weight: 600;
`;

export const SocialButton = styled.TouchableOpacity`
  width: 80%;
  max-width: 320px;
  padding: 14px 0;
  border-radius: 12px;
  align-items: center;
  background-color: #fee500;
`;

export const SocialButtonText = styled.Text`
  color: #191600;
  font-size: 16px;
  font-weight: 600;
`;
