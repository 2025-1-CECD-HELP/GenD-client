import React, {useState, useEffect} from 'react';
import {
  Container,
  PostList,
  PostCategoryList,
  Toggle,
  ToggleText,
  Header,
  EmptyPostList,
  EmptyPostListText,
  PostCategoryScrollView,
  PostCategoryListContent,
} from './index.style';
import {useThemeColors} from '@contexts/theme/ThemeContext';
import {PostPreview} from '@components/PostPreview';
import {PostCategory} from '../PostCategory';
import {WriteIcon} from '@/assets/images/svg/home';
import {usePostTabState} from '../../hooks/usePostTabState';
import {usePostCategoryState} from '../../hooks/usePostCategoryState';
import useTypeSafeNavigation from '@hooks/useTypeSafeNavigaion';
import {ROUTE_NAMES} from '@constants/routes';
import {ActiveMemberPosition} from '@components/MemberProfile/index.type';
import CommonModal from '@components/CommonModal';
import {useModal} from '@contexts/modal/ModalContext';
import {
  NativeSyntheticEvent,
  NativeScrollEvent,
  Dimensions,
} from 'react-native';
import {usePostQuery} from '../../hooks/usePostQuery';
import {useCategoryListQuery} from '../../hooks/useCategoryListQuery';
import {Post} from '@/services/post/types';
import {useCategoryMutation} from '../../hooks/useCategoryMutation';
import {usePatchPostPinMutation} from '../../hooks/usePostMutation';
import {useAtom, useSetAtom} from 'jotai';
import {workspaceState} from '@/atoms/workspace';
import {useUserQuery} from '@/screens/my-page/hooks/useMypageQuery';
import {userState} from '@/atoms/user';

/**
 * 홈 화면 하단의 게시글 컨테이너입니다.
 * 게시글 목록, 카테고리, 탭 필터(all, mine)를 포함합니다.
 * - 유저의 역할에 따라 게시글 작성 버튼 및 카테고리 추가 버튼이 조건부로 표시됩니다.
 * - props로 받은 innerScrollEnabled에 따라 내부 ScrollView의 스크롤 활성화 여부를 제어합니다.
 * - profileHeight를 바탕으로 최대 높이를 계산해 리스트 영역을 화면에 맞게 제한합니다.
 * @author 이정선, 홍규진
 */

interface PostContainerProps {
  workspaceRole: ActiveMemberPosition;
  innerScrollEnabled: boolean;
  onInnerScroll: (e: NativeSyntheticEvent<NativeScrollEvent>) => void;
  profileHeight: number;
}

const HEADER_HEIGHT = 95;
const BOTTOMTAB_HEIGHT = 100;
const POSTCONTAINER_PADDING = 30;

