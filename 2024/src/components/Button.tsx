import React from 'react';
import { 
  TouchableOpacity, 
  StyleSheet, 
  TouchableOpacityProps,
  Platform,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { Text } from './Text';
import { useTheme } from '../contexts/ThemeContext';

export interface ButtonProps extends TouchableOpacityProps {
  label: string;
  variant?: 'primary' | 'secondary';
  style?: StyleProp<ViewStyle>;
}

export const Button: React.FC<ButtonProps> = ({ 
  label,
  variant = 'primary',
  style,
  disabled,
  ...props 
}) => {
  const { theme } = useTheme();
  
  const buttonStyles = React.useMemo(() => StyleSheet.create({
    button: {
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.md,
      borderRadius: theme.spacing.sm,
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
      backgroundColor: theme.colors.primary,
    },
    secondary: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: theme.colors.primary,
    },
    disabled: {
      backgroundColor: theme.colors.border,
      borderColor: theme.colors.border,
    },
    label: {
      fontSize: 16,
      fontWeight: '600',
    },
    primaryLabel: {
      color: '#FFF',
    },
    secondaryLabel: {
      color: theme.colors.primary,
    },
    disabledLabel: {
      color: theme.colors.text + '80', // 50% opacity
    },
  }), [theme]);

  return (
    <TouchableOpacity
      style={[
        buttonStyles.button,
        buttonStyles[variant],
        disabled && buttonStyles.disabled,
        style,
      ]}
      disabled={disabled}
      {...props}
    >
      <Text
        style={[
          buttonStyles.label,
          buttonStyles[`${variant}Label`],
          disabled && buttonStyles.disabledLabel,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};
