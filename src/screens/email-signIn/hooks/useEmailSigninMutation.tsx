import {useMutation, useQueryClient} from '@tanstack/react-query';
import {
  emailSigninMutationKey,
  emailSignupMutationKey,
} from '@/constants/mutationKeys';
import useTypeSafeNavigation from '@/hooks/useTypeSafeNavigaion';
import {useModal} from '@/contexts/modal/ModalContext';
import CommonModal from '@/components/CommonModal';
import {TEmailSigninRequest, TEmailSignupRequest} from '@/services/auth/types';
import {setAccessToken, setRefreshToken} from '@/utils/auth';

/**
 * 이메일 로그인 뮤테이션 훅입니다.
 * 이메일 로그인 요청을 처리합니다.
 * 성공시엔 성공 모달을 띄우고, 확인을 누를 시에 홈 화면으로 이동합니다.
 * @returns 이메일 로그인 뮤테이션 함수
 * @author 홍규진
 */
export const useEmailSigninMutation = () => {
  const queryClient = useQueryClient();
  const navigation = useTypeSafeNavigation();
  const {setIsOpen, setModalContent} = useModal();
  const {mutate} = useMutation({
    mutationKey: emailSigninMutationKey().mutationKey,
    mutationFn: (request: TEmailSigninRequest) =>
      emailSigninMutationKey().mutationFn(request),
    onSuccess: data => {
      if (!data) {
        throw new Error('이메일 로그인 토큰이 없습니다.');
      }
      queryClient.invalidateQueries({
        queryKey: emailSigninMutationKey().mutationSuccessKey,
      });
      setAccessToken(data.accessToken);
      setRefreshToken(data.refreshToken);
      setIsOpen(true);
      setModalContent(
        <CommonModal
          type={'check'}
          title={'이메일 로그인 완료'}
          isCenter={true}
          onConfirm={() => {
            navigation.navigate('INIT_WORKSPACE', {});
          }}
        />,
      );
    },
    onError: error => {
      throw new Error(error.message);
    },
  });

  return {
    mutate,
  };
};

/**
 * 이메일 회원가입 뮤테이션 훅입니다.
 * 이메일 회원가입 요청을 처리합니다.
 * 성공시엔 성공 모달을 띄우고, 확인을 누를 시에 홈 화면으로 이동합니다.
 * @returns 이메일 회원가입 뮤테이션 함수
 * @author 홍규진
 */
export const useEmailSignupMutation = () => {
  const queryClient = useQueryClient();
  const navigation = useTypeSafeNavigation();
  const {setIsOpen, setModalContent} = useModal();
  const {mutate} = useMutation({
    mutationKey: emailSignupMutationKey().mutationKey,
    mutationFn: (request: TEmailSignupRequest) =>
      emailSignupMutationKey().mutationFn(request),
    onSuccess: data => {
      if (!data) {
        throw new Error('이메일 회원가입 토큰이 없습니다.');
      }
      queryClient.invalidateQueries({
        queryKey: emailSignupMutationKey().mutationSuccessKey,
      });
      setIsOpen(true);
      setModalContent(
        <CommonModal
          type={'check'}
          title={'이메일 회원가입 완료'}
          isCenter={true}
          onConfirm={() => {
            navigation.navigate('EMAIL_SIGN_IN', {mode: 'login'});
          }}
        />,
      );
    },
  });

  return {
    mutate,
  };
};
