import {
  TCreateWorkspaceRequest,
  TEditWorkspaceRequest,
} from '@/services/workspace/types';
import {
  calendarQuery,
  memberListQuery,
  userQuery,
  workspaceListQuery,
  workspaceQuery,
} from './queryKeys';
import {
  createWorkspace,
  deleteWorkspace,
  editWorkspace,
} from '@/services/workspace';
import {TPostSubmitRecordRequest} from '@/services/meeting/types';
import {submitRecord} from '@/services/meeting';
import {TPostFinalTemplateContent} from '@/services/meeting/types';
import {finalSubmitRecord} from '@/services/meeting';
import {
  TDeleteMemberRequest,
  TUpdateMemberRequest,
} from '@/services/member/types';
import {addMember, deleteMember, updateMember} from '@/services/member';
import {
  TGetChattingResponse,
  TPostChattingRequest,
} from '@/services/secretary/types';
import {chatting} from '@/services/secretary';
import {postQuery} from './queryKeys';
import {TDeletePostRequest, TUpdatePostPinRequest} from '@/services/post/types';
import {patchPostPin} from '@/services/post';
import {deletePost} from '@/services/post';
import {
  deleteDirectory,
  deleteFile,
  patchDirectory,
  patchFile,
  postDirectory,
} from '@/services/file';
import {
  TAddDirectoryRequest,
  TDeleteFileRequest,
  TPatchDirectoryRequest,
  TDeleteDirectoryRequest,
  TPatchFileRequest,
} from '@/services/file/types';
import {fileQuery} from './queryKeys';
import {
  TEmailSignupRequest,
  TUpdateUserAlarmRequest,
} from '@/services/auth/types';
import {emailSignup, updateUserAlarm} from '@/services/auth';
import {TPostScheduleRequest} from '@/services/calendar/types';
import {createSchedule} from '@/services/calendar';
import {TEmailSigninRequest} from '@/services/auth/types';
import {emailLogin} from '@/services/auth';

/**
 * Tanstack Query 중 useMutation 사용시 편의성을 위해 키와 함수를 한 군데가 모아두는 파일입니다.
 * useMutation 사용시 성공 시 어떤 키를 무효화 할지 정의해야합니다.
 * 형식은 다음과 같습니다.
 * export const mutationKeys = () => {
 *   return {
 *     mutationKey: ['mutationKey'],
 *     mutationSuccessKey: [...getWorkSpacesQuery().queryKey],
 *     mutationFn: () => mutationFn(),
 *   };
 * };
 * @author 홍규진
 */

/**
 * 워크스페이스 생성 뮤테이션 키
 * @author 홍규진
 */
export const createWorkspaceMutationKey = () => {
  return {
    mutationKey: ['workspace'],
    mutationSuccessKey: [...workspaceListQuery().queryKey],
    mutationFn: (workspace: TCreateWorkspaceRequest) =>
      createWorkspace(workspace),
  };
};

/**
 * 워크스페이스 수정 뮤테이션 키
 * @author 홍규진
 */
export const editWorkspaceMutationKey = (workspaceId: string) => {
  return {
    mutationKey: ['editWorkspace'],
    mutationSuccessKey: [
      ...workspaceQuery(workspaceId).queryKey,
      ...workspaceListQuery().queryKey,
    ],
    mutationFn: (workspace: TEditWorkspaceRequest) => editWorkspace(workspace),
  };
};

/**
 * 워크스페이스 삭제 뮤테이션 키
 * @author 홍규진
 */
export const deleteWorkspaceMutationKey = () => {
  return {
    mutationKey: ['deleteWorkspace'],
    mutationSuccessKey: [...workspaceListQuery().queryKey],
    mutationFn: (workspaceId: string) => deleteWorkspace(workspaceId),
  };
};

/**
 * 회의록 저장 및 미리보기 받기 뮤테이션 키
 * 회의록 최초 저장 후 미리보기 데이터를 받지만, 이는 캐시에 저장되지 않습니다.
 * @author 홍규진
 */
export const submitRecordMutationKey = () => {
  return {
    mutationKey: ['submitRecord'],
    mutationSuccessKey: [],
    mutationFn: (request: TPostSubmitRecordRequest) => submitRecord(request),
  };
};

/**
 * 회의록 최종 저장 뮤테이션 키
 * //TODO-[규진] 최종 저장 후 회의록 목록 조회 캐시를 무효화합니다.
 * @author 홍규진
 */
export const finalSubmitRecordMutationKey = (
  workspaceId: string,
  dirId: string,
) => {
  return {
    mutationKey: ['finalSubmitRecord'],
    mutationSuccessKey: [
      ...fileQuery(workspaceId, parseInt(dirId, 10)).queryKey,
    ],
    mutationFn: (request: TPostFinalTemplateContent) =>
      finalSubmitRecord(request),
  };
};

/**
 * 멤버 추가 뮤테이션 키
 * @author 홍규진
 */
export const memberAddMutationKey = (workspaceId: string) => {
  return {
    mutationKey: ['memberAdd'],
    mutationSuccessKey: [...memberListQuery(workspaceId).queryKey],
    mutationFn: (workspaceId: string, email: string) =>
      addMember(workspaceId, email),
  };
};

