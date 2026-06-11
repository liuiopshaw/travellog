// 旅记 TravelLog — SearchScreen (Editorial + Zustand + Persistence)

import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { SearchBar, Divider } from '../../../shared/components';
import { useSearchStore } from '../store/searchStore';
import { Colors, Spacing, TypeScale, Borders, Animation } from '../../../shared/styles/editorial';

const SEARCH_HISTORY_KEY = 'travellog_search_history';
const MAX_HISTORY = 20;

interface Props { navigation: any }

export function SearchScreen({ navigation }: Props) {
  const [searchText, setSearchText] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const { hotKeywords, fetchHotKeywords } = useSearchStore();

  useEffect(() => { fetchHotKeywords(); }, []);

  // Load persisted history
  useEffect(() => {
    AsyncStorage.getItem(SEARCH_HISTORY_KEY).then(raw => {
      if (raw) setHistory(JSON.parse(raw));
    });
  }, []);

  const persistHistory = (items: string[]) => {
    setHistory(items);
    AsyncStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(items));
  };

  const handleSearch = () => {
    if (!searchText.trim()) return;
    const items = [searchText.trim(), ...history.filter(h => h !== searchText.trim())].slice(0, MAX_HISTORY);
    persistHistory(items);
    navigation.navigate('SearchResult', { keyword: searchText.trim() });
  };

  const handleClearHistory = () => persistHistory([]);

  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
      <View style={styles.searchWrap}>
        <SearchBar value={searchText} onChangeText={setSearchText} onSubmit={handleSearch} placeholder="搜索目的地、城市、标签..." />
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>热门搜索</Text>
        <View style={styles.hotGrid}>
          {hotKeywords.map((keyword, i) => (
            <Pressable key={keyword} style={({ pressed }) => [styles.hotTag, pressed && styles.pressed]} onPress={() => navigation.navigate('SearchResult', { keyword })}>
              <Text style={[styles.hotText, i < 3 && styles.hotTextTop]}>{keyword}</Text>
            </Pressable>
          ))}
        </View>
      </View>
      <Divider />
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>搜索历史</Text>
          {history.length > 0 && <Pressable onPress={handleClearHistory}><Text style={styles.clearText}>清空</Text></Pressable>}
        </View>
        {history.length === 0 ? (
          <Text style={styles.emptyText}>暂无搜索历史</Text>
        ) : history.map(item => (
          <Pressable key={item} style={styles.historyItem} onPress={() => navigation.navigate('SearchResult', { keyword: item })}>
            <Ionicons name="time-outline" size={14} color={Colors.textMuted} />
            <Text style={styles.historyText}>{item}</Text>
            <Pressable hitSlop={8} onPress={() => persistHistory(history.filter(h => h !== item))}><Ionicons name="close" size={14} color={Colors.textMuted} /></Pressable>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.bg },
  scroll: { paddingBottom: 40 },
  searchWrap: { paddingHorizontal: Spacing.containerX, paddingTop: Spacing.xl, paddingBottom: Spacing.lg },
  section: { paddingHorizontal: Spacing.containerX, paddingVertical: Spacing.xl },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.md },
  sectionTitle: { fontFamily: 'NotoSerifSC-SemiBold', fontSize: TypeScale.h3.fontSize, color: Colors.text, borderBottomWidth: Borders.thick, borderBottomColor: Colors.borderHover, paddingBottom: Spacing.xs },
  clearText: { fontFamily: 'NotoSansSC-Regular', fontSize: 12, color: Colors.textMuted },
  hotGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm, marginTop: Spacing.lg },
  hotTag: { paddingHorizontal: 14, paddingVertical: 6, borderWidth: Borders.thin, borderColor: Colors.border },
  hotText: { fontFamily: 'NotoSansSC-Regular', fontSize: 13, color: Colors.textSecondary },
  hotTextTop: { fontFamily: 'NotoSansSC-Medium', color: Colors.text },
  pressed: { transform: [{ scale: Animation.scale.press }], borderColor: Colors.borderHover },
  historyItem: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, paddingVertical: Spacing.sm },
  historyText: { flex: 1, fontFamily: 'NotoSansSC-Regular', fontSize: TypeScale.body.fontSize, color: Colors.textSecondary },
  emptyText: { fontFamily: 'NotoSansSC-Regular', fontSize: TypeScale.bodySmall.fontSize, color: Colors.textMuted, textAlign: 'center', paddingVertical: Spacing.xl },
});
