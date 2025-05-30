import styled from '@emotion/native';

export const Container = styled.TouchableOpacity`
  width: 100%;
  padding: 20px;
  border-radius: 12px;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  background-color: ${({theme}) => theme.colors.backgroundBase};
`;

export const ImagePreview = styled.Image`
  width: 95px;
  height: 95px;
`;

export const ContentContainer = styled.View`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  flex: 1;
`;

export const PostTitle = styled.Text`
  ${({theme}) => theme.fonts.title5};
  color: ${({theme}) => theme.colors.textPrimary};
`;

export const PostContent = styled.View`
  flex: 1;
  margin-left: 12px;
`;

export const Writer = styled.Text`
  ${({theme}) => theme.fonts.text4};
  color: ${({theme}) => theme.colors.textPrimary};
`;
