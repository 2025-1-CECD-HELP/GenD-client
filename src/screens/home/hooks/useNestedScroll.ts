import {useRef, useState} from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  LayoutChangeEvent,
} from 'react-native';

/**
 * 홈 화면의 게시물 리스트를 이중 스크롤로 제어하기 위한 커스텀 훅입니다.
 * 외부 컨테이너와 내부 컨테이너의 스크롤을 전환하며 제어합니다.
 * 외부(WorkspaceProfile) 영역 스크롤이 끝나면 내부(PostList) 스크롤로 전환되며,
 * 내부 스크롤이 다시 상단에 도달할 시 외부 스크롤로 전환됩니다.
 @author 이정선
 */

export function useNestedScroll() {
  const [outerScrollEnabled, setOuterScrollEnabled] = useState<boolean>(true);
  const [innerScrollEnabled, setInnerScrollEnabled] = useState<boolean>(false);
  const [profileHeight, setProfileHeight] = useState<number>(0);
  const lastInnerY = useRef<number>(0);

  const handleOuterScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const y = e.nativeEvent.contentOffset.y;
    if (y >= profileHeight && outerScrollEnabled && !innerScrollEnabled) {
      setOuterScrollEnabled(false);
      setInnerScrollEnabled(true);
    }
  };

  const handleInnerScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const y = e.nativeEvent.contentOffset.y;
    const delta = y - lastInnerY.current;
    if (y <= 5 && delta < 0) {
      setOuterScrollEnabled(true);
      setInnerScrollEnabled(false);
    }
    lastInnerY.current = y;
  };

  const handleProfileLayout = (e: LayoutChangeEvent) => {
    const {height} = e.nativeEvent.layout;
    setProfileHeight(height);
  };

  return {
    outerScrollEnabled,
    innerScrollEnabled,
    handleOuterScroll,
    handleInnerScroll,
    handleProfileLayout,
    profileHeight,
  };
}
