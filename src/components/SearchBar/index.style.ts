import styled from '@emotion/native';

export const Container = styled.View`
  display: flex;
  flex-direction: row;
  padding: 16px;
  gap: 12px;
  background-color: ${props => props.theme.colors.background};
`;

export const SearchContainer = styled.View`
  flex: 1;
  flex-direction: row;
  border-radius: 8px;
  background-color: ${props => props.theme.colors.background};
  align-items: center;
  padding: 0 8px;
  border-width: 1px;
  border-radius: 25px;
  border-color: ${props => props.theme.colors.divider};
`;

export const SearchIcon = styled.Text`
  font-size: 18px;
  margin-right: 8px;
`;

export const SearchInput = styled.TextInput`
  flex: 1;
  height: 48px;
  ${({theme}) => theme.fonts.text2};
  padding: 8px;
`;

export const ClearButton = styled.TouchableOpacity<{visible: boolean}>`
  padding: 8px;
  display: ${props => (props.visible ? 'flex' : 'none')};
`;

export const ClearIcon = styled.Text`
  font-size: 18px;
  color: ${props => props.theme.colors.textSecondary};
`;

export const SearchButton = styled.TouchableOpacity<{disabled: boolean}>`
  padding: 8px 2px;
  justify-content: center;
  align-items: center;
  margin-left: 8px;
`;

export const ButtonText = styled.Text`
  color: ${props => props.theme.colors.textPrimary};
  font-weight: bold;
`;

export const IconContainer = styled.View`
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  background-color: ${props => props.theme.colors.blue};
`;
