// 旅记 TravelLog — SkeletonBlock (Editorial)
// Monochrome pulsing placeholder. Hard edges (no rounded corners).
// FORBIDDEN: borderRadius prop, rounded-* classes

import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet } from 'react-native';
import type { SkeletonBlockProps } from '../types';
import { Colors, Borders, Animation } from '../styles/editorial';
import { checkEditorialStyle } from '../styles/forbidden';

export function SkeletonBlock({
  width = '100%',
  height = 16,
  style,
}: SkeletonBlockProps) {
  const pulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 800,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 0,
          duration: 800,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ]),
    );
    animation.start();
    return () => animation.stop();
  }, []);

  // Editorial compliance: FORBIDDEN rounded corners
  if (__DEV__ && style) {
    checkEditorialStyle('SkeletonBlock', StyleSheet.flatten(style));
  }

  const opacity = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  return (
    <Animated.View
      style={[
        styles.block,
        { width: width as any, height: height as any, opacity },
        style,
      ]}
      accessibilityRole="progressbar"
      accessibilityLabel="加载中"
    />
  );
}

const styles = StyleSheet.create({
  block: {
    backgroundColor: Colors.textDisabled, // bg-[#1C1C1C]/10
    borderRadius: Borders.radius, // 0 — hard edge
  },
});
