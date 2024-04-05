declare module 'react-native-config' {
  export interface NativeConfig {
    BASE_API_URL?: string;
    AUTH_STORAGE_KEY?: string;
    DEFAULT_LOCALE?: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
