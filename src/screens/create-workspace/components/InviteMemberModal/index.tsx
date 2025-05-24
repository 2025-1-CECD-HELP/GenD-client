import React, {useState} from 'react';
import {
  ModalContainer,
  EmailRow,
  EmailInput,
  AddButton,
  MemberList,
  MemberItem,
  Avatar,
  MemberName,
  RemoveButton,
  AddButtonText,
  RemoveButtonText,
} from './index.style';
import {useThemeColors} from '@/contexts/theme/ThemeContext';

export const InviteMemberModal: React.FC<{
  members: string[];
  setMembers: (members: string[]) => void;
}> = ({members, setMembers}) => {
  const [email, setEmail] = useState('');
  const {textDisabled} = useThemeColors();
  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleAddEmail = () => {
    const trimmed = email.trim();
    if (!trimmed || !isValidEmail(trimmed)) {
      return;
    }
    setMembers([...members, trimmed]);
    setEmail('');
  };

  const handleRemove = (index: number) => {
    setMembers(members.filter((_, i) => i !== index));
  };

  return (
    <ModalContainer>
      <EmailRow>
        <EmailInput
          placeholder="이메일을 입력하세요"
          placeholderTextColor={textDisabled}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <AddButton onPress={handleAddEmail}>
          <AddButtonText>+</AddButtonText>
        </AddButton>
      </EmailRow>
      <MemberList>
        {members.map((memberEmail, idx) => (
          <MemberItem key={memberEmail + idx}>
            <Avatar />
            <MemberName>{memberEmail}</MemberName>
            <RemoveButton onPress={() => handleRemove(idx)}>
              <RemoveButtonText>×</RemoveButtonText>
            </RemoveButton>
          </MemberItem>
        ))}
      </MemberList>
    </ModalContainer>
  );
};
