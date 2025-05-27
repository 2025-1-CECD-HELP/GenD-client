import {useMutation, useQueryClient} from '@tanstack/react-query';
import {deleteWorkspaceMutationKey} from '@/constants/mutationKeys';
import useTypeSafeNavigation from '@/hooks/useTypeSafeNavigaion';
import {useModal} from '@/contexts/modal/ModalContext';
import CommonModal from '@/components/CommonModal';

/**
 * 워크스페이스 삭제 뮤테이션 훅입니다.
 * 워크스페이스 삭제 요청을 처리합니다.
 * 워크스페이스 삭제시에 워크스페이스 목록 조회 캐시를 무효화합니다.
 * 성공시엔 성공 모달을 띄우고, 확인을 누를 시에 워크스페이스 수정 화면으로 이동합니다.
 * @returns 워크스페이스 삭제 뮤테이션 함수
 * @author 홍규진
 */
export const useDeleteWorkspaceMutation = () => {
  const queryClient = useQueryClient();
  const navigation = useTypeSafeNavigation();
  const {setIsOpen, setModalContent} = useModal();
  const {mutate} = useMutation({
    mutationKey: deleteWorkspaceMutationKey().mutationKey,
    mutationFn: (workspaceId: string) =>
      deleteWorkspaceMutationKey().mutationFn(workspaceId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: deleteWorkspaceMutationKey().mutationSuccessKey,
      });
      setIsOpen(true);
      setModalContent(
        <CommonModal
          type={'check'}
          title={'워크스페이스 삭제 완료'}
          isCenter={true}
          onConfirm={() => {
            navigation.replace('INIT_WORKSPACE', {});
          }}
        />,
      );
    },
  });

  return {
    mutate,
  };
};
