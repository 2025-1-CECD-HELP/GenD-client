/**
 * 검색 바 컴포넌트의 스토리북 코드입니다.
 * 해당 컴포넌트를 통해 검색 바 컴포넌트의 모양을 확인할 수 있습니다.
 * @author 홍규진
 */

import {SearchBar} from './index';
import type {Meta, StoryObj} from '@storybook/react';

const meta = {
  title: 'components/SearchBar',
  component: SearchBar,
} satisfies Meta<typeof SearchBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {},
};

export const WithDebouncing: Story = {
  args: {
    onSearchSubmit: () => {
      console.log('검색 함수 주입 및 클릭');
    },
    placeholder: '검색 힌트',
    isDebouncing: true,
  },
};
