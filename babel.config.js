module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.ts', '.ios.tsx', '.android.ts', '.android.tsx', '.ts', '.tsx', '.js', '.jsx', '.json'],
      },
    ],
    'nativewind/babel',
    [
      'transform-inline-environment-variables',
      {
        include: ['NODE_ENV', 'STORYBOOK_ENABLED'],
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
