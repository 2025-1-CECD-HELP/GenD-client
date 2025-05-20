/* eslint-disable react-native/no-inline-styles */
import React, {Suspense} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AppNavigator from '@/navigation/navigator';
import {AuthProvider} from '@/contexts/auth/AuthContext';
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

dayjs.extend(relativeTime);
dayjs.locale('ko');

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <QueryClientProvider>
        <AuthProvider>
          <ThemeProvider>
            <ModalProvider>
              <GestureHandlerRootView style={{flex: 1}}>
                <BottomSheetProvider>
                  <ErrorBoundary FallbackComponent={AdaptiveErrorFallback}>
                    <Suspense fallback={<AdaptiveLoadingFallback />}>
                      <AppNavigator />
                    </Suspense>
                  </ErrorBoundary>
                </BottomSheetProvider>
              </GestureHandlerRootView>
            </ModalProvider>
          </ThemeProvider>
        </AuthProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}

export default App;

// export {default} from './.storybook';
