import React from 'react';
import {
  Container,
  PostList,
  PostCategoryList,
  Toggle,
  ToggleText,
  Header,
} from './index.style';
import {Shadow} from 'react-native-shadow-2';
import {useThemeColors} from '@contexts/theme/ThemeContext';
import {PostPreview} from '@components/PostPreview';
import {DUMMY_POST} from '../../constants/home';
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

/**
 * 홈 화면 하단의 게시글 컨테이너입니다.
 * 게시글 목록, 카테고리, 탭 필터(all, mine)를 포함합니다.
 * - 유저의 역할에 따라 게시글 작성 버튼 및 카테고리 추가 버튼이 조건부로 표시됩니다.
 * - props로 받은 innerScrollEnabled에 따라 내부 ScrollView의 스크롤 활성화 여부를 제어합니다.
 * - profileHeight를 바탕으로 최대 높이를 계산해 리스트 영역을 화면에 맞게 제한합니다.
 * @author 이정선
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
  const {shadow, textPrimary} = useThemeColors();
  const {postTabState, handleClick} = usePostTabState();
  const {postCategoryState, handleCategoryClick} = usePostCategoryState();
  const {isOpen, setIsOpen, setModalContent} = useModal();
  const screenHeight = Dimensions.get('window').height;

  const POSTLIST_HEIGHT =
    screenHeight - profileHeight - HEADER_HEIGHT - POSTCONTAINER_PADDING;
  const containerMinHeight = screenHeight - HEADER_HEIGHT - BOTTOMTAB_HEIGHT;

  const filteredData = DUMMY_POST.filter(
    post =>
      (postTabState === 'all' || post.writer === '작성자') &&
      (postCategoryState === '전체' || post.category === postCategoryState),
  );

  function handlePressPlus() {
    setIsOpen(true);
    setModalContent(
      <CommonModal
        type="input"
        title="카테고리 추가하기"
        content=""
        isCenter={true}
        key={isOpen ? 'open' : 'close'}
      />,
    );
  }

  return (
    <Shadow
      distance={20}
      style={{borderRadius: 30, width: '100%'}}
      offset={[0, 0]}
      startColor={shadow}>
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
          {['전체', '공지사항', '정보공유', '스터디방'].map(category => (
            <PostCategory
              key={category}
              category={category}
              isActive={postCategoryState === category}
              onPress={() => handleCategoryClick(category)}
            />
          ))}
          {workspaceRole === 'eAdmin' && (
            <PostCategory variant="plus" onPress={handlePressPlus} />
          )}
        </PostCategoryList>
        <PostList
          maxHeight={POSTLIST_HEIGHT}
          nestedScrollEnabled
          pointerEvents={innerScrollEnabled ? 'auto' : 'none'}
          scrollEnabled={innerScrollEnabled}
          onScroll={onInnerScroll}
          scrollEventThrottle={16}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            flexGrow: 1,
            gap: 20,
            alignItems: 'center',
            paddingBottom: 30,
          }}>
          {filteredData.map((item, index) => (
            <PostPreview post={item} key={index} />
          ))}
        </PostList>
      </Container>
    </Shadow>
  );
};
