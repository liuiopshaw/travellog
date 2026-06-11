// 旅记 TravelLog — App Entry (BUILD 2026-06-11-P0)

import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useEditorialFonts } from './src/shared/styles/fonts';
import { AppNavigator } from './src/navigation/AppNavigator';
import { useAuthStore } from './src/domains/auth/store/authStore';
import { Colors, TypeScale } from './src/shared/styles/editorial';
import { LoadingSpinner } from './src/shared/components';

export default function App() {
  const { loaded, error } = useEditorialFonts();
  const [showApp, setShowApp] = useState(false);
  const restoreSession = useAuthStore(s => s.restoreSession);

  // Restore existing auth session on startup
  useEffect(() => { restoreSession(); }, []);

  // Show loading screen briefly
  useEffect(() => {
    const timer = setTimeout(() => setShowApp(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (loaded) setShowApp(true);
  }, [loaded]);

  if (!showApp) {
    return (
      <View style={styles.loadingContainer}>
        <LoadingSpinner size="lg" />
        <Text style={styles.loadingText}>旅记 TravelLog</Text>
        <Text style={styles.buildId}>BUILD P0</Text>
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="dark" />
        <AppNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1, backgroundColor: Colors.bg,
    alignItems: 'center', justifyContent: 'center', gap: 12,
  },
  loadingText: { fontSize: 18, fontWeight: '600', color: Colors.text },
  buildId: { fontSize: 11, color: Colors.textMuted, marginTop: 24 },
});
