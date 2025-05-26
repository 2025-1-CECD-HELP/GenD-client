import React from 'react';
import {View} from 'react-native';
import RenderingErrorFallbackUI from './RenderingErrorFallbackUI';

const meta = {
  title: 'Components/ErrorFallback/RenderingError',
  component: RenderingErrorFallbackUI,
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

// 기본 렌더링 에러
export const Default = {
  render: () => (
    <RenderingErrorFallbackUI
      error={new Error('컴포넌트 렌더링 중 오류가 발생했습니다.')}
      resetError={() => console.log('에러 리셋')}
    />
  ),
};

// 스타일 에러
export const StyleError = {
  render: () => (
    <RenderingErrorFallbackUI
      error={new Error('스타일 적용 중 오류가 발생했습니다.')}
      resetError={() => console.log('에러 리셋')}
    />
  ),
};

// 레이아웃 에러
export const LayoutError = {
  render: () => (
    <RenderingErrorFallbackUI
      error={new Error('레이아웃 계산 중 오류가 발생했습니다.')}
      resetError={() => console.log('에러 리셋')}
    />
  ),
};
