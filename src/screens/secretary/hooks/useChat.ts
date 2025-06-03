import {useAtom} from 'jotai';
import {ChatMessage} from '../types';
import {TPostChattingRequest} from '@/services/secretary/types';
import {formatTime} from '../utils/formatTime';
import {useChattingMutation} from './useChattingMutation';
import {workspaceState} from '@/atoms/workspace';
import {messagesAtom} from '@/atoms/chat';

/**
 * 채팅 메시지를 전역적으로 관리하는 훅입니다.
 * 여기서의 채팅은 단순히 비서와의 채팅을 의미하며, REST API 통신입니다.
 * isPending을 통해 채팅 요청 도중의 로딩 상태를 관리합니다.
 * mutation 훅을 통해 채팅 요청을 처리합니다.
 * @author 홍규진
 */

export const useChat = () => {
  const [messages, setMessages] = useAtom(messagesAtom);
  const [workspace] = useAtom(workspaceState);
  const {mutate: sendChatting, isPending} = useChattingMutation();

  const addMessage = (msg: ChatMessage) => {
    setMessages(prev => [...prev, msg]);
  };

  const handleSendChatting = (
    request: TPostChattingRequest,
    onResponse?: () => void,
  ) => {
    addMessage({
      id: messages.length.toString(),
      sender: 'user',
      text: request.secretaryQuestion,
      time: formatTime(),
    });

    // AI 응답 대기 중 메시지 추가
    const loadingMessageId = (messages.length + 1).toString();
    addMessage({
      id: loadingMessageId,
      sender: 'ai',
      text: '...',
      time: formatTime(),
    });

    sendChatting(
      {
        workSpaceId: workspace.workspaceId,
        request,
      },
      {
        onSuccess: response => {
          // 로딩 메시지 제거
          setMessages(prev => prev.filter(msg => msg.id !== loadingMessageId));

          // 실제 응답 메시지 추가
          addMessage({
            id: (messages.length + 1).toString(),
            sender: 'ai',
            text: response.secretaryAnswer,
            time: formatTime(),
            fileList: response.fileList,
          });

          // 응답이 오고 나서 스크롤 트리거
          setTimeout(() => {
            onResponse?.();
          }, 100);
        },
      },
    );
  };

  return {
    messages,
    addMessage,
    isPending,
    sendChatting: handleSendChatting,
  };
};
