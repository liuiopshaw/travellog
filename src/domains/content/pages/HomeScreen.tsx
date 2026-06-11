// 旅记 TravelLog — HomeScreen (Editorial + Zustand)

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, ScrollView, Pressable, Dimensions, StyleSheet, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { SearchBar, Divider, SkeletonBlock, AppImage } from '../../../shared/components';
import { ContentCard } from '../components/ContentCard';
import { useContentStore } from '../store/contentStore';
import { Colors, Spacing, TypeScale, Borders } from '../../../shared/styles/editorial';
import type { MockContent } from '../../../shared/utils/mockData';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface Props { navigation: any }

export function HomeScreen({ navigation }: Props) {
  const [searchText, setSearchText] = useState('');
  const [bannerIndex, setBannerIndex] = useState(0);
  const { categories, banners, recommendList, loading, refreshing, hasMore, fetchHomeData, refreshRecommend, loadMore } = useContentStore();
  const bannerScrollRef = useRef<ScrollView>(null);

  const BLOCK_WIDTH = SCREEN_WIDTH - Spacing.containerX * 2 + 12; // slide width + gap

  // Auto-advance banner every 3 seconds
  useEffect(() => {
    if (banners.length <= 1) return;
    const timer = setInterval(() => {
      const next = (bannerIndex + 1) % banners.length;
      bannerScrollRef.current?.scrollTo({ x: next * BLOCK_WIDTH, animated: true });
      setBannerIndex(next);
    }, 3000);
    return () => clearInterval(timer);
  }, [bannerIndex, banners.length, BLOCK_WIDTH]);

  // Manual scroll handler
  const handleBannerScroll = useCallback((e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const idx = Math.round(e.nativeEvent.contentOffset.x / BLOCK_WIDTH);
    if (idx !== bannerIndex) setBannerIndex(idx);
  }, [bannerIndex, BLOCK_WIDTH]);

  useEffect(() => { fetchHomeData(); }, []);

  const handleSearchSubmit = () => {
    if (searchText.trim()) {
      navigation.navigate('SearchTab', { screen: 'SearchResult', params: { keyword: searchText.trim() } });
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingWrap}>
        <SkeletonBlock width="100%" height={200} />
        <View style={{ height: 16 }} />
        <SkeletonBlock width="80%" height={24} />
        <View style={{ height: 8 }} />
        <SkeletonBlock width="60%" height={16} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
    <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
      {/* HERO */}
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>发现下一段{'\n'}旅程</Text>
        <Text style={styles.heroDesc}>精心策划的旅游目的地指南，从热门景点到隐藏秘境，让每一次出发都充满灵感。</Text>
        <View style={styles.heroSearch}>
          <SearchBar value={searchText} onChangeText={setSearchText} onSubmit={handleSearchSubmit} placeholder="搜索目的地..." />
        </View>
      </View>

      {/* BANNER */}
      {banners.length > 0 && (
        <View style={styles.bannerContainer}>
          <ScrollView
            ref={bannerScrollRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={BLOCK_WIDTH}
            decelerationRate="fast"
            snapToAlignment="start"
            onMomentumScrollEnd={handleBannerScroll}
            contentContainerStyle={styles.bannerContent}
          >
            {banners.map((banner, idx) => (
              <Pressable key={banner.id} style={styles.bannerSlide} onPress={() => {
                if (banner.linkType === 'content') navigation.navigate('ContentDetail', { contentId: banner.linkValue });
                else if (banner.linkType === 'url') navigation.navigate('SearchTab', { screen: 'SearchResult', params: { keyword: '云南' } });
              }}>
                <AppImage uri={banner.image} width="100%" height={160} />
                <View style={styles.bannerOverlay}>
                  <Text style={styles.bannerTitle}>{banner.title}</Text>
                </View>
              </Pressable>
            ))}
          </ScrollView>
          <View style={styles.bannerDots}>{banners.map((_, i) => <View key={i} style={[styles.dot, i === bannerIndex && styles.dotActive]} />)}</View>
        </View>
      )}

      {/* CATEGORIES */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}><Text style={styles.sectionTitle}>探索分类</Text></View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.categoryRow}>
            {categories.map((cat) => (
              <Pressable key={cat.id} style={styles.categoryItem} onPress={() => {
                navigation.navigate('CategoryList', { categoryId: cat.id, categoryName: cat.name });
              }}>
                <View style={styles.categoryIconWrap}><Ionicons name={cat.icon as any} size={24} color={Colors.text} /></View>
                <Text style={styles.categoryName}>{cat.name}</Text>
              </Pressable>
            ))}
          </View>
        </ScrollView>
      </View>

      <Divider />

      {/* RECOMMEND */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}><Text style={styles.sectionTitle}>热门推荐</Text></View>
        <View style={styles.cardList}>
          {recommendList.map((content) => (
            <ContentCard key={content.id} content={content} onPress={() => navigation.navigate('ContentDetail', { contentId: content.id })} onFavorite={() => {}} />
          ))}
        </View>
        {hasMore && <View style={styles.loadingSkeleton}><SkeletonBlock width="100%" height={240} /></View>}
      </View>
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.bg },
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: 100 },
  loadingWrap: { flex: 1, backgroundColor: Colors.bg, padding: Spacing.containerX, paddingTop: 80 },
  hero: { paddingTop: Spacing.lg, paddingBottom: Spacing.xl, paddingHorizontal: Spacing.containerX, backgroundColor: Colors.bg },
  heroTitle: { fontFamily: 'NotoSerifSC-Bold', fontSize: TypeScale.hero.fontSize, lineHeight: TypeScale.hero.lineHeight, color: Colors.text, letterSpacing: TypeScale.hero.letterSpacing, marginBottom: Spacing.md },
  heroDesc: { fontFamily: 'NotoSansSC-Regular', fontSize: TypeScale.bodySmall.fontSize, lineHeight: TypeScale.bodySmall.lineHeight, color: Colors.textTertiary, maxWidth: 300, marginBottom: Spacing.xl },
  heroSearch: {},
  bannerContainer: { marginBottom: Spacing.xl },
  bannerContent: { paddingHorizontal: Spacing.containerX, gap: 12 },
  bannerSlide: {
    width: SCREEN_WIDTH - Spacing.containerX * 2,
    overflow: 'hidden',
  },
  bannerOverlay: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.bgAlt,
  },
  bannerTitle: {
    fontFamily: 'NotoSerifSC-SemiBold',
    fontSize: TypeScale.h3.fontSize,
    color: Colors.text,
  },
  bannerDots: { flexDirection: 'row', justifyContent: 'center', gap: 6, marginTop: Spacing.md },
  dot: { width: 6, height: 6, backgroundColor: Colors.border },
  dotActive: { backgroundColor: Colors.text, width: 18 },
  section: { paddingVertical: Spacing.xl, paddingHorizontal: Spacing.containerX },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: Spacing.lg },
  sectionTitle: { fontFamily: 'NotoSerifSC-SemiBold', fontSize: TypeScale.h2.fontSize, lineHeight: TypeScale.h2.lineHeight, color: Colors.text, borderBottomWidth: Borders.thick, borderBottomColor: Colors.borderHover, paddingBottom: Spacing.sm },
  categoryRow: { flexDirection: 'row', gap: Spacing.lg, paddingRight: Spacing.containerX },
  categoryItem: { alignItems: 'center', gap: Spacing.sm, width: 68 },
  categoryIconWrap: { width: 52, height: 52, borderWidth: Borders.thin, borderColor: Colors.border, alignItems: 'center', justifyContent: 'center' },
  categoryName: { fontFamily: 'NotoSansSC-Regular', fontSize: 12, color: Colors.textSecondary, textAlign: 'center' },
  cardList: { gap: Spacing.lg },
  loadingSkeleton: { marginTop: Spacing.lg },
});
