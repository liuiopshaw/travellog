// 旅记 TravelLog — Badge (Editorial)
// Hard-edge square badge. Black background, white mono text.
// FORBIDDEN: rounded-full, rounded anything.

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { BadgeProps } from '../types';
import { Colors, Borders } from '../styles/editorial';
import { checkEditorialStyle } from '../styles/forbidden';

export function Badge({
  count,
  maxCount = 99,
  style,
  textStyle,
}: BadgeProps) {
  if (count <= 0) return null;

  const displayText = count > maxCount ? `${maxCount}+` : String(count);
  const isSmall = displayText.length > 2;

  // Editorial compliance
  if (__DEV__ && style) {
    checkEditorialStyle('Badge', StyleSheet.flatten(style));
  }

  return (
    <View
      style={[styles.badge, isSmall && styles.badgeSmall, style]}
      accessibilityRole="text"
      accessibilityLabel={`${count}条未读`}
    >
      <Text style={[styles.text, isSmall && styles.textSmall, textStyle]}>
        {displayText}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    backgroundColor: Colors.black,
    minWidth: 20,
    height: 20,
    paddingHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Borders.radius, // 0 — hard edge, NO rounded-full
  },
  badgeSmall: {
    minWidth: 24,
  },
  text: {
    fontFamily: 'NotoSansSC-Medium',
    fontSize: 11,
    lineHeight: 12,
    color: Colors.white,
    textAlign: 'center',
  },
  textSmall: {
    fontSize: 10,
  },
});
