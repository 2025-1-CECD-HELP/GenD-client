/** 파일 목록 조회 요청 타입 */
export type TGetFileListRequest = {
  workspaceId: string;
  dirId: number;
};

/** 파일 목록 조회 응답 타입 */
export type TGetFileListResponse = {
  dirId: number;
  dirName: string;
  directoryList: TDirectory[];
  fileList: TFile[];
};

/** 파일 추가 요청 타입 */
export type TAddDirectoryRequest = {
  workspaceId: string;
  parentId: number;
  directoryName: string;
};

/** 파일 삭제 요청 타입 */
export type TDeleteFileRequest = {
  documentId: number;
};

/** 파일 명 변경 요청 타입 */
export type TPatchFileRequest = {
  documentId: number;
  documentTitle: string;
};

/** 폴더 명 변경 요청 타입 */
export type TPatchDirectoryRequest = {
  workspaceId: string;
  dirId: number;
  directoryName: string;
};

/** 폴더 삭제 요청 타입 */
export type TDeleteDirectoryRequest = {
  dirId: number;
};

/** 폴더 목록  */
export type TGetDirectoryListResponse = {
  directoryList: TDirectory[];
};

/** 폴더 타입 */
export type TDirectory = {
  dirId: number;
  dirName: string;
  parId: number;
};

/** 파일 타입 */
export type TFile = {
  documentId: number;
  documentTitle: string;
  docuementType: string;
  createdAt: string;
  documentFile: string;
};
