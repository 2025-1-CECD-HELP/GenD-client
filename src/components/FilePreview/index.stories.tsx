import type {Meta, StoryObj} from '@storybook/react';
import {View} from 'react-native';
import {FilePreview} from './index';

const meta = {
  title: 'components/FilePreview',
  component: FilePreview,
  decorators: [
    Story => {
      return <View style={{padding: 20, flex: 1}}>{Story()}</View>;
    },
  ],
} satisfies Meta<typeof FilePreview>;

export default meta;

type Story = StoryObj<typeof meta>;

// mp3 형식 파일의 프리뷰
export const mp3ViewdByMember: Story = {
  args: {
    title: 'mp3 파일',
    position: 'member',
    extension: 'mp3',
  },
};
// mp3 형식 파일의 프리뷰
export const mp3ViewdByManager: Story = {
  args: {
    title: 'mp3 파일',
    position: 'manager',
    extension: 'mp3',
  },
};

// docx 형식 파일의 프리뷰
export const docViewedByMember: Story = {
  args: {
    title: 'docx 파일',
    position: 'member',
    extension: 'docx',
  },
};

// docx 형식 파일의 프리뷰
export const docViewedByManager: Story = {
  args: {
    title: 'docx 파일',
    position: 'manager',
    extension: 'docx',
  },
};
