// 旅记 TravelLog — BrowseHistoryScreen

import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { AppImage, Divider, EmptyState, AppButton } from '../../../shared/components';
import { BrowseHistory } from '../store/browseHistory';
import { Colors, Spacing, TypeScale, Borders, Animation } from '../../../shared/styles/editorial';

interface BrowseEntry { id: string; title: string; coverImage: string; region: string; rating: number; viewedAt: string; }

interface Props { navigation: any }

export function BrowseHistoryScreen({ navigation }: Props) {
  const [items, setItems] = useState<BrowseEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    BrowseHistory.getAll().then(d => { setItems(d); setLoading(false); });
  }, []);

  const handleClear = async () => {
    await BrowseHistory.clear();
    setItems([]);
  };

  if (items.length === 0) {
    return (
      <SafeAreaView style={styles.root} edges={['top']}>
        <EmptyState icon="time-outline" title="暂无浏览记录" description="浏览的内容会自动记录在这里" actionText="去发现" onAction={() => navigation.navigate('HomeTab')} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>浏览历史</Text>
        <Pressable onPress={handleClear}><Text style={styles.clearBtn}>清空</Text></Pressable>
      </View>
      <Divider />
      <ScrollView contentContainerStyle={styles.list}>
        {items.map((item, i) => (
          <Pressable
            key={`${item.id}-${i}`}
            style={styles.item}
            onPress={() => navigation.navigate('HomeTab', { screen: 'ContentDetail', params: { contentId: item.id } })}
          >
            <AppImage uri={item.coverImage} width={80} height={60} />
            <View style={styles.itemInfo}>
              <Text style={styles.itemTitle} numberOfLines={2}>{item.title}</Text>
              <View style={styles.itemMeta}>
                <Ionicons name="star" size={11} color={Colors.text} />
                <Text style={styles.metaText}>{item.rating}</Text>
                <Text style={styles.metaText}> · {item.region}</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={14} color={Colors.textMuted} />
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.bg },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: Spacing.containerX, paddingVertical: Spacing.lg,
  },
  headerTitle: { fontFamily: 'NotoSerifSC-Bold', fontSize: TypeScale.h1.fontSize, color: Colors.text, borderBottomWidth: Borders.thick, borderBottomColor: Colors.borderHover, paddingBottom: Spacing.sm },
  clearBtn: { fontFamily: 'NotoSansSC-Regular', fontSize: 13, color: Colors.textTertiary },
  list: { paddingHorizontal: Spacing.containerX, paddingBottom: 40 },
  item: { flexDirection: 'row', alignItems: 'center', paddingVertical: Spacing.md, gap: Spacing.md, borderBottomWidth: Borders.thin, borderBottomColor: Colors.border },
  itemInfo: { flex: 1 },
  itemTitle: { fontFamily: 'NotoSerifSC-SemiBold', fontSize: 14, color: Colors.text, marginBottom: 4, lineHeight: 20 },
  itemMeta: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  metaText: { fontFamily: 'NotoSansSC-Regular', fontSize: 11, color: Colors.textMuted },
});
