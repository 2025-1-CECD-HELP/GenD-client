/**
 * 회의록 저장(제출) 요청 타입
 * @author 홍규진
 */
export type TPostSubmitRecordRequest = {
  templateId: string;
  meetingRecord: {
    uri: string;
    name: string;
    type: string;
  };
};

/**
 * 회의록 저장(제출) 응답 타입
 * @author 홍규진
 */
export type TPostSubmitRecordResponse = {
  templateId: string;
  templateContent: TTemplateContent[];
};

/**
 * 회의록 저장(제출) 템플릿 컨텐츠 타입
 * @author 홍규진
 */
export type TTemplateContent = {
  objectKey: string;
  objectValue: string;
};

/**
 * 최종 회의록 저장(제출) 템플릿 컨텐츠 타입
 * @author 홍규진
 */
export type TPostFinalTemplateContent = {
  templateId: string;
  templateContent: TTemplateContent[];
};
