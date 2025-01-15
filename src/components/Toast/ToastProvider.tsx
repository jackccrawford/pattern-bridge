import React, { createContext, useCallback, useContext, useState, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { ToastMessage, ToastType } from './types';
import { getToastDuration } from '../../config/toastConfig';
import * as Haptics from 'expo-haptics';
import { ToastComponent } from './ToastComponent';

interface ToastContextValue {
  showToast: (
    message: string,
    type?: ToastType,
    customDuration?: number,
    action?: { label: string; onPress: () => void }
  ) => void;
  showUndoToast: (message: string, onUndo: () => void) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toast, setToast] = useState<ToastMessage | null>(null);

  const showToast = useCallback(
    (
      message: string,
      type: ToastType = 'info',
      customDuration?: number,
      action?: { label: string; onPress: () => void }
    ) => {
      // Trigger haptic feedback based on type
      switch (type) {
        case 'success':
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          break;
        case 'error':
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
          break;
        default:
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }

      const duration = customDuration || getToastDuration(type === 'undo' ? 'UNDO' : 'DEFAULT');

      setToast({
        id: Date.now().toString(),
        message,
        type,
        duration,
        action,
      });
    },
    []
  );

  const showUndoToast = useCallback(
    (message: string, onUndo: () => void) => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      
      showToast(
        message,
        'undo',
        undefined,
        {
          label: 'Undo',
          onPress: onUndo,
        }
      );
    },
    [showToast]
  );

  const contextValue = useMemo(
    () => ({
      showToast,
      showUndoToast,
    }),
    [showToast, showUndoToast]
  );

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      {toast && (
        <ToastComponent
          {...toast}
          onHide={() => setToast(null)}
        />
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'box-none',
  },
});
