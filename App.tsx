import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AppNavigator from '@/navigation/navigator';
import {AuthProvider} from '@/contexts/auth/AuthContext';
import {QueryClientProvider} from '@/contexts/query/QueryContext';
import {ThemeProvider} from '@/contexts/theme/ThemeContext';
import {ModalProvider} from '@/contexts/modal/ModalContext';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <QueryClientProvider>
        <AuthProvider>
          <ThemeProvider>
            <ModalProvider>
              <AppNavigator />
            </ModalProvider>
          </ThemeProvider>
        </AuthProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}

// export default App;

export {default} from './.storybook';
