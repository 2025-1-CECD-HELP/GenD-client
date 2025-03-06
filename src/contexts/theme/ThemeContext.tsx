import React, {createContext, useContext, useState} from 'react';
import {ThemeProvider as EmotionThemeProvider} from '@emotion/react';
import {darkTheme, lightTheme} from '@/theme';
/**
 * 테마 컨텍스트 타입 정의
 * 다크모드 및 라이트모드 테마 제공 (단, colors 를 통일하여 사용할 수 있도록 해야합니다.)
 * useTheme 훅을 통해 테마 정보를 전역적으로 변경할 수 있습니다.
 * @author 홍규진
 */
interface ThemeContextProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider = ({children}: {children: React.ReactNode}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => setIsDarkMode(prev => !prev);

  return (
    <ThemeContext.Provider value={{isDarkMode, toggleTheme}}>
      <EmotionThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        {children}
      </EmotionThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
