// 旅记 TravelLog — AppInput (Editorial)
// Monochrome border input. No rounded corners, no shadows.
// Error state shows border accent + helper text.

import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import type { AppInputProps } from '../types';
import { Colors, Spacing, Borders, TypeScale } from '../styles/editorial';
import { checkEditorialStyle } from '../styles/forbidden';

export function AppInput({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  containerStyle,
  inputStyle,
  ...textInputProps
}: AppInputProps) {
  const [focused, setFocused] = useState(false);

  const isError = !!error;
  const borderColor = isError
    ? Colors.borderHover
    : focused
    ? Colors.borderHover
    : Colors.border;

  // Editorial compliance check (dev only)
  if (__DEV__) {
    if (containerStyle) checkEditorialStyle('AppInput:container', StyleSheet.flatten(containerStyle));
    if (inputStyle) checkEditorialStyle('AppInput:input', StyleSheet.flatten(inputStyle));
  }

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View style={[styles.inputWrapper, { borderColor }]}>
        {leftIcon && <View style={styles.iconLeft}>{leftIcon}</View>}
        <TextInput
          style={[
            styles.input,
            leftIcon ? styles.inputWithLeftIcon : null,
            rightIcon ? styles.inputWithRightIcon : null,
            inputStyle,
          ]}
          placeholderTextColor={Colors.textDisabled}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          accessibilityLabel={label || textInputProps.placeholder}
          scrollEnabled={false}
          {...textInputProps}
        />
        {rightIcon && <View style={styles.iconRight}>{rightIcon}</View>}
      </View>

      {isError && <Text style={styles.error}>{error}</Text>}
      {helperText && !isError && <Text style={styles.helper}>{helperText}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    fontFamily: 'NotoSansSC-Medium',
    fontSize: TypeScale.bodySmall.fontSize,
    lineHeight: TypeScale.bodySmall.lineHeight,
    color: Colors.textSecondary,
    marginBottom: 6,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: Borders.thin,
    borderRadius: Borders.radius,
    backgroundColor: 'transparent',
  },
  input: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    fontFamily: 'NotoSansSC-Regular',
    fontSize: TypeScale.body.fontSize,
    lineHeight: TypeScale.body.lineHeight,
    color: Colors.text,
    minHeight: 44,
  },
  inputWithLeftIcon: {
    paddingLeft: Spacing.sm,
  },
  inputWithRightIcon: {
    paddingRight: Spacing.sm,
  },
  iconLeft: {
    paddingLeft: Spacing.md,
  },
  iconRight: {
    paddingRight: Spacing.md,
  },
  error: {
    fontFamily: 'NotoSansSC-Medium',
    fontSize: TypeScale.bodySmall.fontSize,
    lineHeight: TypeScale.bodySmall.lineHeight,
    color: Colors.text,
    marginTop: 4,
    fontWeight: '600',
  },
  helper: {
    fontFamily: 'NotoSansSC-Regular',
    fontSize: TypeScale.bodySmall.fontSize,
    lineHeight: TypeScale.bodySmall.lineHeight,
    color: Colors.textTertiary,
    marginTop: 4,
  },
});

