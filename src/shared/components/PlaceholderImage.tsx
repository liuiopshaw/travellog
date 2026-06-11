// 旅记 TravelLog — PlaceholderImage (Editorial)
// Styled category-colored placeholder — no external URLs needed

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Borders } from '../styles/editorial';

const PALETTE = [
  ['#2D4A3E', '#3A5C4E'],
  ['#4A3728', '#5C4633'],
  ['#3A3A4A', '#4B4B5F'],
  ['#1A4A5C', '#226078'],
  ['#5C3D2E', '#704C3A'],
  ['#2E4A3A', '#3C5E4A'],
];

interface Props {
  title: string;
  categoryName: string;
  width?: number | string;
  height?: number;
}

export function PlaceholderImage({ title, categoryName, width = '100%', height = 200 }: Props) {
  const hash = categoryName.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const [bg, accent] = PALETTE[hash % PALETTE.length];

  return (
    <View style={[styles.root, { width: width as any, height, backgroundColor: bg }]}>
      <View style={[styles.accentBar, { backgroundColor: accent }]} />
      <View style={styles.content}>
        <Text style={styles.category}>{categoryName}</Text>
        <Text style={styles.title} numberOfLines={2}>{title}</Text>
      </View>
      <View style={[styles.accentBar, { backgroundColor: accent, alignSelf: 'flex-end' }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    justifyContent: 'center', alignItems: 'center',
    borderRadius: Borders.radius,
  },
  accentBar: { width: '60%', height: 2, opacity: 0.3 },
  content: { paddingVertical: 16, paddingHorizontal: 20, alignItems: 'center' },
  category: {
    fontFamily: 'NotoSansSC-Medium', fontSize: 10, letterSpacing: 3,
    color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', marginBottom: 8,
  },
  title: {
    fontFamily: 'NotoSerifSC-Bold', fontSize: 17, color: 'rgba(255,255,255,0.85)',
    textAlign: 'center', lineHeight: 24, maxWidth: 260,
  },
});
