import type {Meta, StoryObj} from '@storybook/react';
import {Alarm} from './index';

const meta = {
  title: 'components/Alarm',
  component: Alarm,
} satisfies Meta<typeof Alarm>;

export default meta;

type Story = StoryObj<typeof meta>;

// 하루를 기준으로 시간 계산을 위한 상수
const ONE_DAY = 1000 * 60 * 60 * 24;

// 최근 7일 이내에서 랜덤하게 과거 시간 만들기
const getRandomPastDate = (daysAgoMax: number = 7) => {
  const now = new Date();
  const pastTime = now.getTime() - Math.random() * daysAgoMax * ONE_DAY;
  return new Date(pastTime);
};

export const NewAlarm: Story = {
  args: {
    title: 'GenD WorkSpace 공지사항 등록',
    content:
      'GenD WorkSpace에 새로운 공지사항이 등록되었습니다! 지금 바로 확인하세요.',
    createdAt: getRandomPastDate(),
    workspaceProfileUrl:
      'https://images.news18.com/ibnlive/uploads/2021/07/1625806432_featured-image-2021-07-09t102239.872.jpg',
    isNew: true,
  },
};

export const CheckedAlarm: Story = {
  args: {
    title: 'GenD WorkSpace 공지사항 등록',
    content:
      'GenD WorkSpace에 새로운 공지사항이 등록되었습니다! 지금 바로 확인하세요.',
    createdAt: getRandomPastDate(),
    workspaceProfileUrl:
      'https://images.news18.com/ibnlive/uploads/2021/07/1625806432_featured-image-2021-07-09t102239.872.jpg',
    isNew: false,
  },
};
