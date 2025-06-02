import {useWorkspaceListQuery} from '@/screens/home/hooks/useWorkspaceQuery';
import {signOutAtom} from '@/atoms/auth';
import {useAtom} from 'jotai';
import {useUserQuery} from './useMypageQuery';
import {userState} from '@/atoms/user';
import {useModal} from '@/contexts/modal/ModalContext';
import {CommonModal} from '@/components/CommonModal';
import {Linking} from 'react-native';

export const useMypage = () => {
  const {data: workspaceList} = useWorkspaceListQuery();
  const {setModalContent, setIsOpen} = useModal();
  const [, signOut] = useAtom(signOutAtom);
  const {data: user} = useUserQuery();
  const [userAtomState, setUserAtomState] = useAtom(userState);
  setUserAtomState(user);

  const handleSignOut = async () => {
    await signOut();
  };

  const handleWithdraw = async () => {
    setIsOpen(true);

    setModalContent(
      <CommonModal
        type="default"
        title="회원 탈퇴"
        content={
          '정말로 회원 탈퇴를 하시겠습니까? \n기존의 모든 데이터가 삭제됩니다!'
        }
        onConfirm={() => handleSignOut()}
        onCancel={() => setIsOpen(false)}
      />,
    );
  };

  const handleShowTerms = async () => {
    const url = 'https://boiled-raisin-b3b.notion.site/gend';
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      console.warn("Don't know how to open URI: " + url);
    }
  };

  return {
    handleSignOut,
    handleWithdraw,
    workspaceList,
    user: userAtomState,
    handleShowTerms,
  };
};
