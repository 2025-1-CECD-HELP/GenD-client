import {TopBar} from './index';
import type {Meta, StoryObj} from '@storybook/react';
import {action} from '@storybook/addon-actions';

const meta = {
  title: 'components/TopBar',
  component: TopBar,
} satisfies Meta<typeof TopBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const BasicTopBar: Story = {
  args: {
    title: 'MENU',
  },
};

export const BackTopBar: Story = {
  args: {
    title: 'MENU',
    showBackButton: true,
  },
};

export const SubmitTopBar: Story = {
  args: {
    title: 'MENU',
    showBackButton: true,
    showSubmitButton: true,
    onPressSubmit: action('onPressSubmit'),
  },
};