/**
 * 멤버 권한 변경 뮤테이션 키
 * @author 홍규진
 */
export const memberUpdateMutationKey = (workspaceId: string) => {
  return {
    mutationKey: ['memberUpdate'],
    mutationSuccessKey: [...memberListQuery(workspaceId).queryKey],
    mutationFn: (member: TUpdateMemberRequest) =>
      updateMember(workspaceId, member),
  };
};

/**
 * 멤버 강퇴 뮤테이션 키
 * @author 홍규진
 */
export const memberDeleteMutationKey = (workspaceId: string) => {
  return {
    mutationKey: ['memberDelete'],
    mutationSuccessKey: [...memberListQuery(workspaceId).queryKey],
    mutationFn: (member: TDeleteMemberRequest) =>
      deleteMember(member.workspaceId, member.memberId),
  };
};

/**
 * 채팅 전송 뮤테이션 키
 * @author 홍규진
 */
export const chattingMutationKey = () => {
  return {
    mutationKey: ['chatting'],
    mutationSuccessKey: [],
    mutationFn: async (
      workspaceId: string,
      request: TPostChattingRequest,
    ): Promise<TGetChattingResponse> => {
      const response = await chatting(workspaceId, request);
      return response;
    },
  };
};

/**
 * 게시글 핀 박기 뮤테이션 키
 * @author 홍규진
 */
export const patchPostPinMutationKey = (workspaceId: string) => {
  return {
    mutationKey: ['patchPostPin'],
    mutationSuccessKey: [...postQuery(workspaceId).queryKey],
    mutationFn: async (request: TUpdatePostPinRequest): Promise<void> => {
      await patchPostPin(request.postId);
    },
  };
};

/**
 * 게시글 삭제 뮤테이션 키
 * @author 홍규진
 */
export const deletePostMutationKey = (workspaceId: string) => {
  return {
    mutationKey: ['deletePost'],
    mutationSuccessKey: [...postQuery(workspaceId).queryKey],
    mutationFn: async (request: TDeletePostRequest) => {
      await deletePost(request.postId);
    },
  };
};

/**
 * 파일 추가 뮤테이션 키
 * @author 홍규진
 */
export const addFileMutationKey = (workspaceId: string, parentId: number) => {
  return {
    mutationKey: ['addFile'],
    mutationSuccessKey: [...fileQuery(workspaceId, parentId).queryKey],
    mutationFn: (request: TAddDirectoryRequest) => postDirectory(request),
  };
};

/**
 * 파일 삭제 뮤테이션 키
 * @author 홍규진
 */
export const deleteFileMutationKey = () => {
  return {
    mutationKey: ['deleteFile'],
    mutationSuccessKey: [],
    mutationFn: (request: TDeleteFileRequest) => deleteFile(request),
  };
};

/**
 * 폴더 명 변경 뮤테이션 키
 * @author 홍규진
 */
export const patchDirectoryMutationKey = () => {
  return {
    mutationKey: ['patchDirectory'],
    mutationSuccessKey: [],
    mutationFn: (request: TPatchDirectoryRequest) => patchDirectory(request),
  };
};

/**
 * 폴더 삭제 뮤테이션 키
 * @author 홍규진
 */
export const deleteDirectoryMutationKey = () => {
  return {
    mutationKey: ['deleteDirectory'],
    mutationSuccessKey: [],
    mutationFn: (request: TDeleteDirectoryRequest) => deleteDirectory(request),
  };
};

/**
 * 파일 명 변경 뮤테이션 키
 * @author 홍규진
 */
export const patchFileMutationKey = () => {
  return {
    mutationKey: ['patchFile'],
    mutationSuccessKey: [],
    mutationFn: (request: TPatchFileRequest) => patchFile(request),
  };
};

/**
 * 유저 알람 설정 수정 뮤테이션 키
 */
export const userAlarmMutationKey = (workspaceId: string) => {
  return {
    mutationKey: ['userAlarm'],
    mutationSuccessKey: [...userQuery(workspaceId).queryKey],
    mutationFn: (request: TUpdateUserAlarmRequest) => updateUserAlarm(request),
  };
};

/**
 * 일정 생성 뮤테이션 키
 * @author 홍규진
 */
export const createScheduleMutationKey = (workspaceId: string) => {
  return {
    mutationKey: ['createSchedule'],
    mutationSuccessKey: [...calendarQuery(workspaceId).queryKey],
    mutationFn: (request: TPostScheduleRequest) => createSchedule(request),
  };
};

/**
 * 이메일 로그인 뮤테이션 키
 * @author 홍규진
 */
export const emailSigninMutationKey = () => {
  return {
    mutationKey: ['emailSignin'],
    mutationSuccessKey: [],
    mutationFn: (request: TEmailSigninRequest) => emailLogin(request),
  };
};

/**
 * 이메일 회원가입 뮤테이션 키
 * @author 홍규진
 */
export const emailSignupMutationKey = () => {
  return {
    mutationKey: ['emailSignup'],
    mutationSuccessKey: [],
    mutationFn: (request: TEmailSignupRequest) => emailSignup(request),
  };
};
