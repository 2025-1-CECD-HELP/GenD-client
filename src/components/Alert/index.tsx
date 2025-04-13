import React from 'react';
import {
  Container,
  WorkspaceProfile,
  ContentContainer,
  Title,
  Content,
  ImageContainer,
  Time,
} from './index.style';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';

dayjs.extend(relativeTime);
dayjs.locale('ko');

/**
 * 개인 알림 페이지에 사용될 알림 컴포넌트입니다.
 * isNew를 통해 새로운 알림인지 확인하고 이에 따라 다른 스타일을 적용합니다.
 * createAt으로 알림이 생성된 시각을 전달받고,
 * dayjs의 fromNow() 함수를 사용하여 "2일 전", "7시간 전"과 같은 상대 시각을 표시합니다.
 * @author 이정선
 */

export type AlertProps = {
  title: string;
  createdAt: Date;
  content: string;
  workspaceProfileUrl: string;
  isNew: boolean;
};

export const Alert = ({
  title,
  createdAt,
  content,
  workspaceProfileUrl,
  isNew,
}: AlertProps) => {
  return (
    <Container isNew={isNew}>
      <ImageContainer>
        <WorkspaceProfile source={{uri: workspaceProfileUrl}} />
      </ImageContainer>

      <ContentContainer>
        <Title>{title}</Title>
        <Content numberOfLines={undefined} ellipsizeMode={undefined}>
          {content}
        </Content>
      </ContentContainer>
      <Time>{dayjs(createdAt).fromNow()}</Time>
    </Container>
  );
};
