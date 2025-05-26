import {useMutation} from '@tanstack/react-query';
import useTypeSafeNavigation from '@/hooks/useTypeSafeNavigaion';
import {useModal} from '@/contexts/modal/ModalContext';
import {CommonModal} from '@/components/CommonModal';
import {
  finalSubmitRecordMutationKey,
  submitRecordMutationKey,
} from '@/constants/mutationKeys';

/**
 * 회의록 저장(제출) 뮤테이션 훅입니다.
 * @returns {object} mutate, isLoading, isError, error 상태 반환
 * @author 홍규진
 */
export const useRecordMutation = () => {
  const mutation = useMutation({
    mutationKey: submitRecordMutationKey().mutationKey,
    mutationFn: submitRecordMutationKey().mutationFn,
  });

  return {...mutation};
};

/**
 * 회의록 최종 제출 뮤테이션 훅입니다.
 * @returns {object} mutate, isLoading, isError, error 상태 반환
 * @author 홍규진
 */
export const useFinalRecordMutation = () => {
  const {setModalContent, setIsOpen} = useModal();
  const navigation = useTypeSafeNavigation();
  const mutation = useMutation({
    mutationKey: finalSubmitRecordMutationKey().mutationKey,
    mutationFn: finalSubmitRecordMutationKey().mutationFn,
    onSuccess: () => {
      setIsOpen(true);
      setModalContent(
        <CommonModal
          type="check"
          title="회의록이 저장되었습니다."
          isCenter={true}
          onConfirm={() => {
            navigation.navigate('LANDING', {});
          }}
        />,
      );
    },
    onError: error => {
      throw new Error(error.message);
    },
  });

  return {...mutation};
};
