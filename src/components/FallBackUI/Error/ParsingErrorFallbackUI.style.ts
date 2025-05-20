import styled from '@emotion/native';

export const ErrorContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #f8f9fa;
`;

export const DataIcon = styled.View`
  width: 64px;
  height: 64px;
  border-radius: 32px;
  background-color: #7950f2;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
`;

export const IconText = styled.Text`
  color: white;
  font-size: 24px;
  font-weight: bold;
`;

export const CodeBlock = styled.View`
  background-color: #212529;
  padding: 16px;
  border-radius: 8px;
  width: 100%;
  margin-bottom: 16px;
`;

export const CodeText = styled.Text`
  color: #ced4da;
  font-family: monospace;
  font-size: 12px;
`;

export const ErrorTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #343a40;
  margin-bottom: 12px;
  text-align: center;
`;

export const ErrorMessage = styled.Text`
  font-size: 16px;
  color: #495057;
  margin-bottom: 24px;
  text-align: center;
`;

export const RetryButton = styled.TouchableOpacity`
  background-color: #4263eb;
  padding: 12px 24px;
  border-radius: 8px;
  margin-top: 16px;
`;

export const ButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
`;
