import React, {useRef, useEffect} from 'react';
import {FlatList, Linking} from 'react-native';
import {
  ChatListContainer,
  DateDivider,
  MessageRow,
  Bubble,
  Avatar,
  TimeText,
  AvatarWrapper,
  BubbleWrapper,
  MessageText,
  FileItem,
  FileName,
  RowContainer,
  ColumnContainer,
} from './index.style';
import {useChat} from '../../contexts/ChatContext';
import {formatTime} from '../../utils/formatTime';
import {TFile} from '@/services/secretary/types';
import FileDownloadIcon from '@/assets/images/svg/chatting/FileDownload.svg';
import {useThemeColors} from '@/contexts/theme/ThemeContext';
const AI_AVATAR = require('@/assets/images/png/secretary/avartar.png');

/**
 * 비서 채팅 리스트 화면입니다.
 * useChat 커스텀 훅에서 전달받은 메시지 데이터를 화면에 표시합니다.
 * 메시지 데이터는 비서가 보낸 메시지와 사용자가 보낸 메시지로 구분됩니다.
 * 비서가 보낸 메시지는 왼쪽에 표시되고, 사용자가 보낸 메시지는 오른쪽에 표시됩니다.
 * 메시지 데이터는 비서가 보낸 메시지와 사용자가 보낸 메시지로 구분됩니다.
 * @author 홍규진
 */
export const SecretaryChatList = () => {
  const {messages, isPending} = useChat();
  const flatListRef = useRef<FlatList>(null);
  const {textSecondary} = useThemeColors();
  useEffect(() => {
    if (flatListRef.current && messages.length > 0) {
      const lastMsg = messages[messages.length - 1];
      if (lastMsg.sender === 'ai') {
        flatListRef.current.scrollToEnd({animated: true});
      }
    }
  }, [messages]);

  return (
    <ChatListContainer>
      <DateDivider>오늘</DateDivider>
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={item => item.id}
        renderItem={({item, index}) => {
          const isUser = item.sender === 'user';
          const prev = messages[index - 1];
          const showAvatar =
            item.sender === 'ai' && (index === 0 || prev.sender !== 'ai');
          return (
            <MessageRow isUser={isUser}>
              {!isUser && (
                <AvatarWrapper>
                  {showAvatar ? <Avatar source={AI_AVATAR} /> : null}
                </AvatarWrapper>
              )}
              <BubbleWrapper isUser={isUser}>
                {isUser ? (
                  <>
                    <Bubble isUser={isUser}>
                      <MessageText isUser={isUser}>{item.text}</MessageText>
                    </Bubble>
                    <TimeText isUser={isUser}>{item.time}</TimeText>
                  </>
                ) : (
                  <ColumnContainer>
                    <RowContainer>
                      <Bubble isUser={isUser}>
                        <MessageText isUser={isUser}>{item.text}</MessageText>
                      </Bubble>
                      <TimeText isUser={isUser}>{item.time}</TimeText>
                    </RowContainer>
                    {item.fileList?.map((file: TFile) => (
                      <FileItem
                        key={file.fileUrl}
                        onPress={() => {
                          Linking.openURL(file.fileUrl);
                        }}>
                        <FileName>{`출처 : ${file.fileName}`}</FileName>
                        <FileDownloadIcon
                          width={12}
                          height={12}
                          fill={textSecondary}
                        />
                      </FileItem>
                    ))}
                  </ColumnContainer>
                )}
              </BubbleWrapper>
            </MessageRow>
          );
        }}
        ListFooterComponent={
          isPending ? (
            <MessageRow isUser={false}>
              <AvatarWrapper>
                <Avatar source={AI_AVATAR} />
              </AvatarWrapper>
              <BubbleWrapper isUser={false}>
                <Bubble isUser={false}>
                  <MessageText isUser={false}>...</MessageText>
                </Bubble>
                <TimeText isUser={false}>{formatTime()}</TimeText>
              </BubbleWrapper>
            </MessageRow>
          ) : null
        }
        showsVerticalScrollIndicator={false}
      />
    </ChatListContainer>
  );
};
