// 旅记 TravelLog — Shared Type Definitions

import type { PressableProps, TextInputProps, ViewStyle, TextStyle, ImageStyle } from 'react-native';

// ── AppButton ──
export type ButtonVariant = 'primary' | 'secondary' | 'text';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface AppButtonProps extends Omit<PressableProps, 'style'> {
  title: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
}

// ── AppInput ──
export interface AppInputProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
}

// ── AppToast ──
export type ToastType = 'success' | 'error' | 'info';

export interface AppToastProps {
  visible: boolean;
  message: string;
  type?: ToastType;
  duration?: number;
  onDismiss?: () => void;
}

// ── AppModal ──
export interface AppModalProps {
  visible: boolean;
  title?: string;
  children: React.ReactNode;
  onClose: () => void;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
  confirmLoading?: boolean;
}

// ── LoadingSpinner ──
export type SpinnerSize = 'sm' | 'md' | 'lg';

export interface LoadingSpinnerProps {
  size?: SpinnerSize;
  color?: string;
  style?: ViewStyle;
}

// ── EmptyState ──
export interface EmptyStateProps {
  icon?: string;       // icon name from @expo/vector-icons
  title: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
  style?: ViewStyle;
}

// ── ErrorState ──
export interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
  style?: ViewStyle;
}

// ── SkeletonBlock ──
export interface SkeletonBlockProps {
  width?: number | string;
  height?: number | string;
  style?: ViewStyle;
}

// ── AppImage ──
export interface AppImageProps {
  uri: string;
  placeholder?: string;
  width?: number | string;
  height?: number | string;
  aspectRatio?: number;
  onPress?: () => void;
  style?: ImageStyle;
  containerStyle?: ViewStyle;
}

// ── Badge ──
export interface BadgeProps {
  count: number;
  maxCount?: number;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

// ── Divider ──
export type DividerThickness = 'thin' | 'thick';

export interface DividerProps {
  thickness?: DividerThickness;
  style?: ViewStyle;
}

// ── SearchBar ──
export interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onSubmit?: () => void;
  onClear?: () => void;
  placeholder?: string;
  loading?: boolean;
  autoFocus?: boolean;
  containerStyle?: ViewStyle;
}
