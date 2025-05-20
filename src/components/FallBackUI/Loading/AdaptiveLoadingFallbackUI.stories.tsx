import React from 'react';
import {View} from 'react-native';
import AdaptiveLoadingFallback from './AdaptiveLoadingFallbackUI';

const meta = {
  title: 'Components/LoadingFallback',
  component: AdaptiveLoadingFallback,
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

// 기본 로딩 상태
export const Default = {
  render: () => <AdaptiveLoadingFallback />,
};

// 작은 크기의 로딩
export const Small = {
  render: () => (
    <View style={{height: 100}}>
      <AdaptiveLoadingFallback />
    </View>
  ),
};

// 중간 크기의 로딩
export const Medium = {
  render: () => (
    <View style={{height: 300}}>
      <AdaptiveLoadingFallback />
    </View>
  ),
};

// 큰 크기의 로딩
export const Large = {
  render: () => (
    <View style={{height: 600}}>
      <AdaptiveLoadingFallback />
    </View>
  ),
};
