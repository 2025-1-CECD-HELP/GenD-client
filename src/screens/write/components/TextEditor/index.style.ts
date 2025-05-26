import styled from '@emotion/native';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import {ViewStyle, TextStyle, ImageStyle} from 'react-native';

export type MarkdownStyles = {
  [key: string]: ViewStyle | TextStyle | ImageStyle;
  body: TextStyle;
  heading1: TextStyle;
  heading2: TextStyle;
  heading3: TextStyle;
  image: ImageStyle;
  link: TextStyle;
  list_item: ViewStyle;
};

export const Container = styled(SafeAreaView)`
  flex: 1;
`;

export const KeyboardView = styled(KeyboardAvoidingView)`
  flex: 1;
`;

export const Editor = styled(TextInput)`
  flex: 1;
  padding: 16px;
  font-size: 16px;
`;

export const Toolbar = styled(View)`
  flex-direction: row;
  padding: 8px;
  border-top-width: 1px;
  border-top-color: #e5e5e5;
`;

export const ToolbarButton = styled(TouchableOpacity)`
  padding-horizontal: 12px;
  padding-vertical: 8px;
  margin-right: 8px;
  border-radius: 4px;
`;

export const ToolbarButtonText = styled(Text)`
  font-size: 14px;
  font-weight: 500;
`;
// 썸네일 스타일 컴포넌트
export const Thumbnail = styled(Image)<{}>({
  width: 150,
  height: 150,
  borderRadius: 8,
  marginTop: 12,
  alignSelf: 'flex-start',
  backgroundColor: '#eee',
});

export const markdownStyles = {
  body: {
    padding: 16,
  },
  heading1: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  heading2: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  heading3: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginVertical: 8,
  },
  link: {
    color: '#007AFF',
  },
  list_item: {
    marginVertical: 4,
  },
} as const;

export const themedMarkdownStyles: MarkdownStyles = {
  ...markdownStyles,
  body: {
    ...markdownStyles.body,
    color: 'black',
  },
  heading1: {
    ...markdownStyles.heading1,
    color: 'black',
  },
  heading2: {
    ...markdownStyles.heading2,
    color: 'black',
  },
  heading3: {
    ...markdownStyles.heading3,
    color: 'black',
  },
};
