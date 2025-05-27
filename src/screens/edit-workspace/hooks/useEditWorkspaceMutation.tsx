import {useMutation, useQueryClient} from '@tanstack/react-query';
import {TEditWorkspaceRequest} from '@/services/workspace/types';
import {editWorkspaceMutationKey} from '@/constants/mutationKeys';
import useTypeSafeNavigation from '@/hooks/useTypeSafeNavigaion';
import {useModal} from '@/contexts/modal/ModalContext';
import CommonModal from '@/components/CommonModal';
import {useAtom} from 'jotai';
import {workspaceState} from '@/atoms/workspace';

/**
 * 워크스페이스 수정 뮤테이션 훅입니다.
 * 워크스페이스 수정 요청을 처리합니다.
 * 워크스페이스 수정시에 워크스페이스 목록 조회 캐시를 무효화합니다.
 * 성공시엔 성공 모달을 띄우고, 확인을 누를 시에 워크스페이스 수정 화면으로 이동합니다.
 * @returns 워크스페이스 수정 뮤테이션 함수
 * @author 홍규진
 */
export const useEditWorkspaceMutation = () => {
  const queryClient = useQueryClient();
  const navigation = useTypeSafeNavigation();
  const {setIsOpen, setModalContent} = useModal();
  const [workspace] = useAtom(workspaceState);
  const {mutate} = useMutation({
    mutationKey: editWorkspaceMutationKey(workspace.workspaceId).mutationKey,
    mutationFn: (workspace: TEditWorkspaceRequest) =>
      editWorkspaceMutationKey(workspace.workspaceId).mutationFn(workspace),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: editWorkspaceMutationKey(workspace.workspaceId)
          .mutationSuccessKey,
      });
      setIsOpen(true);
      setModalContent(
        <CommonModal
          type={'check'}
          title={'워크스페이스 수정 완료'}
          isCenter={true}
          onConfirm={() => {
            navigation.navigate('LANDING', {});
          }}
        />,
      );
    },
  });

  return {
    mutate,
  };
};
