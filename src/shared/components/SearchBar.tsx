// 旅记 TravelLog — SearchBar (Editorial)
// Search input with icon, clear button, and loading indicator.
// Editorial style: monochrome border, no rounded corners, no shadows.

import React, { useRef } from 'react';
import {
  View,
  TextInput,
  Pressable,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { SearchBarProps } from '../types';
import {
  Colors,
  Spacing,
  TypeScale,
  Borders,
  Animation,
} from '../styles/editorial';
import { checkEditorialStyle } from '../styles/forbidden';

export function SearchBar({
  value,
  onChangeText,
  onSubmit,
  onClear,
  placeholder = '搜索目的地...',
  loading = false,
  autoFocus = false,
  containerStyle,
}: SearchBarProps) {
  const inputRef = useRef<TextInput>(null);

  // Editorial compliance
  if (__DEV__ && containerStyle) {
    checkEditorialStyle('SearchBar', StyleSheet.flatten(containerStyle));
  }

  return (
    <Pressable
      style={[styles.container, containerStyle]}
      onPress={() => inputRef.current?.focus()}
      accessibilityRole="search"
    >
      {/* Search icon */}
      <Ionicons
        name="search"
        size={16}
        color={Colors.textMuted}
        style={styles.searchIcon}
      />

      {/* Input */}
      <TextInput
        ref={inputRef}
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
        placeholder={placeholder}
        placeholderTextColor={Colors.textDisabled}
        autoFocus={autoFocus}
        returnKeyType="search"
        autoCorrect={false}
        accessibilityLabel={placeholder}
        clearButtonMode="never"
        numberOfLines={1}
        scrollEnabled={false}
      />

      {/* Right section: loading spinner or clear button */}
      <View style={styles.rightSection}>
        {loading ? (
          <ActivityIndicator size="small" color={Colors.textTertiary} />
        ) : value.length > 0 ? (
          <Pressable
            onPress={() => {
              onChangeText('');
              onClear?.();
            }}
            style={styles.clearButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            accessibilityRole="button"
            accessibilityLabel="清除搜索"
          >
            <Ionicons
              name="close-circle"
              size={18}
              color={Colors.textMuted}
            />
          </Pressable>
        ) : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: Borders.thin,
    borderColor: Colors.border,
    borderRadius: Borders.radius,
    backgroundColor: Colors.bgAlt,
    minHeight: 44,
  },
  searchIcon: {
    paddingLeft: Spacing.md,
  },
  input: {
    flex: 1,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.md,
    fontFamily: 'NotoSansSC-Regular',
    fontSize: TypeScale.body.fontSize,
    lineHeight: TypeScale.body.lineHeight,
    color: Colors.text,
    minHeight: 44,
  },
  rightSection: {
    paddingRight: Spacing.sm,
    minWidth: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearButton: {
    padding: 4,
  },
});
