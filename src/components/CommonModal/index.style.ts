import styled from '@emotion/native';

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
  background-color: ${({theme}) => theme.colors.background};
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
  ${({theme}) => theme.fonts.title3};
  color: ${({theme}) => theme.colors.textPrimary};
`;

export const Content = styled.Text`
  margin-top: 8px;
  ${({theme}) => theme.fonts.text2};
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
  ${({theme}) => theme.fonts.text2};
  border-color: ${({theme}) => theme.colors.divider};
  border-radius: 8px;
`;

export const ButtonContainer = styled.View<{buttonType: 'single' | 'double'}>`
  margin-top: 16px;
  flex-direction: row;
  width: 100%;
  justify-content: ${({buttonType}) =>
    buttonType === 'single' ? 'center' : 'space-between'};
`;

export const StyledButton = styled.View<{buttonType?: 'single' | 'double'}>`
  flex: ${({buttonType}) => (buttonType === 'single' ? '0.7' : '0.4')};
  align-items: center;
`;
