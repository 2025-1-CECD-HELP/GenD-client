import {privateServerInstance} from '../api/axios';
import {TGetResponse} from '../api/type';
import {
  TCreateWorkspaceRequest,
  TEditWorkspaceRequest,
  TGetWorkspaceInfoResponse,
  TGetWorkspaceListResponse,
} from './types';

/**
 * 워크스페이스 리스트 조회 API 호출 함수입니다.
 * @author 홍규진
 */
export const getWorkspaceList =
  async (): Promise<TGetWorkspaceListResponse> => {
    const response = await privateServerInstance.get<
      TGetResponse<TGetWorkspaceListResponse>
    >('/api/v1/workspaces');
    return response.data.data;
  };

/**
 * 워크스페이스 정보 조회 API 호출 함수입니다.
 * @author 홍규진
 */
export const getWorkspaceInfo = async (
  workspaceId: string,
): Promise<TGetWorkspaceInfoResponse> => {
  const response = await privateServerInstance.get<
    TGetResponse<TGetWorkspaceInfoResponse>
  >(`/api/v1/workspaces/${workspaceId}`);
  return response.data.data;
};

/**
 * 워크스페이스 생성 API 호출 함수입니다.
 * @author 홍규진
 */
export const createWorkspace = async (
  workspace: TCreateWorkspaceRequest & {imageUri?: string},
): Promise<boolean> => {
  const formData = new FormData();

  // 이미지가 있으면 추가
  formData.append('image', {
    uri: workspace.imageUri,
    type: 'image/jpeg', // 또는 실제 타입
    name: 'workspace.jpg', // 또는 실제 파일명
  });

  // JSON 데이터 추가
  const jsonPayload = {
    workspaceName: workspace.workspaceName,
    workspaceDescription: workspace.workspaceDescription,
    inviteEmailList: workspace.inviteEmailList,
  };

  // 워크스페이스 데이터를 FormData에 추가 application/json 으로 지정해야만 함.
  formData.append('json', {
    uri:
      'data:application/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(jsonPayload)),
    type: 'application/json',
    name: 'workspace.json',
  });

  const response = await privateServerInstance.post(
    '/api/v1/workspaces',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  return response.data.data;
};

/**
 * 워크스페이스 생성 API 호출 함수입니다.
 * @author 홍규진
 */
export const editWorkspace = async (
  workspace: TEditWorkspaceRequest & {imageUri?: string},
): Promise<boolean> => {
  const formData = new FormData();

  // 이미지가 있으면 추가
  formData.append('image', {
    uri: workspace.imageUri,
    type: 'image/jpeg', // 또는 실제 타입
    name: 'workspace.jpg', // 또는 실제 파일명
  });

  // JSON 데이터 추가
  const jsonPayload = {
    workspaceName: workspace.workspaceName,
    workspaceDescription: workspace.workspaceDescription,
    inviteEmailList: workspace.inviteEmailList,
  };

  // 워크스페이스 데이터를 FormData에 추가 application/json 으로 지정해야만 함.
  formData.append('json', {
    uri:
      'data:application/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(jsonPayload)),
    type: 'application/json',
    name: 'workspace.json',
  });

  const response = await privateServerInstance.patch(
    `/api/v1/workspaces/${workspace.workspaceId}`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  return response.data.data;
};

/**
 * 워크스페이스 삭제 API 호출 함수입니다.
 * @author 홍규진
 */
export const deleteWorkspace = async (workspaceId: string): Promise<void> => {
  await privateServerInstance.delete(`/api/v1/workspaces/${workspaceId}`);
};
