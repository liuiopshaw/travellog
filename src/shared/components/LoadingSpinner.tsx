// 旅记 TravelLog — LoadingSpinner (Editorial)
// Monochrome spinning indicator. Thin line, no color.

import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';
import type { LoadingSpinnerProps } from '../types';
import { Colors } from '../styles/editorial';

const SIZE_MAP = {
  sm: 16,
  md: 24,
  lg: 36,
} as const;

const TRACK_WIDTH_MAP = {
  sm: 1.5,
  md: 2,
  lg: 2.5,
} as const;

export function LoadingSpinner({
  size = 'md',
  color = Colors.text,
  style,
}: LoadingSpinnerProps) {
  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );
    animation.start();
    return () => animation.stop();
  }, []);

  const spin = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const dimension = SIZE_MAP[size];
  const trackWidth = TRACK_WIDTH_MAP[size];

  return (
    <View style={[styles.container, style]} accessibilityRole="progressbar">
      <Animated.View
        style={[
          styles.spinner,
          {
            width: dimension,
            height: dimension,
            borderRadius: dimension / 2,
            borderWidth: trackWidth,
            borderColor: Colors.border,
            borderTopColor: color,
            transform: [{ rotate: spin }],
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinner: {
    // Dimensions and colors applied inline via animated style
  },
});
