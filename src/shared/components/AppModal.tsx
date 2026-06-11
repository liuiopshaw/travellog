// 旅记 TravelLog — AppModal (Editorial)
// Center modal with overlay. Hard edges, no rounded corners.

import React from 'react';
import {
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import type { AppModalProps } from '../types';
import {
  Colors,
  Spacing,
  TypeScale,
  Animation,
  Borders,
} from '../styles/editorial';

export function AppModal({
  visible,
  title,
  children,
  onClose,
  onConfirm,
  confirmText = '确定',
  cancelText = '取消',
  confirmLoading = false,
}: AppModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.sheet} onPress={() => {}}>
          {/* Title */}
          {title && <Text style={styles.title}>{title}</Text>}

          {/* Content */}
          <View style={styles.body}>{children}</View>

          {/* Actions */}
          <View style={styles.actions}>
            <Pressable
              style={({ pressed }) => [
                styles.button,
                styles.cancelButton,
                pressed && styles.pressed,
              ]}
              onPress={onClose}
              accessibilityRole="button"
              accessibilityLabel={cancelText}
            >
              <Text style={styles.cancelText}>{cancelText}</Text>
            </Pressable>

            {onConfirm && (
              <Pressable
                style={({ pressed }) => [
                  styles.button,
                  styles.confirmButton,
                  pressed && styles.pressed,
                ]}
                onPress={onConfirm}
                disabled={confirmLoading}
                accessibilityRole="button"
                accessibilityLabel={confirmText}
              >
                {confirmLoading ? (
                  <ActivityIndicator size="small" color={Colors.white} />
                ) : (
                  <Text style={styles.confirmText}>{confirmText}</Text>
                )}
              </Pressable>
            )}
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: Colors.overlay, // 40% black
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
  },
  sheet: {
    backgroundColor: Colors.bg,
    borderWidth: Borders.thin,
    borderColor: Colors.border,
    borderRadius: Borders.radius,
    width: '100%',
    maxWidth: 360,
  },
  title: {
    fontFamily: 'NotoSerifSC-SemiBold',
    fontSize: TypeScale.h3.fontSize,
    lineHeight: TypeScale.h3.lineHeight,
    color: Colors.text,
    padding: Spacing.cardPadding,
    paddingBottom: 0,
  },
  body: {
    padding: Spacing.cardPadding,
  },
  actions: {
    flexDirection: 'row',
    borderTopWidth: Borders.thin,
    borderTopColor: Colors.border,
  },
  button: {
    flex: 1,
    paddingVertical: Spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
  },
  cancelButton: {
    borderRightWidth: Borders.thin,
    borderRightColor: Colors.border,
    backgroundColor: 'transparent',
  },
  confirmButton: {
    backgroundColor: Colors.black,
  },
  cancelText: {
    fontFamily: 'NotoSansSC-Regular',
    fontSize: TypeScale.body.fontSize,
    lineHeight: TypeScale.body.lineHeight,
    color: Colors.text,
  },
  confirmText: {
    fontFamily: 'NotoSansSC-Medium',
    fontSize: TypeScale.body.fontSize,
    lineHeight: TypeScale.body.lineHeight,
    color: Colors.white,
  },
  pressed: {
    transform: [{ scale: Animation.scale.press }],
  },
});
