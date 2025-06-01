import styled from '@emotion/native';

export const PulsingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  padding: 20px;
`;

export const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${({theme}) => theme.colors.textPrimary};
  margin-top: 16px;
`;

export const Subtitle = styled.Text`
  font-size: 14px;
  color: ${({theme}) => theme.colors.textPrimary};
  margin-top: 8px;
  text-align: center;
`;

export const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: transparent;
`;

export const LoadingText = styled.Text`
  font-size: 16px;
  color: ${({theme}) => theme.colors.textPrimary};
  margin-top: 12px;
`;
