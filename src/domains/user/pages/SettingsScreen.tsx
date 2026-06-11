// 旅记 TravelLog — SettingsScreen (Editorial)

import React, { useState } from 'react';
import { View, Text, ScrollView, Switch, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Divider } from '../../../shared/components';
import { Colors, Spacing, TypeScale, Borders } from '../../../shared/styles/editorial';

export function SettingsScreen() {
  const [notifEnabled, setNotifEnabled] = useState(true);
  const [cacheSize, setCacheSize] = useState('12.4 MB');

  const handleClearCache = () => setCacheSize('0 B');

  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.scroll}>
      {/* Notifications */}
      <Section title="通知">
        <Row label="推送通知" right={<Switch value={notifEnabled} onValueChange={setNotifEnabled} trackColor={{ true: Colors.black }} />} />
        <Divider />
        <Row label="评论提醒" />
        <Divider />
        <Row label="点赞提醒" />
      </Section>

      <Section title="隐私">
        <Row label="公开收藏" right={<Ionicons name="chevron-forward" size={14} color={Colors.textMuted} />} />
        <Divider />
        <Row label="隐私设置" right={<Ionicons name="chevron-forward" size={14} color={Colors.textMuted} />} />
      </Section>

      <Section title="存储">
        <Row label="图片清晰度" right={<Text style={styles.valueText}>高清</Text>} />
        <Divider />
        <Row label="缓存大小" right={<Text style={styles.valueText}>{cacheSize}</Text>} />
        <Divider />
        <Pressable onPress={handleClearCache} style={styles.actionRow}>
          <Text style={styles.actionLabel}>清除缓存</Text>
        </Pressable>
      </Section>

      <Section title="其他">
        <Row label="深色模式" />
        <Divider />
        <Row label="字体大小" right={<Text style={styles.valueText}>默认</Text>} />
        <Divider />
        <Row label="检查更新" right={<Text style={styles.valueText}>v1.0.0</Text>} />
      </Section>
    </ScrollView>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionBody}>{children}</View>
    </View>
  );
}

function Row({ label, right }: { label: string; right?: React.ReactNode }) {
  return (
    <Pressable style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <View style={styles.rowRight}>{right}</View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.bg },
  scroll: { paddingBottom: 60 },
  section: {
    paddingHorizontal: Spacing.containerX, paddingTop: Spacing.xl,
  },
  sectionTitle: {
    fontFamily: 'NotoSerifSC-SemiBold', fontSize: TypeScale.h3.fontSize, color: Colors.text,
    borderBottomWidth: Borders.thick, borderBottomColor: Colors.borderHover, paddingBottom: Spacing.sm,
    marginBottom: Spacing.md,
  },
  sectionBody: {
    borderWidth: Borders.thin, borderColor: Colors.border,
  },
  row: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: Spacing.md, paddingVertical: Spacing.lg, minHeight: 44,
  },
  rowLabel: { fontFamily: 'NotoSansSC-Regular', fontSize: TypeScale.body.fontSize, color: Colors.text },
  rowRight: { flexDirection: 'row', alignItems: 'center', gap: Spacing.xs },
  valueText: { fontFamily: 'NotoSansSC-Regular', fontSize: 13, color: Colors.textMuted },
  actionRow: { paddingHorizontal: Spacing.md, paddingVertical: Spacing.lg, alignItems: 'center' },
  actionLabel: { fontFamily: 'NotoSansSC-Medium', fontSize: TypeScale.body.fontSize, color: Colors.text },
});
