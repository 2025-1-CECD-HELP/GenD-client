import {useState} from 'react';
import {useResponsiveGrid} from '@/hooks/useResponsiveGrid';
/**
 * 해당 훅은 TemplateList 컴포넌트의 로직을 분리하여 관리합니다.
 * template 선택에 따른 단일 상태 관리를 처리합니다.
 * 또한 useResponsiveGrid 훅을 활용하여 그리드 레이아웃을 구성하는 데 필요한 값을 반환합니다.
 *
 * 이를 통해 TemplateList 컴포넌트 내에서는 UI 관련 로직만 관리하고,
 * 상태 및 레이아웃 관련 로직은 본 훅에서 한번에 처리할 수 있습니다.
 * @author 이정선
 */
export const useTemplateList = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const handleSelect = (title: string) => setSelectedTemplate(title);

  const {itemWidth, onLayout, numColumns, gap} = useResponsiveGrid({
    numColumns: 2,
    gap: 16,
  });

  return {
    itemWidth,
    onLayout,
    numColumns,
    gap,
    selectedTemplate,
    handleSelect,
  };
};
