import styled from '@emotion/native';
import {Theme} from '@emotion/react';

export const AddScheduleContainer = styled.View`
  padding: 20px;
  background-color: ${({theme}) => theme.colors.background};
`;

export const AddScheduleTitle = styled.Text`
  ${({theme}) => theme.fonts.title3};
  color: ${({theme}) => theme.colors.textPrimary};
  margin-bottom: 20px;
`;

export const InputLabel = styled.Text`
  ${({theme}) => theme.fonts.title4};
  color: ${({theme}) => theme.colors.textPrimary};
  margin-bottom: 8px;
`;

export const Input = styled.TextInput`
  border: 1px solid ${({theme}) => theme.colors.divider};
  border-radius: 8px;
  padding: 12px;
  ${({theme}) => theme.fonts.text2};
  color: ${({theme}) => theme.colors.textPrimary};
  background-color: ${({theme}) => theme.colors.background};
`;

export const HeaderContainer = styled.View`
  flex-direction: row;
  margin-bottom: 20px;
`;

export const CategoryContainer = styled.View`
  position: relative;
  margin-right: 10px;
`;

export const Dropdown = styled.View`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: transparent;
  border-radius: 14px;
  z-index: 1;
  elevation: 5;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
`;

export const AlarmOption = styled.TouchableOpacity`
  padding: 4px 8px;
  justify-content: flex-end;
  border-radius: 14px;
  background-color: ${({theme}) => theme.colors.background};
`;

export const AlarmOptionText = styled.Text`
  ${({theme}) => theme.fonts.title4};
  color: ${({theme}) => theme.colors.textPrimary};
`;

const getCategoryColor = (category: string, theme: Theme) => {
  switch (category) {
    case 'Meeting':
      return theme.colors.red;
    case 'Presentation':
      return theme.colors.blue;
    case 'Activity':
      return theme.colors.yellow;
    case 'Study':
      return theme.colors.pink;
    default:
      return theme.colors.background;
  }
};

export const CategoryOption = styled.TouchableOpacity<{category: string}>`
  padding: 2px 8px;
  border-radius: 14px;
  background-color: ${({category, theme}) => getCategoryColor(category, theme)};
  color: ${({theme}) => theme.colors.white};
`;

export const CategoryOptionText = styled.Text<{selected: boolean}>`
  ${({theme}) => theme.fonts.text2};
  color: ${({theme}) => theme.colors.white};
  text-align: center;
  color: ${({theme}) => theme.colors.white};
`;

export const CategoryButton = styled.TouchableOpacity<{category: string}>`
  padding: 4px 12px;
  border-radius: 14px;
  background-color: ${({category, theme}) => getCategoryColor(category, theme)};
  color: ${({theme}) => theme.colors.white};
`;

export const CategoryButtonText = styled.Text`
  ${({theme}) => theme.fonts.text2};
  color: ${({theme}) => theme.colors.white};
`;

export const TitleInput = styled.TextInput`
  flex: 1;
  border-radius: 8px;
  padding: 4px 12px;
  ${({theme}) => theme.fonts.text2};
  color: ${({theme}) => theme.colors.textPrimary};
  background-color: ${({theme}) => theme.colors.background};
`;

export const DateTimeContainer = styled.View`
  margin-bottom: 20px;
`;

export const DateTimeButton = styled.TouchableOpacity`
  border: 1px solid ${({theme}) => theme.colors.divider};
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 8px;
  background-color: ${({theme}) => theme.colors.background};
`;

export const DateTimeText = styled.Text`
  ${({theme}) => theme.fonts.text2};
  color: ${({theme}) => theme.colors.textPrimary};
`;

export const SpaceBetweenRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const AlarmContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const AlarmTimeContainer = styled.View`
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
`;

export const AlarmButton = styled.TouchableOpacity`
  padding: 4px 12px;
  border-radius: 14px;
  background-color: ${({theme}) => theme.colors.background};
`;

export const AlarmButtonText = styled.Text`
  ${({theme}) => theme.fonts.title4};
  color: ${({theme}) => theme.colors.textPrimary};
`;

export const AlarmLabel = styled.Text`
  ${({theme}) => theme.fonts.title4};
  color: ${({theme}) => theme.colors.textPrimary};
`;

export const MemoContainer = styled.View`
  margin-bottom: 20px;
`;

export const StyledSwitch = styled.Switch`
  transform: scale(0.8);
`;

export const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const ModalContent = styled.View`
  background-color: ${({theme}) => theme.colors.background};
  border-radius: 12px;
  padding: 20px;
  width: 80%;
`;
