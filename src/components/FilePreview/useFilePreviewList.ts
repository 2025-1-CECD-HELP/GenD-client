import {useCallback} from 'react';
import {useResponsiveGrid} from '@/hooks/useResponsiveGrid';
import {FileData} from '@/components/FilePreview/index.type';
/**
 * 해당 훅은 FilePreviewList 컴포넌트의 로직을 분리하여 관리합니다.
 * 사용자 권한에 따라 액션 버튼 클릭 시 실행될 함수(handlePressAction)를 각 권한에 맞게 반환합니다.
 * 또한 파일 클릭 시 호출되는 handlePressFile 콜백을 제공합니다.
 * useResponsiveGrid 훅을 활용하여 그리드 레이아웃을 구성하는 데 필요한 값을 반환합니다.
 *
 * 이를 통해 FilePreviewList 컴포넌트 내에서는 UI 관련 로직만 관리하고,
 * 각종 핸들링 및 레이아웃 계산 로직은 본 훅에서 한번에 처리할 수 있습니다.
 * @author 이정선
 */

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
