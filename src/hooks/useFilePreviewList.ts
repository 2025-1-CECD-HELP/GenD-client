import {useCallback} from 'react';
import {useResponsiveGrid} from './useResponsiveGrid';
import {FileData} from '@/components/FilePreview/index.type';

export const useFilePreviewList = (
  position: 'member' | 'manager',
  onPressFile: (file: FileData) => void,
  onPressDownload: (file: FileData) => void,
  onPressMoreIcon: (file: FileData) => void,
) => {
  const {itemWidth, onLayout, numColumns, gap} = useResponsiveGrid({
    numColumns: 2,
    gap: 16,
  });

  // 파일 클릭 핸들러
  const handlePressFile = useCallback(
    (file: FileData) => {
      onPressFile(file);
    },
    [onPressFile],
  );

  const handlePressAction = (file: FileData) => {
    if (position === 'member') {
      onPressDownload(file);
    } else {
      onPressMoreIcon(file);
    }
  };

  return {
    itemWidth,
    onLayout,
    numColumns,
    gap,
    handlePressAction,
    handlePressFile,
  };
};
