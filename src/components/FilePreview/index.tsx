import React from 'react';
import {
  Container,
  FormatContainer,
  ContentContainer,
  Title,
  Divider,
} from './index.style';
import {
  AudioFormat,
  DocFormat,
  MoreIcon,
  DownLoadIcon,
} from '@/assets/images/svg/file';
import {Shadow} from 'react-native-shadow-2';
import {useTheme} from '@emotion/react';
/**
 * 자료 관리 페이지에 사용될 파일 프리뷰 컴포넌트 입니다.
 * 멤버 권한에 따라 다운로드 아이콘, 더보기 아이콘이 선택적으로 보입니다.
 * 또한 파일 형식에 따라서 보기 아이콘의 형태가 달라집니다.
 * @author 이정선
 */

export type FilePreviewProps = {
  title: string;
  extension: 'mp3' | 'docx';
  position: 'member' | 'manager';
};

export const FilePreview = ({title, extension, position}: FilePreviewProps) => {
  const theme = useTheme();
  const FormatIcon = extension === 'mp3' ? AudioFormat : DocFormat;
  const MenuIcon = position === 'member' ? DownLoadIcon : MoreIcon;
  return (
    <Shadow
      distance={5}
      style={{borderRadius: 13}}
      offset={[0, 0]}
      startColor={theme.colors.shadow}>
      <Container>
        <FormatContainer activeOpacity={0.8}>
          <FormatIcon width={48} height={48} />
        </FormatContainer>
        <Divider />
        <ContentContainer>
          <Title>{title}</Title>
          <MenuIcon fill={theme.colors.textDisabled} width={20} height={20} />
        </ContentContainer>
      </Container>
    </Shadow>
  );
};
