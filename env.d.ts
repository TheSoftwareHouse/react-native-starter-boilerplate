declare module 'react-native-config' {
  export interface NativeConfig {
    BASE_API_URL?: string;
    AUTH_STORAGE_KEY?: string;
    DEFAULT_LOCALE?: string;
    MOCK_API?: string;
    STORYBOOK_ENABLED?: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
