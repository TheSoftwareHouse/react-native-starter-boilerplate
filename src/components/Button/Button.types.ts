import { PressableProps, TextProps } from 'react-native';

export interface ButtonProps extends PressableProps {
  label: string;
  buttonStyle?: PressableProps['style'];
  labelStyle?: TextProps['style'];
  buttonClassName?: string;
  labelClassName?: string;
}
