import React from 'react';
import {FlatList} from 'react-native';
import {Template} from '.';
import {TemplateType} from './index.type';
import {
  DefaultTemplate,
  PresentationTemplate,
} from '@/assets/images/svg/template';
import {columnWrapperStyle, FilePreviewWrapper} from './TemplateList.style';
import {useTemplateList} from '@/components/Template/useTemplateList';

/**
 * 여러 개의 템플릿을 2열 그리드의 형태로 보여주는 TemplateList 컴포넌트입니다.
 * useState로 사용자가 선택한 템플릿을 관리하며,
 * 한번에 하나의 템플릿만 선택될 수 있도록 합니다.
 * @author 이정선
 */

// 임의의 템플릿 목록
const templates: TemplateType[] = [
  {
    title: '기본형',
    description: '기본형 템플릿에 대한 설명이 포함됩니다.',
    Icon: DefaultTemplate,
  },
  {
    title: '발표형',
    description: '발표형 템플릿에 대한 설명이 포함됩니다.',
    Icon: PresentationTemplate,
  },
  {
    title: '예시',
    description: '예시입니다.',
    Icon: PresentationTemplate,
  },
];

export const TemplateList = () => {
  const {itemWidth, onLayout, numColumns, gap, selectedTemplate, handleSelect} =
    useTemplateList(templates);
  return (
    <FlatList
      data={templates}
      columnWrapperStyle={columnWrapperStyle(gap)}
      onLayout={onLayout}
      renderItem={({item}) => (
        <FilePreviewWrapper width={itemWidth}>
          <Template
            template={item}
            isSelected={selectedTemplate === item.title}
            onPressTemplate={() => handleSelect(item.title)}
            onPreePreview={() => console.log('프리뷰 보기')}
          />
        </FilePreviewWrapper>
      )}
      keyExtractor={(item, index) => index.toString()}
      numColumns={numColumns}
    />
  );
};
