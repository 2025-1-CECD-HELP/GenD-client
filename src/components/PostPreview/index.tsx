import React from 'react';
import {
  Container,
  ImagePreview,
  ContentContainer,
  PostTitle,
  PostContent,
  Writer,
} from './index.style';
import {useTheme} from '@emotion/react';
import {PinIcon} from '@/assets/images/svg/home';
import {Shadow} from 'react-native-shadow-2';

/**
 * 워크스페이스 메인 홈화면의 게시글 프리뷰 컴포넌트 입니다.
 * isPin과 imageUrl을 props로 받아 이미지 여부, 핀 여부에 따라서 적절한 뷰가 보이도록 합니다
 * @author 이정선
 */

export type PostPreviewProps = {
  title: string;
  description: string;
  imageUrl?: string;
  writer: string;
  isPin: boolean;
};

export const PostPreview = ({
  title,
  description,
  imageUrl,
  writer,
  isPin,
}: PostPreviewProps) => {
  const theme = useTheme();
  return (
    <Shadow
      distance={5}
      style={{borderRadius: 12}}
      offset={[0, 0]}
      startColor={theme.colors.shadow}>
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
              fill={theme.colors.blue}
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
