import React, {useState} from 'react';
import {FlatList, View} from 'react-native';
import {Template} from '.';
import {
  DefaultTemplate,
  PresentationTemplate,
} from '@/assets/images/svg/template';

/**
 * 여러 개의 템플릿을 2열 그리드의 형태로 보여주는 TemplateList 컴포넌트입니다.
 * useState로 사용자가 선택한 템플릿을 관리하며,
 * 한번에 하나의 템플릿만 선택될 수 있도록 합니다.
 * @author 이정선
 */

// 임의의 템플릿 목록
const templates = [
  {
    title: '기본형',
    description: '기본형 템플릿에 대한 설명이 포함됩니다.',
    icon: DefaultTemplate,
  },
  {
    title: '발표형',
    description: '발표형 템플릿에 대한 설명이 포함됩니다.',
    icon: PresentationTemplate,
  },
  {
    title: '예시',
    description: '예시입니다.',
    icon: PresentationTemplate,
  },
];

export const TemplateList = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  return (
    <FlatList
      data={templates}
      columnWrapperStyle={{
        justifyContent: 'space-between',
        marginBottom: 16,
        gap: 16,
      }}
      onLayout={e => setContainerWidth(e.nativeEvent.layout.width)}
      renderItem={({item}) => (
        <View style={{width: (containerWidth - 16) / 2}}>
          <Template
            key={item.title}
            title={item.title}
            description={item.description}
            Icon={item.icon}
            isSelected={selectedTemplate === item.title}
            onPressTemplate={() => setSelectedTemplate(item.title)}
            onPreePreview={() => console.log('프리뷰 보여주기')}
          />
        </View>
      )}
      keyExtractor={(item, index) => index.toString()}
      numColumns={2}
    />
  );
};
