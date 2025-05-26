import styled from '@emotion/native';

export const PreviewContainer = styled.View`
  margin-bottom: 12px;
`;

export const PreviewKey = styled.Text`
  ${({theme}) => theme.fonts.title4};
  color: ${({theme}) => theme.colors.textPrimary};
  margin-bottom: 10px;
`;

export const PreviewTextInput = styled.TextInput`
  color: ${({theme}) => theme.colors.textPrimary};
  padding: 10px;
  border-width: 1px;
  border-color: ${({theme}) => theme.colors.divider};
  border-radius: 5px;
  font-size: 15px;

  margin: 0;
  background-color: transparent;
`;
