import styled from '@emotion/native';

export const ProfileSection = styled.View`
  align-items: center;
  margin-bottom: 16px;
`;
export const WorkspaceAlarmText = styled.Text`
  ${({theme}) => theme.fonts.text3};
  color: ${({theme}) => theme.colors.blue};
  margin-top: 4px;
`;
export const WorkspaceSection = styled.View`
  background-color: ${({theme}) => theme.colors.background};
  border-radius: 16px;
  margin: 0 16px 0 16px;
  padding: 16px;
  border-width: 1px;
  border-color: ${({theme}) => theme.colors.divider};
`;
