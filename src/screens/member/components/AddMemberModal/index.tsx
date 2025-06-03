import React, {useState} from 'react';
import {
  ModalContainer,
  InputRow,
  EmailInput,
  AddButton,
  AddButtonText,
} from './index.style';
import {useThemeColors} from '@/contexts/theme/ThemeContext';
import {useAtom} from 'jotai';
import {workspaceState} from '@/atoms/workspace';
import {useAddMemberMutation} from '../../hooks/useMemberMutation';

export const AddMemberModal = () => {
  const [email, setEmail] = useState('');
  const {textDisabled} = useThemeColors();
  const [workspace] = useAtom(workspaceState);
  const {mutateAsync: addMember} = useAddMemberMutation();
  const handleAdd = () => {
    setEmail('');
    addMember({
      workspaceId: workspace.workspaceId,
      email,
    });
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
