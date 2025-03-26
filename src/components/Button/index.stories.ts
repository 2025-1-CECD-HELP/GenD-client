import type {Meta, StoryObj} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {Button} from './index';

const meta = {
  title: 'components/MyButton',
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const FilledRoundButton: Story = {
  args: {
    text: 'Button',
    variant: 'filled',
    shape: 'round',
    onPress: action('onPress'),
  },
};

export const FilledSquareButton: Story = {
  args: {
    text: 'Button',
    variant: 'filled',
    shape: 'square',
    onPress: action('onPress'),
  },
};

export const OutlineSquareButton: Story = {
  args: {
    text: 'Button',
    variant: 'outline',
    shape: 'square',
    onPress: action('onPress'),
  },
};

export const DisabledSquareButton: Story = {
  args: {
    text: 'Button',
    variant: 'disabled',
    shape: 'square',
    onPress: action('onPress'),
  },
};
