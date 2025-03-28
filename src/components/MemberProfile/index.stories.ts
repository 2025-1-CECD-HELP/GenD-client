import type {Meta, StoryObj} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {MemberProfile} from './index';

const meta = {
  title: 'components/MemberProfile',
  component: MemberProfile,
} satisfies Meta<typeof MemberProfile>;

export default meta;

type Story = StoryObj<typeof meta>;

// 관리자가 멤버의 프로필을 조회하는 경우
export const MemberViewedByManager: Story = {
  args: {
    name: '이정선',
    position: 'member',
    isCurrentUserManager: true,
    onSettingPress: action('onSettingPress'),
  },
};

// 관리자가 관리자의 프로필을 조회하는 경우
export const ManagerViewedByManager: Story = {
  args: {
    name: '홍규진',
    position: 'manager',
    isCurrentUserManager: true,
    onSettingPress: action('onSettingPress'),
  },
};

// 멤버가 관리자의 프로필을 조회하는 경우
export const ManagerViewedByMember: Story = {
  args: {
    name: '엄태우',
    position: 'manager',
    isCurrentUserManager: false,
  },
};

// 멤버가 멤버의 프로필을 조회하는 경우
export const MemberViewedByMember: Story = {
  args: {
    name: '엄태우',
    position: 'member',
    isCurrentUserManager: false,
  },
};

// 현재 권한이 없으며 초대하기 위해 추가된 사용자의 프로필
export const None: Story = {
  args: {
    name: '박민기',
    position: 'none',
    isCurrentUserManager: true,
    onCancelPress: action('onCancelPress'),
  },
};
