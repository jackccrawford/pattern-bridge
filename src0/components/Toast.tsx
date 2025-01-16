import React, { createContext, useCallback, useContext, useState, useMemo } from 'react';
import {
  View,
  Text,
  Animated,
  StyleSheet,
  Pressable,
  Platform,
} from 'react-native';
import * as Haptics from 'expo-haptics';

interface ToastAction {
  label: string;
  onPress: () => void;
}

interface ToastOptions {
  message: string;
  type?: 'success' | 'error' | 'info';
  duration?: number;
  action?: ToastAction;
}

interface ToastContextValue {
  show: (options: ToastOptions) => void;
}

export const ToastContext = createContext<ToastContextValue>({
  show: () => {},
});

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(false);
  const [options, setOptions] = useState<ToastOptions | null>(null);
  const [animation] = useState(new Animated.Value(0));

  const hide = useCallback(() => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setVisible(false);
      setOptions(null);
    });
  }, [animation]);

  const show = useCallback((newOptions: ToastOptions) => {
    if (visible) {
      // If a toast is already visible, hide it first
      hide();
      // Wait for hide animation to complete
      setTimeout(() => {
        setOptions(newOptions);
        setVisible(true);
        Haptics.notificationAsync(
          Haptics.NotificationFeedbackType.Success
        );
        Animated.timing(animation, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }).start();
        if (newOptions.duration !== 0) {
          setTimeout(hide, newOptions.duration || 3000);
        }
      }, 200);
    } else {
      setOptions(newOptions);
      setVisible(true);
      Haptics.notificationAsync(
        Haptics.NotificationFeedbackType.Success
      );
      Animated.timing(animation, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
      if (newOptions.duration !== 0) {
        setTimeout(hide, newOptions.duration || 3000);
      }
    }
  }, [animation, hide, visible]);

  const getBackgroundColor = (type?: string) => {
    switch (type) {
      case 'success':
        return '#4caf50';
      case 'error':
        return '#f44336';
      case 'info':
        return '#2196f3';
      default:
        return '#323232';
    }
  };

  const contextValue = useMemo(() => ({
    show,
  }), [show]);

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      {visible && options && (
        <Animated.View
          style={[
            styles.container,
            {
              backgroundColor: getBackgroundColor(options.type),
              transform: [
                {
                  translateY: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [100, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <Text style={styles.message}>{options.message}</Text>
          {options.action && (
            <Pressable
              onPress={() => {
                Haptics.selectionAsync();
                options.action?.onPress();
                hide();
              }}
              style={({ pressed }) => [
                styles.actionButton,
                pressed && styles.actionButtonPressed,
              ]}
            >
              <Text style={styles.actionButtonText}>
                {options.action.label}
              </Text>
            </Pressable>
          )}
        </Animated.View>
      )}
    </ToastContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 50 : 16,
    left: 16,
    right: 16,
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  message: {
    color: '#fff',
    fontSize: 16,
    flex: 1,
    marginRight: 16,
  },
  actionButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  actionButtonPressed: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
