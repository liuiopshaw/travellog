// 旅记 TravelLog — Divider (Editorial)
// Thin: border-b border-[#1C1C1C]/10
// Thick: border-b-2 border-[#1C1C1C]

import React from 'react';
import { View, StyleSheet } from 'react-native';
import type { DividerProps } from '../types';
import { Colors, Borders, Spacing } from '../styles/editorial';

export function Divider({ thickness = 'thin', style }: DividerProps) {
  return (
    <View
      style={[
        styles.base,
        thickness === 'thick' ? styles.thick : styles.thin,
        style,
      ]}
      accessibilityRole="none"
    />
  );
}

const styles = StyleSheet.create({
  base: {
    width: '100%',
    height: 0,
  },
  thin: {
    borderBottomWidth: Borders.thin,
    borderBottomColor: Colors.border, // border-[#1C1C1C]/10
  },
  thick: {
    borderBottomWidth: Borders.thick,
    borderBottomColor: Colors.borderHover, // border-[#1C1C1C]
  },
});
