// 旅记 TravelLog — SearchResultScreen (Editorial + Zustand)

import React, { useEffect } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SearchBar, Divider } from '../../../shared/components';
import { ContentCard } from '../../content/components/ContentCard';
import { useSearchStore } from '../store/searchStore';
import { Colors, Spacing, TypeScale, Borders } from '../../../shared/styles/editorial';

const SORT_OPTIONS = ['综合', '最热', '最高评分', '最新'];

interface Props { navigation: any; route: { params: { keyword: string } } }

export function SearchResultScreen({ navigation, route }: Props) {
  const { keyword } = route.params;
  const { results, loading, total, search, setSort, sort, setKeyword } = useSearchStore();
  const [searchText, setSearchText] = React.useState(keyword);
  const [sortIndex, setSortIndex] = React.useState(0);

  useEffect(() => {
    search(keyword);
  }, [keyword]);

  const handleSearch = () => {
    if (searchText.trim() && searchText.trim() !== keyword) {
      navigation.replace('SearchResult', { keyword: searchText.trim() });
    }
  };

  const SORT_MAP = ['default', 'hot', 'rating', 'newest'];

  return (
    <View style={styles.root}>
      <View style={styles.topBar}>
        <SearchBar value={searchText} onChangeText={setSearchText} onSubmit={handleSearch} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.sortRow}>
          {SORT_OPTIONS.map((opt, i) => (
            <Pressable key={opt} style={[styles.sortTab, i === sortIndex && styles.sortTabActive]} onPress={() => { setSortIndex(i); setSort(SORT_MAP[i]); }}>
              <Text style={[styles.sortText, i === sortIndex && styles.sortTextActive]}>{opt}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>
      <Divider />
      <ScrollView style={styles.list} contentContainerStyle={styles.listContent}>
        <Text style={styles.resultCount}>找到 {total} 个结果</Text>
        {loading ? (
          <Text style={styles.loadingText}>搜索中...</Text>
        ) : results.length === 0 ? (
          <View style={styles.emptyWrap}>
            <Ionicons name="search-outline" size={40} color={Colors.textMuted} />
            <Text style={styles.emptyText}>未找到相关内容</Text>
            <Text style={styles.emptySub}>试试其他关键词</Text>
          </View>
        ) : (
          <View style={styles.cardGrid}>
            {results.map(content => (
              <ContentCard key={content.id} content={content} onPress={() => navigation.navigate('ContentDetail', { contentId: content.id })} onFavorite={() => {}} />
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.bg },
  topBar: { paddingHorizontal: Spacing.containerX, paddingTop: Spacing.sm, paddingBottom: Spacing.sm },
  sortRow: { flexDirection: 'row', marginTop: Spacing.sm, gap: Spacing.xs },
  sortTab: { paddingHorizontal: 14, paddingVertical: 5, borderWidth: Borders.thin, borderColor: Colors.border },
  sortTabActive: { borderColor: Colors.borderHover, backgroundColor: Colors.black },
  sortText: { fontFamily: 'NotoSansSC-Regular', fontSize: 12, color: Colors.textSecondary },
  sortTextActive: { fontFamily: 'NotoSansSC-Medium', color: Colors.white },
  list: { flex: 1 },
  listContent: { padding: Spacing.containerX, paddingBottom: 40 },
  resultCount: { fontFamily: 'NotoSansSC-Regular', fontSize: TypeScale.bodySmall.fontSize, color: Colors.textMuted, marginBottom: Spacing.lg },
  loadingText: { fontFamily: 'NotoSansSC-Regular', fontSize: TypeScale.body.fontSize, color: Colors.textTertiary, textAlign: 'center', paddingVertical: Spacing.xl },
  cardGrid: { gap: Spacing.lg },
  emptyWrap: { alignItems: 'center', paddingVertical: Spacing.sectionY, gap: Spacing.sm },
  emptyText: { fontFamily: 'NotoSerifSC-SemiBold', fontSize: TypeScale.h3.fontSize, color: Colors.textTertiary },
  emptySub: { fontFamily: 'NotoSansSC-Regular', fontSize: TypeScale.bodySmall.fontSize, color: Colors.textMuted },
});
