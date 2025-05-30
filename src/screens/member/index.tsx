import React, {useState} from 'react';
import {
  Container,
  SearchBarWrapper,
  MemberList,
  MemberItem,
  PlusButtonWrapper,
  TopBarContainer,
} from './index.style';
import {SearchBar} from '@/components/SearchBar';
import {useMemberListQuery} from './hooks/useMemberListQuery';
import {RefreshControl} from 'react-native';
import {PlusIcon} from '@/assets/images/svg/common';
import {useTheme} from '@/contexts/theme/ThemeContext';
import {useModal} from '@/contexts/modal/ModalContext';
import {AddMemberModal} from './components/AddMemberModal';
import CommonModal from '@/components/CommonModal';
import {useAddMemberMutation} from './hooks/useMemberMutation';
import {useAtom} from 'jotai';
import {workspaceState} from '@/atoms/workspace';
import MemberSetting from '@/components/MemberSetting';

/**
 * 멤버 리스트 화면입니다.
 * 멤버 추가, 검색, 새로고침 기능을 제공합니다.
 * @author 홍규진
 */

export const MemberScreen = () => {
  const theme = useTheme();
  const [search, setSearch] = useState('');
  const [workspace] = useAtom(workspaceState);
  const {data: memberList, refetch: refetchMemberList} = useMemberListQuery(
    workspace.workspaceId,
  );
  const {mutateAsync: addMember} = useAddMemberMutation();
  const {setIsOpen, setModalContent} = useModal();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await refetchMemberList();
    setRefreshing(false);
  }, [refetchMemberList]);

  const filtered =
    search === ''
      ? memberList
      : memberList.filter(m => m.memberName.includes(search));

  return (
    <Container
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <TopBarContainer>
        <SearchBarWrapper>
          <SearchBar
            isDebouncing={true}
            onSearchSubmit={setSearch}
            placeholder="이름으로 검색하세요"
          />
        </SearchBarWrapper>
        <PlusButtonWrapper
          onPress={() => {
            setIsOpen(true);
            setModalContent(
              <CommonModal
                type="default"
                title="멤버 추가"
                children={
                  <AddMemberModal
                    onAdd={email => {
                      addMember({
                        workspaceId: workspace.workspaceId,
                        email,
                      });
                    }}
                  />
                }
              />,
            );
          }}>
          <PlusIcon fill={theme.colors.white} />
        </PlusButtonWrapper>
      </TopBarContainer>

      <MemberList>
        {filtered.map(member => (
          <MemberItem key={member.memberId}>
            <MemberSetting
              memberId={member.memberId}
              memberRole={member.memberRole}
              memberName={member.memberName}
              memberImage={member.memberImage}
              isCurrentUserManager={true}
            />
          </MemberItem>
        ))}
      </MemberList>
    </Container>
  );
};
