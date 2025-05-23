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
import {PostPreviewType} from './index.type';

/**
 * 워크스페이스 메인 홈화면의 게시글 프리뷰 컴포넌트 입니다.
 * isPin과 imageUrl을 props로 받아 이미지 여부, 핀 여부에 따라서 적절한 뷰가 보이도록 합니다
 * 모든 기기에 동일하게 shadow를 나타내게 하기 위해 react-native-shadow-2 라이브러리를 사용하여 구현합니다.
 * @author 이정선
 */
interface PostPreviewProps {
  post: PostPreviewType;
}
export const PostPreview = ({post}: PostPreviewProps) => {
  const {shadow, blue} = useThemeColors();
  const {title, description, imageUrl, writer, isPin} = post;
  return (
    <Shadow
      distance={5}
      style={{borderRadius: 12}}
      offset={[0, 0]}
      startColor={shadow}>
      <Container>
        {imageUrl && (
          <ImagePreview source={{uri: imageUrl}} resizeMode="cover" />
        )}
        <ContentContainer>
          <PostTitle>{title}</PostTitle>
          <PostContent numberOfLines={3} ellipsizeMode="tail">
            {description}
          </PostContent>
          <Writer>{writer}</Writer>
          {isPin && (
            <PinIcon
              fill={blue}
              width={13}
              height={13}
              style={{position: 'absolute', bottom: 0, right: 0}}
            />
          )}
        </ContentContainer>
      </Container>
    </Shadow>
  );
};
