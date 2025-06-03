import {useWorkspaceListQuery} from '@/screens/home/hooks/useWorkspaceQuery';
import {signOutAtom} from '@/atoms/auth';
import {useAtom, useAtomValue} from 'jotai';
import {userState} from '@/atoms/user';
import {useModal} from '@/contexts/modal/ModalContext';
import {CommonModal} from '@/components/CommonModal';
import {Linking} from 'react-native';
import {useQueryClient} from '@tanstack/react-query';

/**
 * 마이페이지 내에서 사용하는 custom-hook입니다.
 * 로그아웃, 탈퇴시에 쿼리 캐시를 모두 초기화 합니다.
 * @author 홍규진
 */
export const useMypage = () => {
  const queryClient = useQueryClient();
  const {data: workspaceList} = useWorkspaceListQuery();
  const {setModalContent, setIsOpen} = useModal();
  const [, signOut] = useAtom(signOutAtom);
  const userAtomState = useAtomValue(userState);
  const handleSignOut = async () => {
    // 모든 쿼리 캐시 초기화
    queryClient.clear();
    // 로그아웃 실행
    await signOut();
  };

  const handleWithdraw = async () => {
    setIsOpen(true);
    queryClient.clear();
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
