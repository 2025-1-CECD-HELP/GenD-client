import React, {useRef} from 'react';
import {
  Container,
  PostList,
  PostCategoryList,
  Toggle,
  ToggleText,
  Header,
} from './index.style';
import {Shadow} from 'react-native-shadow-2';
import {useThemeColors} from '@/contexts/theme/ThemeContext';
import {PostPreview} from '@/components/PostPreview';
import {DUMMY_POST} from '../../constants/home';
import {PostCategory} from '../PostCategory';
import {WriteIcon} from '@/assets/images/svg/home';
import {usePostTabState} from '../../hooks/usePostTabState';
import {usePostCategoryState} from '../../hooks/usePostCategoryState';
import useTypeSafeNavigation from '@/hooks/useTypeSafeNavigaion';
import {ROUTE_NAMES} from '@constants/routes';
import {ActiveMemberPosition} from '@/components/MemberProfile/index.type';
import CommonModal from '@/components/CommonModal';
import {useModal} from '@/contexts/modal/ModalContext';
import {
  NativeSyntheticEvent,
  NativeScrollEvent,
  Dimensions,
} from 'react-native';

/**
 * @author 이정선
 */

interface PostContainerProps {
  workspaceRole: ActiveMemberPosition;
  innerScrollEnabled: boolean;
  onInnerScroll: (e: NativeSyntheticEvent<NativeScrollEvent>) => void;
  profileHeight: number;
}

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

  /* header and padding */
  const POST_HEIGHT = screenHeight - profileHeight - 95 - 30;
  const containerMinHeight = screenHeight - 100 - 95;

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
            <PostCategory variant="plus" onPress={() => handlePressPlus()} />
          )}
        </PostCategoryList>
        <PostList
          style={{maxHeight: POST_HEIGHT}}
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
