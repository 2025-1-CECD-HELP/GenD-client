import styled from '@emotion/native';

export const Container = styled.View``;

export const CategoryContainer = styled.TouchableOpacity<{visible: boolean}>`
  padding: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-width: ${({visible}) => (visible ? '1px' : '0px')};
  border-color: ${({theme}) => theme.colors.divider};
`;

export const CategoryText = styled.Text`
  color: ${({theme}) => theme.colors.textPrimary};
  ${({theme}) => theme.fonts.title5};
  margin-left: 10px;
`;

export const DownIcon = styled.View`
  margin-left: auto;
`;

export const DropdownMenu = styled.View`
  background-color: ${({theme}) => theme.colors.popup};
  padding-left: 50px;
  width: 100%;
`;

export const CategoryItem = styled.TouchableOpacity`
  padding: 15px 0px;
`;

export const CategoryItemText = styled.Text`
  ${({theme}) => theme.fonts.text2};
  color: ${({theme}) => theme.colors.textPrimary};
`;

export const CategoryList = styled.ScrollView``;

export const DropdownMenuWrapper = styled.View`
  position: relative;
  z-index: 100000;
`;
