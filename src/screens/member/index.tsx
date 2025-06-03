import React from 'react';
import {
  Container,
  SearchBarWrapper,
  MemberList,
  MemberItem,
  PlusButtonWrapper,
  TopBarContainer,
} from './index.style';
import {TopBar} from '@/components';
import {SearchBar} from '@/components/SearchBar';
import {RefreshControl} from 'react-native';
import {PlusIcon} from '@/assets/images/svg/common';
import {useTheme} from '@/contexts/theme/ThemeContext';
import MemberSetting from '@/components/MemberSetting';
import useTypeSafeNavigation from '@/hooks/useTypeSafeNavigaion';
import {useMember} from './hooks/useMember';

/**
 * 멤버 리스트 화면입니다.
 * 멤버 추가, 검색, 새로고침 기능을 제공합니다.
 * 멤버의 권한에 따라 멤버 추가, 멤버 삭제, 멤버 권한 변경 기능을 제공합니다.
 * @author 홍규진
 */

export const MemberScreen = () => {
  const theme = useTheme();
  const navigation = useTypeSafeNavigation();
  const {
    setSearch,
    refreshing,
    onRefresh,
    handleAddMember,
    filteredMembers,
    isAdmin,
  } = useMember();

  return (
    <Container
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <TopBar
        title="멤버"
        showBackButton={true}
        onPressBack={() => navigation.navigate('LANDING', {})}
      />
      <TopBarContainer>
        <SearchBarWrapper>
          <SearchBar
            isDebouncing={true}
            onSearchSubmit={setSearch}
            placeholder="이름으로 검색하세요"
          />
        </SearchBarWrapper>
        <PlusButtonWrapper onPress={handleAddMember}>
          <PlusIcon fill={theme.colors.white} />
        </PlusButtonWrapper>
      </TopBarContainer>

      <MemberList>
        {filteredMembers?.map(member => (
          <MemberItem key={member.memberId}>
            <MemberSetting
              memberId={member.memberId}
              memberRole={member.memberRole}
              memberName={member.memberName}
              memberImage={member.memberImage}
              isCurrentUserManager={isAdmin}
            />
          </MemberItem>
        ))}
      </MemberList>
    </Container>
  );
};
