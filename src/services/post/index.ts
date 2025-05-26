import {privateServerInstance} from '../api/axios';
import {TGetResponse} from '../api/type';
import {
  TCreateCategoryRequest,
  TGetCategoryResponse,
  TGetPostResponse,
  TPostWriteRequest,
} from './types';
import {Asset} from 'react-native-image-picker';

/**
 * 게시글 목록 조회 API 호출 함수입니다.
 * @param workspaceId 워크스페이스 ID
 * @returns 게시글 목록
 * @author 홍규진
 */

export const getPostList = async (workspaceId: string) => {
  const response = await privateServerInstance.get<
    TGetResponse<TGetPostResponse>
  >(`/api/v1/posts/${workspaceId}`);
  return response.data.data.postList;
};

/**
 * 게시글 작성 API 호출 함수입니다.
 * @param request 게시글 작성 요청 데이터
 * @param imageFiles 이미지 파일 배열
 * @returns 게시글 작성 응답
 * @author 홍규진
 */
export const createPost = async (
  workspaceId: string,
  request: TPostWriteRequest,
  imageFile: Asset,
): Promise<void> => {
  const formData = new FormData();

  // 게시글 데이터를 FormData에 추가 application/json 으로 지정해야만 함.
  formData.append('posts', {
    uri:
      'data:application/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(request)),
    type: 'application/json',
    name: 'posts.json',
  });

  // 이미지 파일들을 추가
  formData.append('image', {
    uri: imageFile.uri,
    type: imageFile.type,
    name: imageFile.fileName,
  });

  await privateServerInstance.post<TGetResponse<void>>(
    `/api/v1/posts/${workspaceId}`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
};

/**
 * 게시글 삭제 API 호출 함수입니다.
 * @param postId 게시글 ID
 * @returns 게시글 삭제 응답
 * @author 홍규진
 */
export const deletePost = async (postId: number) => {
  await privateServerInstance.delete<TGetResponse<void>>(
    `/api/v1/posts/${postId}`,
  );
};
/**
 * 카테고리 목록 조회 API 호출 함수입니다.
 * @param workspaceId 워크스페이스 ID
 * @returns 카테고리 목록
 * @author 홍규진
 */
export const getCategoryList = async (workspaceId: string) => {
  const response = await privateServerInstance.get<
    TGetResponse<TGetCategoryResponse>
  >(`/api/v1/posts/${workspaceId}/category`);
  return response.data.data.categoryList;
};

/**
 * 카테고리 생성 API 호출 함수입니다.
 * @param category 카테고리 데이터
 * @returns 카테고리 생성 응답
 * @author 홍규진
 */
export const createCategory = async (
  workspaceId: string,
  category: TCreateCategoryRequest,
) => {
  const response = await privateServerInstance.post<TGetResponse<void>>(
    `/api/v1/posts/${workspaceId}/category`,
    category,
  );
  return response.data.data;
};

/**
 * 게시글 핀 박기 API 호출 함수입니다.
 * @param postId 게시글 ID
 * @returns 게시글 핀 박기 응답
 * @author 홍규진
 */
export const patchPostPin = async (postId: number) => {
  await privateServerInstance.patch<TGetResponse<void>>(
    `/api/v1/posts/${postId}/pin`,
  );
};
