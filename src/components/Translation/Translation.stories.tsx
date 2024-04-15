import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';

import { Translation } from './Translation';

const TranslationMeta: Meta<typeof Translation> = {
  title: 'Translation',
  component: Translation,
  args: {
    id: 'home.helloWorld',
    values: {
      name: 'Joe',
    },
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

export default TranslationMeta;

export const Basic: StoryObj<typeof Translation> = {};
