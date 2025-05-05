import styled from '@emotion/native';

export const Container = styled.ScrollView`
  flex: 1;
  background-color: ${({theme}) => theme.colors.background};
  padding: 0 0 32px 0;
`;

export const Title = styled.Text`
  ${({theme}) => theme.fonts.title3};
  color: ${({theme}) => theme.colors.textPrimary};
  text-align: center;
  margin: 24px 0 16px 0;
`;

export const SectionTitle = styled.Text`
  ${({theme}) => theme.fonts.title4};
  color: ${({theme}) => theme.colors.textPrimary};
  margin-bottom: 16px;
`;
export const WorkspaceSection = styled.View`
  background-color: ${({theme}) => theme.colors.backgroundBase};
  border-radius: 16px;
  margin: 0 16px 0 16px;
  padding: 16px;
  border-width: 1px;
  border-color: ${({theme}) => theme.colors.divider};
`;
export const WorkspaceList = styled.ScrollView`
  flex-direction: row;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
  padding-bottom: 8px;
`;

export const Divider = styled.View`
  height: 1px;
  background-color: ${({theme}) => theme.colors.divider};
  margin: 24px 0;
`;

export const SettingSection = styled.View`
  display: flex;
  padding: 16px;
  gap: 24px;
  flex-direction: column;
  border-radius: 16px;
  margin: 0 16px 24px 16px;
`;

export const LogoutButton = styled.Button`
  margin: 24px 16px 0 16px;
`;

export const WithdrawText = styled.Text`
  ${({theme}) => theme.fonts.text5};
  color: ${({theme}) => theme.colors.textSecondary};
  text-align: center;
  margin-top: 16px;
  text-decoration: underline;
`;
