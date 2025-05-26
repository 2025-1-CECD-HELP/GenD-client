/**
 * 헤더 컴포넌트의 스토리북 코드입니다.
 * 해당 컴포넌트를 통해 헤더 컴포넌트의 모양을 확인할 수 있습니다.
 * @author 홍규진
 */

import ChattingInput from './index';
import type {Meta, StoryObj} from '@storybook/react';

const meta = {
  title: 'components/ChattingInput',
  component: ChattingInput,
} satisfies Meta<typeof ChattingInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    onSubmit: () => {
      console.log('알림 함수 주입 및 클릭');
    },
    placeholder: '알림 함수 주입 및 클릭',
    isDebouncing: false,
  },
};

export const WithDebouncePlaceholder: Story = {
  args: {
    onSubmit: () => {
      console.log('알림 함수 주입 및 클릭');
    },
    placeholder: '디바운스 사용 및 플레이스홀더 변경',
    isDebouncing: false,
  },
};
