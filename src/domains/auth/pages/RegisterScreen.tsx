// 旅记 TravelLog — RegisterScreen (Editorial + Zustand)

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { AppButton, AppInput } from '../../../shared/components';
import { Colors, Spacing, TypeScale } from '../../../shared/styles/editorial';
import { useAuthStore } from '../store/authStore';
import { AuthApi } from '../services/authApi';

interface Props { navigation: any }

export function RegisterScreen({ navigation }: Props) {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [sendingCode, setSendingCode] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [error, setError] = useState('');
  const { register, loading, isLoggedIn } = useAuthStore();

  useEffect(() => {
    if (isLoggedIn) {
      const root = navigation.getParent();
      if (root) root.reset({ index: 0, routes: [{ name: 'Main' }] });
    }
  }, [isLoggedIn, navigation]);

  const handleSendCode = async () => {
    if (!phone.trim() || phone.length < 11) { setError('请输入有效手机号'); return; }
    setError('');
    setSendingCode(true);
    try {
      await AuthApi.sendCode({ phone, type: 'register' });
      setCountdown(60);
      const timer = setInterval(() => setCountdown(prev => { if (prev <= 1) { clearInterval(timer); return 0; } return prev - 1; }), 1000);
    } catch { setError('发送失败'); }
    setSendingCode(false);
  };

  const handleRegister = () => {
    if (!username.trim()) { setError('请输入用户名'); return; }
    if (!phone.trim()) { setError('请输入手机号'); return; }
    if (!code.trim()) { setError('请输入验证码'); return; }
    if (password.length < 6) { setError('密码至少6位'); return; }
    setError('');
    register(phone, code, password, username);
  };

  return (
    <KeyboardAvoidingView style={styles.root} behavior={Platform.OS === 'ios' ? 'padding' : undefined} keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={styles.hero}>
          <Text style={styles.title}>创建账号</Text>
          <Text style={styles.subtitle}>加入旅记，发现精彩旅程</Text>
        </View>
        <View style={styles.form}>
          <AppInput placeholder="用户名（2-20字）" value={username} onChangeText={(t) => { setUsername(t); setError(''); }} />
          <View style={styles.gap} />
          <View style={styles.phoneRow}>
            <View style={styles.phoneInput}>
              <AppInput placeholder="手机号" value={phone} onChangeText={(t) => { setPhone(t); setError(''); }} keyboardType="phone-pad" />
            </View>
            <AppButton title={countdown > 0 ? `${countdown}s` : sendingCode ? '发送中' : '获取验证码'} variant="secondary" size="sm" disabled={countdown > 0 || sendingCode} onPress={handleSendCode} />
          </View>
          <View style={styles.gap} />
          <AppInput placeholder="验证码" value={code} onChangeText={(t) => { setCode(t); setError(''); }} keyboardType="number-pad" />
          <View style={styles.gap} />
          <AppInput placeholder="密码（至少6位）" value={password} onChangeText={(t) => { setPassword(t); setError(''); }} secureTextEntry error={error || undefined} />
          <View style={styles.gapLg} />
          <AppButton title="注册" variant="primary" loading={loading} onPress={handleRegister} />
        </View>
        <View style={styles.loginLink}>
          <AppButton title="已有账号？登录" variant="text" onPress={() => navigation.goBack()} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.bg },
  scroll: { flexGrow: 1, justifyContent: 'center', paddingHorizontal: Spacing.containerX, paddingVertical: Spacing.sectionY },
  hero: { alignItems: 'center', marginBottom: Spacing.xxl },
  title: { fontFamily: 'NotoSerifSC-Bold', fontSize: TypeScale.h1.fontSize, lineHeight: TypeScale.h1.lineHeight, color: Colors.text },
  subtitle: { fontFamily: 'NotoSansSC-Regular', fontSize: TypeScale.body.fontSize, color: Colors.textTertiary, marginTop: Spacing.sm },
  form: { width: '100%' },
  gap: { height: Spacing.md },
  gapLg: { height: Spacing.xl },
  phoneRow: { flexDirection: 'row', gap: Spacing.sm },
  phoneInput: { flex: 1 },
  loginLink: { alignItems: 'center', marginTop: Spacing.xl },
});
