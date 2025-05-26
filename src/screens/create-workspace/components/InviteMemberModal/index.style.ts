import styled from '@emotion/native';

export const ModalContainer = styled.View`
  background-color: ${({theme}) => theme.colors.background};
  border-radius: 20px;
  padding: 32px 20px 20px 20px;
  align-items: center;

  align-self: center;
`;

export const EmailRow = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
`;

export const EmailInput = styled.TextInput`
  width: 100%;
  height: 44px;
  background-color: ${({theme}) => theme.colors.backgroundBase};
  border-width: 1px;
  border-color: ${({theme}) => theme.colors.divider};
  border-radius: 12px;
  padding: 0 16px;
  ${({theme}) => theme.fonts.text2};
  color: ${({theme}) => theme.colors.textPrimary};
`;

export const AddButton = styled.TouchableOpacity`
  width: 32px;
  height: 32px;
  background-color: ${({theme}) => theme.colors.blue};
  border-radius: 16px;
  align-items: center;
  justify-content: center;
  margin-left: 8px;
`;
export const AddButtonText = styled.Text`
  ${({theme}) => theme.fonts.title3};
  color: ${({theme}) => theme.colors.white};
`;

export const RemoveButtonText = styled.Text`
  ${({theme}) => theme.fonts.title3};
  color: ${({theme}) => theme.colors.red};
`;

export const MemberList = styled.ScrollView`
  width: 100%;
  margin-bottom: 24px;
`;

export const MemberItem = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${({theme}) => theme.colors.backgroundBase};
  border-radius: 16px;
  padding: 12px 16px;
  margin-bottom: 12px;
`;

export const Avatar = styled.View`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  background-color: ${({theme}) => theme.colors.textDisabled};
  margin-right: 16px;
`;

export const MemberName = styled.Text`
  ${({theme}) => theme.fonts.text2};
  color: ${({theme}) => theme.colors.textPrimary};
`;

export const RemoveButton = styled.TouchableOpacity`
  padding: 8px;
`;

export const ButtonRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 24px;
`;

export const CancelButton = styled.TouchableOpacity`
  background-color: ${({theme}) => theme.colors.backgroundBase};
  border-radius: 12px;
  padding: 12px 24px;
`;

export const CancelButtonText = styled.Text`
  ${({theme}) => theme.fonts.text2};
  color: ${({theme}) => theme.colors.textPrimary};
`;

export const ConfirmButton = styled.TouchableOpacity`
  background-color: ${({theme}) => theme.colors.blue};
  border-radius: 12px;
  padding: 12px 24px;
`;

export const ConfirmButtonText = styled.Text`
  ${({theme}) => theme.fonts.text2};
  color: ${({theme}) => theme.colors.white};
`;
