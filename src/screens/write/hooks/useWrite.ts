import {useState} from 'react';
import {Asset} from 'react-native-image-picker';
import {useWriteMutation} from './useWriteMutation';
import {Category} from '@/services/post/types';
import {Alert} from 'react-native';
import useTypeSafeNavigation from '@/hooks/useTypeSafeNavigaion';

/**
 * 글쓰기 페이지의 로직을 관리하는 커스텀 훅
 * @returns 글쓰기 관련 상태와 핸들러 함수들
 * @author 홍규진
 */
export const useWrite = () => {
  const mutation = useWriteMutation();
  const navigation = useTypeSafeNavigation();
  const [isWriting, setIsWriting] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category>({
    categoryId: 0,
    categoryName: '',
  });
  const [markdownContent, setMarkdownContent] = useState('');
  const [title, setTitle] = useState('');
  const [imageFile, setImageFile] = useState<Asset>();

  const handleImageInsert = async (asset: Asset) => {
    if (!asset?.uri || !asset?.type) {
      return;
    }
    setImageFile(asset);
  };

  const validateInputs = () => {
    if (!title.trim()) {
      Alert.alert('입력 오류', '제목을 입력해주세요.');
      return false;
    }
    if (!selectedCategory.categoryName) {
      Alert.alert('입력 오류', '카테고리를 선택해주세요.');
      return false;
    }
    if (!imageFile || !imageFile.uri) {
      Alert.alert('입력 오류', '이미지를 선택해주세요.');
      return false;
    }
    if (!markdownContent.trim()) {
      Alert.alert('입력 오류', '내용을 입력해주세요.');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateInputs()) {
      return;
    }

    if (!imageFile) {
      return;
    }

    try {
      setIsWriting(true);
      await mutation.mutateAsync({
        request: {
          postTitle: title,
          postDescription: markdownContent,
          postCategory: selectedCategory.categoryName,
        },
        imageFile: imageFile,
      });
    } finally {
      setIsWriting(false);
    }
  };

  const handleSubmitPress = () => {
    if (isWriting) {
      Alert.alert('작성 중', '글을 작성 중입니다. 완료 후 다시 시도해주세요.', [
        {text: '확인', style: 'default'},
      ]);
      return;
    }
    handleSubmit();
  };

  const handleBackPress = () => {
    if (isWriting) {
      Alert.alert('작성 중', '글을 작성 중입니다. 완료 후 다시 시도해주세요.', [
        {text: '확인', style: 'default'},
      ]);
      return;
    }
    navigation.navigate('LANDING', {});
  };

  return {
    selectedCategory,
    setSelectedCategory,
    markdownContent,
    setMarkdownContent,
    title,
    setTitle,
    imageFile,
    handleImageInsert,
    handleSubmit,
    handleSubmitPress,
    handleBackPress,
    isWriting,
  };
};
