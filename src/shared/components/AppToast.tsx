// 旅记 TravelLog — AppToast (Editorial)
// Minimal monochrome toast notification. Auto-dismiss in 3-5s.

import React, { useEffect, useRef } from 'react';
import { Animated, Text, StyleSheet, TouchableOpacity } from 'react-native';
import type { AppToastProps } from '../types';
import { Colors, Spacing, TypeScale, Animation, Borders } from '../styles/editorial';

export function AppToast({
  visible,
  message,
  type = 'info',
  duration = 3500,
  onDismiss,
}: AppToastProps) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: Animation.duration.normal,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: Animation.duration.normal,
          useNativeDriver: true,
        }),
      ]).start();

      const timer = setTimeout(() => {
        Animated.parallel([
          Animated.timing(opacity, {
            toValue: 0,
            duration: Animation.duration.fast,
            useNativeDriver: true,
          }),
          Animated.timing(translateY, {
            toValue: 20,
            duration: Animation.duration.fast,
            useNativeDriver: true,
          }),
        ]).start(() => onDismiss?.());
      }, duration);

      return () => clearTimeout(timer);
    } else {
      opacity.setValue(0);
      translateY.setValue(20);
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.toast,
        { opacity, transform: [{ translateY }] },
      ]}
      accessibilityRole="alert"
      accessibilityLiveRegion="polite"
    >
      <TouchableOpacity
        onPress={onDismiss}
        style={styles.content}
        accessibilityLabel={message}
      >
        <Text style={styles.text} numberOfLines={2}>
          {message}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    bottom: 80,
    left: Spacing.xl,
    right: Spacing.xl,
    alignItems: 'center',
    zIndex: 1000,
  },
  content: {
    backgroundColor: Colors.bgAlt,
    borderWidth: Borders.thin,
    borderColor: Colors.border,
    borderRadius: Borders.radius,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    minWidth: 200,
    maxWidth: 340,
    alignItems: 'center',
  },
  text: {
    fontFamily: 'NotoSansSC-Regular',
    fontSize: TypeScale.bodySmall.fontSize,
    lineHeight: TypeScale.bodySmall.lineHeight,
    color: Colors.text,
    textAlign: 'center',
  },
});
