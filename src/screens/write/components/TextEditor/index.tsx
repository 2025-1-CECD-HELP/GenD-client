import React, {useRef} from 'react';
import {Platform, KeyboardAvoidingView, SafeAreaView} from 'react-native';
import {actions, RichEditor, RichToolbar} from 'react-native-pell-rich-editor';
import {launchImageLibrary, Asset} from 'react-native-image-picker';
import {useThemeColors} from '@/contexts/theme/ThemeContext';

/**
 * 텍스트 에디터입니다.
 * 글 본문 작성에 사용되며, 텍스트 포맷팅 및 이미지 삽입 기능을 제공합니다.
 * 로컬 이미지 업로드 시 스크린 내부에 base64로 삽입하여 사진 미리보기를 표시합니다.
 * 상위 컴포넌트로 HTML 콘텐츠 및 이미지 asset을 전달합니다.
 * @author 이정선
 */

interface TextEditorProps {
  onChangeHtml: (html: string) => void;
  onImageInsert?: (asset: Asset) => void;
}

export const TextEditor = ({onChangeHtml, onImageInsert}: TextEditorProps) => {
  const {background, textDisabled, backgroundElevated} = useThemeColors();
  const richText = useRef<RichEditor | null>(null);

  const handleInsertImage = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 1,
      selectionLimit: 1,
      includeBase64: true,
    });

    const asset = result.assets?.[0];
    if (!asset) return;

    onImageInsert?.(asset);

    // 사진 미리보기 용도
    const base64Uri = `data:${asset.type};base64,${asset.base64}`;
    richText.current?.insertImage(base64Uri);
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <RichEditor
          placeholder="본문을 입력하세요"
          ref={richText}
          style={{flex: 1, height: 100}}
          initialFocus={true}
          editorInitializedCallback={() => {
            richText.current?.focusContentEditor(); // 강제 포커스
          }}
          editorStyle={{
            backgroundColor: background,
            placeholderColor: textDisabled,
            cssText: `
            img {
              max-width: 100%;
              height: auto;
              display: block;
              object-fit: contain;
              margin: 12px 0;
            }
            body {
              padding: 20px;
            }
          `,
          }}
          onChange={html => {
            console.log('에디터 내용:', html);
            onChangeHtml(html);
          }}
        />
      </KeyboardAvoidingView>
      <RichToolbar
        editor={richText}
        style={{
          alignItems: 'flex-start',
          padding: 10,
          backgroundColor: backgroundElevated,
        }}
        actions={[
          actions.insertImage,
          actions.setBold,
          actions.setItalic,
          actions.setUnderline,
          actions.insertLink,
        ]}
        onPressAddImage={handleInsertImage}
      />
    </SafeAreaView>
  );
};
