// contexts/bottomSheet/BottomSheetContext.tsx
import React, {
  createContext,
  useContext,
  useRef,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import {useTheme} from '../theme/ThemeContext';
import BottomSheetContainer from '@/components/BottomSheetContainer';
import {Keyboard, KeyboardEvent} from 'react-native';
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
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      (event: KeyboardEvent) => {
        console.log('keyboardDidShow', event.endCoordinates.height);
        setKeyboardHeight(event.endCoordinates.height);

        // BottomSheet가 열려있을 때만 처리
        if (isBottomSheetOpen) {
          // 키보드 높이만큼 추가 공간 확보를 위해 다시 expand
          bottomSheetRef.current?.expand();
          // 키보드 높이에 따라 추가 확장
          if (event.endCoordinates.height > 0) {
            bottomSheetRef.current?.expand();
          }
        }
      },
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        console.log('keyboardDidHide');
        setKeyboardHeight(0);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [isBottomSheetOpen]);

  const openBottomSheet = (bottomSheetComponent: ReactNode) => {
    setContent(bottomSheetComponent);
    setIsBottomSheetOpen(true);
    bottomSheetRef.current?.expand();
    bottomSheetRef.current?.snapToIndex(0);
  };

  const closeBottomSheet = () => {
    bottomSheetRef.current?.close();
    setIsBottomSheetOpen(false);
    setKeyboardHeight(0); // 키보드 높이 초기화
  };

  const handleSheetChanges = (index: number) => {
    setIsBottomSheetOpen(index >= 0);
    if (index < 0) {
      setKeyboardHeight(0); // BottomSheet가 닫히면 키보드 높이 초기화
    }
  };

  const renderBackdrop = (props: any) => (
    <BottomSheetBackdrop
      {...props}
      disappearsOnIndex={-1}
      appearsOnIndex={0}
      pressBehavior="close"
    />
  );

  return (
    <BottomSheetContext.Provider value={{openBottomSheet, closeBottomSheet}}>
      {children}

      <BottomSheet
        ref={bottomSheetRef}
        enablePanDownToClose={true}
        enableDynamicSizing={true}
        index={-1}
        keyboardBehavior="fillParent"
        keyboardBlurBehavior="restore"
        onChange={handleSheetChanges}
        backgroundStyle={{
          backgroundColor: theme.colors.background,
          borderRadius: 32,
        }}
        backdropComponent={renderBackdrop}>
        <BottomSheetScrollView
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          contentInsetAdjustmentBehavior="automatic"
          contentContainerStyle={{
            paddingBottom: keyboardHeight > 0 ? keyboardHeight + 40 : 20,
          }}>
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
