import React from 'react';
import type {Meta, StoryObj} from '@storybook/react';

import {View} from 'react-native';
import {TemplateList} from './TemplateList';

const meta: Meta<typeof TemplateList> = {
  title: 'components/TemplateList',
  component: TemplateList,
  decorators: [
    Story => (
      <View style={{padding: 16}}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <TemplateList />,
};
