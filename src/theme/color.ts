/**
 * 테마 컬러 타입 정의
 * 컬러 코드는 16진수로 정의합니다.
 * 컬러 코드는 테마 컬러 상수 정의에 사용됩니다.
 */
type ColorCode = string;

interface TThemeColors {
  main: ColorCode;
  sub: ColorCode;
  blue: ColorCode;
  yellow: ColorCode;
  pink: ColorCode;
  red: ColorCode;
  white: ColorCode;
  gray1: ColorCode;
  gray2: ColorCode;
  gray3: ColorCode;
  gray4: ColorCode;
  gray5: ColorCode;
  gray6: ColorCode;
  black: ColorCode;
}

/**
 * 테마 컬러 상수 정의
 * figma에서 정의한 컬러 코드를 사용합니다.
 * 컬러 코드는 테마 컬러 타입 정의에 사용됩니다.
 */
export const themeColors: TThemeColors = {
  main: '#CDE021',
  sub: '#E6F3A5',
  blue: '#5354E8',
  yellow: '#FFBE27',
  pink: '#FF52A8',
  red: '#DE3131',
  white: '#FFFFFF',
  gray1: '#F2F2F2',
  gray2: '#E5E5E5',
  gray3: '#CCCCCC',
  gray4: '#B3B3B3',
  gray5: '#808080',
  gray6: '#333333',
  black: '#000000',
} as const;
