// 旅记 TravelLog — AppButton (Editorial)
// Variants: primary (black bg), secondary (outline), text (minimal)
// FORBIDDEN: rounded corners, shadows, gradients, colored backgrounds

import React from 'react';
import { Pressable, Text, ActivityIndicator, StyleSheet } from 'react-native';
import type { AppButtonProps } from '../types';
import { Colors, Spacing, TypeScale, Animation, Borders } from '../styles/editorial';
import { checkEditorialStyle } from '../styles/forbidden';

export function AppButton({
  title,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  style,
  ...pressableProps
}: AppButtonProps) {
  const isDisabled = disabled || loading;

  const buttonStyle: any[] = [
    styles.base,
    styles[variant],
    styles[`size_${size}`],
    isDisabled && styles.disabled,
    style,
  ];

  const textStyle: any[] = [
    styles.label,
    styles[`label_${variant}`],
    styles[`labelSize_${size}`],
    isDisabled && styles.textDisabled,
  ];

  // Editorial compliance check (dev only)
  if (__DEV__ && style) {
    checkEditorialStyle('AppButton', StyleSheet.flatten(style));
  }

  return (
    <Pressable
      style={({ pressed }) => [
        ...buttonStyle,
        pressed && !isDisabled && styles.pressed,
      ]}
      disabled={isDisabled}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      accessibilityLabel={title}
      {...pressableProps}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' ? Colors.white : Colors.black}
        />
      ) : (
        <Text style={textStyle}>{title}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  // Base
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Borders.radius, // 0 — hard edge
    borderWidth: 0,
  } as const,

  // Variants
  primary: {
    backgroundColor: Colors.black,
  },
  secondary: {
    backgroundColor: 'transparent',
    borderWidth: Borders.thin,
    borderColor: Colors.border,
  },
  text: {
    backgroundColor: 'transparent',
    paddingHorizontal: Spacing.xs,
    paddingVertical: 2,
  },

  // Sizes
  size_sm: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    minHeight: 36,
  },
  size_md: {
    paddingHorizontal: Spacing.xl, // 24
    paddingVertical: Spacing.md,   // 12
    minHeight: 44,                 // Touch target minimum
  },
  size_lg: {
    paddingHorizontal: Spacing.xxl, // 32
    paddingVertical: 16,
    minHeight: 52,
  },

  // States
  pressed: {
    transform: [{ scale: Animation.scale.press }], // active:scale-95
  },
  disabled: {
    opacity: 0.4,
  },

  // Label text
  label: {
    letterSpacing: 0.4,
  },
  label_primary: {
    color: Colors.white,
    fontFamily: 'NotoSansSC-Medium',
  },
  label_secondary: {
    color: Colors.text,
    fontFamily: 'NotoSansSC-Medium',
  },
  label_text: {
    color: Colors.textTertiary,
    fontFamily: 'NotoSansSC-Regular',
  },
  labelSize_sm: {
    fontSize: 13,
    lineHeight: 18,
  },
  labelSize_md: {
    fontSize: TypeScale.body.fontSize,
    lineHeight: TypeScale.body.lineHeight,
  },
  labelSize_lg: {
    fontSize: 17,
    lineHeight: 24,
  },
  textDisabled: {
    opacity: 0.5,
  },
});
