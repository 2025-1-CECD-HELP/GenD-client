import {useMutation, useQueryClient} from '@tanstack/react-query';
import {createScheduleMutationKey} from '@/constants/mutationKeys';
import {TPostScheduleRequest} from '@/services/calendar/types';
import {useAtomValue} from 'jotai';
import {workspaceState} from '@/atoms/workspace';
import {useBottomSheet} from '@/contexts/bottomSheet/BottomSheetContext';

/**
 * 일정 생성 뮤테이션 훅입니다.
 * 일정 생성 요청을 처리합니다.
 * 일정 생성시에 일정 목록 조회 캐시를 무효화합니다.
 * 성공시엔 성공 모달을 띄우고, 확인을 누를 시에 캘린더 화면으로 이동합니다.
 * @returns 일정 생성 뮤테이션 함수
 * @author 홍규진
 */
export const useCreateScheduleMutation = () => {
  const queryClient = useQueryClient();
  const workspace = useAtomValue(workspaceState);
  const {closeBottomSheet} = useBottomSheet();
  const {mutate} = useMutation({
    mutationKey: createScheduleMutationKey(workspace.workspaceId).mutationKey,
    mutationFn: (request: TPostScheduleRequest) =>
      createScheduleMutationKey(workspace.workspaceId).mutationFn(request),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: createScheduleMutationKey(workspace.workspaceId)
          .mutationSuccessKey,
      });
      closeBottomSheet();
    },
  });

  return {
    mutate,
  };
};
