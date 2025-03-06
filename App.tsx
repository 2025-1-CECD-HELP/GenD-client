import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AppNavigator from '@/navigation/navigator';
import {AuthProvider} from '@/contexts/auth/AuthContext';
import {ThemeProvider} from '@/contexts/theme/ThemeContext';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
        <AuthProvider>
            <ThemeProvider>
              <AppNavigator />
            </ThemeProvider>
        </AuthProvider>
    </SafeAreaProvider>
  );
}

export default App;
