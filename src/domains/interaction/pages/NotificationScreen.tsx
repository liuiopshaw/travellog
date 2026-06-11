// 旅记 TravelLog — NotificationScreen (Editorial + Zustand)

import React, { useEffect } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Divider, Badge, SkeletonBlock } from '../../../shared/components';
import { useInteractionStore } from '../store/interactionStore';
import { NotificationApi } from '../services/notificationApi';
import type { MockNotification } from '../../../shared/utils/mockData';
import { Colors, Spacing, TypeScale, Borders } from '../../../shared/styles/editorial';

export function NotificationScreen() {
  const { comments, commentLoading } = useInteractionStore();
  const [notifications, setNotifications] = React.useState<MockNotification[]>([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    NotificationApi.getNotifications().then(res => {
      setNotifications(res.list);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const handleReadAll = async () => {
    await NotificationApi.readAll();
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
    <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
      <View style={styles.header}>
        <Text style={styles.title}>消息</Text>
        {unreadCount > 0 && (
          <View style={styles.badgeRow}>
            <Badge count={unreadCount} />
            <Pressable onPress={handleReadAll}><Text style={styles.readAll}>全部已读</Text></Pressable>
          </View>
        )}
      </View>
      <Divider thickness="thick" />
      {loading ? (
        <View style={styles.loadingWrap}>
          {Array.from({ length: 3 }).map((_, i) => (<View key={i} style={{ padding: Spacing.containerX }}><SkeletonBlock width="100%" height={60} /><View style={{ height: 8 }} /></View>))}
        </View>
      ) : (
        notifications.map(notif => (
          <Pressable key={notif.id} style={[styles.item, !notif.isRead && styles.itemUnread]}>
            <View style={styles.iconWrap}>
              <Ionicons name={notif.type === 'comment' ? 'chatbubble-outline' : notif.type === 'like' ? 'heart-outline' : 'notifications-outline'} size={18} color={!notif.isRead ? Colors.text : Colors.textMuted} />
            </View>
            <View style={styles.itemBody}>
              <Text style={[styles.itemTitle, !notif.isRead && styles.itemTitleBold]}>{notif.title}</Text>
              <Text style={styles.itemContent} numberOfLines={2}>{notif.content}</Text>
              <Text style={styles.itemTime}>{notif.createdAt}</Text>
            </View>
            {!notif.isRead && <View style={styles.unreadDot} />}
          </Pressable>
        ))
      )}
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.bg },
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: 40 },
  loadingWrap: { paddingTop: Spacing.xl },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: Spacing.containerX, paddingTop: Spacing.md, paddingBottom: Spacing.lg },
  title: { fontFamily: 'NotoSerifSC-Bold', fontSize: TypeScale.h1.fontSize, color: Colors.text, borderBottomWidth: Borders.thick, borderBottomColor: Colors.borderHover, paddingBottom: Spacing.sm },
  badgeRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  readAll: { fontFamily: 'NotoSansSC-Regular', fontSize: 12, color: Colors.textTertiary },
  item: { flexDirection: 'row', alignItems: 'flex-start', paddingHorizontal: Spacing.containerX, paddingVertical: Spacing.lg, borderBottomWidth: Borders.thin, borderBottomColor: Colors.border, gap: Spacing.md },
  itemUnread: { backgroundColor: 'rgba(28,28,28,0.02)' },
  iconWrap: { width: 32, alignItems: 'center', paddingTop: 2 },
  itemBody: { flex: 1 },
  itemTitle: { fontFamily: 'NotoSansSC-Regular', fontSize: 14, color: Colors.textSecondary, marginBottom: 2 },
  itemTitleBold: { fontFamily: 'NotoSansSC-Medium', color: Colors.text },
  itemContent: { fontFamily: 'NotoSansSC-Regular', fontSize: 13, color: Colors.textTertiary, lineHeight: 18, marginBottom: 4 },
  itemTime: { fontFamily: 'NotoSansSC-Regular', fontSize: 11, color: Colors.textMuted },
  unreadDot: { width: 6, height: 6, backgroundColor: Colors.text, marginTop: 6 },
});
