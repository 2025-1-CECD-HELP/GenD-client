import {privateAIInstance} from '../api/axios';
import {TGetResponse} from '../api/type';
import {
  TPostFinalTemplateContent,
  TPostSubmitRecordRequest,
  TPostSubmitRecordResponse,
} from './types';

/**
 * 회의록 저장(제출) API 호출 함수입니다.
 * 회의록 최초 저장 시 key, value 형식으로 데이터를 받아와 이를 수정해야합니다.
 * @author 홍규진
 */
export const submitRecord = async (
  request: TPostSubmitRecordRequest,
): Promise<TPostSubmitRecordResponse | null> => {
  // FormData 생성
  const formData = new FormData();
  // 템플릿 ID 등 기타 필드 추가
  formData.append('templateId', request.templateId);
  // 파일 추가
  formData.append('meetingRecord', request.meetingRecord);

  const response = await privateAIInstance.post<
    TGetResponse<TPostSubmitRecordResponse>
  >('/meetings', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data.data;
};

/**
 * 회의록 최종 제출 API 호출 함수입니다.
 * 수정한 회의록 데이터를 제출합니다.
 * @author 홍규진
 */
export const finalSubmitRecord = async (
  request: TPostFinalTemplateContent,
): Promise<void> => {
  await privateAIInstance.post<TGetResponse<void>>('/meetings/save', request);
};
