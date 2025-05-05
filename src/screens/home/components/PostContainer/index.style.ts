import styled from '@emotion/native';

export const Container = styled.View<{minHeight: number}>`
  display: flex;
  flex-direction: column;
  padding: 30px;
  border-radius: 30px 30px 0 0;
  background-color: ${({theme}) => theme.colors.background};
  gap: 16px;
  min-height: ${({minHeight}) => minHeight};
`;

export const PostList = styled.ScrollView`
  padding: 10px;
`;

export const PostCategoryList = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
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
