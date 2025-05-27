import useTypeSafeNavigation from '@/hooks/useTypeSafeNavigaion';
import {createPost} from '@/services/post';
import {TPostWriteRequest} from '@/services/post/types';
import {Asset} from 'react-native-image-picker';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {useModal} from '@contexts/modal/ModalContext';
import CommonModal from '@components/CommonModal';
import {useAtom} from 'jotai';
import {workspaceState} from '@/atoms/workspace';

type TWriteMutationVariables = {
  request: TPostWriteRequest;
  imageFile: Asset;
};

/**
 * 게시글 작성 뮤테이션 훅입니다.
 * 게시글 작성 요청을 처리합니다.
 * @returns {object} mutate, isLoading, isError 상태 반환
 * @author 홍규진
 */
export const useWriteMutation = () => {
  const queryClient = useQueryClient();
  const navigation = useTypeSafeNavigation();
  const {setIsOpen, setModalContent} = useModal();
  const [workspace] = useAtom(workspaceState);

  const mutation = useMutation({
    mutationKey: ['write'],
    mutationFn: ({request, imageFile}: TWriteMutationVariables) => {
      return createPost(workspace.workspaceId, request, imageFile);
    },

    onSuccess: async () => {
      showPostSuccessModal();
      queryClient.invalidateQueries({queryKey: ['post']});
    },
    onError: () => {
      showErrorModal();
    },
  });

  const showPostSuccessModal = () => {
    setIsOpen(true);
    setModalContent(
      <CommonModal
        type="check"
        title="게시글이 등록되었습니다!"
        content="다른 사용자들과 지금 공유해보세요."
        isCenter={true}
        onConfirm={() => {
          setIsOpen(false);
          navigation.navigate('LANDING', {});
        }}
      />,
    );
  };

  const showErrorModal = () => {
    setIsOpen(true);
    setModalContent(
      <CommonModal
        type="check"
        title="게시글 등록 실패"
        content="게시글 등록에 실패했습니다. 다시 시도해주세요."
        isCenter={true}
        onConfirm={() => {
          setIsOpen(false);
        }}
      />,
    );
  };
  return mutation;
};
