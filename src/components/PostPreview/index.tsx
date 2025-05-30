import React from 'react';
import {
  Container,
  ImagePreview,
  ContentContainer,
  PostTitle,
  PostContent,
  Writer,
} from './index.style';
import {useThemeColors} from '@/contexts/theme/ThemeContext';
import {PinIcon} from '@/assets/images/svg/home';
import {Shadow} from 'react-native-shadow-2';
import {Post} from '@/services/post/types';
import {TouchableOpacity} from 'react-native';
import Markdown from 'react-native-markdown-display';
import {createMarkdownStyles} from './markdownStyles';

/**
 * 워크스페이스 메인 홈화면의 게시글 프리뷰 컴포넌트 입니다.
 * isPin과 imageUrl을 props로 받아 이미지 여부, 핀 여부에 따라서 적절한 뷰가 보이도록 합니다
 * 모든 기기에 동일하게 shadow를 나타내게 하기 위해 react-native-shadow-2 라이브러리를 사용하여 구현합니다.
 * @author 이정선, 홍규진
 */
interface PostPreviewProps {
  post: Post;
  isAdmin: boolean;
  onTogglePin?: (postId: number) => void;
  onPostPress?: () => void;
}
export const PostPreview = ({
  post,
  isAdmin,
  onTogglePin,
  onPostPress,
}: PostPreviewProps) => {
  const {textPrimary, blue, background, shadow} = useThemeColors();
  const {postTitle, postDescription, postImageUrl, postWriter, isPin} = post;
  const markdownStyles = createMarkdownStyles({
    textPrimary: textPrimary,
    background: background,
    blue: blue,
  });

  return (
    <Shadow
      distance={10}
      // eslint-disable-next-line react-native/no-inline-styles
      style={{borderRadius: 36}}
      offset={[-1, 1]}
      startColor={shadow}>
      <Container onPress={onPostPress}>
        {postImageUrl && (
          <ImagePreview source={{uri: postImageUrl}} resizeMode="cover" />
        )}
        <ContentContainer>
          <PostTitle>{postTitle}</PostTitle>
          <PostContent>
            <Markdown style={markdownStyles}>{postDescription}</Markdown>
          </PostContent>
          <Writer>{postWriter}</Writer>
          {isAdmin ? (
            <TouchableOpacity
              onPress={() => onTogglePin?.(post.postId)}
              style={{position: 'absolute', bottom: 0, right: 0}}>
              <PinIcon fill={isPin ? blue : '#ccc'} width={13} height={13} />
            </TouchableOpacity>
          ) : (
            isPin && (
              <PinIcon
                fill={blue}
                width={13}
                height={13}
                style={{position: 'absolute', bottom: 0, right: 0}}
              />
            )
          )}
        </ContentContainer>
      </Container>
    </Shadow>
  );
};
