import {privateServerInstance} from '@/services/api/axios';
import {TGetResponse} from '@/services/api/type';
import {
  TDeleteFileRequest,
  TGetFileListRequest,
  TGetFileListResponse,
  TGetDirectoryListResponse,
  TAddDirectoryRequest,
  TPatchDirectoryRequest,
  TDeleteDirectoryRequest,
  TPatchFileRequest,
} from './types';

/**
 * 파일 목록 조회 API 호출 함수입니다.
 * @author 홍규진
 */
export const getFileList = async (
  request: TGetFileListRequest,
): Promise<TGetFileListResponse> => {
  const response = await privateServerInstance.get<
    TGetResponse<TGetFileListResponse>
  >(`/api/v1/files/${request.workspaceId}/${request.dirId}`);
  return response.data.data;
};

export const deleteFile = async (request: TDeleteFileRequest) => {
  await privateServerInstance.delete<TGetResponse<void>>(
    `/api/v1/files/${request.documentId}`,
  );
};

/**
 * 디렉토리 목록 조회 API 호출 함수입니다.
 * (현재는 회의록 저장 시에만 사용합니다.)
 * @author 홍규진
 */
export const getDirectoryList = async (workspaceId: string) => {
  const response = await privateServerInstance.get<
    TGetResponse<TGetDirectoryListResponse>
  >(`/api/v1/directory/${workspaceId}`);
  return response.data.data;
};

/**
 * 파일 명 변경 API 호출 함수입니다.
 * @param request 파일 명 변경 요청 타입
 * @author 홍규진
 */
export const patchFile = async (request: TPatchFileRequest) => {
  await privateServerInstance.patch<TGetResponse<void>>(
    `/api/v1/files/${request.documentId}`,
    {
      documentTitle: request.documentTitle,
    },
  );
};

/**
 * 폴더 추가 API 호출 함수입니다.
 * @param request 폴더 추가 요청 타입
 * @author 홍규진
 */
export const postDirectory = async (request: TAddDirectoryRequest) => {
  await privateServerInstance.post<TGetResponse<void>>(
    `/api/v1/directory/${request.workspaceId}/${request.parentId}`,
    {
      directoryName: request.directoryName,
    },
  );
};

/**
 * 폴더 명 변경 API 호출 함수입니다.
 * @param request 폴더 명 변경 요청 타입
 * @author 홍규진
 */
export const patchDirectory = async (request: TPatchDirectoryRequest) => {
  await privateServerInstance.patch<TGetResponse<void>>(
    `/api/v1/directory/${request.dirId}`,
    {
      directoryName: request.directoryName,
    },
  );
};

/**
 * 폴더 삭제 API 호출 함수입니다.
 * @param request 폴더 삭제 요청 타입
 * @author 홍규진
 */
export const deleteDirectory = async (request: TDeleteDirectoryRequest) => {
  await privateServerInstance.delete<TGetResponse<void>>(
    `/api/v1/directory/${request.dirId}`,
  );
};
