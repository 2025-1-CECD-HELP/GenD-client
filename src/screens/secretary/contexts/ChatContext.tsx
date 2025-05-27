import React, {createContext, useContext, useState} from 'react';
import {ChatMessage} from '../types';
import {useChattingMutation} from '../hooks/useChattingMutation';
import {TPostChattingRequest} from '@/services/secretary/types';
import {formatTime} from '../utils/formatTime';
import {useAtom} from 'jotai';
import {workspaceState} from '@/atoms/workspace';

/**
 * 채팅 메시지를 지역적으로 관리하는 컨텍스트 파일입니다.
 * 여기서의 채팅은 단순히 비서와의 채팅을 의미하며, REST API 통신입니다.
 * isPending을 통해 채팅 요청 도중의 로딩 상태를 관리합니다.
 * mutation 훅을 통해 채팅 요청을 처리합니다.
 * @author 홍규진
 */

type ChatContextType = {
  messages: ChatMessage[];
  addMessage: (msg: ChatMessage) => void;
  isPending: boolean;
  sendChatting: (request: TPostChattingRequest) => void;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({children}: {children: React.ReactNode}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const {mutate: sendChatting, isPending} = useChattingMutation();
  const [workspace] = useAtom(workspaceState);
  const addMessage = (msg: ChatMessage) => setMessages(prev => [...prev, msg]);

  const handleSendChatting = (request: TPostChattingRequest) => {
    addMessage({
      id: messages.length.toString(),
      sender: 'user',
      text: request.secretaryQuestion,
      time: formatTime(),
    });
    sendChatting(
      {
        workSpaceId: workspace.workspaceId,
        request,
      },
      {
        onSuccess: response => {
          addMessage({
            id: (messages.length + 1).toString(),
            sender: 'ai',
            text: response.secretaryAnswer,
            time: formatTime(),
            fileList: response.fileList,
          });
        },
      },
    );
  };
  return (
    <ChatContext.Provider
      value={{
        messages,
        addMessage,
        isPending,
        sendChatting: handleSendChatting,
      }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const ctx = useContext(ChatContext);
  if (!ctx) {
    throw new Error('useChat must be used within ChatProvider');
  }
  return ctx;
};
