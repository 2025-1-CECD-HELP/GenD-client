import React from 'react';
import LogoutIcon from '@/assets/images/svg/my-page/logout.svg';
import {FlatList} from 'react-native';

import {
  Container,
  Title,
  SectionTitle,
  WithdrawText,
  Divider,
  SettingSection,
  WorkspaceSection,
} from './index.style';
import {WorkSpace, CreateWorkspace, IconButton, Profile} from './components';
import {useTheme} from '@/contexts/theme/ThemeContext';
import {useMypage} from './hooks/useMypage';
import {defaultState} from '@/atoms/user';
type WorkspaceItem = {
  workspaceId: string;
  workspaceName: string;
  imageUrl: string;
  isCreate?: boolean;
};

/**
 * 마이페이지 페이지입니다.
 * @author 홍규진
 */
export const MypageScreen = () => {
  const theme = useTheme();
  const {workspaceList, handleSignOut, user, handleWithdraw} = useMypage();
  return (
    <Container>
      <Title>마이페이지</Title>
      <Profile
        user={user || defaultState}
        workspaceCount={workspaceList?.workspaceList.length || 0}
      />
      <WorkspaceSection>
        <SectionTitle>참여 워크스페이스</SectionTitle>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={[
            ...(workspaceList?.workspaceList || []),
            {
              isCreate: true,
              workspaceId: 'create',
              workspaceName: '',
              imageUrl: '',
            },
          ]}
          renderItem={({item}: {item: WorkspaceItem}) =>
            item.isCreate ? (
              <CreateWorkspace />
            ) : (
              <WorkSpace
                workspaceName={item.workspaceName}
                imageUrl={item.imageUrl}
              />
            )
          }
          keyExtractor={item => item.workspaceId}
          contentContainerStyle={{paddingRight: 16}}
        />
      </WorkspaceSection>

      <Divider />
      <SettingSection>
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

      <WithdrawText onPress={handleWithdraw}>회원 탈퇴</WithdrawText>
    </Container>
  );
};
