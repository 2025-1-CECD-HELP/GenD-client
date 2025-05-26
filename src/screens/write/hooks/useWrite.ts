import {useState} from 'react';
import {Asset} from 'react-native-image-picker';
import {useWriteMutation} from './useWriteMutation';
import {Category} from '@/services/post/types';

/**
 * 글쓰기 페이지의 로직을 관리하는 커스텀 훅
 * @returns 글쓰기 관련 상태와 핸들러 함수들
 * @author 홍규진
 */
export const useWrite = () => {
  const mutation = useWriteMutation();
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

  const handleSubmit = async () => {
    if (!imageFile || imageFile.uri === undefined) {
      throw new Error('이미지가 없습니다.');
    }
    await mutation.mutateAsync({
      request: {
        postTitle: title,
        postDescription: markdownContent,
        postCategory: selectedCategory.categoryName,
      },
      imageFile: imageFile,
    });
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
  };
};
