import React from 'react';
import {FlatList} from 'react-native';
import {Template} from '.';
import {
  columnWrapperStyle,
  FilePreviewWrapper,
  TemplatePreview,
} from './TemplateList.style';
import {useTemplateList} from '@/components/Template/useTemplateList';
import {templates} from './index.const';
import {useModal} from '@/contexts/modal/ModalContext';
import CommonModal from '../CommonModal';

/**
 * 여러 개의 템플릿을 2열 그리드의 형태로 보여주는 TemplateList 컴포넌트입니다.
 * useState로 사용자가 선택한 템플릿을 관리하며,
 * 한번에 하나의 템플릿만 선택될 수 있도록 합니다.
 * @author 이정선, 홍규진
 */

type TemplateListProps = {
  selectedTemplate: string | null;
  onSelectTemplate: (title: string) => void;
};

export const TemplateList = ({
  selectedTemplate,
  onSelectTemplate,
}: TemplateListProps) => {
  const {itemWidth, onLayout, numColumns, gap} = useTemplateList();
  const {setIsOpen, setModalContent} = useModal();
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
            onPressTemplate={() => onSelectTemplate(item.title)}
            onPreePreview={() => {
              setModalContent(
                <CommonModal
                  type="default"
                  title="템플릿 미리보기"
                  onConfirm={() => setIsOpen(false)}
                  onCancel={() => setIsOpen(false)}
                  height={900}
                  children={<TemplatePreview source={item.previewImage} />}
                />,
              );
              setIsOpen(true);
            }}
          />
        </FilePreviewWrapper>
      )}
      keyExtractor={(item, index) => index.toString()}
      numColumns={numColumns}
    />
  );
};
