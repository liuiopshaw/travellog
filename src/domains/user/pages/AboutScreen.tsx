// 旅记 TravelLog — AboutScreen (Editorial)

import React from 'react';
import { View, Text, ScrollView, Pressable, Linking, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Divider } from '../../../shared/components';
import { Colors, Spacing, TypeScale, Borders } from '../../../shared/styles/editorial';

export function AboutScreen() {
  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.scroll}>
      <View style={styles.logoSection}>
        <Text style={styles.brand}>旅记</Text>
        <Text style={styles.version}>v1.0.0 (MVP)</Text>
        <Text style={styles.tagline}>发现下一段旅程</Text>
      </View>

      <Divider thickness="thick" />

      <View style={styles.menu}>
        <LinkRow label="用户协议" />
        <Divider />
        <LinkRow label="隐私政策" />
        <Divider />
        <LinkRow label="开源许可" />
        <Divider />
        <LinkRow label="给我们评分" />
      </View>

      <Divider thickness="thick" />

      <View style={styles.footer}>
        <Text style={styles.footerText}>旅记 TravelLog</Text>
        <Text style={styles.footerSub}>© 2026 TravelLog Team</Text>
        <Text style={styles.footerSub}>Built with React Native + NestJS + SQLite</Text>
      </View>
    </ScrollView>
  );
}

function LinkRow({ label }: { label: string }) {
  return (
    <Pressable style={styles.linkRow}>
      <Text style={styles.linkLabel}>{label}</Text>
      <Ionicons name="chevron-forward" size={14} color={Colors.textMuted} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.bg },
  scroll: { paddingBottom: 60 },
  logoSection: {
    alignItems: 'center', paddingVertical: Spacing.xxxl,
  },
  brand: { fontFamily: 'NotoSerifSC-Bold', fontSize: TypeScale.hero.fontSize, color: Colors.text, marginBottom: Spacing.sm },
  version: { fontFamily: 'NotoSansSC-Medium', fontSize: 14, color: Colors.textTertiary, marginBottom: Spacing.xs },
  tagline: { fontFamily: 'NotoSansSC-Regular', fontSize: 13, color: Colors.textMuted },
  menu: { paddingHorizontal: Spacing.containerX },
  linkRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingVertical: Spacing.lg,
  },
  linkLabel: { fontFamily: 'NotoSansSC-Regular', fontSize: TypeScale.body.fontSize, color: Colors.text },
  footer: { alignItems: 'center', paddingVertical: Spacing.xxl, gap: 4 },
  footerText: { fontFamily: 'NotoSerifSC-SemiBold', fontSize: 14, color: Colors.text },
  footerSub: { fontFamily: 'NotoSansSC-Regular', fontSize: 11, color: Colors.textMuted },
});
