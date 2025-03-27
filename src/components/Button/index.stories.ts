import type {Meta, StoryObj} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {Button} from './index';

const meta = {
  title: 'components/Button',
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const FilledRound: Story = {
  args: {
    text: 'Button',
    variant: 'filled',
    shape: 'round',
    onPress: action('onPress'),
  },
};

export const FilledSquare: Story = {
  args: {
    text: 'Button',
    variant: 'filled',
    shape: 'square',
    onPress: action('onPress'),
  },
};

export const OutlineSquare: Story = {
  args: {
    text: 'Button',
    variant: 'outline',
    shape: 'square',
    onPress: action('onPress'),
  },
};

export const DisabledSquare: Story = {
  args: {
    text: 'Button',
    variant: 'disabled',
    shape: 'square',
    onPress: action('onPress'),
  },
};
