import React from 'react';
import {Container} from './index.style';

import {TopBar} from '@/components/TopBar';
import ChattingInput from '@/components/ChattingInput';
import {SecretaryProfile} from './components/ScretaryProfile';
import {SecretaryChatList} from './components/SecretaryChatList';
import {useChat} from './hooks/useChat';
import {useThemeColors} from '@/contexts/theme/ThemeContext';
import useTypeSafeNavigation from '@/hooks/useTypeSafeNavigaion';

/**
 * 비서 화면입니다.
 * 비서 프로필, 채팅 리스트, 채팅 입력창으로 구성됩니다.
 * @author 홍규진
 */
const SecretaryScreen = () => {
  const {sendChatting} = useChat();
  const {textPrimary} = useThemeColors();
  const navigation = useTypeSafeNavigation();

  return (
    <Container>
      <TopBar
        title="AI 비서"
        showBackButton={true}
        onPressBack={() => navigation.navigate('LANDING', {})}
      />
      <SecretaryProfile />
      <SecretaryChatList />
      <ChattingInput
        onSubmit={chattingText => {
          sendChatting({
            secretaryQuestion: chattingText,
          });
        }}
        placeholder="AI 비서에게 질문해보세요"
        placeholderTextColor={textPrimary}
      />
    </Container>
  );
};

export default SecretaryScreen;
