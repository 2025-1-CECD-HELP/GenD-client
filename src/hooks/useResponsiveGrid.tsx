import {useCallback, useMemo, useState} from 'react';
import {LayoutChangeEvent} from 'react-native';

type UseResponsiveGridProps = {
  numColumns?: number;
  gap?: number;
};

export const useResponsiveGrid = ({
  numColumns = 2,
  gap = 16,
}: UseResponsiveGridProps) => {
  const [containerWidth, setContainerWidth] = useState(0);

  const onLayout = useCallback((e: LayoutChangeEvent) => {
    setContainerWidth(e.nativeEvent.layout.width);
  }, []);

  // 아이템 너비 계산
  const itemWidth = useMemo(() => {
    return (containerWidth - gap * (numColumns - 1)) / numColumns;
  }, [containerWidth, numColumns, gap]);

  return {
    itemWidth,
    containerWidth,
    onLayout,
    numColumns,
    gap,
  };
};
