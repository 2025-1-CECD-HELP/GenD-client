import React, {useState} from 'react';
import {Platform} from 'react-native';
import {launchImageLibrary, Asset} from 'react-native-image-picker';
import Markdown from 'react-native-markdown-display';
import {useThemeColors} from '@/contexts/theme/ThemeContext';
import {
  Container,
  KeyboardView,
  Editor,
  Toolbar,
  ToolbarButton,
  ToolbarButtonText,
  Thumbnail,
  themedMarkdownStyles,
} from './index.style';

/**
 * 마크다운 에디터입니다.
 * 글 본문 작성에 사용되며, 마크다운 문법 및 이미지 삽입 기능을 제공합니다.
 * 로컬 이미지 업로드 시 마크다운 이미지 문법으로 삽입하여 사진 미리보기를 표시합니다.
 * 상위 컴포넌트로 마크다운 콘텐츠 및 이미지 asset을 전달합니다.
 * @author 홍규진
 */

interface TextEditorProps {
  onChangeMarkdown: (markdown: string) => void;
  onImageInsert?: (asset: Asset) => void;
  imageAsset?: Asset;
}

export const TextEditor = ({
  onChangeMarkdown,
  onImageInsert,
  imageAsset,
}: TextEditorProps) => {
  const {background, textDisabled, backgroundElevated, textPrimary} =
    useThemeColors();
  const [markdown, setMarkdown] = useState('');
  const [isPreview, setIsPreview] = useState(false);

  const handleInsertImage = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 1,
      selectionLimit: 1,
    });

    const asset = result.assets?.[0];
    if (!asset) {
      return;
    }

    onImageInsert?.(asset);
  };

  const handleTextChange = (text: string) => {
    setMarkdown(text);
    onChangeMarkdown(text);
  };

  return (
    <Container style={{backgroundColor: background}}>
      <KeyboardView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        {isPreview ? (
          <Markdown style={themedMarkdownStyles}>{markdown}</Markdown>
        ) : (
          <Editor
            multiline
            value={markdown}
            onChangeText={handleTextChange}
            style={{color: textPrimary}}
            placeholder="마크다운으로 작성하세요"
            placeholderTextColor={textDisabled}
          />
        )}
        {imageAsset?.uri && (
          <Thumbnail source={{uri: imageAsset.uri}} resizeMode="cover" />
        )}
      </KeyboardView>
      <Toolbar style={{backgroundColor: backgroundElevated}}>
        <ToolbarButton onPress={() => setIsPreview(!isPreview)}>
          <ToolbarButtonText style={{color: textPrimary}}>
            {isPreview ? '편집' : '미리보기'}
          </ToolbarButtonText>
        </ToolbarButton>
        <ToolbarButton onPress={handleInsertImage}>
          <ToolbarButtonText style={{color: textPrimary}}>
            이미지 추가
          </ToolbarButtonText>
        </ToolbarButton>
      </Toolbar>
    </Container>
  );
};
