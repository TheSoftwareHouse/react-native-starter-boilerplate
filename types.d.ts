import { RootStackParamList } from './src/navigations/Navigator.types';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
