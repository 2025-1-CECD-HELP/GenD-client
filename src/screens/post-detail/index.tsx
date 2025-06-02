import {Post} from '@/services/post/types';
import {Text} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {RouteProp} from '@react-navigation/native';
import {
  Container,
  SemiContainer,
  Category,
  TitleRow,
  Title,
  Pin,
  WriterRow,
  Writer,
  PostImage,
  EmptyPostView,
} from './index.style';
import {TopBar} from '@/components';
import {PinIcon, MoreIcon} from '@/assets/images/svg/home';
import {useThemeColors} from '@/contexts/theme/ThemeContext';
import {Divider} from '../my-page/index.style';
import Markdown from 'react-native-markdown-display';
import React, {useState} from 'react';
import OptionsBox from './components/OptionsBox';
import {useAtom} from 'jotai';
import {workspaceState} from '@/atoms/workspace';
import {createMarkdownStyles} from '@/components/PostPreview/markdownStyles';
import useTypeSafeNavigation from '@/hooks/useTypeSafeNavigaion';

/**
 * PostDetailScreen 입니다.
 * 올라온 게시글을 상세하게 보여주는 화면입니다.
 * 마크다운 렌더러를 통해 마크다운 문법을 랜더링하여 보여줍니다.
 * @author 이정선, 홍규진
 */

export const PostDetailScreen = () => {
  const route = useRoute<RouteProp<any, any>>();
  const post: Post = route.params?.post;
  const {blue, textPrimary, background} = useThemeColors();
  const [showOptions, setShowOptions] = useState(false);
  const [workspace] = useAtom(workspaceState);
  const navigation = useTypeSafeNavigation();
  if (!post) {
    return (
      <EmptyPostView>
        <Text>게시글 정보를 불러올 수 없습니다.</Text>
      </EmptyPostView>
    );
  }

  return (
    <>
      <TopBar
        title="게시글"
        showBackButton={true}
        onPressBack={() => navigation.navigate('LANDING', {})}
      />
      <Container>
        <SemiContainer>
          <Category>{post.postCategory}</Category>
          <MoreIcon
            width={18}
            height={18}
            fill={blue}
            onPress={() => setShowOptions(prev => !prev)}
          />
          {showOptions && (
            <OptionsBox
              isAdmin={workspace.isAdmin}
              post={post}
              onClose={() => setShowOptions(false)}
            />
          )}
        </SemiContainer>
        <TitleRow>
          <Title>{post.postTitle}</Title>
          {post.isPin && (
            <Pin>
              <PinIcon width={18} height={18} fill={blue} />
            </Pin>
          )}
        </TitleRow>
        <WriterRow>
          <Writer>{`${post.postWriter} 님이 작성한 글`}</Writer>
          {/* <DateText>{post.createdAt}</DateText> */}
        </WriterRow>
        <Divider />

        <Markdown style={createMarkdownStyles({textPrimary, blue, background})}>
          {post.postDescription}
        </Markdown>

        {post.postImageUrl ? (
          <PostImage source={{uri: post.postImageUrl}} resizeMode="contain" />
        ) : null}
      </Container>
    </>
  );
};

export default PostDetailScreen;
