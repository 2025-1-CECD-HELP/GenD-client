import styled from '@emotion/native';

export const Container = styled.ScrollView`
  flex: 1;
  background-color: ${({theme}) => theme.colors.background};
`;

export const Divider = styled.View`
  height: 1px;
  background-color: ${({theme}) => theme.colors.divider};
  margin: 8px 0;
`;

export const TitleInputContainer = styled.TextInput`
  padding: 20px;
  ${({theme}) => theme.fonts.title3};
  color: ${({theme}) => theme.colors.textPrimary};
`;

export const ContentInputContainer = styled.TextInput`
  padding: 20px;
  ${({theme}) => theme.fonts.text1};
  color: ${({theme}) => theme.colors.textPrimary};
`;
