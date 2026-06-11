// 旅记 TravelLog — LoginScreen (Editorial + Zustand)

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { AppButton, AppInput } from '../../../shared/components';
import { Colors, Spacing, TypeScale } from '../../../shared/styles/editorial';
import { useAuthStore } from '../store/authStore';

interface Props { navigation: any }

export function LoginScreen({ navigation }: Props) {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading, error, isLoggedIn, clearError } = useAuthStore();

  // Navigate on successful login via root navigator
  useEffect(() => {
    if (isLoggedIn) {
      const root = navigation.getParent();
      if (root) root.reset({ index: 0, routes: [{ name: 'Main' }] });
    }
  }, [isLoggedIn, navigation]);

  const handleLogin = () => {
    if (!account.trim()) { clearError(); return; }
    if (password.length < 6) { clearError(); return; }
    login(account, password);
  };

  return (
    <KeyboardAvoidingView style={styles.root} behavior={Platform.OS === 'ios' ? 'padding' : undefined} keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={styles.hero}>
          <Text style={styles.brand}>旅记</Text>
          <Text style={styles.tagline}>发现下一段旅程</Text>
        </View>
        <View style={styles.form}>
          <AppInput placeholder="手机号或邮箱" value={account} onChangeText={(t) => { setAccount(t); clearError(); }} keyboardType="email-address" autoCapitalize="none" />
          <View style={styles.gap} />
          <AppInput placeholder="密码" value={password} onChangeText={(t) => { setPassword(t); clearError(); }} secureTextEntry error={error || undefined} />
          <View style={styles.gapLg} />
          <AppButton title="登录" variant="primary" loading={loading} onPress={handleLogin} />
        </View>
        <View style={styles.links}>
          <AppButton title="注册账号" variant="text" onPress={() => navigation.navigate('Register')} />
          <AppButton title="忘记密码？" variant="text" onPress={() => {}} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.bg },
  scroll: { flexGrow: 1, justifyContent: 'center', paddingHorizontal: Spacing.containerX, paddingVertical: Spacing.sectionY },
  hero: { alignItems: 'center', marginBottom: Spacing.xxxl },
  brand: { fontFamily: 'NotoSerifSC-Bold', fontSize: TypeScale.hero.fontSize, lineHeight: TypeScale.hero.lineHeight, color: Colors.text, letterSpacing: TypeScale.hero.letterSpacing },
  tagline: { fontFamily: 'NotoSansSC-Regular', fontSize: TypeScale.body.fontSize, color: Colors.textTertiary, marginTop: Spacing.sm },
  form: { width: '100%' },
  gap: { height: Spacing.md },
  gapLg: { height: Spacing.xl },
  links: { flexDirection: 'row', justifyContent: 'space-between', marginTop: Spacing.xl, paddingHorizontal: Spacing.md },
});
