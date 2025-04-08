import React from 'react';
import {
  Container,
  FormatPreview,
  ContentContainer,
  Title,
  Divider,
} from './index.style';
import {FileData} from './index.type';
import {
  AudioFormat,
  DocFormat,
  MoreIcon,
  DownLoadIcon,
} from '@/assets/images/svg/file';
import {Shadow} from 'react-native-shadow-2';
import {useThemeColors} from '@/contexts/theme/ThemeContext';
/**
 * 자료 관리 페이지에 사용될 파일 프리뷰 컴포넌트 입니다.
 * - 파일 확장자에 따라 아이콘이 달라집니다.
 * - 사용자 권한(member, manager)에 따라 액션 아이콘(다운로드 or 더보기)이 달라집니다.
 * - 클릭 시 파일 열기 및 액션 실행
 * @author 이정선
 */

export type FilePreviewProps = {
  file: FileData;
  position: 'member' | 'manager';
  onPressFile: (file: FileData) => void; // 상단 PormatPreview 영역 클릭 시 호출
  onPressAction: (file: FileData) => void; // 우측 하단 아이콘 클릭 시 호출
};

export const FilePreview = ({
  file,
  position,
  onPressFile,
  onPressAction,
}: FilePreviewProps) => {
  const {textDisabled, shadow} = useThemeColors();
  const FormatIcon = file.extension === 'mp3' ? AudioFormat : DocFormat;
  const MenuIcon = position === 'member' ? DownLoadIcon : MoreIcon;

  return (
    <Shadow
      distance={5}
      style={{borderRadius: 13, width: '100%'}}
      offset={[0, 0]}
      startColor={shadow}>
      <Container>
        <FormatPreview activeOpacity={0.8} onPress={() => onPressFile(file)}>
          <FormatIcon width={48} height={48} />
        </FormatPreview>
        <Divider />
        <ContentContainer>
          <Title>{file.title}</Title>
          <MenuIcon
            onPress={() => onPressAction(file)}
            fill={textDisabled}
            width={20}
            height={20}
          />
        </ContentContainer>
      </Container>
    </Shadow>
  );
};
