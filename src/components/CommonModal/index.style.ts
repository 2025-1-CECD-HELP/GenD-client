import styled from '@emotion/native';
import {Button} from 'react-native';

export const CommonModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5); /* 배경 어둡게 */
`;

export const ModalContent = styled.View<{isCenter?: boolean}>`
  width: 90%;
  padding: 24px;
  justify-content: ${({isCenter}) => (isCenter ? 'center' : 'flex-start')};
  align-items: ${({isCenter}) => (isCenter ? 'center' : 'flex-start')};
  background-color: ${({theme}) => theme.colors.popup};
  border-radius: 12px;
`;

export const CheckIconContainer = styled.View`
  width: 100px;
  height: 100px;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text`
  margin-top: 20px;
  font-size: 18px;
  font-weight: bold;
  color: ${({theme}) => theme.colors.textPrimary};
`;

export const Content = styled.Text`
  margin-top: 8px;
  font-size: 14px;
  color: ${({theme}) => theme.colors.textSecondary};
`;

export const CheckIcon = styled.Text`
  font-size: 36px;
  color: ${({theme}) => theme.colors.blue};
  text-align: center;
`;

export const StyledTextInput = styled.TextInput`
  margin-top: 16px;
  padding: 8px;
  border-width: 1px;
  width: 100%;
  border-color: ${({theme}) => theme.colors.divider};
  border-radius: 8px;
`;

export const ButtonContainer = styled.View`
  margin-top: 16px;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`;

export const StyledButton = styled(Button)<{variant?: 'primary' | 'secondary'}>`
  flex: ${({variant}) => (variant === 'secondary' ? '0.45' : '0.55')};
`;
