// 旅记 TravelLog — MapScreen (Editorial, v1 Placeholder)

import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { SearchBar, Divider } from '../../../shared/components';
import { mockContents } from '../../../shared/utils/mockData';
import { Colors, Spacing, TypeScale, Borders } from '../../../shared/styles/editorial';

interface Props { navigation: any }

export function MapScreen({ navigation }: Props) {
  const [searchText, setSearchText] = useState('');
  const spots = mockContents.filter(c => c.latitude && c.longitude);

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      {/* Search overlay */}
      <View style={styles.searchWrap}>
        <SearchBar value={searchText} onChangeText={setSearchText} placeholder="搜索景点、地点..." />
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} bounces={false}>
        {/* Map Placeholder */}
        <View style={styles.mapPlaceholder}>
          <Ionicons name="map-outline" size={48} color={Colors.textMuted} />
          <Text style={styles.mapTitle}>地图探索</Text>
          <Text style={styles.mapSub}>完整地图功能将在 v1.1 中实现</Text>
        </View>

        {/* Nearby Spots List */}
        <View style={styles.spotsSection}>
          <Text style={styles.sectionTitle}>周边景点</Text>
          {spots.map(spot => (
            <Pressable
              key={spot.id}
              style={styles.spotCard}
              onPress={() => navigation.navigate('ContentDetail', { contentId: spot.id })}
            >
              <View style={styles.spotInfo}>
                <Text style={styles.spotName} numberOfLines={1}>{spot.title}</Text>
                <View style={styles.spotMeta}>
                  <Ionicons name="star" size={12} color={Colors.text} />
                  <Text style={styles.spotRating}>{spot.rating}</Text>
                  <Text style={styles.spotLocation}>· {spot.location}</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={16} color={Colors.textMuted} />
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.bg },
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: 40 },
  searchWrap: {
    paddingHorizontal: Spacing.containerX,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.sm,
  },
  mapPlaceholder: {
    height: 200,
    marginHorizontal: Spacing.containerX,
    backgroundColor: Colors.textDisabled,
    alignItems: 'center', justifyContent: 'center',
    gap: Spacing.sm,
  },
  mapTitle: {
    fontFamily: 'NotoSerifSC-SemiBold',
    fontSize: TypeScale.h3.fontSize, color: Colors.textSecondary,
    marginTop: Spacing.sm,
  },
  mapSub: {
    fontFamily: 'NotoSansSC-Regular',
    fontSize: TypeScale.bodySmall.fontSize, color: Colors.textMuted,
    textAlign: 'center', lineHeight: 20,
  },
  spotsSection: {
    paddingHorizontal: Spacing.containerX,
    paddingTop: Spacing.xl,
  },
  sectionTitle: {
    fontFamily: 'NotoSerifSC-SemiBold',
    fontSize: TypeScale.h3.fontSize, color: Colors.text,
    marginBottom: Spacing.lg,
    borderBottomWidth: Borders.thick,
    borderBottomColor: Colors.borderHover,
    paddingBottom: Spacing.sm,
  },
  spotCard: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: Spacing.md,
    borderBottomWidth: Borders.thin, borderBottomColor: Colors.border,
    gap: Spacing.sm,
  },
  spotInfo: { flex: 1 },
  spotName: {
    fontFamily: 'NotoSerifSC-SemiBold', fontSize: 15, color: Colors.text,
    marginBottom: 2,
  },
  spotMeta: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  spotRating: {
    fontFamily: 'NotoSansSC-Medium', fontSize: 12, color: Colors.text,
  },
  spotLocation: {
    fontFamily: 'NotoSansSC-Regular', fontSize: 12, color: Colors.textMuted,
  },
});
