import React from 'react';
import {
  Container,
  AlertList,
  AlertItem,
  AlertTitle,
  AlertContent,
  AlertTime,
  EmptyView,
} from './index.style';
import {useAtom} from 'jotai';
import {Alert, alertState} from '@/atoms/alert';
import dayjs from 'dayjs';

export const AlertListScreen = () => {
  const [alerts] = useAtom(alertState);

  return (
    <Container>
      {alerts.length > 0 ? (
        <AlertList
          data={alerts}
          keyExtractor={(item: Alert, index: number) => `${item.id}-${index}`}
          renderItem={({item}: {item: Alert}) => (
            <AlertItem>
              <AlertTitle>{item.title}</AlertTitle>
              <AlertContent>{item.content}</AlertContent>
              <AlertTime>{dayjs(item.timestamp).fromNow()}</AlertTime>
            </AlertItem>
          )}
        />
      ) : (
        <EmptyView>알림이 없습니다.</EmptyView>
      )}
    </Container>
  );
};
