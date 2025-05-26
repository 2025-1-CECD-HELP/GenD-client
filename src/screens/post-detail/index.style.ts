import styled from '@emotion/native';

export const Container = styled.ScrollView`
  flex: 1;
  background-color: ${({theme}) => theme.colors.background};
  padding: 24px;
`;

export const SemiContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Category = styled.Text`
  color: ${({theme}) => theme.colors.blue};
  font-weight: bold;
  margin-bottom: 8px;
`;

export const TitleRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 4px;
`;

export const Title = styled.Text`
  ${({theme}) => theme.fonts.title4};
  font-weight: bold;
  color: ${({theme}) => theme.colors.textPrimary};
`;

export const Pin = styled.View`
  margin-left: 8px;
`;

export const WriterRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 16px;
`;

export const Writer = styled.Text`
  color: ${({theme}) => theme.colors.textSecondary};
  ${({theme}) => theme.fonts.text2};
`;

export const DateText = styled.Text`
  color: ${({theme}) => theme.colors.textDisabled};
  font-size: 13px;
  margin-left: 8px;
`;

export const PostImage = styled.Image`
  width: 100%;
  aspect-ratio: 1;
  border-radius: 12px;
  margin-bottom: 20px;
  background-color: #eee;
`;
export const EmptyPostView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
