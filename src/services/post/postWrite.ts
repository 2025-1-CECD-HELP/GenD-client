import {privateInstance} from '../api/axios';
import {TGetResponse} from '../api/type';

export interface TPostWriteRequest {
  title: string;
  content: string;
  category: string;
  imageFiles?: string[];
}

export const postWriteArticle = async (
  data: TPostWriteRequest,
): Promise<boolean> => {
  try {
    const workspaceId = 1;
    const hasImages = data.imageFiles && data.imageFiles.length > 0;

    let response;

    if (hasImages) {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('content', data.content);
      formData.append('category', data.category);
      data.imageFiles?.forEach((file, index) => {
        formData.append('images', file);
      });

      response = await privateInstance.post<TGetResponse<null>>(
        `/posts/${workspaceId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
    } else {
      const payload = {
        title: data.title,
        content: data.content,
        category: data.category,
      };

      response = await privateInstance.post<TGetResponse<null>>(
        `/posts/${workspaceId}`,
        payload,
      );
    }

    if (response.status === 201 || response.status === 200) {
      return true;
    } else {
      throw new Error('글쓰기 실패');
    }
  } catch (err) {
    console.error('글쓰기 에러:', err);
    return false;
  }
};
