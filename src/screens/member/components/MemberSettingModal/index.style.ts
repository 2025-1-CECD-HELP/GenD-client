import styled from '@emotion/native';

export const ModalContainer = styled.View`
  margin-top: 20px;
  background-color: ${({theme}) => theme.colors.background};
  border-radius: 20px;
  padding: 0px 24px 24px 24px;
  align-items: center;
`;

export const ProfileImage = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  background-color: ${({theme}) => theme.colors.textDisabled};
  margin-bottom: 16px;
`;

export const MemberName = styled.Text`
  ${({theme}) => theme.fonts.text2};
  margin-bottom: 32px;
  color: ${({theme}) => theme.colors.textPrimary};
`;

export const Row = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
`;

export const Label = styled.Text`
  ${({theme}) => theme.fonts.text3};
  color: ${({theme}) => theme.colors.textPrimary};
`;

export const Value = styled.Text`
  ${({theme}) => theme.fonts.text3};
  color: ${({theme}) => theme.colors.textPrimary};
`;

export const SwitchRow = styled(Row)`
  margin-bottom: 28px;
`;

export const DangerText = styled.Text`
  color: ${({theme}) => theme.colors.red};
  text-align: center;
  ${({theme}) => theme.fonts.text3};
  margin-bottom: 24px;
`;
