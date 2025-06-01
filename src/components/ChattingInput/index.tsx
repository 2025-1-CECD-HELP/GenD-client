import React from 'react';
import {
  Container,
  InputContainer,
  InputField,
  IconContainer,
} from './index.style';
import {ArrowIcon} from '@assets/images/svg/chatting-input';
import {useInput} from '@hooks/useInput';
import {useThemeColors} from '@/contexts/theme/ThemeContext';
import {KeyboardAvoidingView, Platform} from 'react-native';
/**
 * 채팅 입력 컴포넌트입니다.
 * 이는 placeholder를 받을 수 있습니다.
 * 또한 onSubmit 함수를 받아서 제출 버튼을 누르면 해당 함수를 호출합니다.
 * 또한 isDebouncing 옵션을 받아서 디바운스를 사용 여부를 지정할 수 있습니다.
 * @author 홍규진
 */
export type ChattingInputProps = {
  onSubmit: (text: string) => void;
  placeholder: string;
  placeholderTextColor?: string;
  isDebouncing?: boolean;
};

const ChattingInput: React.FC<ChattingInputProps> = ({
  onSubmit = () => {
    console.log('onSubmit를 추가해주세요');
  },
  placeholder = 'AI 비서에게 질문하세요',
  isDebouncing = false,
}) => {
  const {text, handleChangeText, handleSubmit} = useInput({
    onSubmit,
    isDebouncing,
  });
  const {textDisabled} = useThemeColors();
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}>
      <Container>
        <InputContainer>
          <InputField
            placeholder={placeholder}
            value={text}
            onChangeText={handleChangeText}
            onSubmitEditing={handleSubmit}
            placeholderTextColor={textDisabled}
          />
        </InputContainer>
        <IconContainer onPress={handleSubmit}>
          <ArrowIcon width={20} height={20} />
        </IconContainer>
      </Container>
    </KeyboardAvoidingView>
  );
};

export default ChattingInput;
