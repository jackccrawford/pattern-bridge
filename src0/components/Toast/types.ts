export type ToastType = 'success' | 'error' | 'info' | 'undo';

export interface ToastMessage {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
  action?: {
    label: string;
    onPress: () => void;
  };
}
