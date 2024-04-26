module.exports = {
  presets: ['module:@react-native/babel-preset', 'nativewind/babel'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.ts', '.ios.tsx', '.android.ts', '.android.tsx', '.ts', '.tsx', '.js', '.jsx', '.json'],
      },
    ],
    [
      'transform-inline-environment-variables',
      {
        include: ['NODE_ENV', 'STORYBOOK_ENABLED'],
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
