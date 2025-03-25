import type {Meta, StoryObj} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {CommonModal} from './index';

const meta = {
  title: 'components/CommonModal',
  component: CommonModal,
} satisfies Meta<typeof CommonModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: 'default',
    title: 'Title',
    content: 'Content',
    onConfirm: action('onConfirm'),
    onCancel: action('onCancel'),
    isCenter: true,
  },
};

export const Check: Story = {
  args: {
    type: 'check',
    title: 'Title',
    content: 'Content',
    onConfirm: action('onConfirm'),
    onCancel: action('onCancel'),
    isCenter: true,
  },
};

export const Input: Story = {
  args: {
    type: 'input',
    title: 'Title',
    content: 'Content',
    onConfirm: action('onConfirm'),
    onCancel: action('onCancel'),
    isCenter: true,
  },
};

export const Confirm: Story = {
  args: {
    type: 'confirm',
    title: 'Title',
    content: 'Content',
    isCenter: true,
  },
};

export const IsNotCenter: Story = {
  args: {
    type: 'default',
    title: 'Title',
    content: 'Content',
    isCenter: false,
  },
};
