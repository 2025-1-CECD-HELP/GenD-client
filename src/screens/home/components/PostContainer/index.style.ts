import styled from '@emotion/native';
import {ScrollView} from 'react-native';

export const Container = styled.View<{minHeight: number}>`
  width: 100%;
  min-height: ${({minHeight}) => minHeight}px;
  background-color: ${({theme}) => theme.colors.background};
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding-horizontal: 20px;
  padding-top: 20px;
`;

export const PostList = styled.ScrollView<{maxHeight: number}>`
  max-height: ${({maxHeight}) => maxHeight}px;
`;

export const PostCategoryList = styled.View`
  width: 100%;
  margin-bottom: 20px;
  margin-top: 10px;
`;

export const PostCategoryScrollView = styled(ScrollView)`
  width: 100%;
`;

export const PostCategoryListContent = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

export const Toggle = styled.View`
  display: flex;
  flex-direction: row;
  gap: 20px;
  align-items: flex-start;
`;

export const ToggleText = styled.Text<{isActive: boolean}>`
  ${({theme}) => theme.fonts.title3};
  color: ${({theme, isActive}) =>
    isActive ? theme.colors.textPrimary : theme.colors.textDisabled};
`;

export const Header = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const EmptyPostList = styled.View`
  display: flex;
  width: 100%;
  height: 50%;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

export const EmptyPostListText = styled.Text`
  ${({theme}) => theme.fonts.title4};
  color: ${({theme}) => theme.colors.textDisabled};
`;
