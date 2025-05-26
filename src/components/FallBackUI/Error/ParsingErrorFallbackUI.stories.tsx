import React from 'react';
import {View} from 'react-native';
import ParsingErrorFallbackUI from './ParsingErrorFallbackUI';

const meta = {
  title: 'Components/ErrorFallback/ParsingError',
  component: ParsingErrorFallbackUI,
  decorators: [
    (Story: any) => (
      // eslint-disable-next-line react-native/no-inline-styles
      <View style={{flex: 1, height: 500}}>
        <Story />
      </View>
    ),
  ],
};

export default meta;

// Syntax 에러
export const SyntaxError = {
  render: () => (
    <ParsingErrorFallbackUI
      error={new Error('잘못된 JSON 형식입니다.')}
      resetError={() => console.log('에러 리셋')}
    />
  ),
};

// Type 에러
export const TypeError = {
  render: () => (
    <ParsingErrorFallbackUI
      error={new Error('undefined는 함수가 아닙니다.')}
      resetError={() => console.log('에러 리셋')}
    />
  ),
};

// JSON 파싱 에러
export const JSONParseError = {
  render: () => (
    <ParsingErrorFallbackUI
      error={new Error('JSON 파싱 중 오류가 발생했습니다.')}
      resetError={() => console.log('에러 리셋')}
    />
  ),
};
