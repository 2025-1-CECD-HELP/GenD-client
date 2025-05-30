/* eslint-disable react-native/no-inline-styles */
import React, {Suspense, useEffect} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AppNavigator from '@/navigation/navigator';
import {QueryClientProvider} from '@/contexts/query/QueryContext';
import {ThemeProvider} from '@/contexts/theme/ThemeContext';
import {ModalProvider} from '@/contexts/modal/ModalContext';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import BottomSheetProvider from '@contexts/bottomSheet/BottomSheetContext';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';
import AdaptiveLoadingFallback from '@/components/FallBackUI/Loading/AdaptiveLoadingFallbackUI';
import {AdaptiveErrorFallback} from '@/components/FallBackUI/Error/AdaptiveErrorFallbackUI';
import ErrorBoundary from 'react-native-error-boundary';
import messaging from '@react-native-firebase/messaging';
import {useAtom} from 'jotai';
import {alertState} from '@/atoms/alert';
import {Alert} from 'react-native';

dayjs.extend(relativeTime);
dayjs.locale('ko');

function App(): React.JSX.Element {
  const [_, setAlerts] = useAtom(alertState);

  useEffect(() => {
    // 포그라운드 메시지 핸들러
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      if (remoteMessage.notification) {
        Alert.alert(
          remoteMessage.notification.title || '새로운 알림',
          remoteMessage.notification.body,
        );
      }
    });

    // 백그라운드 메시지 핸들러
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      if (remoteMessage.notification) {
        const newAlert = {
          id: Date.now().toString(),
          title: remoteMessage.notification.title || '새로운 알림',
          content: remoteMessage.notification.body || '',
          timestamp: Date.now(),
          isRead: false,
        };
        setAlerts(prev => [newAlert, ...prev]);
      }
    });

    return unsubscribe;
  }, [setAlerts]);

  return (
    <ThemeProvider>
      <ErrorBoundary FallbackComponent={AdaptiveErrorFallback}>
        <QueryClientProvider>
          <SafeAreaProvider>
            <GestureHandlerRootView style={{flex: 1}}>
              <BottomSheetProvider>
                <ModalProvider>
                  <Suspense fallback={<AdaptiveLoadingFallback />}>
                    <AppNavigator />
                  </Suspense>
                </ModalProvider>
              </BottomSheetProvider>
            </GestureHandlerRootView>
          </SafeAreaProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;

// export {default} from './.storybook';
