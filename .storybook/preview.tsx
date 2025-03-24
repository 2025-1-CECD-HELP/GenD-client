import React from 'react';
import {ThemeProvider} from '../src/contexts/theme/ThemeContext';
import {darkTheme, lightTheme} from '../src/theme/color';
import {withThemeFromJSXProvider} from '@storybook/addon-themes';

export const decorators = [
  withThemeFromJSXProvider({
    themes: {
      light: lightTheme,
      dark: darkTheme,
    },
    defaultTheme: 'light',
    Provider: ThemeProvider,
  }),
];
