// 旅记 TravelLog — ProfileScreen (Editorial + Zustand)

import React, { useEffect } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Divider, Badge, SkeletonBlock } from '../../../shared/components';
import { useUserStore } from '../store/userStore';
import { useAuthStore } from '../../auth/store/authStore';
import { Colors, Spacing, TypeScale, Borders } from '../../../shared/styles/editorial';

const MENU_ITEMS = [
  { icon: 'heart-outline', label: '我的收藏', screen: 'MyFavorites' as string, badge: null as number | null },
  { icon: 'create-outline', label: '我的发布', screen: 'MyContents' as string, badge: null as number | null },
  { icon: 'time-outline', label: '浏览历史', screen: 'BrowseHistory' as string, badge: 0 },
  { icon: 'settings-outline', label: '设置', screen: 'Settings' as string, badge: 0 },
  { icon: 'information-circle-outline', label: '关于', screen: 'About' as string, badge: 0 },
];

interface Props { navigation: any }

export function ProfileScreen({ navigation }: Props) {
  const { profile, loading, fetchProfile } = useUserStore();
  const { logout } = useAuthStore();

  useEffect(() => { fetchProfile(); }, []);

  const handleLogout = async () => {
    await logout();
    // Navigate via root navigator (ProfileStack → MainTab → RootStack)
    const root = navigation.getParent()?.getParent();
    if (root) root.reset({ index: 0, routes: [{ name: 'Auth' }] });
  };

  if (loading || !profile) {
    return (
      <View style={styles.loadingWrap}>
        <View style={{ alignItems: 'center', paddingTop: 80 }}>
          <SkeletonBlock width={80} height={80} />
          <View style={{ height: 16 }} />
          <SkeletonBlock width={120} height={24} />
        </View>
      </View>
    );
  }

  const menu = MENU_ITEMS.map((item, i) => {
    let badge = item.badge;
    if (i === 0 && profile.stats) badge = profile.stats.favCount;
    if (i === 1 && profile.stats) badge = profile.stats.contentCount;
    return { ...item, badge };
  });

  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.scroll}>
      <View style={styles.header}>
        <View style={styles.avatarWrap}>
          <View style={styles.avatar}><Ionicons name="person" size={36} color={Colors.textMuted} /></View>
        </View>
        <Text style={styles.username}>{profile.username}</Text>
        <Text style={styles.bio}>{profile.bio || '这个人很懒，什么都没写'}</Text>
        <View style={styles.stats}>
          <View style={styles.statItem}><Text style={styles.statNumber}>{profile.stats?.contentCount || 0}</Text><Text style={styles.statLabel}>发布</Text></View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}><Text style={styles.statNumber}>{profile.stats?.favCount || 0}</Text><Text style={styles.statLabel}>收藏</Text></View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}><Text style={styles.statNumber}>{profile.stats?.commentCount || 0}</Text><Text style={styles.statLabel}>评论</Text></View>
        </View>
        <Pressable style={styles.editBtn} onPress={() => navigation.navigate('EditProfile')}><Text style={styles.editBtnText}>编辑资料</Text></Pressable>
      </View>
      <Divider thickness="thick" />
      <View style={styles.menuSection}>
        {menu.map((item, i) => (
          <React.Fragment key={item.label}>
            <Pressable style={styles.menuItem} onPress={() => (item as any).screen && navigation.navigate((item as any).screen)}>
              <Ionicons name={item.icon as any} size={20} color={Colors.text} />
              <Text style={styles.menuLabel}>{item.label}</Text>
              <View style={styles.menuRight}>
                {item.badge !== null && item.badge > 0 && <Badge count={item.badge} />}
                <Ionicons name="chevron-forward" size={16} color={Colors.textMuted} />
              </View>
            </Pressable>
            {i < menu.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </View>
      <Divider thickness="thick" />
      <View style={styles.logoutSection}>
        <Pressable style={styles.logoutBtn} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color={Colors.textTertiary} />
          <Text style={styles.logoutText}>退出登录</Text>
        </Pressable>
      </View>
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.bg },
  scroll: { paddingBottom: 60 },
  loadingWrap: { flex: 1, backgroundColor: Colors.bg },
  header: { alignItems: 'center', paddingVertical: Spacing.sectionY, paddingHorizontal: Spacing.containerX },
  avatarWrap: { marginBottom: Spacing.lg },
  avatar: { width: 80, height: 80, backgroundColor: Colors.textDisabled, alignItems: 'center', justifyContent: 'center' },
  username: { fontFamily: 'NotoSerifSC-Bold', fontSize: TypeScale.h2.fontSize, color: Colors.text, marginBottom: Spacing.xs },
  bio: { fontFamily: 'NotoSansSC-Regular', fontSize: TypeScale.bodySmall.fontSize, color: Colors.textTertiary, marginBottom: Spacing.xl },
  stats: { flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.xl },
  statItem: { alignItems: 'center', paddingHorizontal: Spacing.xl },
  statNumber: { fontFamily: 'NotoSerifSC-Bold', fontSize: 22, color: Colors.text },
  statLabel: { fontFamily: 'NotoSansSC-Regular', fontSize: 11, color: Colors.textMuted, marginTop: 2 },
  statDivider: { width: 1, height: 28, backgroundColor: Colors.border },
  editBtn: { paddingHorizontal: Spacing.xl, paddingVertical: Spacing.sm, borderWidth: Borders.thin, borderColor: Colors.border },
  editBtnText: { fontFamily: 'NotoSansSC-Medium', fontSize: 13, color: Colors.text },
  menuSection: { paddingHorizontal: Spacing.containerX },
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: Spacing.lg, gap: Spacing.md },
  menuLabel: { flex: 1, fontFamily: 'NotoSansSC-Regular', fontSize: TypeScale.body.fontSize, color: Colors.text },
  menuRight: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  logoutSection: { paddingHorizontal: Spacing.containerX, paddingVertical: Spacing.xl },
  logoutBtn: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, paddingVertical: Spacing.md },
  logoutText: { fontFamily: 'NotoSansSC-Regular', fontSize: TypeScale.body.fontSize, color: Colors.textTertiary },
});
