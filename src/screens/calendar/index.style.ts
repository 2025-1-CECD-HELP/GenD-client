import styled from '@emotion/native';

export const Root = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.colors.background};
`;

export const ScrollContainer = styled.ScrollView`
  flex: 1;
`;

export const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.colors.background};
`;

export const CalendarContainer = styled.View`
  background-color: ${({theme}) => theme.colors.background};
  border-radius: 12px;
  margin: 16px;
  overflow: hidden;
`;

export const ScheduleContainer = styled.ScrollView`
  flex: 1;
  padding: 16px;
  background-color: ${({theme}) => theme.colors.background};
  position: relative;
`;

export const ScheduleTitle = styled.Text`
  ${({theme}) => theme.fonts.title4};
  color: ${({theme}) => theme.colors.textPrimary};
  margin-left: 24px;
  margin-bottom: 12px;
`;

export const ScheduleMemo = styled.Text`
  color: ${({theme}) => theme.colors.textSecondary};
  margin-top: 4px;
  font-size: 12px;
`;

export const NoScheduleText = styled.Text`
  ${({theme}) => theme.fonts.text2};
  color: ${({theme}) => theme.colors.textSecondary};
  text-align: center;
  margin-top: 24px;
`;

export const ScheduleItemContainer = styled.View<{type: string}>`
  background-color: ${({theme}) => theme.colors.backgroundBase};
  border-left-width: 4px;
  border-left-color: ${props => {
    switch (props.type) {
      case 'Meeting':
        return props.theme.colors.red;
      case 'Presentation':
        return props.theme.colors.blue;
      case 'Activity':
        return props.theme.colors.yellow;
      case 'Study':
        return props.theme.colors.pink;
      default:
        return props.theme.colors.backgroundBase;
    }
  }};
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 12px;
`;

export const ScheduleItemTitle = styled.Text`
  ${({theme}) => theme.fonts.title5};
  color: ${({theme}) => theme.colors.textPrimary};
  margin-bottom: 4px;
`;

export const ScheduleItemTime = styled.Text`
  ${({theme}) => theme.fonts.text3};
  color: ${({theme}) => theme.colors.textSecondary};
`;

export const AddScheduleContainer = styled.View`
  padding: 20px;
`;

export const AddScheduleTitle = styled.Text`
  ${({theme}) => theme.fonts.title4};
  color: ${({theme}) => theme.colors.textPrimary};
  margin-bottom: 20px;
`;

export const InputContainer = styled.View`
  margin-bottom: 16px;
`;

export const InputLabel = styled.Text`
  ${({theme}) => theme.fonts.text2};
  color: ${({theme}) => theme.colors.textPrimary};
  margin-bottom: 8px;
`;

export const Input = styled.TextInput`
  border-width: 1px;
  border-color: ${({theme}) => theme.colors.divider};
  border-radius: 8px;
  padding: 12px;
  ${({theme}) => theme.fonts.text2};
  color: ${({theme}) => theme.colors.textPrimary};
`;

export const FabWrapper = styled.View`
  position: absolute;
  bottom: 0;
  align-self: flex-end;
  z-index: 10;
`;
