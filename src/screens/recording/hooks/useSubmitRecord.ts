import {useMutation} from '@tanstack/react-query';
import {finalSubmitRecord, submitRecord} from '@/services/meeting';
import useTypeSafeNavigation from '@/hooks/useTypeSafeNavigaion';
import {ROUTE_NAMES} from '@/constants/routes';
/**
 * 회의록 저장(제출) 뮤테이션 훅입니다.
 * @returns {object} mutate, isLoading, isError, error 상태 반환
 */
export const useSubmitRecordMutation = () => {
  const mutation = useMutation({
    mutationKey: ['submitRecord'],
    mutationFn: submitRecord,
  });

  return {...mutation};
};

/**
 * 회의록 최종 제출 뮤테이션 훅입니다.
 * @returns {object} mutate, isLoading, isError, error 상태 반환
 */
export const useFinalSubmitRecordMutation = () => {
  const navigation = useTypeSafeNavigation();
  const mutation = useMutation({
    mutationKey: ['finalSubmitRecord'],
    mutationFn: finalSubmitRecord,
    onSuccess: () => {
      navigation.navigate(ROUTE_NAMES.HOME, {});
    },
    onError: error => {
      throw new Error(error.message);
    },
  });

  return {...mutation};
};
