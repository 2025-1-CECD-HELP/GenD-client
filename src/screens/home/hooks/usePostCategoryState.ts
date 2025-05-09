import {useState} from 'react';

export const usePostCategoryState = () => {
  const [postCategoryState, setPostCategoryState] = useState<string>('전체');

  const handleCategoryClick = (category: string) => {
    setPostCategoryState(category);
  };

  return {
    postCategoryState,
    handleCategoryClick,
  };
};
