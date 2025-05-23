import React, {useState} from 'react';
import {
  Container,
  SearchBarWrapper,
  MemberList,
  MemberItem,
  PlusButtonWrapper,
  TopBarContainer,
} from './index.style';
import {MemberProfile} from '@/components/MemberProfile';
import {SearchBar} from '@/components/SearchBar';
import {useMemberListQuery} from './hooks/useMemberListQuery';
import {RefreshControl} from 'react-native';
import {useWorkspace} from '@/contexts/workspace/WorkspaceContenxt';
import {PlusIcon} from '@/assets/images/svg/common';
import {useTheme} from '@/contexts/theme/ThemeContext';
import {useModal} from '@/contexts/modal/ModalContext';
import {AddMemberModal} from './components/AddMemberModal';
import CommonModal from '@/components/CommonModal';
import {useAddMemberMutation} from './hooks/useMemberMutation';

export const MemberScreen = () => {
  const theme = useTheme();
  const [search, setSearch] = useState('');
  const {workspaceId} = useWorkspace();
  const {data: memberList, refetch: refetchMemberList} = useMemberListQuery(
    workspaceId ?? '-1',
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
                        workspaceId: workspaceId ?? '-1',
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
            <MemberProfile
              memberId={Number(member.memberId)}
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
