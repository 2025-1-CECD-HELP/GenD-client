import type {Meta, StoryObj} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {View} from 'react-native';
import {DropDownMenu} from '.';

const meta = {
  title: 'components/DropDownMenu',
  component: DropDownMenu,
  decorators: [
    StoryComponent => {
      return (
        <View style={{flex: 1, backgroundColor: '#FAFAFA', padding: 20}}>
          <StoryComponent />
        </View>
      );
    },
  ],
} satisfies Meta<typeof DropDownMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

// 관리자가 멤버의 프로필을 조회하는 경우
export const Choice4: Story = {
  args: {
    menus: [
      {
        label: '다운로드',
        isDownload: true,
        onPress: action('onPress'),
      },
      {
        label: '삭제하기',
        isDelete: true,
        onPress: action('onPress'),
      },
      {
        label: '수정하기',
        onPress: action('onPress'),
      },
      {
        label: '공유하기',
        onPress: action('onPress'),
      },
    ],
  },
};

export const Choice3: Story = {
  args: {
    menus: [
      {
        label: '게시글 고정',
        onPress: action('onPress'),
      },
      {
        label: '수정하기',
        onPress: action('onPress'),
      },
      {
        label: '삭제하기',
        isDelete: true,
        onPress: action('onPress'),
      },
    ],
  },
};

export const Choice2: Story = {
  args: {
    menus: [
      {
        label: '동아리 설정',
        onPress: action('onPress'),
      },
      {
        label: '동아리 탈퇴',
        onPress: action('onPress'),
      },
    ],
  },
};
