import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Animated, Platform } from 'react-native';
import { ToastMessage } from './types';
import { useTheme } from '../../contexts/ThemeContext';

export const ToastComponent: React.FC<ToastMessage & { onHide: () => void }> = ({ 
  message, 
  type, 
  duration = 3000,
  action,
  onHide 
}) => {
  const { styles: theme } = useTheme();
  const translateY = React.useRef(new Animated.Value(100)).current;
  const opacity = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]),
      Animated.delay(duration - 400),
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 100,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      onHide();
    });
  }, [duration, onHide]);

  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return theme.colors.success;
      case 'error':
        return theme.colors.error;
      case 'undo':
        return theme.colors.primary;
      default:
        return theme.colors.primary;
    }
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: getBackgroundColor(),
          transform: [{ translateY }],
          opacity,
        },
      ]}
    >
      <Text style={styles.message} numberOfLines={2}>
        {message}
      </Text>
      {action && (
        <Pressable
          onPress={() => {
            action.onPress();
            onHide();
          }}
          style={({ pressed }) => [
            styles.actionButton,
            { opacity: pressed ? 0.7 : 1 },
          ]}
        >
          <Text style={styles.actionText}>{action.label}</Text>
        </Pressable>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: Platform.select({ ios: 50, android: 40, web: 40 }),
    left: 20,
    right: 20,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
      web: {
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
      },
    }),
  },
  message: {
    color: '#fff',
    fontSize: 16,
    flex: 1,
    marginRight: 16,
    fontWeight: '500',
  },
  actionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
  },
  actionText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
});
