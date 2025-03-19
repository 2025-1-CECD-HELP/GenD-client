import '@emotion/react';

/**
 * 테마 타입 정의
 * 추후에 색상을 추가할 때 이 타입을 참고하여 추가해야 합니다.
 * @author 홍규진
 */
declare module '@emotion/react' {
  export interface Theme {
    colors: {
      white: string;
      black: string;
      background: string;
      backgroundBase: string;
      backgroundElevated: string;
      popup: string;
      divider: string;
      textPrimary: string;
      textSecondary: string;
      textDisabled: string;
      shadow: string;
      backgroundSelected: string;
      blue: string;
      blueSecondary: string;
      lime: string;
      pink: string;
      red: string;
      backgroundGradient: string;
    };
  }
}
