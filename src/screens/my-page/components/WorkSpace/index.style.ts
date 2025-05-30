import styled from '@emotion/native';

export const WorkspaceColumn = styled.View`
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin-right: 16px;
`;

export const WorkspaceCircle = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
`;

export const WorkspaceName = styled.Text`
  ${({theme}) => theme.fonts.text2};
  color: ${({theme}) => theme.colors.textPrimary};
  margin-top: 8px;
`;

export const WorkspaceAlarmButton = styled.TouchableOpacity`
  background-color: ${({theme}) => theme.colors.backgroundBase};
  border-radius: 8px;
  padding: 2px 8px;
  margin-top: 4px;
`;

export const WorkspaceAlarmText = styled.Text`
  ${({theme}) => theme.fonts.text3};
  color: ${({theme}) => theme.colors.blue};
  margin-top: 4px;
`;

export const CreateWorkspaceBox = styled.TouchableOpacity`
  width: 100px;
  border-radius: 20px;
  background-color: ${({theme}) => theme.colors.background};
  align-items: center;
  justify-content: center;
  border-width: 1px;
  border-color: ${({theme}) => theme.colors.divider};
`;
