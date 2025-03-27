import React, {createContext, useContext, useState, useEffect} from 'react';
import {
  ThemeProvider as EmotionThemeProvider,
  useTheme as useEmotionTheme,
} from '@emotion/react';
import {darkTheme, lightTheme, themeFonts} from '@/theme';
import {useColorScheme} from 'react-native';
import {Theme} from '@emotion/react/dist/declarations/src';

/**
 * 테마 컨텍스트 타입 정의
 * 다크모드/라이트모드 및 폰트 테마 제공 (단, colors 를 통일하여 사용할 수 있도록 해야합니다.)
 * useTheme 훅을 통해 테마 정보를 전역적으로 변경할 수 있습니다.
 * @author 홍규진, 이정선
 */
interface ThemeContextProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
  colors: Theme['colors'];
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider = ({children}: {children: React.ReactNode}) => {
  // 시스템 테마 감지
  const systemColorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(systemColorScheme === 'dark');

  // 시스템 테마 변경 감지
  useEffect(() => {
    setIsDarkMode(systemColorScheme === 'dark');
  }, [systemColorScheme]);

  const toggleTheme = () => setIsDarkMode(prev => !prev);

  // 현재 테마의 colors 객체
  const currentTheme = isDarkMode ? darkTheme : lightTheme;

  // font, color theme
  const mergedTheme = {
    ...currentTheme,
    fonts: themeFonts,
  };

  return (
    <ThemeContext.Provider
      value={{
        isDarkMode,
        toggleTheme,
        colors: currentTheme.colors,
      }}>
      <EmotionThemeProvider theme={mergedTheme}>
        {children}
      </EmotionThemeProvider>
    </ThemeContext.Provider>
  );
};

// 테마 컨텍스트 사용을 위한 훅
export const useTheme = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Emotion의 테마 객체에 직접 접근하기 위한 훅
export const useThemeColors = () => {
  const theme = useEmotionTheme();
  return theme.colors;
};
