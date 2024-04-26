import React from 'react';
import { Pressable, Text } from 'react-native';
import { twMerge } from 'tailwind-merge';

import { ButtonProps } from './Button.types';

const Button = ({
  label,
  buttonStyle,
  labelStyle,
  buttonClassName,
  labelClassName,
  disabled,
  ...props
}: ButtonProps) => (
  <Pressable
    {...props}
    className={twMerge(
      'items-center justify-center py-2 px-8 rounded-full bg-blue-600',
      buttonClassName,
      disabled && 'bg-slate-300',
    )}
    disabled={disabled}
    style={buttonStyle}
  >
    <Text className={twMerge('text-white', labelClassName)} style={labelStyle}>
      {label}
    </Text>
  </Pressable>
);

export default Button;