export const PostContainer = ({
  workspaceRole,
  innerScrollEnabled,
  onInnerScroll,
  profileHeight,
}: PostContainerProps) => {
  const navigation = useTypeSafeNavigation();
  const {data: categoryList} = useCategoryListQuery();
  const {textPrimary} = useThemeColors();
  const {postTabState, handleClick} = usePostTabState();
  const {postCategoryState, handleCategoryClick} = usePostCategoryState();
  const {setIsOpen, setModalContent} = useModal();
  const screenHeight = Dimensions.get('window').height;
  const {mutate: createCategory} = useCategoryMutation();
  const {patchPostPinMutation} = usePatchPostPinMutation();
  const POSTLIST_HEIGHT =
    screenHeight - profileHeight - HEADER_HEIGHT - POSTCONTAINER_PADDING;
  const containerMinHeight = screenHeight - HEADER_HEIGHT - BOTTOMTAB_HEIGHT;
  const {data: postList} = usePostQuery();
  const setUser = useSetAtom(userState);
  const {data: user} = useUserQuery();
  const [newCategoryName, setNewCategoryName] = useState('');
  const [workspace] = useAtom(workspaceState);
  let filteredData: Post[] = [];

  useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, [user, setUser]);

  if (postList) {
    // 카테고리로 1차적인 필터링
    const categoryFiltered = postList.filter(
      post =>
        postCategoryState === '전체' || post.postCategory === postCategoryState,
    );

    // 작성자로 2차적인 필터링
    const writerFiltered =
      postTabState === 'all'
        ? categoryFiltered
        : categoryFiltered.filter(
            post =>
              user?.memberName &&
              post.postWriter === user.memberName &&
              post.postWriter !== '작성자',
          );

    filteredData = writerFiltered;
  }
  const sortedData = [...filteredData].sort((a, b) => {
    if (a.isPin === b.isPin) return 0;
    return a.isPin ? -1 : 1;
  });

  function handlePressPlus() {
    setIsOpen(true);
    setModalContent(
      <CommonModal
        type="input"
        title="카테고리 추가하기"
        isCenter={true}
        inputPlaceholder="카테고리 이름을 입력하세요"
        inputValue={newCategoryName}
        onInputChange={setNewCategoryName}
        onConfirm={value => {
          if (value) {
            createCategory({categoryName: value});
            setNewCategoryName('');
          }
        }}
      />,
    );
  }
  const handleTogglePin = (postId: number) => {
    patchPostPinMutation({postId});
    console.log('toggle pin', postId);
  };

  return (
    <Container minHeight={containerMinHeight}>
      <Header>
        <Toggle>
          <ToggleText
            isActive={postTabState === 'all'}
            onPress={() => handleClick('all')}>
            전체 게시글
          </ToggleText>
          <ToggleText
            isActive={postTabState === 'mine'}
            onPress={() => handleClick('mine')}>
            내 게시글
          </ToggleText>
        </Toggle>
        <WriteIcon
          onPress={() => navigation.replace(ROUTE_NAMES.WRITE, {})}
          fill={textPrimary}
          width={18}
          height={18}
        />
      </Header>
      <PostCategoryList>
        <PostCategoryScrollView
          horizontal
          showsHorizontalScrollIndicator={false}>
          <PostCategoryListContent>
            <PostCategory
              category="전체"
              isActive={postCategoryState === '전체'}
              onPress={() => handleCategoryClick('전체')}
            />
            {categoryList?.map(category => (
              <PostCategory
                key={category.categoryId}
                category={category.categoryName}
                isActive={postCategoryState === category.categoryName}
                onPress={() => handleCategoryClick(category.categoryName)}
              />
            ))}
            {workspaceRole === 'eAdmin' && (
              <PostCategory variant="plus" onPress={handlePressPlus} />
            )}
          </PostCategoryListContent>
        </PostCategoryScrollView>
      </PostCategoryList>
      <PostList
        maxHeight={POSTLIST_HEIGHT}
        nestedScrollEnabled
        scrollEnabled={innerScrollEnabled}
        onScroll={onInnerScroll}
        scrollEventThrottle={16}
        keyboardShouldPersistTaps="handled"
        // eslint-disable-next-line react-native/no-inline-styles
        contentContainerStyle={{
          flexGrow: 1,
          gap: 20,
          alignItems: 'center',
          paddingBottom: 30,
        }}>
        {filteredData.length === 0 && (
          <EmptyPostList>
            <EmptyPostListText>아직 게시글이 없습니다.</EmptyPostListText>
            <EmptyPostListText>게시글을 작성해 주세요.</EmptyPostListText>
          </EmptyPostList>
        )}
        {sortedData.map((item, index) => (
          <PostPreview
            post={item}
            key={index}
            isAdmin={workspace.isAdmin}
            onTogglePin={handleTogglePin}
            onPostPress={() =>
              navigation.navigate(ROUTE_NAMES.POST_DETAIL, {post: item})
            }
          />
        ))}
      </PostList>
    </Container>
  );
};
