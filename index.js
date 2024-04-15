import { AppRegistry } from 'react-native';
import Config from 'react-native-config';

import App from './App';
import { name as appName } from './app.json';

if (__DEV__ || Config.MOCK_API) {
  require('./src/api/mocks/msw.polyfills');
  const { native } = require('./src/api/mocks/native');

  native.listen();
}

AppRegistry.registerComponent(appName, () => App);
