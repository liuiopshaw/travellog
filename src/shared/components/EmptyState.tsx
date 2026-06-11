// 旅记 TravelLog — EmptyState (Editorial)
// Centered empty placeholder. Editorial serif title + sans description.

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { EmptyStateProps } from '../types';
import { Colors, Spacing, TypeScale } from '../styles/editorial';
import { AppButton } from './AppButton';

export function EmptyState({
  icon = 'compass-outline',
  title,
  description,
  actionText,
  onAction,
  style,
}: EmptyStateProps) {
  return (
    <View style={[styles.container, style]} accessibilityRole="text">
      <Ionicons
        name={icon as any}
        size={48}
        color={Colors.textTertiary}
        style={styles.icon}
      />

      <Text style={styles.title}>{title}</Text>

      {description && <Text style={styles.description}>{description}</Text>}

      {actionText && onAction && (
        <View style={styles.actionWrapper}>
          <AppButton
            title={actionText}
            variant="secondary"
            size="md"
            onPress={onAction}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: Spacing.sectionY * 2, // generous vertical space
    paddingHorizontal: Spacing.containerX,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginBottom: Spacing.lg,
    opacity: 0.5,
  },
  title: {
    fontFamily: 'NotoSerifSC-SemiBold',
    fontSize: TypeScale.h3.fontSize,
    lineHeight: TypeScale.h3.lineHeight,
    color: Colors.textTertiary,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  description: {
    fontFamily: 'NotoSansSC-Regular',
    fontSize: TypeScale.bodySmall.fontSize,
    lineHeight: TypeScale.bodySmall.lineHeight,
    color: Colors.textMuted,
    textAlign: 'center',
    maxWidth: 280,
  },
  actionWrapper: {
    marginTop: Spacing.xl,
  },
});
