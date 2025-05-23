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
import {CATEGORY_OPTIONS} from '../../constants/category';
import {Shadow} from 'react-native-shadow-2';

/**
 * 글쓰기 페이지에 사용되는 카테고리 드롭다운 컴포넌트입니다.
 * 사용자가 카테고리를 선택할 수 있습니다. 현재는 CATEGORY_OPTIONS을 기반으로 목록을 표시하며, 추후 카테고리 리스트 호출로 대체해야 합니다.
 * @author 이정선
 */

interface CategoryDropdownProps {
  category: String;
  onChangeCategory: (category: string) => void;
}

export const CategoryDropdown = ({
  category,
  onChangeCategory,
}: CategoryDropdownProps) => {
  const {textSecondary, shadow} = useThemeColors();
  const [visible, setVisible] = useState(false);
  const handleSelect = (selected: string) => {
    onChangeCategory(selected);
    setVisible(false);
  };

  return (
    <Container>
      <CategoryContainer visible={visible} onPress={() => setVisible(true)}>
        <CategoryIcon width={20} height={20} />
        <CategoryText>{category}</CategoryText>
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
            style={{position: 'absolute', width: '100%'}}>
            <DropdownMenu>
              {CATEGORY_OPTIONS.map(option => (
                <CategoryItem key={option} onPress={() => handleSelect(option)}>
                  <CategoryItemText>{option}</CategoryItemText>
                </CategoryItem>
              ))}
            </DropdownMenu>
          </Shadow>
        </DropdownMenuWrapper>
      )}
    </Container>
  );
};
