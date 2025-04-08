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
  args: {
    onSearchSubmit: () => {
      console.log('검색 함수 주입 및 디바운싱 디폴트 적용');
    },
    isDebouncing: true,
  },
};

export const OnlyForPlusButton: Story = {
  args: {
    onSearchSubmit: () => {
      console.log('검색 함수 주입 및 클릭');
    },
    placeholder: 'plus 버튼만 있는 검색창',
    onPlusPress: () => {
      console.log('PlusPress 버튼 지정');
    },
  },
};

export const WithPlusButton: Story = {
  args: {
    onSearchSubmit: () => {
      console.log('검색 함수 주입 및 클릭');
    },
    placeholder: '다 넣은 검색창',
    onPlusPress: () => {
      console.log('PlusPress 버튼 지정');
    },
  },
};
