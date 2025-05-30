import {StyleSheet} from 'react-native';

type Theme = {
  textPrimary: string;
  background: string;
  blue: string;
};

export const createMarkdownStyles = (theme: Theme) =>
  StyleSheet.create({
    body: {
      fontSize: 14,
      lineHeight: 20,
      color: theme.textPrimary,
      fontFamily: 'Pretendard-Regular',
    },
    paragraph: {
      margin: 0,
      padding: 0,
      color: theme.textPrimary,
    },
    strong: {
      fontWeight: 'bold',
      color: theme.textPrimary,
    },
    em: {
      fontStyle: 'italic',
      color: theme.textPrimary,
    },
    list: {
      margin: 0,
      paddingLeft: 20,
      color: theme.textPrimary,
    },
    listItem: {
      margin: 0,
      color: theme.textPrimary,
    },
    heading1: {
      margin: 0,
      color: theme.textPrimary,
    },
    heading2: {
      margin: 0,
      color: theme.textPrimary,
    },
    heading3: {
      margin: 0,
      color: theme.textPrimary,
    },
    heading4: {
      margin: 0,
      color: theme.textPrimary,
    },
    heading5: {
      margin: 0,
      color: theme.textPrimary,
    },
    heading6: {
      margin: 0,
      color: theme.textPrimary,
    },
    code: {
      backgroundColor: theme.background,
      color: theme.textPrimary,
    },
    blockquote: {
      borderLeftColor: theme.textPrimary,
      borderLeftWidth: 4,
      paddingLeft: 10,
      color: theme.textPrimary,
    },
    link: {
      color: theme.blue,
    },
  });
