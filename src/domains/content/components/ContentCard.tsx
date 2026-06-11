// 旅记 TravelLog — ContentCard (Domain Component)
// Editorial card: serif title, hard edge, cover image, rating, location, tags, favorite toggle.
// Reused across HomeScreen, SearchResultScreen, MyFavoritesScreen.

import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { MockContent } from '../../../shared/utils/mockData';
import {
  Colors, Spacing, TypeScale, Borders, Animation,
} from '../../../shared/styles/editorial';
import { AppImage } from '../../../shared/components/AppImage';
import { checkEditorialStyle } from '../../../shared/styles/forbidden';

interface ContentCardProps {
  content: MockContent;
  onPress: () => void;
  onFavorite?: () => void;
  style?: any;
}

export function ContentCard({ content, onPress, onFavorite, style }: ContentCardProps) {
  if (__DEV__ && style) {
    checkEditorialStyle('ContentCard', StyleSheet.flatten(style));
  }

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        pressed && styles.pressed,
        style,
      ]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${content.title}, 评分${content.rating}, ${content.location}`}
    >
      {/* Cover Image — 4:3 aspect, hard edge, overflow hidden */}
      <View style={styles.imageContainer}>
        <AppImage
          uri={content.coverImage}
          width="100%"
          aspectRatio={4 / 3}
        />
      </View>

      {/* Text Content */}
      <View style={styles.body}>
        {/* Category Label + Favorite */}
        <View style={styles.topRow}>
          <Text style={styles.category}>{content.category?.name || ''}</Text>
          {onFavorite && (
            <Pressable
              onPress={onFavorite}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              accessibilityRole="button"
              accessibilityLabel={content.isFavorited ? '取消收藏' : '收藏'}
            >
              <Ionicons
                name={content.isFavorited ? 'heart' : 'heart-outline'}
                size={20}
                color={content.isFavorited ? Colors.text : Colors.textMuted}
              />
            </Pressable>
          )}
        </View>

        {/* Title — serif */}
        <Text style={styles.title} numberOfLines={2}>
          {content.title}
        </Text>

        {/* Description */}
        <Text style={styles.description} numberOfLines={2}>
          {content.description}
        </Text>

        {/* Bottom Row: Rating + Location */}
        <View style={styles.bottomRow}>
          <View style={styles.ratingRow}>
            <Ionicons name="star" size={14} color={Colors.text} />
            <Text style={styles.rating}>{content.rating}</Text>
          </View>
          <Text style={styles.location} numberOfLines={1}>
            {content.region} · {content.location}
          </Text>
        </View>

        {/* Tags */}
        {content.tags.length > 0 && (
          <View style={styles.tagsRow}>
            {content.tags.slice(0, 3).map((tag) => (
              <View key={tag} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.bgAlt,
    borderWidth: Borders.thin,
    borderColor: Colors.border,
    borderRadius: Borders.radius,
    overflow: 'hidden',
  },
  pressed: {
    transform: [{ scale: Animation.scale.press }],
    borderColor: Colors.borderHover,
  },
  imageContainer: {
    overflow: 'hidden',
    backgroundColor: Colors.textDisabled,
  },
  body: {
    padding: Spacing.cardPadding,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  category: {
    fontFamily: 'NotoSansSC-Medium',
    fontSize: TypeScale.label.fontSize,
    lineHeight: TypeScale.label.lineHeight,
    color: Colors.textMuted,
    letterSpacing: TypeScale.label.letterSpacing,
    textTransform: 'uppercase',
  },
  title: {
    fontFamily: 'NotoSerifSC-SemiBold',
    fontSize: TypeScale.h3.fontSize,
    lineHeight: TypeScale.h3.lineHeight,
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  description: {
    fontFamily: 'NotoSansSC-Regular',
    fontSize: TypeScale.bodySmall.fontSize,
    lineHeight: TypeScale.bodySmall.lineHeight,
    color: Colors.textTertiary,
    marginBottom: Spacing.md,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Spacing.md,
    borderTopWidth: Borders.thin,
    borderTopColor: Colors.border,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rating: {
    fontFamily: 'NotoSerifSC-SemiBold',
    fontSize: 15,
    color: Colors.text,
  },
  location: {
    fontFamily: 'NotoSansSC-Regular',
    fontSize: TypeScale.bodySmall.fontSize,
    color: Colors.textMuted,
    flex: 1,
    textAlign: 'right',
    marginLeft: Spacing.sm,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.xs,
    marginTop: Spacing.md,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderWidth: Borders.thin,
    borderColor: Colors.border,
  },
  tagText: {
    fontFamily: 'NotoSansSC-Regular',
    fontSize: 10,
    color: Colors.textTertiary,
  },
});
