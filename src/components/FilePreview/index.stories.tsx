import type {Meta, StoryObj} from '@storybook/react';
import {View} from 'react-native';
import {FilePreview, FileData} from './index';

const meta = {
  title: 'components/FilePreview',
  component: FilePreview,
  decorators: [
    Story => {
      return <View style={{padding: 16, flex: 1}}>{Story()}</View>;
    },
  ],
} satisfies Meta<typeof FilePreview>;

export default meta;

type Story = StoryObj<typeof meta>;

const dummyHandlers = {
  onPressFile: (file: FileData) => {
    console.log('파일 열기:', file.title);
  },
  onPressAction: (file: FileData) => {
    console.log('다운로드 or 더보기 클릭:', file.title);
  },
};

// mp3 형식 파일의 프리뷰
export const mp3ViewdByMember: Story = {
  args: {
    file: {
      title: '녹음 파일',
      extension: 'mp3',
      url: 'https://example.com/audio.mp3',
    },
    position: 'member',
    ...dummyHandlers,
  },
};
// mp3 형식 파일의 프리뷰
export const mp3ViewdByManager: Story = {
  args: {
    file: {
      title: 'mp3 파일',
      extension: 'mp3',
      url: 'https://example.com/audio.mp3',
    },
    position: 'manager',
    ...dummyHandlers,
  },
};

// docx 형식 파일의 프리뷰
export const docViewedByMember: Story = {
  args: {
    file: {
      title: 'docx 파일',
      extension: 'docx',
      url: 'https://example.com/audio.mp3',
    },
    position: 'member',
    ...dummyHandlers,
  },
};

// docx 형식 파일의 프리뷰
export const docViewedByManager: Story = {
  args: {
    file: {
      title: 'docx 파일',
      extension: 'docx',
      url: 'https://example.com/audio.mp3',
    },
    position: 'manager',
    ...dummyHandlers,
  },
};
