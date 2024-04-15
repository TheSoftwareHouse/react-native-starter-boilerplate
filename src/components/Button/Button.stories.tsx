import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';

import Button from './Button';

const ButtonMeta: Meta<typeof Button> = {
  title: 'Button',
  component: Button,
  argTypes: {
    onPress: { action: 'pressed the button' },
  },
  args: {
    label: 'Hello world',
    disabled: false,
  },
  decorators: [
    (Story) => (
      // eslint-disable-next-line react-native/no-inline-styles
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <Story />
      </View>
    ),
  ],
};

export default ButtonMeta;

export const Basic: StoryObj<typeof Button> = {};

export const AnotherExample: StoryObj<typeof Button> = {
  args: {
    label: 'Another example',
  },
};
