import {TemplateType} from './index.type';
import {
  DefaultTemplate,
  PresentationTemplate,
} from '@/assets/images/svg/template';

/**
 * 회의 시작 시 선택하는 템플릿 목록입니다.
 * 템플릿 이름, 설명, 아이콘을 포함합니다.
 * @author 홍규진
 */

export const templates: TemplateType[] = [
  {
    title: '기본형',
    description: '기본형 템플릿에 대한 설명이 포함됩니다.',
    Icon: DefaultTemplate,
  },
  {
    title: '토론형',
    description: '토론형 템플릿에 대한 설명이 포함됩니다.',
    Icon: DefaultTemplate,
  },
  {
    title: '자유형',
    description: '자유형 템플릿에 대한 설명이 포함됩니다.',
    Icon: DefaultTemplate,
  },
  {
    title: '발표형',
    description: '발표형 템플릿에 대한 설명이 포함됩니다.',
    Icon: PresentationTemplate,
  },
  {
    title: '세미나',
    description: '세미나 템플릿에 대한 설명이 포함됩니다.',
    Icon: DefaultTemplate,
  },
  {
    title: '예시',
    description: '예시입니다.',
    Icon: PresentationTemplate,
  },
];
