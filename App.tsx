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
import {useFCM} from '@/screens/login/hooks/useFCM';

dayjs.extend(relativeTime);
dayjs.locale('ko');

function App(): React.JSX.Element {
  const {requestUserPermission} = useFCM();

  useEffect(() => {
    requestUserPermission();
  }, [requestUserPermission]);

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
