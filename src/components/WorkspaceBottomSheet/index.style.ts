import styled from '@emotion/native';

export const Container = styled.View`
  padding: 20px 0 12px 0;
  background-color: ${({theme}) => theme.colors.background};
`;

export const Title = styled.Text`
  color: ${({theme}) => theme.colors.textPrimary};
  ${({theme}) => theme.fonts.title2};
  text-align: center;
  margin-bottom: 12px;
  margin-left: 20px;
`;

export const WorkspaceItem = styled.TouchableOpacity`
  padding: 16px 20px 12px 20px;
  border-bottom-width: 1px;
  border-bottom-color: ${({theme}) => theme.colors.divider};
`;

export const TitleRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const WorkspaceTitle = styled.Text`
  color: ${({theme}) => theme.colors.blue};
  ${({theme}) => theme.fonts.text1};
`;

export const GoText = styled.Text`
  color: ${({theme}) => theme.colors.textSecondary};
  ${({theme}) => theme.fonts.text2};
`;

export const WorkspaceDesc = styled.Text`
  color: ${({theme}) => theme.colors.textSecondary};
  margin-top: 8px;
  ${({theme}) => theme.fonts.text2};
`;

export const AddButton = styled.TouchableOpacity`
  margin: 20px 16px 0 16px;
  height: 44px;
  border-radius: 16px;
  background-color: ${({theme}) => theme.colors.blue};
  align-items: center;
  justify-content: center;
`;

export const AddButtonText = styled.Text`
  color: ${({theme}) => theme.colors.white};
  ${({theme}) => theme.fonts.title4};
`;

export const EmptyWorkspace = styled.View`
  padding: 16px 20px 12px 20px;
  border-bottom-width: 1px;
  border-bottom-color: ${({theme}) => theme.colors.divider};
`;

export const EmptyWorkspaceText = styled.Text`
  color: ${({theme}) => theme.colors.textSecondary};
  ${({theme}) => theme.fonts.text2};
`;

export const LoginButton = styled.TouchableOpacity`
  margin: 20px 16px 0 16px;
  height: 44px;
  border-radius: 16px;
  background-color: ${({theme}) => theme.colors.blue};
  align-items: center;
  justify-content: center;
`;

export const LoginButtonText = styled.Text`
  color: ${({theme}) => theme.colors.white};
  ${({theme}) => theme.fonts.title4};
`;
