// 旅记 TravelLog — EditProfileScreen (Editorial + Zustand)

import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppButton, AppInput, Divider } from '../../../shared/components';
import { useUserStore } from '../store/userStore';
import { useAuthStore } from '../../auth/store/authStore';
import { Colors, Spacing, TypeScale, Borders } from '../../../shared/styles/editorial';

const GENDER_OPTIONS = ['UNKNOWN', 'MALE', 'FEMALE'] as const;

interface Props { navigation: any }

export function EditProfileScreen({ navigation }: Props) {
  const { profile, updateProfile } = useUserStore();
  const { user } = useAuthStore();

  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [gender, setGender] = useState('UNKNOWN');
  const [location, setLocation] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (profile) {
      setUsername(profile.username || '');
      setBio(profile.bio || '');
      setGender('UNKNOWN');
      setLocation(profile.location || '');
    }
  }, [profile]);

  const handleSave = async () => {
    setSaving(true);
    await updateProfile({ username, bio, gender, location });
    setSaving(false);
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
      {/* Avatar */}
      <View style={styles.avatarSection}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={40} color={Colors.textMuted} />
        </View>
        <Pressable style={styles.avatarBtn}>
          <Text style={styles.avatarBtnText}>更换头像</Text>
        </Pressable>
      </View>

      <Divider />

      {/* Form */}
      <View style={styles.form}>
        <AppInput label="用户名" placeholder="2-20字" value={username} onChangeText={setUsername} />
        <View style={styles.gap} />
        <AppInput label="个人简介" placeholder="介绍一下自己" value={bio} onChangeText={setBio} multiline numberOfLines={3} />
        <View style={styles.gap} />

        <Text style={styles.fieldLabel}>性别</Text>
        <View style={styles.genderRow}>
          {['未知', '男', '女'].map((label, i) => (
            <Pressable
              key={i}
              style={[styles.genderBtn, gender === GENDER_OPTIONS[i] && styles.genderBtnActive]}
              onPress={() => setGender(GENDER_OPTIONS[i])}
            >
              <Text style={[styles.genderText, gender === GENDER_OPTIONS[i] && styles.genderTextActive]}>{label}</Text>
            </Pressable>
          ))}
        </View>

        <AppInput label="所在地" placeholder="选择所在城市" value={location} onChangeText={setLocation} />

        <View style={styles.gapLg} />
        <AppInput label="手机号" value={user?.phone || '绑定手机号'} editable={false} />
        <View style={styles.gapLg} />

        <AppButton title="保存" variant="primary" loading={saving} onPress={handleSave} />
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.bg },
  scroll: { paddingBottom: 40 },
  avatarSection: {
    alignItems: 'center', paddingVertical: Spacing.xxl,
  },
  avatar: {
    width: 80, height: 80, backgroundColor: Colors.textDisabled,
    alignItems: 'center', justifyContent: 'center', marginBottom: Spacing.md,
  },
  avatarBtn: {
    paddingHorizontal: Spacing.lg, paddingVertical: Spacing.xs,
    borderWidth: Borders.thin, borderColor: Colors.border,
  },
  avatarBtnText: { fontFamily: 'NotoSansSC-Regular', fontSize: 12, color: Colors.textTertiary },
  form: { paddingHorizontal: Spacing.containerX },
  gap: { height: Spacing.md },
  gapLg: { height: Spacing.xl },
  fieldLabel: { fontFamily: 'NotoSansSC-Medium', fontSize: TypeScale.bodySmall.fontSize, color: Colors.textSecondary, marginBottom: Spacing.sm },
  genderRow: { flexDirection: 'row', gap: Spacing.sm, marginBottom: Spacing.lg },
  genderBtn: {
    flex: 1, paddingVertical: Spacing.sm,
    borderWidth: Borders.thin, borderColor: Colors.border,
    alignItems: 'center',
  },
  genderBtnActive: { borderColor: Colors.borderHover, backgroundColor: Colors.black },
  genderText: { fontFamily: 'NotoSansSC-Regular', fontSize: 13, color: Colors.textSecondary },
  genderTextActive: { fontFamily: 'NotoSansSC-Medium', color: Colors.white },
});
