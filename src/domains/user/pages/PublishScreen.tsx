// 旅记 TravelLog — PublishScreen (Editorial)

import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { AppButton, AppInput, Divider } from '../../../shared/components';
import { ContentApi } from '../../content/services/contentApi';
import { mockCategories } from '../../../shared/utils/mockData';
import { Colors, Spacing, TypeScale, Borders } from '../../../shared/styles/editorial';

interface Props { navigation: any; route?: { params?: { editId?: string } } }

export function PublishScreen({ navigation, route }: Props) {
  const editId = route?.params?.editId;
  const isEdit = !!editId;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [region, setRegion] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [tags, setTags] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim()) { Alert.alert('请输入标题'); return; }
    setSaving(true);
    try {
      const data: any = {
        title: title.trim(),
        description: description.trim(),
        content: content.trim(),
        categoryId: categoryId || null,
        region: region.trim() || null,
        location: location.trim() || null,
        price: price ? parseFloat(price) : 0,
        tags: tags ? tags.split(',').map(t => t.trim()).filter(Boolean) : [],
      };
      if (isEdit && editId) {
        await ContentApi.update(editId, data);
      } else {
        await ContentApi.create(data);
      }
      navigation.goBack();
    } catch { Alert.alert('发布失败，请重试'); }
    setSaving(false);
  };

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{isEdit ? '编辑内容' : '发布内容'}</Text>
          <Pressable onPress={() => navigation.goBack()}><Ionicons name="close" size={22} color={Colors.text} /></Pressable>
        </View>
        <Divider />

        <View style={styles.form}>
          <AppInput label="标题 *" placeholder="输入目的地名称" value={title} onChangeText={setTitle} />
          <View style={styles.gap} />
          <AppInput label="简介" placeholder="一句话描述这个地方" value={description} onChangeText={setDescription} multiline numberOfLines={3} />
          <View style={styles.gap} />
          <AppInput label="正文" placeholder="详细的旅行攻略..." value={content} onChangeText={setContent} multiline numberOfLines={8} />
          <View style={styles.gap} />

          <Text style={styles.sectionLabel}>分类</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipRow}>
            {mockCategories.map(cat => (
              <Pressable key={cat.id} style={[styles.chip, categoryId === cat.id && styles.chipActive]} onPress={() => setCategoryId(categoryId === cat.id ? '' : cat.id)}>
                <Ionicons name={cat.icon as any} size={14} color={categoryId === cat.id ? Colors.white : Colors.textSecondary} />
                <Text style={[styles.chipText, categoryId === cat.id && styles.chipTextActive]}>{cat.name}</Text>
              </Pressable>
            ))}
          </ScrollView>
          <View style={styles.gap} />

          <AppInput label="地区" placeholder="如：四川省" value={region} onChangeText={setRegion} />
          <View style={styles.gap} />
          <AppInput label="详细地址" placeholder="如：阿坝州九寨沟县" value={location} onChangeText={setLocation} />
          <View style={styles.gap} />
          <AppInput label="门票/人均（元）" placeholder="0 表示免费" value={price} onChangeText={setPrice} keyboardType="numeric" />
          <View style={styles.gap} />
          <AppInput label="标签" placeholder="用逗号分隔，如：世界遗产,秋色,湖泊" value={tags} onChangeText={setTags} />

          <View style={styles.gapLg} />
          <AppButton title={isEdit ? '保存修改' : '发布'} variant="primary" loading={saving} onPress={handleSubmit} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.bg },
  scroll: { paddingBottom: 60 },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: Spacing.containerX, paddingVertical: Spacing.lg,
  },
  headerTitle: { fontFamily: 'NotoSerifSC-Bold', fontSize: TypeScale.h1.fontSize, color: Colors.text },
  form: { paddingHorizontal: Spacing.containerX, paddingTop: Spacing.xl },
  gap: { height: Spacing.md },
  gapLg: { height: Spacing.xxl },
  sectionLabel: { fontFamily: 'NotoSansSC-Medium', fontSize: TypeScale.bodySmall.fontSize, color: Colors.textSecondary, marginBottom: Spacing.sm },
  chipRow: { marginBottom: 0 },
  chip: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 12, paddingVertical: 6, borderWidth: Borders.thin, borderColor: Colors.border, marginRight: Spacing.sm },
  chipActive: { borderColor: Colors.borderHover, backgroundColor: Colors.black },
  chipText: { fontFamily: 'NotoSansSC-Regular', fontSize: 12, color: Colors.textSecondary },
  chipTextActive: { fontFamily: 'NotoSansSC-Medium', color: Colors.white },
});
