import {getMemberList} from '@/services';
import {getScheduleList} from '@/services/calendar';
import {getDirectoryList, getFileList} from '@/services/file';
import {getCategoryList, getPostList} from '@/services/post';
import {getWorkspaceInfo, getWorkspaceList} from '@/services/workspace';

/**
 * Tanstack Query 중 useQuery / useSuspenseQuery 사용시 편의성을 위해 키와 함수를 한 군데가 모아두는 파일입니다.
 * 형식은 다음과 같습니다.
 * export const getWorkSpacesQuery = (id: string) => {
 *   return {
 *     queryKey: ['workSpaces', {filterId : id}],
 *     queryFn: () => getWorkSpaces(),
 *   };
 * };
 * @author 홍규진
 */

/** 캘린더 일정 목록 조회 */
export const calendarQuery = (workspaceId: string) => {
  return {
    queryKey: ['calendar', {workspaceId}],
    queryFn: () => getScheduleList(workspaceId),
  };
};
/** 워크 스페이스 리스트 조회 */
export const workspaceListQuery = () => {
  return {
    queryKey: ['workspaceList'],
    queryFn: () => getWorkspaceList(),
  };
};

/**워크 스페이스 정보 조회 */
export const workspaceQuery = (workspaceId: string) => {
  return {
    queryKey: ['workspace', {workspaceId}],
    queryFn: () => getWorkspaceInfo(workspaceId),
  };
};

/** 게시글 목록 조회 */
export const postQuery = (workspaceId: string) => {
  return {
    queryKey: ['post', workspaceId],
    queryFn: () => getPostList(workspaceId),
  };
};

/** 카테고리 목록 조회 */
export const categoryListQuery = (workspaceId: string) => {
  return {
    queryKey: ['category', {workspaceId}],
    queryFn: () => getCategoryList(workspaceId),
  };
};

/** 멤버 목록 조회 */
export const memberListQuery = (workspaceId: string) => {
  return {
    queryKey: ['memberList', {workspaceId}],
    queryFn: () => getMemberList(workspaceId),
  };
};

/** 파일 목록 조회 */
export const fileQuery = (workspaceId: string, dirId: number) => {
  return {
    queryKey: ['file', {workspaceId, dirId}],
    queryFn: () => getFileList({workspaceId, dirId}),
  };
};

/** 디렉토리 목록 조회 (현재는 회의록 저장 시에만 사용합니다.) */
export const directoryListQuery = (workspaceId: string) => {
  return {
    queryKey: ['directoryList', {workspaceId}],
    queryFn: () => getDirectoryList(workspaceId),
  };
};
