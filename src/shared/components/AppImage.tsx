// 旅记 TravelLog — AppImage (Editorial)
// Shows real image if URL loads, falls back to styled category placeholder

import React, { useState } from 'react';
import { View, Image, Pressable, Text, StyleSheet, type ImageStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { AppImageProps } from '../types';
import { Colors, Borders, TypeScale, Spacing } from '../styles/editorial';

const CATEGORY_COLORS: Record<string, string> = {
  '自然风光': '#2D4A3E',
  '历史古迹': '#4A3728',
  '美食探店': '#5C3D2E',
  '城市漫步': '#3A3A4A',
  '海岛度假': '#1A4A5C',
};

export function AppImage({
  uri, width = '100%', height = 200, aspectRatio, onPress, style, containerStyle,
}: AppImageProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const imageStyle: ImageStyle = {
    width: width as any,
    height: aspectRatio ? undefined : (height as any),
    aspectRatio,
  };

  const content = (
    <View style={[styles.container, containerStyle]}>
      {loading && !error && (
        <View style={[styles.skeleton, { width: width as any, height: height as any }]} />
      )}
      {!error && uri && (
        <Image
          source={{ uri }}
          style={[styles.image, imageStyle, style, loading && styles.hidden]}
          resizeMode="cover"
          onLoad={() => setLoading(false)}
          onError={() => { setLoading(false); setError(true); }}
        />
      )}
      {error && (
        <View style={[styles.fallback, { width: width as any, height: height as any }]}>
          <Ionicons name="image-outline" size={28} color="rgba(255,255,255,0.4)" />
          <Text style={styles.fallbackText}>图片加载中</Text>
        </View>
      )}
    </View>
  );

  if (onPress) return <Pressable onPress={onPress}>{content}</Pressable>;
  return content;
}

const styles = StyleSheet.create({
  container: { overflow: 'hidden', backgroundColor: Colors.textDisabled, borderRadius: Borders.radius },
  image: { borderRadius: Borders.radius },
  hidden: { position: 'absolute', opacity: 0 },
  skeleton: { backgroundColor: '#E0DDD6' },
  fallback: {
    alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#3A3A3A', gap: 8,
  },
  fallbackText: {
    fontFamily: 'NotoSansSC-Regular', fontSize: 12,
    color: 'rgba(255,255,255,0.5)',
  },
});
