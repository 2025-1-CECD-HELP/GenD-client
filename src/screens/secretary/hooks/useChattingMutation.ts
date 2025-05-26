import {useMutation} from '@tanstack/react-query';
import {chattingMutationKey} from '@/constants/mutationKeys';
import {TPostChattingRequest} from '@/services/secretary/types';

/**
 * 채팅 전송 뮤테이션 훅입니다.
 * @returns {object} mutate, isLoading, isError, error 상태 반환
 * @author 홍규진
 */
export const useChattingMutation = () => {
  const {data, mutate, isPending} = useMutation({
    mutationKey: chattingMutationKey().mutationKey,
    mutationFn: ({
      workSpaceId,
      request,
    }: {
      workSpaceId: string;
      request: TPostChattingRequest;
    }) => chattingMutationKey().mutationFn(workSpaceId, request),
  });

  return {data, mutate, isPending};
};
