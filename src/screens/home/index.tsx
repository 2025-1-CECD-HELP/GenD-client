import React, {useState} from 'react';
import {Dimensions, RefreshControl} from 'react-native';
import {ChattingIconContainer, ScrollContainer} from './index.style';
import {WorkspaceProfile, PostContainer} from './components';
import {useNestedScroll} from './hooks/useNestedScroll';
import {useWorkspaceQuery} from './hooks/useWorkspaceQuery';
import {usePostQuery} from './hooks/usePostQuery';
import {useCategoryListQuery} from './hooks/useCategoryListQuery';
import {ChattingIcon} from '@/assets/images/svg/home';
import useTypeSafeNavigation from '@/hooks/useTypeSafeNavigaion';

/**
 * 워크스페이스 홈 페이지입니다.
 * 상단의 워크스페이스 프로필(WorkspaceProfile)과 하단의 게시글 목록(PostContainer)을 구성합니다.
 * 외부 스크롤(WorkspaceProfile)이 끝나면 내부 스크롤(PostList)로 전환되는 이중 스크롤 구조입니다.
 * - WorkspaceProfile의 높이를 계산하여 스크롤 전환 기준을 설정합니다.
 * @author 이정선, 홍규진
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

  const {data: workspaceInfo, refetch: refetchWorkspace} = useWorkspaceQuery();
  const {refetch: refetchPosts} = usePostQuery();
  const {refetch: refetchCategories} = useCategoryListQuery();
  const screenHeight = Dimensions.get('window').height;
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useTypeSafeNavigation();

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    try {
      await Promise.all([
        refetchWorkspace(),
        refetchPosts(),
        refetchCategories(),
      ]);
    } finally {
      setRefreshing(false);
    }
  }, [refetchWorkspace, refetchPosts, refetchCategories]);

  return (
    <ScrollContainer
      scrollEnabled={outerScrollEnabled}
      onScroll={handleOuterScroll}
      scrollEventThrottle={16}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{
        minHeight: screenHeight,
      }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <WorkspaceProfile
        onLayout={handleProfileLayout}
        name={workspaceInfo?.workspaceName ?? ''}
        description={workspaceInfo?.workspaceDescription ?? ''}
        imageUrl={workspaceInfo?.imageUrl ?? ''}
      />
      <PostContainer
        profileHeight={profileHeight}
        workspaceRole={workspaceInfo?.workspaceRole ?? ''}
        innerScrollEnabled={innerScrollEnabled}
        onInnerScroll={handleInnerScroll}
      />
      <ChattingIconContainer>
        <ChattingIcon onPress={() => navigation.navigate('SECRETARY', {})} />
      </ChattingIconContainer>
    </ScrollContainer>
  );
};
