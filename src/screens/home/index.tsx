import React, {useRef, useState} from 'react';
import {
  NativeSyntheticEvent,
  NativeScrollEvent,
  LayoutChangeEvent,
  Dimensions,
} from 'react-native';

import {Container, ScrollContainer} from './index.style';
import {WorkspaceProfile, PostContainer} from './components';
import {DUMMY_WORKSPACE_INFO} from './constants/home';

/**
 * 워크스페이스 홈 페이지입니다. 워크스페이스의 기본 정보 및 게시글 목록이 보입니다.
 * 홈 페이지 스크롤 시 게시글 목록 컨테이너가 맨 최상단에 도달하면 외부 스크롤이 멈추고 내부 게시글 목록을 스크롤하여 볼 수 있습니다.
 * @author 이정선
 */

export const HomeScreen = () => {
  const [outerScrollEnabled, setOuterScrollEnabled] = useState(true);
  const [innerScrollEnabled, setInnerScrollEnabled] = useState(false);
  const [profileHeight, setProfileHeight] = useState(0);
  const screenHeight = Dimensions.get('window').height;

  const handleOuterScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const y = e.nativeEvent.contentOffset.y;
    if (y >= profileHeight && outerScrollEnabled && !innerScrollEnabled) {
      setOuterScrollEnabled(false);
      setInnerScrollEnabled(true);
    }
  };

  const lastInnerY = useRef(0);

  const handleInnerScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const y = e.nativeEvent.contentOffset.y;
    const delta = y - lastInnerY.current;

    // 아래로 밀었고 거의 top 근처에 도달한 경우
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

  return (
    <Container>
      <ScrollContainer
        scrollEnabled={outerScrollEnabled}
        onScroll={handleOuterScroll}
        scrollEventThrottle={16}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          minHeight: screenHeight,
        }}>
        <WorkspaceProfile
          onLayout={handleProfileLayout}
          name={DUMMY_WORKSPACE_INFO.workspaceName}
          description={DUMMY_WORKSPACE_INFO.workspaceDescription}
          imageUrl={DUMMY_WORKSPACE_INFO.imageUrl}
        />

        <PostContainer
          profileHeight={profileHeight}
          workspaceRole={DUMMY_WORKSPACE_INFO.workspaceRole}
          innerScrollEnabled={innerScrollEnabled}
          onInnerScroll={handleInnerScroll}
        />
      </ScrollContainer>
    </Container>
  );
};
