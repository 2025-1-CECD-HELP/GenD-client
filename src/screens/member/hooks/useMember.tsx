import {useState} from 'react';
import {useAtom} from 'jotai';
import {workspaceState} from '@/atoms/workspace';
import {useMemberListQuery} from './useMemberListQuery';
import {useModal} from '@/contexts/modal/ModalContext';
import {AddMemberModal} from '../components/AddMemberModal';
import CommonModal from '@/components/CommonModal';

export const useMember = () => {
  const [search, setSearch] = useState('');
  const [workspace] = useAtom(workspaceState);
  const {data: memberList, refetch: refetchMemberList} = useMemberListQuery(
    workspace.workspaceId,
  );
  const {setIsOpen, setModalContent} = useModal();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetchMemberList();
    setRefreshing(false);
  };

  const handleAddMember = () => {
    setIsOpen(true);
    setModalContent(
      <CommonModal
        type="default"
        title="멤버 추가"
        children={<AddMemberModal />}
      />,
    );
  };

  const filteredMembers =
    search === ''
      ? memberList
      : memberList?.filter(m => m.memberName.includes(search));

  return {
    search,
    setSearch,
    refreshing,
    onRefresh,
    handleAddMember,
    filteredMembers,
    isAdmin: workspace.isAdmin,
  };
};
