import React, {createContext, useContext, useState, useEffect} from 'react';
import {
  ThemeProvider as EmotionThemeProvider,
  useTheme as useEmotionTheme,
} from '@emotion/react';
import {darkTheme, lightTheme, themeFonts} from '@/theme';
import {useColorScheme} from 'react-native';
import {Theme} from '@emotion/react/dist/declarations/src';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * 테마 컨텍스트 타입 정의
 * 다크모드/라이트모드 및 폰트 테마 제공 (단, colors 를 통일하여 사용할 수 있도록 해야합니다.)
 * useTheme 훅을 통해 테마 정보를 전역적으로 변경할 수 있습니다.
 * @author 홍규진, 이정선
 */
const THEME_STORAGE_KEY = '@theme_mode';

interface ThemeContextProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
  colors: Theme['colors'];
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider = ({children}: {children: React.ReactNode}) => {
  const systemColorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(systemColorScheme === 'dark');

  // 앱 시작 시 저장된 테마 설정 불러오기
  useEffect(() => {
    const loadSavedTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (savedTheme !== null) {
          setIsDarkMode(savedTheme === 'dark');
        } else {
          // 저장된 설정이 없으면 시스템 테마 사용
          setIsDarkMode(systemColorScheme === 'dark');
        }
      } catch (error) {
        console.error('테마 설정을 불러오는데 실패했습니다:', error);
        setIsDarkMode(systemColorScheme === 'dark');
      }
    };

    loadSavedTheme();
  }, [systemColorScheme]);

  const toggleTheme = async () => {
    const newThemeMode = !isDarkMode;
    setIsDarkMode(newThemeMode);
    try {
      await AsyncStorage.setItem(
        THEME_STORAGE_KEY,
        newThemeMode ? 'dark' : 'light',
      );
    } catch (error) {
      console.error('테마 설정을 저장하는데 실패했습니다:', error);
    }
  };

  const currentTheme = isDarkMode ? darkTheme : lightTheme;
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
