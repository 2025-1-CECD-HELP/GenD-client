import {useState} from 'react';
import {TopBar} from '@/components/TopBar';
import {Container, Divider, TitleInputContainer} from './index.style';
import {CATEGORY_OPTIONS} from './constants/category';
import {useThemeColors} from '@/contexts/theme/ThemeContext';
import {TextEditor, CategoryDropdown} from './components';
import {Asset} from 'react-native-image-picker';
import {privateInstance} from '@/services/api/axios';
import CommonModal from '@components/CommonModal';
import {useModal} from '@contexts/modal/ModalContext';
import useTypeSafeNavigation from '@/hooks/useTypeSafeNavigaion';
/**
 * 글쓰기 페이지입니다.
 * 사용자가 게시글의 제목, 카테고리, 본문을 입력할 수 있도록 합니다.
 * 상단 헤더의 등록 버튼을 누르면 글 작성 성공 모달을 표시합니다.
 * @author 이정선
 */

export const WriteScreen = () => {
  const navigation = useTypeSafeNavigation();
  const [selectedCategory, setSelectedCategory] = useState<string>(
    CATEGORY_OPTIONS[0],
  );
  const {setIsOpen, setModalContent} = useModal();
  const [htmlContent, setHtmlContent] = useState('');
  const [title, setTitle] = useState('');
  const [imageFiles, setImageFiles] = useState<Asset[]>([]);
  const {textDisabled} = useThemeColors();

  const handleImageInsert = async (asset: Asset) => {
    if (!asset?.base64 || !asset?.type) return;
    setImageFiles(prev => [...prev, asset]);
  };

  const handleSubmit = async () => {
    // TODO: 게시글 작성
    showPostSuccessModal();
  };

  const showPostSuccessModal = () => {
    setIsOpen(true);
    setModalContent(
      <CommonModal
        type="check"
        title="게시글이 등록되었습니다!"
        content="다른 사용자들과 지금 공유해보세요."
        isCenter={true}
        onConfirm={() => {
          setIsOpen(false);
          navigation.goBack();
        }}
      />,
    );
  };

  return (
    <Container
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{flexGrow: 1}}>
      <TopBar
        title="글쓰기"
        showBackButton={true}
        showSubmitButton={true}
        onPressSubmit={handleSubmit}
      />

      <CategoryDropdown
        category={selectedCategory}
        onChangeCategory={setSelectedCategory}
      />

      <Divider />
      <TitleInputContainer
        placeholder="제목을 입력하세요"
        value={title}
        onChangeText={setTitle}
        placeholderTextColor={textDisabled}
      />

      <Divider />
      <TextEditor
        onChangeHtml={setHtmlContent}
        onImageInsert={handleImageInsert}
      />
    </Container>
  );
};
