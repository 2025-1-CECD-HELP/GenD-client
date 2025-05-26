/**
 * 워크스페이스 정보 타입입니다.
 * 해당 타입을 가변하여, Resspons 타입을 정의합니다.
 */
export type TWorkspace = {
  workspaceId: string;
  workspaceName: string;
  workspaceDescription: string;
  imageUrl: string;
  workspaceRole: string;
  rootDirId: string;
};

/**
 * 워크스페이스 리스트 정보 조회 응답 타입입니다.
 * Omit을 활용해 workspaceRole을 제외한 타입을 정의합니다.
 * @author 홍규진
 */
export type TGetWorkspaceListResponse = {
  workspaceList: TWorkspace[];
};

/**
 * 워크스페이스 정보 조회 응답 타입입니다.
 * @author 홍규진
 */
export type TGetWorkspaceInfoResponse = TWorkspace;

export type TCreateWorkspaceRequest = {
  imageUri?: string;
  workspaceName: string;
  workspaceDescription: string;
  inviteEmailList: {email: string}[];
};
