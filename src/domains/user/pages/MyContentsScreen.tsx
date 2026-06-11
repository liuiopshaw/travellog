// 旅记 TravelLog — MyContentsScreen (Editorial + Zustand + Edit/Delete)

import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Pressable, Alert, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { EmptyState, Divider } from '../../../shared/components';
import { useUserStore } from '../store/userStore';
import { ContentApi } from '../../content/services/contentApi';
import { Colors, Spacing, TypeScale, Borders } from '../../../shared/styles/editorial';

interface Props { navigation: any }

export function MyContentsScreen({ navigation }: Props) {
  const { myContents, fetchMyContents } = useUserStore();
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => { fetchMyContents(); }, []);

  const handleDelete = (id: string, title: string) => {
    Alert.alert('确认删除', `确定删除"${title}"？`, [
      { text: '取消', style: 'cancel' },
      { text: '删除', style: 'destructive', onPress: async () => {
        setDeleting(id);
        // Soft delete via DELETE (backend marks status=0)
        // No dedicated delete endpoint → use PUT to set description as "deleted"
        await ContentApi.update(id, { title: `[已删除] ${title}` } as any);
        setDeleting(null);
        fetchMyContents();
      }},
    ]);
  };

  if (myContents.length === 0) {
    return <EmptyState icon="create-outline" title="还没有发布内容" description="分享你的旅行见闻" actionText="发布内容" onAction={() => navigation.navigate('Publish')} />;
  }

  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.list}>
      <View style={styles.headerRow}>
        <Text style={styles.count}>共 {myContents.length} 篇</Text>
        <Pressable onPress={() => navigation.navigate('Publish')} style={styles.publishBtn}>
          <Ionicons name="add-circle-outline" size={16} color={Colors.textSecondary} />
          <Text style={styles.publishText}>新建</Text>
        </Pressable>
      </View>
      {myContents.map((content, i) => (
        <React.Fragment key={content.id}>
          <Pressable style={styles.item} onPress={() => navigation.navigate('HomeTab', { screen: 'ContentDetail', params: { contentId: content.id } })}>
            <View style={styles.itemInfo}>
              <Text style={styles.itemTitle} numberOfLines={1}>{content.title}</Text>
              <View style={styles.itemMeta}>
                <Text style={styles.metaText}>★ {(content as any).rating || '—'}</Text>
                <Text style={styles.metaText}>· {(content as any).viewCount || 0} 阅读</Text>
                <Text style={styles.metaText}>· {(content as any).commentCount || 0} 评论</Text>
              </View>
            </View>
            <View style={styles.actions}>
              <Pressable hitSlop={8} onPress={() => navigation.navigate('Publish', { editId: content.id })} style={styles.actionBtn}>
                <Ionicons name="create-outline" size={16} color={Colors.textTertiary} />
              </Pressable>
              <Pressable hitSlop={8} onPress={() => handleDelete(content.id, content.title)} style={styles.actionBtn}>
                <Ionicons name="trash-outline" size={16} color={Colors.textTertiary} />
              </Pressable>
            </View>
          </Pressable>
          {i < myContents.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.bg },
  list: { paddingBottom: 40 },
  headerRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: Spacing.containerX, paddingVertical: Spacing.md,
    borderBottomWidth: Borders.thin, borderBottomColor: Colors.border,
  },
  count: { fontFamily: 'NotoSansSC-Regular', fontSize: 13, color: Colors.textTertiary },
  publishBtn: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  publishText: { fontFamily: 'NotoSansSC-Medium', fontSize: 13, color: Colors.text },
  item: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: Spacing.containerX, paddingVertical: Spacing.lg, gap: Spacing.md },
  itemInfo: { flex: 1 },
  itemTitle: { fontFamily: 'NotoSerifSC-SemiBold', fontSize: 15, color: Colors.text, marginBottom: 4 },
  itemMeta: { flexDirection: 'row', gap: Spacing.sm },
  metaText: { fontFamily: 'NotoSansSC-Regular', fontSize: 12, color: Colors.textMuted },
  actions: { flexDirection: 'row', gap: Spacing.md },
  actionBtn: { padding: 4 },
});
