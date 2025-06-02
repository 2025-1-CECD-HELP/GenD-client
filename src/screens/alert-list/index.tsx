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
import {TopBar} from '@/components';
import {useAtom} from 'jotai';
import {Alert, alertState} from '@/atoms/alert';
import dayjs from 'dayjs';
import useTypeSafeNavigation from '@/hooks/useTypeSafeNavigaion';

export const AlertListScreen = () => {
  const [alerts] = useAtom(alertState);
  const navigation = useTypeSafeNavigation();
  return (
    <Container>
      <TopBar
        title="알림"
        showBackButton={true}
        onPressBack={() => navigation.navigate('LANDING', {})}
      />
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
