import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Navigator } from './src/navigations/Navigator';
import { AppProviders } from './src/providers/AppProviders';

const App = () => {
  return (
    <AppProviders>
      <SafeAreaProvider>
        <Navigator />
      </SafeAreaProvider>
    </AppProviders>
  );
};

let AppEntryPoint = App;

if (process.env.STORYBOOK_ENABLED === 'true') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  AppEntryPoint = require('./.storybook').default;
}

export default AppEntryPoint;
