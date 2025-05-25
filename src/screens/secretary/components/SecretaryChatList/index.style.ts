import styled from '@emotion/native';

export const ChatListContainer = styled.View`
  flex: 1;
  width: 100%;
  padding: 0 12px;
`;

export const DateDivider = styled.Text`
  align-self: center;
  color: ${({theme}) => theme.colors.textDisabled};
  font-size: 13px;
  margin: 12px 0;
`;

export const MessageRow = styled.View<{isUser: boolean}>`
  flex-direction: row;
  justify-content: ${({isUser}) => (isUser ? 'flex-end' : 'flex-start')};
  margin-bottom: 8px;
`;

export const AvatarWrapper = styled.View`
  width: 40px;
  align-items: center;
`;

export const BubbleWrapper = styled.View<{isUser: boolean}>`
  flex-direction: ${({isUser}) => (isUser ? 'row-reverse' : 'row')};
  align-items: flex-end;
  margin-left: ${({isUser}) => (isUser ? '0px' : '8px')};
  margin-right: ${({isUser}) => (isUser ? '8px' : '0px')};
`;

export const Bubble = styled.View<{isUser: boolean}>`
  max-width: 75%;
  background-color: ${({theme, isUser}) =>
    isUser ? theme.colors.blue : theme.colors.backgroundElevated};
  padding: 10px 14px 12px 14px;
  border-radius: 16px;
  border-bottom-right-radius: ${({isUser}) => (isUser ? '4px' : '16px')};
  border-bottom-left-radius: ${({isUser}) => (!isUser ? '4px' : '16px')};
`;

export const MessageText = styled.Text<{isUser: boolean}>`
  color: ${({theme, isUser}) =>
    isUser ? theme.colors.white : theme.colors.textSecondary};
  ${({theme}) => theme.fonts.text2};
`;

export const Avatar = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 20px;
`;

export const TimeText = styled.Text<{isUser: boolean}>`
  margin: ${({isUser}) => (isUser ? '0 8px 0 0' : '0 0 0 8px')};
  align-self: flex-end;
  ${({theme}) => theme.fonts.text3};
  color: ${({theme}) => theme.colors.textDisabled};
  text-align: right;
`;
