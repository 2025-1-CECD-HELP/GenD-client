import React, {useState} from 'react';
import {
  ModalContainer,
  InputRow,
  EmailInput,
  AddButton,
  AddButtonText,
} from './index.style';
import {useThemeColors} from '@/contexts/theme/ThemeContext';

interface AddMemberModalProps {
  onAdd: (email: string) => void;
}

export const AddMemberModal: React.FC<AddMemberModalProps> = ({onAdd}) => {
  const [email, setEmail] = useState('');
  const {textDisabled} = useThemeColors();
  const handleAdd = () => {
    onAdd(email);
    setEmail('');
  };
  return (
    <ModalContainer>
      <InputRow>
        <EmailInput
          placeholder="이메일을 입력하세요"
          value={email}
          placeholderTextColor={textDisabled}
          onChangeText={setEmail}
        />
        <AddButton onPress={handleAdd} disabled={!email}>
          <AddButtonText>추가</AddButtonText>
        </AddButton>
      </InputRow>
    </ModalContainer>
  );
};
