// contexts/bottomSheet/BottomSheetContext.tsx
import React, {
  createContext,
  useContext,
  useRef,
  useState,
  ReactNode,
} from 'react';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import {useTheme} from '../theme/ThemeContext';
import BottomSheetContainer from '@/components/BottomSheetContainer';
/**
 * 이 컴포넌트는 BottomSheet를 관리하는 Context입니다.
 * BottomSheetProvider로 감싸진 컴포넌트에서 useBottomSheet를 사용하여 BottomSheet를 열고 닫을 수 있습니다.
 * BottomSheetProvider는 BottomSheet를 열고 닫는 함수와 BottomSheet 내부 컨텐츠의 상태를 관리합니다.
 * BottomSheet는 BottomSheetContainer를 사용하여 바텀 시트의 컨텐츠를 감싸줍니다.
 * BottomSheetContainer는 바텀 시트의 스타일을 적용한 래퍼입니다.(단순히 스타일을 적용하는 역할만 수행합니다.)
 * BottomSheet는 @gorhom/bottom-sheet 라이브러리를 사용하여 구현되었습니다.
 * 동적인 사이즈 조정과 드래그로 닫기 기능을 지원합니다.
 * @author 홍규진
 */

type BottomSheetContextType = {
  openBottomSheet: (content: ReactNode) => void;
  closeBottomSheet: () => void;
};

const BottomSheetContext = createContext<BottomSheetContextType | null>(null);

export const BottomSheetProvider = ({children}: {children: ReactNode}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [content, setContent] = useState<ReactNode>(null);
  const theme = useTheme();

  const openBottomSheet = (bottomSheetComponent: ReactNode) => {
    setTimeout(() => {
      bottomSheetRef.current?.expand();
      bottomSheetRef.current?.snapToIndex(0);
    }, 200);
    setContent(bottomSheetComponent);
    console.log(bottomSheetComponent);
  };

  const closeBottomSheet = () => {
    bottomSheetRef.current?.close();
  };

  const renderBackdrop = (props: any) => (
    <BottomSheetBackdrop
      {...props}
      disappearsOnIndex={-1} // index가 -1일 때 backdrop 사라짐
      appearsOnIndex={0} // index가 0 이상일 때 backdrop 나타남
      pressBehavior="close" // backdrop을 누르면 BottomSheet 닫힘
    />
  );

  return (
    <BottomSheetContext.Provider value={{openBottomSheet, closeBottomSheet}}>
      {children}

      <BottomSheet
        ref={bottomSheetRef}
        enablePanDownToClose={true}
        enableDynamicSizing={true}
        maxDynamicContentSize={600}
        index={-1}
        // eslint-disable-next-line react-native/no-inline-styles
        backgroundStyle={{
          backgroundColor: theme.colors.background,
          borderRadius: 32,
        }}
        backdropComponent={renderBackdrop}>
        <BottomSheetScrollView>
          <BottomSheetContainer>{content}</BottomSheetContainer>
        </BottomSheetScrollView>
      </BottomSheet>
    </BottomSheetContext.Provider>
  );
};

export const useBottomSheet = () => {
  const context = useContext(BottomSheetContext);
  if (!context) {
    throw new Error('useBottomSheet must be used within a BottomSheetProvider');
  }
  return context;
};

export default BottomSheetProvider;
