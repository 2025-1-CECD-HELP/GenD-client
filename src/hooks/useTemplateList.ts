import {useState} from 'react';
import {useResponsiveGrid} from '@/hooks/useResponsiveGrid';
import {TemplateType} from '@/components/Template/index.type';

export const useTemplateList = (templates: TemplateType[]) => {
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
