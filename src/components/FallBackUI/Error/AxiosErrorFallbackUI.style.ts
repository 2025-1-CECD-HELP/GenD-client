import styled from '@emotion/native';

export const ErrorContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: ${({theme}) => theme.colors.background};
`;

export const NetworkIcon = styled.View`
  width: 64px;
  height: 64px;
  border-radius: 32px;
  background-color: ${({theme}) => theme.colors.blue};
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
`;

export const IconText = styled.Text`
  color: ${({theme}) => theme.colors.white};
  font-size: 24px;
  font-weight: bold;
`;

export const StatusBadge = styled.View`
  background-color: ${({theme}) => theme.colors.red};
  padding: 4px 12px;
  border-radius: 16px;
  margin-bottom: 16px;
`;

export const StatusText = styled.Text`
  color: ${({theme}) => theme.colors.white};
  font-weight: bold;
`;

export const ErrorTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${({theme}) => theme.colors.textPrimary};
  margin-bottom: 12px;
  text-align: center;
`;

export const ErrorMessage = styled.Text`
  font-size: 16px;
  color: ${({theme}) => theme.colors.textSecondary};
  margin-bottom: 24px;
  text-align: center;
`;

export const RetryButton = styled.TouchableOpacity`
  background-color: ${({theme}) => theme.colors.blue};
  padding: 12px 24px;
  border-radius: 8px;
  margin-top: 16px;
`;

export const ButtonText = styled.Text`
  color: ${({theme}) => theme.colors.white};
  font-size: 16px;
  font-weight: bold;
`;
