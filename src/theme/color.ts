/**
 * 테마 컬러 타입 정의
 * 컬러 코드는 16진수로 정의합니다.
 * 컬러 코드는 테마 컬러 상수 정의에 사용됩니다.
 */
import {Theme} from '@emotion/react';

export type ThemeType = 'light' | 'dark';

/**
 * 테마 컬러 상수 정의
 * figma에서 정의한 컬러 코드를 사용합니다.
 * 컬러 코드는 테마 컬러 타입 정의에 사용됩니다.
 */
export const lightTheme: Theme = {
  colors: {
    white: '#FFFFFF',
    black: '#000000',
    background: '#FFFFFF',
    backgroundBase: '#FAFAFA',
    backgroundElevated: '#F2F2F2',
    popup: '#FFFFFF',
    divider: '#E0E0E0',
    textPrimary: '#1A1A1A',
    textSecondary: '#666666',
    textDisabled: '#BFBFBF',
    shadow: 'rgba(0, 0, 0, 0.1)',
    backgroundSelected: '#E2E2F1',
    blue: '#5354E8',
    blueSecondary: '#C5C5F2',
    lime: '#C0E021',
    pink: '#FF52A8',
    red: '#DE3131',
    backgroundGradient: '(174deg, #5354E8 5%, #603DBF 100%)',
  },
};

export const darkTheme: Theme = {
  colors: {
    white: '#FFFFFF',
    black: '#000000',
    background: '#252526',
    backgroundBase: '#292929',
    backgroundElevated: '#333333',
    popup: '#333333',
    divider: '#555555',
    textPrimary: '#F9F9F9',
    textSecondary: '#CCCCCC',
    textDisabled: '#666666',
    shadow: 'rgba(0, 0, 0, 0.2)',
    backgroundSelected: '#363645',
    blue: '#5354E8',
    blueSecondary: '#3C3C87',
    lime: '#C0E021',
    pink: '#FF52A8',
    red: '#DE3131',
    backgroundGradient: '(174deg, #5354E8 5%, #603DBF 100%)',
  },
};

export const theme = {
  light: lightTheme,
  dark: darkTheme,
};

export default theme;
