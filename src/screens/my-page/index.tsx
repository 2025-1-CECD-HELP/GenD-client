import React from 'react';
import {useAtom} from 'jotai';
import {SettingIcon} from '@/assets/images/svg/common';
import LogoutIcon from '@/assets/images/svg/my-page/logout.svg';
import {signOutAtom} from '@/atoms/auth';

import {
  Container,
  Title,
  WorkspaceList,
  SectionTitle,
  WithdrawText,
  Divider,
  SettingSection,
  WorkspaceSection,
} from './index.style';
import {workspaces} from './constants/dummy';
import {WorkSpace, CreateWorkspace, IconButton, Profile} from './components';
import {useTheme} from '@/contexts/theme/ThemeContext';
/**
 * 마이페이지 페이지입니다.
 * @author 홍규진
 */
export const MypageScreen = () => {
  const theme = useTheme();
  const [, signOut] = useAtom(signOutAtom);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('로그아웃 실패:', error);
    }
  };

  return (
    <Container>
      <Title>마이페이지</Title>
      <Profile name="홍규진" workspaceCount={workspaces.length} />
      <WorkspaceSection>
        <SectionTitle>참여 워크스페이스</SectionTitle>
        <WorkspaceList horizontal showsHorizontalScrollIndicator={false}>
          {workspaces.map(ws => (
            <WorkSpace key={ws.id} name={ws.name} color={ws.color} />
          ))}
          <CreateWorkspace />
        </WorkspaceList>
      </WorkspaceSection>

      <Divider />
      <SettingSection>
        <IconButton
          icon={
            <SettingIcon
              color={theme.colors.textPrimary}
              width={24}
              height={24}
            />
          }
          text="화면 설정"
        />
        <IconButton
          icon={
            <LogoutIcon
              color={theme.colors.textPrimary}
              width={24}
              height={24}
            />
          }
          text="로그아웃"
          onPress={handleSignOut}
        />
      </SettingSection>

      <WithdrawText>회원 탈퇴</WithdrawText>
    </Container>
  );
};
