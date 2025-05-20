import React from 'react';
import {View} from 'react-native';
import AxiosErrorFallbackUI from './AxiosErrorFallbackUI';
import {AxiosError} from 'axios';

const meta = {
  title: 'Components/ErrorFallback/AxiosError',
  component: AxiosErrorFallbackUI,
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

// 500 에러
export const ServerError = {
  render: () => (
    <AxiosErrorFallbackUI
      error={
        new AxiosError('Server Error', 'ERR_SERVER', undefined, undefined, {
          status: 500,
          data: {message: '서버 오류가 발생했습니다.'},
        } as any)
      }
      resetError={() => console.log('에러 리셋')}
    />
  ),
};

// 404 에러
export const NotFoundError = {
  render: () => (
    <AxiosErrorFallbackUI
      error={
        new AxiosError('Not Found', 'ERR_NOT_FOUND', undefined, undefined, {
          status: 404,
          data: {message: '요청한 리소스를 찾을 수 없습니다.'},
        } as any)
      }
      resetError={() => console.log('에러 리셋')}
    />
  ),
};

// 네트워크 에러
export const NetworkError = {
  render: () => (
    <AxiosErrorFallbackUI
      error={
        new AxiosError(
          'Network Error',
          'ERR_NETWORK',
          undefined,
          undefined,
          undefined,
        )
      }
      resetError={() => console.log('에러 리셋')}
    />
  ),
};
