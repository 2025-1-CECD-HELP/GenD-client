import type {Meta, StoryObj} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {CommonModal} from './index';

const meta = {
  title: 'components/CommonModal',
  component: CommonModal,
} satisfies Meta<typeof CommonModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    text: 'Hello World',
    color: 'purple',
    onPress: action('onPress'),
  },
};
