import {TopBar} from '@/components/TopBar';
import {Container, Divider, TitleInputContainer} from './index.style';
import {useThemeColors} from '@/contexts/theme/ThemeContext';
import {TextEditor, CategoryDropdown} from './components';
import {useWrite} from './hooks/useWrite';
import {useCategoryListQuery} from '../home/hooks/useCategoryListQuery';
import {KeyboardAvoidingView, Platform} from 'react-native';

/**
 * 글쓰기 페이지입니다.
 * 사용자가 게시글의 제목, 카테고리, 본문을 입력할 수 있도록 합니다.
 * 상단 헤더의 등록 버튼을 누르면 글 작성 성공 모달을 표시합니다.
 * @author 이정선
 */

export const WriteScreen = () => {
  const {
    selectedCategory,
    setSelectedCategory,
    title,
    setTitle,
    handleImageInsert,
    setMarkdownContent,
    handleSubmitPress,
    handleBackPress,
    imageFile,
  } = useWrite();

  const {textDisabled} = useThemeColors();
  const {data: categoryList} = useCategoryListQuery();

  return (
    <Container
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{flexGrow: 1}}>
      <TopBar
        title="글쓰기"
        showBackButton={true}
        showSubmitButton={true}
        onPressSubmit={handleSubmitPress}
        onPressBack={handleBackPress}
      />
      <CategoryDropdown
        categories={categoryList || []}
        selectedCategory={selectedCategory}
        onChangeCategory={setSelectedCategory}
      />

      <Divider />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}>
        <TitleInputContainer
          placeholder="제목을 입력하세요"
          value={title}
          onChangeText={setTitle}
          placeholderTextColor={textDisabled}
        />

        <Divider />
        <TextEditor
          onChangeMarkdown={setMarkdownContent}
          onImageInsert={handleImageInsert}
          imageAsset={imageFile}
        />
      </KeyboardAvoidingView>
    </Container>
  );
};
