import React from 'react';
import {Container} from './index.style';

/**
 * 이 컴포넌트는 단순히 BottomSheetContainer의 스타일을 적용한 래퍼입니다.
 * BottomSheetContainer는 바텀 시트의 컨텐츠를 감싸주는 역할만을 수행합니다.
 * BottomSheet를 열고 닫는 것은 BottomSheetContext에서 관리합니다.
 * 최상단의 드래그를 할 수 있는 부분은 @gorhom/bottom-sheet 라이브러리에서 제공하는 BottomSheetView를 사용하여 구현되었습니다.
 * 하단의 내용에 대해서 스타일을 적용하기 위해서 Container를 사용합니다.
 * @author 홍규진
 */
export const BottomSheetContainer: React.FC<{
  children: React.ReactNode;
  style?: object; 
}> = ({children, style}) => {
  return <Container style={style}>{children}</Container>;
};

export default BottomSheetContainer;
