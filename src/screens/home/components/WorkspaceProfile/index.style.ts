import styled from '@emotion/native';

export const Container = styled.View`
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const ButtonContainer = styled.View`
  display: flex;
  flex-direction: row;
  gap: 12px;
  position: absolute;
  top: 10px;
  right: 10px;
`;

export const ProfileContainer = styled.View`
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
  padding: 30px 0;
`;

export const ProfileImage = styled.Image`
  border-radius: 35px;
`;

export const WorkspaceName = styled.Text`
  ${({theme}) => theme.fonts.title4};
  color: ${({theme}) => theme.colors.textPrimary};
`;

export const WorkspaceDescription = styled.Text`
  ${({theme}) => theme.fonts.text3};
  color: ${({theme}) => theme.colors.textSecondary};
`;
