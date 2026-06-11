// 旅记 TravelLog — MyFavoritesScreen (Editorial + Zustand)

import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { ContentCard } from '../../content/components/ContentCard';
import { EmptyState, AppButton } from '../../../shared/components';
import { useUserStore } from '../store/userStore';
import { InteractionApi } from '../../interaction/services/interactionApi';
import { Colors, Spacing, TypeScale, Borders } from '../../../shared/styles/editorial';

interface Props { navigation: any }

export function MyFavoritesScreen({ navigation }: Props) {
  const { favorites, fetchFavorites } = useUserStore();
  const [editMode, setEditMode] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  useEffect(() => { fetchFavorites(); }, []);

  const toggleSelect = (id: string) => {
    const s = new Set(selected);
    s.has(id) ? s.delete(id) : s.add(id);
    setSelected(s);
  };

  if (favorites.length === 0) {
    return (
      <EmptyState title="还没有收藏内容" description="浏览旅游内容，点击心形图标即可收藏" actionText="去发现" onAction={() => navigation.navigate('HomeTab')} />
    );
  }

  return (
    <View style={styles.root}>
      {/* Edit bar */}
      <View style={styles.editBar}>
        <Text style={styles.editCount}>共 {favorites.length} 个收藏</Text>
        <Pressable onPress={() => { setEditMode(!editMode); setSelected(new Set()); }}>
          <Text style={styles.editToggle}>{editMode ? '完成' : '编辑'}</Text>
        </Pressable>
      </View>

      {/* Batch action */}
      {editMode && selected.size > 0 && (
        <View style={styles.batchBar}>
          <Text style={styles.batchText}>已选 {selected.size} 项</Text>
          <AppButton title="取消收藏" variant="secondary" size="sm" onPress={async () => {
            for (const id of selected) { await InteractionApi.unfavorite(id); }
            setSelected(new Set()); setEditMode(false); fetchFavorites();
          }} />
        </View>
      )}

      <ScrollView contentContainerStyle={styles.list}>
        {favorites.map((content) => (
          <View key={content.id} style={styles.cardWrapper}>
            {editMode && (
              <Pressable
                style={[styles.checkbox, selected.has(content.id) && styles.checkboxActive]}
                onPress={() => toggleSelect(content.id)}
              >
                {selected.has(content.id) && <Text style={styles.checkmark}>✓</Text>}
              </Pressable>
            )}
            <View style={styles.cardInner}>
              <ContentCard
                content={content as any}
                onPress={() => !editMode && navigation.navigate('HomeTab', { screen: 'ContentDetail', params: { contentId: content.id } })}
              />
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.bg },
  editBar: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: Spacing.containerX, paddingVertical: Spacing.md,
    borderBottomWidth: Borders.thin, borderBottomColor: Colors.border,
  },
  editCount: { fontFamily: 'NotoSansSC-Regular', fontSize: 13, color: Colors.textTertiary },
  editToggle: { fontFamily: 'NotoSansSC-Medium', fontSize: 13, color: Colors.text },
  batchBar: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: Spacing.containerX, paddingVertical: Spacing.sm,
    backgroundColor: Colors.surfaceActive,
  },
  batchText: { fontFamily: 'NotoSansSC-Regular', fontSize: 13, color: Colors.textSecondary },
  list: { padding: Spacing.containerX, gap: Spacing.lg, paddingBottom: 40 },
  cardWrapper: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  cardInner: { flex: 1 },
  checkbox: {
    width: 22, height: 22, borderWidth: Borders.thin, borderColor: Colors.border,
    alignItems: 'center', justifyContent: 'center',
  },
  checkboxActive: { backgroundColor: Colors.black, borderColor: Colors.black },
  checkmark: { color: Colors.white, fontSize: 14, fontWeight: 'bold' },
});
