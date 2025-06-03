import {atom} from 'jotai';
import {ChatMessage} from '@/screens/secretary/types';

/**
 * 채팅 메시지를 전역적으로 관리하는 atom입니다.
 * 여기서의 채팅은 단순히 비서와의 채팅을 의미하며, REST API 통신입니다.
 * isPending을 통해 채팅 요청 도중의 로딩 상태를 관리합니다.
 * mutation 훅을 통해 채팅 요청을 처리합니다.
 * @author 홍규진
 */

export const messagesAtom = atom<ChatMessage[]>([]);
