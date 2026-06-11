// 旅记 TravelLog — ErrorState (Editorial)
// Error display with optional retry button.

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { ErrorStateProps } from '../types';
import { Colors, Spacing, TypeScale, Borders } from '../styles/editorial';
import { AppButton } from './AppButton';

export function ErrorState({ message, onRetry, style }: ErrorStateProps) {
  return (
    <View style={[styles.container, style]} accessibilityRole="alert">
      <Ionicons
        name="alert-circle-outline"
        size={40}
        color={Colors.textTertiary}
        style={styles.icon}
      />

      <Text style={styles.message}>{message}</Text>

      {onRetry && (
        <View style={styles.retryWrapper}>
          <AppButton
            title="重试"
            variant="secondary"
            size="md"
            onPress={onRetry}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: Spacing.sectionY * 2,
    paddingHorizontal: Spacing.containerX,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginBottom: Spacing.lg,
    opacity: 0.5,
  },
  message: {
    fontFamily: 'NotoSansSC-Regular',
    fontSize: TypeScale.bodySmall.fontSize,
    lineHeight: TypeScale.bodySmall.lineHeight,
    color: Colors.textTertiary,
    textAlign: 'center',
  },
  retryWrapper: {
    marginTop: Spacing.xl,
  },
});
