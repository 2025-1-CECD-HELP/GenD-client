import React from 'react';
import {View} from 'react-native';
import {AdaptiveErrorFallback} from './AdaptiveErrorFallbackUI';
import AxiosErrorFallbackUI from './AxiosErrorFallbackUI';
import ParsingErrorFallbackUI from './ParsingErrorFallbackUI';
import RenderingErrorFallbackUI from './RenderingErrorFallbackUI';
import {AxiosError} from 'axios';

const meta = {
  title: 'Components/ErrorFallback',
  component: AdaptiveErrorFallback,
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

// 기본 에러 바운더리 스토리
export const Default = {
  args: {
    error: new Error('기본 에러가 발생했습니다.'),
    resetError: () => console.log('에러 리셋'),
  },
};

// Axios 에러 스토리
export const AxiosErrorStory = {
  render: () => (
    <AxiosErrorFallbackUI
      error={
        new AxiosError('Network Error', 'ERR_NETWORK', undefined, undefined, {
          status: 500,
          data: {message: '서버 오류가 발생했습니다.'},
        } as any)
      }
      resetError={() => console.log('에러 리셋')}
    />
  ),
};

// 파싱 에러 스토리
export const ParsingErrorStory = {
  render: () => (
    <ParsingErrorFallbackUI
      error={new Error('JSON 파싱 오류가 발생했습니다.')}
      resetError={() => console.log('에러 리셋')}
    />
  ),
};

// 렌더링 에러 스토리
export const RenderingErrorStory = {
  render: () => (
    <RenderingErrorFallbackUI
      error={new Error('컴포넌트 렌더링 중 오류가 발생했습니다.')}
      resetError={() => console.log('에러 리셋')}
    />
  ),
};

// 다양한 에러 케이스
export const VariousErrorsStory = {
  render: () => (
    <AdaptiveErrorFallback
      error={new Error('다양한 에러 케이스 테스트')}
      resetError={() => console.log('에러 리셋')}
    />
  ),
};
