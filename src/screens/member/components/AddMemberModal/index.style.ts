import styled from '@emotion/native';

export const ModalContainer = styled.View`
  background-color: ${({theme}) => theme.colors.background};
  border-radius: 20px;
  padding: 24px 24px 24px 0px;
  align-items: center;
`;

export const InputRow = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  margin-bottom: 24px;
`;

export const EmailInput = styled.TextInput`
  flex: 1;
  height: 40px;
  background-color: ${({theme}) => theme.colors.backgroundBase};
  border-radius: 20px;
  padding: 0 16px;
  font-size: 16px;
  color: ${({theme}) => theme.colors.textPrimary};
`;

export const AddButton = styled.TouchableOpacity<{disabled?: boolean}>`
  margin-left: 8px;
  background-color: ${({theme, disabled}) =>
    disabled ? theme.colors.textDisabled : theme.colors.blue};
  border-radius: 20px;
  padding: 0 18px;
  height: 40px;
  justify-content: center;
  align-items: center;
`;

export const AddButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: 600;
`;
