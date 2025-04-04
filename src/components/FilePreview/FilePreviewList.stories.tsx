import type {Meta, StoryObj} from '@storybook/react';
import {FilePreviewList} from './FilePreviewList';
import {View} from 'react-native';
import type {FileData} from '.';

const meta = {
  title: 'components/FilePreviewList',
  component: FilePreviewList,
  decorators: [Story => <View style={{padding: 16, flex: 1}}>{Story()}</View>],
} satisfies Meta<typeof FilePreviewList>;

export default meta;

type Story = StoryObj<typeof FilePreviewList>;

const mockFiles: FileData[] = [
  {
    title: '녹음파일',
    extension: 'mp3',
    url: 'example.mp3',
  },
  {
    title: '회의록',
    extension: 'docx',
    url: 'example.docx',
  },
];

export const MemberView: Story = {
  args: {
    files: mockFiles,
    position: 'member',
    onPressFile: (file: FileData) => {
      console.log('파일 클릭:', file.title);
    },
    onPressDownload: (file: FileData) => {
      console.log('다운로드 클릭:', file.title);
    },
    onPressMoreIcon: (file: FileData) => {
      console.log('더보기 클릭:', file.title);
    },
  },
};

export const ManagerView: Story = {
  args: {
    files: mockFiles,
    position: 'manager',
    onPressFile: (file: FileData) => {
      console.log('파일 클릭:', file.title);
    },
    onPressDownload: (file: FileData) => {
      console.log('다운로드 클릭:', file.title);
    },
    onPressMoreIcon: (file: FileData) => {
      console.log('더보기 클릭:', file.title);
    },
  },
};
