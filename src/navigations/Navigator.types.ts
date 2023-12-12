import { StackScreenProps } from '@react-navigation/stack';

export type RootStackParamList = {
  Home: undefined;
  Profile: undefined;
  ProfileDrawer: undefined;
  SharedNavProfile: undefined;
  Users: undefined;
};

export type TabParamList = {
  AboutMe: undefined;
  Details: undefined;
  Settings: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> = StackScreenProps<RootStackParamList, T>;
