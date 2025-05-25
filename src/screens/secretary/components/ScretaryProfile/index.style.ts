import styled from '@emotion/native';

export const ProfileContainer = styled.View`
  align-items: center;
  margin-top: 16px;
  margin-bottom: 16px;
`;

export const Avatar = styled.Image`
  width: 72px;
  height: 72px;
  border-radius: 36px;

  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
`;

export const Greeting = styled.Text`
  ${({theme}) => theme.fonts.title3};
  color: ${({theme}) => theme.colors.textPrimary};
  text-align: center;
  margin-bottom: 12px;
`;

export const Guide = styled.Text`
  color: ${({theme}) => theme.colors.textDisabled};
  font-size: 14px;
  margin-bottom: 8px;
`;
