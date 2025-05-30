import {TemplateType} from './index.type';
import {
  DefaultTemplate,
  PresentationTemplate,
} from '@/assets/images/svg/template';

import DefaultTemplate1 from '@/assets/images/png/template/template1.png';
import DefaultTemplate2 from '@/assets/images/png/template/template2.png';
import DefaultTemplate3 from '@/assets/images/png/template/template3.png';

/**
 * 회의 시작 시 선택하는 템플릿 목록입니다.
 * 템플릿 이름, 설명, 아이콘을 포함합니다.
 * @author 홍규진
 */

export const templates: TemplateType[] = [
  {
    title: '동아리 활동일지',
    description:
      '동아리명, 활동 일시·장소·목적에서부터 참석 인원과 세부 활동 내용, 특기 사항까지 한눈에 기록하는 활동일지 양식입니다.',
    Icon: DefaultTemplate,
    previewImage: DefaultTemplate1,
  },
  {
    title: '필기형',
    description:
      '수업이나 강연, 세미나 등에서 핵심 키워드를 중심으로 필기 내용을 구조화하고 간단히 요약하기 위한 노트 템플릿입니다.',
    Icon: PresentationTemplate,
    previewImage: DefaultTemplate2,
  },
  {
    title: '회의록',
    description:
      '회의의 참석자, 안건, 논의 내용 및 최종 결론을 일목요연하게 기록하여 공유하기 위한 공식 회의록 양식입니다.',
    Icon: DefaultTemplate,
    previewImage: DefaultTemplate3,
  },
];
