import React from 'react';
import {Container, CategoryText} from './index.style';
import {PlusIcon} from '@/assets/images/svg/home';
import {useThemeColors} from '@/contexts/theme/ThemeContext';

interface PostCateogryProps {
  category?: string;
  isActive?: boolean;
  variant?: 'text' | 'plus';
  onPress: () => void;
}

export const PostCategory = ({
  category,
  isActive = false,
  variant = 'text',
  onPress,
}: PostCateogryProps) => {
  const {textSecondary} = useThemeColors();
  return (
    <Container onPress={onPress} isActive={isActive} variant={variant}>
      {variant === 'text' && <CategoryText>{category}</CategoryText>}
      {variant === 'plus' && (
        <PlusIcon fill={textSecondary} width={10} height={10} />
      )}
    </Container>
  );
};
