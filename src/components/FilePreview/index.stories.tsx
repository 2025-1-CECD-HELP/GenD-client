import type {Meta, StoryObj} from '@storybook/react';
import {View} from 'react-native';
import {FilePreview} from './index';
import {FileData} from './index.type';

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

const handlerExamples = {
  onPressFile: (file: FileData) => {
    console.log('파일 열기:', file.documentTitle);
  },
  onPressAction: (file: FileData) => {
    console.log('다운로드 or 더보기 클릭:', file.documentTitle);
  },
};

// mp3 형식 파일의 프리뷰
export const mp3ViewdByMember: Story = {
  args: {
    file: {
      documentTitle: 'mp3 파일',
      extension: 'mp3',
      url: 'example.mp3',
    },
    position: 'member',
    ...handlerExamples,
  },
};
// mp3 형식 파일의 프리뷰
export const mp3ViewdByManager: Story = {
  args: {
    file: {
      documentTitle: 'mp3 파일',
      extension: 'mp3',
      url: 'example.mp3',
    },
    position: 'manager',
    ...handlerExamples,
  },
};

// docx 형식 파일의 프리뷰
export const docViewedByMember: Story = {
  args: {
    file: {
      documentTitle: 'docx 파일',
      extension: 'docx',
      url: 'example.docx',
    },
    position: 'member',
    ...handlerExamples,
  },
};

// docx 형식 파일의 프리뷰
export const docViewedByManager: Story = {
  args: {
    file: {
      documentTitle: 'docx 파일',
      extension: 'docx',
      url: 'example.docx',
    },
    position: 'manager',
    ...handlerExamples,
  },
};
