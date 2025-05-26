import styled from '@emotion/native';

export const ModalOverlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

export const ProfileCircle = styled.View`
  width: 56px;
  height: 56px;
  border-radius: 28px;
  background-color: #888;
  align-self: center;
  margin: 24px 0 8px 0;
`;

export const WorkspaceName = styled.Text`
  ${({theme}) => theme.fonts.title4};
  color: ${({theme}) => theme.colors.textPrimary};
  text-align: center;
  margin-bottom: 24px;
`;

export const SwitchRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 16px;
`;

export const SwitchLabel = styled.Text`
  ${({theme}) => theme.fonts.text2};
  color: ${({theme}) => theme.colors.textPrimary};
`;
