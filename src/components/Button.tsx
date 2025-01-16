import React from 'react';
import { 
  TouchableOpacity, 
  StyleSheet, 
  TouchableOpacityProps,
  Platform,
} from 'react-native';
import { Text } from './Text';

export interface ButtonProps extends TouchableOpacityProps {
  label: string;
  variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({ 
  label,
  variant = 'primary',
  style,
  disabled,
  ...props 
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        styles[variant],
        disabled && styles.disabled,
        style,
      ]}
      disabled={disabled}
      {...props}
    >
      <Text
        style={[
          styles.label,
          styles[`${variant}Label`],
          disabled && styles.disabledLabel,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 120,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
    }),
  },
  primary: {
    backgroundColor: '#007AFF',
  },
  secondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  disabled: {
    backgroundColor: '#E5E5E5',
    borderColor: '#E5E5E5',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
  primaryLabel: {
    color: '#FFF',
  },
  secondaryLabel: {
    color: '#007AFF',
  },
  disabledLabel: {
    color: '#999',
  },
});
