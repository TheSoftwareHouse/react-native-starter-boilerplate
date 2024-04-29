const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { generate } = require('@storybook/react-native/scripts/generate');
const { withNativeWind } = require('nativewind/metro');

const path = require('path');

generate({
  configPath: path.resolve(__dirname, './.storybook'),
});

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = mergeConfig(getDefaultConfig(__dirname), {
  transformer: {
    // Required by Storybook
    unstable_allowRequireContext: true,
  },
});

module.exports = withNativeWind(config, { input: './global.css' });
