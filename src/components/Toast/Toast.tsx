import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Animated } from 'react-native';
import { ToastMessage } from './types';

export const Toast: React.FC<ToastMessage & { onHide: () => void }> = ({ 
  message, 
  type, 
  duration = 1000, // Default duration
  action,
  onHide 
}) => {
  const opacity = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 150,
        delay: action ? duration - 150 : duration - 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onHide();
    });
  }, [duration, onHide]);

  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return '#4CAF50';
      case 'error':
        return '#F44336';
      case 'undo':
        return '#2196F3';
      default:
        return '#2196F3';
    }
  };

  return (
    <Animated.View
      style={[
        styles.container,
        { opacity, backgroundColor: getBackgroundColor() },
      ]}
    >
      <Text style={styles.message}>{message}</Text>
      {action && (
        <Pressable
          onPress={() => {
            action.onPress();
            onHide();
          }}
          style={styles.actionButton}
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
    bottom: 40,
    left: 20,
    right: 20,
    backgroundColor: '#333',
    borderRadius: 8,
    padding: 16,
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
    marginRight: 8,
  },
  actionButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 4,
  },
  actionText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
