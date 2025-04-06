import {useInput} from '@/hooks/useInput';
import {
  ClearButton,
  ClearIcon,
  Container,
  SearchButton,
  SearchContainer,
  SearchInput,
  IconContainer,
} from './index.style';
import {ExportIcon, SearchIcon} from '@/assets/images/svg/search-bar';
import {PlusIcon} from '@/assets/images/svg/common';
import {useThemeColors} from '@/contexts/theme/ThemeContext';

/**
 * 검색 바 컴포넌트
 * 기존의 useInput 훅을 사용하여 검색 기능을 구현
 * search함수를 onSearch 함수를 통해 전달받아 사용함
 * 디바운싱 여부를 isDebouncing 함수를 통해 전달받아 사용함
 * 검색 버튼을 누르면 검색 기능을 수행
 * @author 홍규진
 */

interface SearchProps {
  onSearchSubmit?: (query: string) => void;
  placeholder?: string;
  isDebouncing?: boolean;
}

export const SearchBar: React.FC<SearchProps> = ({
  onSearchSubmit = () => {
    console.log('검색 함수를 주입해주세요!');
  },
  placeholder = '파일명으로 검색하세요',
  isDebouncing = false,
}) => {
  const {text, handleChangeText, handleSubmit} = useInput({
    isDebouncing,
    onSubmit: onSearchSubmit,
  });

  const clearText = () => {
    handleChangeText('');
  };

  const {textDisabled} = useThemeColors();

  return (
    <Container>
      <SearchContainer>
        <SearchInput
          value={text}
          onChangeText={handleChangeText}
          placeholder={placeholder}
          placeholderTextColor={textDisabled}
          onSubmitEditing={handleSubmit}
        />
        {text.length > 0 ? (
          <ClearButton onPress={clearText} visible={text.length > 0}>
            <ClearIcon>✕</ClearIcon>
          </ClearButton>
        ) : (
          <SearchButton onPress={handleSubmit} disabled={!text.trim()}>
            <SearchIcon />
          </SearchButton>
        )}
      </SearchContainer>
      <IconContainer>
        <ExportIcon />
      </IconContainer>
      <IconContainer>
        <PlusIcon />
      </IconContainer>
    </Container>
  );
};
