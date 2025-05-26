import {useMutation, useQueryClient} from '@tanstack/react-query';

import {
  TAddDirectoryRequest,
  TDeleteFileRequest,
  TPatchDirectoryRequest,
  TDeleteDirectoryRequest,
  TPatchFileRequest,
} from '@/services/file/types';
import {
  deleteFileMutationKey,
  patchDirectoryMutationKey,
  deleteDirectoryMutationKey,
  patchFileMutationKey,
} from '@/constants/mutationKeys';
import {addFileMutationKey} from '@/constants/mutationKeys';

/**
 * 파일 추가 뮤테이션 훅입니다.
 * 파일 추가 요청을 처리합니다.
 * 파일 추가시에 파일 목록 조회 캐시를 무효화합니다.
 * @returns 파일 추가 뮤테이션 함수
 * @author 홍규진
 */
export const useAddFileMutation = (workspaceId: string, parentId: number) => {
  const queryClient = useQueryClient();
  const {mutate} = useMutation({
    mutationKey: addFileMutationKey(workspaceId, parentId).mutationKey,
    mutationFn: (request: TAddDirectoryRequest) =>
      addFileMutationKey(workspaceId, parentId).mutationFn(request),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: addFileMutationKey(workspaceId, parentId).mutationSuccessKey,
      });
    },
  });

  return {
    mutate,
  };
};

/**
 * 파일 삭제 뮤테이션 훅입니다.
 * 파일 삭제 요청을 처리합니다.
 * 파일 삭제시에 파일 목록 조회 캐시를 무효화합니다.
 * @returns 파일 삭제 뮤테이션 함수
 * @author 홍규진
 */
export const useDeleteFileMutation = () => {
  const queryClient = useQueryClient();
  const {mutate} = useMutation({
    mutationKey: deleteFileMutationKey().mutationKey,
    mutationFn: (request: TDeleteFileRequest) =>
      deleteFileMutationKey().mutationFn(request),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: deleteFileMutationKey().mutationSuccessKey,
      });
    },
  });

  return {
    mutate,
  };
};

/**
 * 파일 명 변경 뮤테이션 훅입니다.
 * 파일 명 변경 요청을 처리합니다.
 * 파일 명 변경시에 파일 목록 조회 캐시를 무효화합니다.
 * @returns 파일 명 변경 뮤테이션 함수
 * @author 홍규진
 */
export const useRenameFileMutation = () => {
  const queryClient = useQueryClient();
  const {mutate} = useMutation({
    mutationKey: patchFileMutationKey().mutationKey,
    mutationFn: (request: TPatchFileRequest) =>
      patchFileMutationKey().mutationFn(request),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: patchFileMutationKey().mutationSuccessKey,
      });
    },
  });

  return {
    mutate,
  };
};
/**
 * 폴더 명 변경 뮤테이션 훅입니다.
 * 폴더 명 변경 요청을 처리합니다.
 * 폴더 명 변경시에 폴더 목록 조회 캐시를 무효화합니다.
 * @returns 폴더 명 변경 뮤테이션 함수
 * @author 홍규진
 */
export const useRenameDirectoryMutation = () => {
  const queryClient = useQueryClient();
  const {mutate} = useMutation({
    mutationKey: patchDirectoryMutationKey().mutationKey,
    mutationFn: (request: TPatchDirectoryRequest) =>
      patchDirectoryMutationKey().mutationFn(request),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: patchDirectoryMutationKey().mutationSuccessKey,
      });
    },
  });

  return {
    mutate,
  };
};

/**
 * 폴더 삭제 뮤테이션 훅입니다.
 * 폴더 삭제 요청을 처리합니다.
 * 폴더 삭제시에 폴더 목록 조회 캐시를 무효화합니다.
 * @returns 폴더 삭제 뮤테이션 함수
 * @author 홍규진
 */
export const useDeleteDirectoryMutation = () => {
  const queryClient = useQueryClient();
  const {mutate} = useMutation({
    mutationKey: deleteDirectoryMutationKey().mutationKey,
    mutationFn: (request: TDeleteDirectoryRequest) =>
      deleteDirectoryMutationKey().mutationFn(request),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: deleteDirectoryMutationKey().mutationSuccessKey,
      });
    },
  });

  return {
    mutate,
  };
};
