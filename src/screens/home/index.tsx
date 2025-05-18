import React from 'react';
import {Dimensions} from 'react-native';

import {ScrollContainer} from './index.style';
import {WorkspaceProfile, PostContainer} from './components';
import {DUMMY_WORKSPACE_INFO} from './constants/home';
import {useNestedScroll} from './hooks/useNestedScroll';
/**
 * 워크스페이스 홈 페이지입니다.
 * 상단의 워크스페이스 프로필(WorkspaceProfile)과 하단의 게시글 목록(PostContainer)을 구성합니다.
 * 외부 스크롤(WorkspaceProfile)이 끝나면 내부 스크롤(PostList)로 전환되는 이중 스크롤 구조입니다.
 * - WorkspaceProfile의 높이를 계산하여 스크롤 전환 기준을 설정합니다.
 * @author 이정선
 */

export const HomeScreen = () => {
  const {
    outerScrollEnabled,
    innerScrollEnabled,
    handleOuterScroll,
    handleInnerScroll,
    handleProfileLayout,
    profileHeight,
  } = useNestedScroll();
  const screenHeight = Dimensions.get('window').height;

  return (
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
  );
};
