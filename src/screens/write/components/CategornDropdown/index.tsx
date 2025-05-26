import {useState} from 'react';
import {
  Container,
  CategoryContainer,
  CategoryText,
  DownIcon,
  DropdownMenu,
  CategoryItem,
  CategoryItemText,
  DropdownMenuWrapper,
} from './index.style';
import {useThemeColors} from '@/contexts/theme/ThemeContext';
import {ArrowIcon} from '@/assets/images/svg/common';
import {CategoryIcon} from '@/assets/images/svg/write';
import {Shadow} from 'react-native-shadow-2';
import {Category} from '@/services/post/types';

/**
 * 글쓰기 페이지에 사용되는 카테고리 드롭다운 컴포넌트입니다.
 * 사용자가 카테고리를 선택할 수 있습니다.
 * 카테고리 리스트는 워크스페이스 ID를 기반으로 조회됩니다.
 * 한 번 더 터치시에는 닫을 수 있도록 수정합니다.
 * @author 이정선, 홍규진
 */

interface CategoryDropdownProps {
  categories: Category[];
  selectedCategory: Category;
  onChangeCategory: (category: Category) => void;
}

export const CategoryDropdown = ({
  categories,
  selectedCategory,
  onChangeCategory,
}: CategoryDropdownProps) => {
  const {textSecondary, shadow} = useThemeColors();
  const [visible, setVisible] = useState(false);
  const handleSelect = (selected: Category) => {
    onChangeCategory(selected);
    setVisible(false);
  };

  return (
    <Container>
      <CategoryContainer visible={visible} onPress={() => setVisible(!visible)}>
        <CategoryIcon width={20} height={20} />
        <CategoryText>
          {selectedCategory.categoryName || '카테고리 선택'}
        </CategoryText>
        <DownIcon style={{transform: [{rotate: visible ? '90deg' : '270deg'}]}}>
          <ArrowIcon width={18} height={18} fill={textSecondary} />
        </DownIcon>
      </CategoryContainer>

      {visible && (
        <DropdownMenuWrapper>
          <Shadow
            distance={3}
            offset={[0, 3]}
            startColor={shadow}
            // eslint-disable-next-line react-native/no-inline-styles
            style={{position: 'absolute', width: '100%'}}>
            <DropdownMenu>
              {categories.map(option => (
                <CategoryItem
                  key={option.categoryId}
                  onPress={() => handleSelect(option)}>
                  <CategoryItemText>{option.categoryName}</CategoryItemText>
                </CategoryItem>
              ))}
            </DropdownMenu>
          </Shadow>
        </DropdownMenuWrapper>
      )}
    </Container>
  );
};
