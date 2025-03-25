/**
 * 헤더 컴포넌트의 스토리북 코드입니다.
 * 해당 컴포넌트를 통해 헤더 컴포넌트의 모양을 확인할 수 있습니다.
 * @author 홍규진
 */

import {Header} from './index';
import type {Meta, StoryObj} from '@storybook/react';

const meta = {
  title: 'components/Header',
  component: Header,
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {},
};

export const WithProps: Story = {
  args: {
    onNotificationPress: () => {
      console.log('알림 함수 주입 및 클릭');
    },
    onWorkSpacePress: () => {
      console.log('워크스페이스 함수 주입 및 클릭');
    },
    onLogoPress: () => {
      console.log('로고 함수 주입 및 클릭');
    },
  },
};
