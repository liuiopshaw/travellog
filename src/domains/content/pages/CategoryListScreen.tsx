// 旅记 TravelLog — CategoryListScreen (Editorial + Zustand)

import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ContentCard } from '../components/ContentCard';
import { SkeletonBlock } from '../../../shared/components';
import { SearchApi } from '../../search/services/searchApi';
import { Colors, Spacing, TypeScale, Borders } from '../../../shared/styles/editorial';
import type { MockContent } from '../../../shared/utils/mockData';

const SORT_OPTIONS = [
  { key: 'default', label: '综合' },
  { key: 'hot', label: '最热' },
  { key: 'rating', label: '最高评分' },
  { key: 'newest', label: '最新' },
];

interface Props { navigation: any; route: { params: { categoryId: string; categoryName: string } } }

export function CategoryListScreen({ navigation, route }: Props) {
  const { categoryId, categoryName } = route.params;
  const [contents, setContents] = useState<MockContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState('default');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const fetchData = async (p = 1, s = sort, append = false) => {
    if (p === 1) setLoading(true); else setLoadingMore(true);
    try {
      const res = await SearchApi.filter({ category: categoryId, page: p, pageSize: 10, sort: s });
      setContents(append ? [...contents, ...res.list] : res.list);
      setTotal(res.total);
      setHasMore(res.hasMore);
      setPage(p);
    } catch { /* ignore */ }
    setLoading(false);
    setLoadingMore(false);
  };

  useEffect(() => { fetchData(1, sort); }, [categoryId, sort]);

  const handleSortChange = (s: string) => {
    if (s !== sort) { setSort(s); setContents([]); }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.root} edges={['top']}>
        <View style={styles.header}><Text style={styles.title}>{categoryName}</Text></View>
        <View style={styles.loadingWrap}>
          {[1,2,3].map(i => (<View key={i} style={{ padding: Spacing.containerX, marginBottom: Spacing.lg }}><SkeletonBlock width="100%" height={240} /></View>))}
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>
          {categoryName}
          <Text style={styles.total}>  {total} 条</Text>
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.sortRow}>
          {SORT_OPTIONS.map(opt => (
            <Pressable key={opt.key} style={[styles.sortTab, sort === opt.key && styles.sortTabActive]} onPress={() => handleSortChange(opt.key)}>
              <Text style={[styles.sortText, sort === opt.key && styles.sortTextActive]}>{opt.label}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>
      <ScrollView contentContainerStyle={styles.list}>
        {contents.map(item => (
          <ContentCard key={item.id} content={item} onPress={() => navigation.navigate('ContentDetail', { contentId: item.id })} />
        ))}
        {hasMore && (
          <Pressable style={styles.loadMore} onPress={() => fetchData(page + 1, sort, true)} disabled={loadingMore}>
            <Text style={styles.loadMoreText}>{loadingMore ? '加载中...' : '加载更多'}</Text>
          </Pressable>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.bg },
  header: { paddingHorizontal: Spacing.containerX, paddingTop: Spacing.lg, paddingBottom: Spacing.lg, borderBottomWidth: Borders.thin, borderBottomColor: Colors.border },
  title: { fontFamily: 'NotoSerifSC-Bold', fontSize: TypeScale.h1.fontSize, color: Colors.text },
  total: { fontFamily: 'NotoSansSC-Regular', fontSize: TypeScale.bodySmall.fontSize, color: Colors.textMuted },
  sortRow: { marginTop: Spacing.md },
  sortTab: { paddingHorizontal: 14, paddingVertical: 5, borderWidth: Borders.thin, borderColor: Colors.border, marginRight: Spacing.xs },
  sortTabActive: { borderColor: Colors.borderHover, backgroundColor: Colors.black },
  sortText: { fontFamily: 'NotoSansSC-Regular', fontSize: 12, color: Colors.textSecondary },
  sortTextActive: { fontFamily: 'NotoSansSC-Medium', color: Colors.white },
  loadingWrap: { flex: 1, paddingTop: Spacing.xl },
  list: { padding: Spacing.containerX, gap: Spacing.lg, paddingBottom: 40 },
  loadMore: { alignItems: 'center', paddingVertical: Spacing.lg },
  loadMoreText: { fontFamily: 'NotoSansSC-Regular', fontSize: 13, color: Colors.textTertiary },
});
