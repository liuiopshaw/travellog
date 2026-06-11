// 旅记 TravelLog — ContentDetailScreen (Editorial + Zustand)

import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Divider, AppButton, AppInput, SkeletonBlock, AppImage } from '../../../shared/components';
import { useContentStore } from '../store/contentStore';
import { useInteractionStore } from '../../interaction/store/interactionStore';
import { Colors, Spacing, TypeScale, Borders } from '../../../shared/styles/editorial';
import type { MockComment } from '../../../shared/utils/mockData';
import { BrowseHistory } from '../../user/store/browseHistory';

interface Props { navigation: any; route: { params: { contentId: string } } }

export function ContentDetailScreen({ route, navigation }: Props) {
  const { contentId } = route.params;
  const { currentDetail, relatedList, detailLoading, fetchDetail, fetchRelated } = useContentStore();
  const { comments, commentTotal, fetchComments, postComment, toggleLike, toggleFavorite, likedContentIds, favoritedContentIds } = useInteractionStore();

  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    fetchDetail(contentId);
    fetchRelated(contentId);
    fetchComments(contentId);
  }, [contentId]);

  // Track browse history (after detail loaded)
  useEffect(() => {
    if (currentDetail) BrowseHistory.add(currentDetail as any);
  }, [currentDetail]);

  if (detailLoading || !currentDetail) {
    return (
      <View style={styles.loadingWrap}>
        <SkeletonBlock width="100%" height={300} />
        <View style={{ padding: Spacing.containerX }}>
          <SkeletonBlock width="60%" height={24} />
          <View style={{ height: 8 }} />
          <SkeletonBlock width="80%" height={16} />
        </View>
      </View>
    );
  }

  const c = currentDetail;
  const isLiked = likedContentIds.has(c.id) || c.isLiked;
  const isFavorited = favoritedContentIds.has(c.id) || c.isFavorited;

  const handleFavorite = () => toggleFavorite(c.id, isFavorited);
  const handleLike = () => toggleLike(c.id, isLiked);
  const handleSubmitComment = () => {
    if (!commentText.trim()) return;
    postComment(c.id, commentText.trim());
    setCommentText('');
  };

  return (
    <View style={styles.root}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.gallery}>
          <AppImage uri={c.coverImage} width="100%" height={300} />
        </View>
        <View style={styles.contentHeader}>
          <Text style={styles.category}>{(c as any).category?.name || (c as any).categoryName || ''}</Text>
          <Text style={styles.title}>{c.title}</Text>
          <View style={styles.metaRow}>
            <View style={styles.metaItem}><Ionicons name="star" size={14} color={Colors.text} /><Text style={styles.metaText}>{c.rating} 评分</Text></View>
            <View style={styles.metaItem}><Ionicons name="location-outline" size={14} color={Colors.textTertiary} /><Text style={styles.metaTextSecondary}>{c.region} · {c.location}</Text></View>
          </View>
          <View style={styles.tagsRow}>{c.tags.map((tag: string) => <View key={tag} style={styles.tag}><Text style={styles.tagText}>{tag}</Text></View>)}</View>
          <View style={styles.authorRow}>
            <View style={styles.avatarPlaceholder}><Ionicons name="person" size={18} color={Colors.textMuted} /></View>
            <View><Text style={styles.authorName}>{c.author.username}</Text><Text style={styles.authorBio}>{c.author.bio}</Text></View>
          </View>
        </View>
        <Divider thickness="thick" />
        {/* RICH CONTENT */}
        <View style={styles.richContent}>
          <RichContent body={c.content || c.description} />
        </View>

        {/* RELATED */}
        {relatedList.length > 0 && (
          <View style={styles.relatedSection}>
            <Divider />
            <View style={styles.sectionWrap}>
              <Text style={styles.sectionLabel}>相关推荐</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.relatedScroll}>
                {relatedList.map((rel: any) => (
                  <Pressable key={rel.id} style={styles.relatedCard} onPress={() => (navigation as any).push('ContentDetail', { contentId: rel.id })}>
                    <AppImage uri={rel.coverImage} width={140} height={100} />
                    <View style={styles.relatedInfo}>
                      <Text style={styles.relatedTitle} numberOfLines={2}>{rel.title}</Text>
                      <View style={styles.relatedMeta}>
                        <Ionicons name="star" size={10} color={Colors.text} />
                        <Text style={styles.relatedRating}>{rel.rating}</Text>
                      </View>
                    </View>
                  </Pressable>
                ))}
              </ScrollView>
            </View>
          </View>
        )}

        <Divider />
        <View style={styles.mapSection}>
          <Text style={styles.sectionLabel}>位置</Text>
          <View style={styles.mapPlaceholder}>
            <Ionicons name="map-outline" size={32} color={Colors.textMuted} />
            <Text style={styles.mapText}>{c.location}</Text>
          </View>
        </View>
        <Divider thickness="thick" />

        {/* COMMENTS */}
        <View style={styles.commentsSection}>
          <View style={styles.sectionHeader}><Text style={styles.sectionTitle}>评论 · {commentTotal}</Text></View>
          <View style={styles.commentInputRow}>
            <AppInput placeholder="写下你的评论..." value={commentText} onChangeText={setCommentText} containerStyle={styles.commentInputFlex} />
            <AppButton title="发布" variant="primary" size="sm" onPress={handleSubmitComment} />
          </View>
          {comments.map((comment: MockComment) => <CommentItem key={comment.id} comment={comment} />)}
        </View>
        <View style={{ height: 120 }} />
      </ScrollView>

      {/* BOTTOM BAR */}
      <View style={styles.bottomBar}>
        <View style={styles.bottomBarInner}>
          <Pressable style={styles.actionBtn} onPress={handleFavorite} hitSlop={8}>
            <Ionicons name={isFavorited ? 'heart' : 'heart-outline'} size={22} color={isFavorited ? Colors.text : Colors.textTertiary} />
            <Text style={styles.actionText}>{isFavorited ? '已收藏' : '收藏'}</Text>
          </Pressable>
          <Pressable style={styles.actionBtn} hitSlop={8}><Ionicons name="chatbubble-outline" size={22} color={Colors.textTertiary} /><Text style={styles.actionText}>评论</Text></Pressable>
          <Pressable style={styles.actionBtn} hitSlop={8}><Ionicons name="share-outline" size={22} color={Colors.textTertiary} /><Text style={styles.actionText}>分享</Text></Pressable>
          <Pressable style={styles.actionBtn} onPress={handleLike} hitSlop={8}>
            <Ionicons name={isLiked ? 'thumbs-up' : 'thumbs-up-outline'} size={22} color={isLiked ? Colors.text : Colors.textTertiary} />
            <Text style={styles.actionText}>点赞</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

// ── Rich Content with expand/collapse ──
function RichContent({ body }: { body: string }) {
  const [expanded, setExpanded] = useState(false);
  const plainText = (body || '').replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim();
  const isLong = plainText.length > 200;
  const displayText = expanded || !isLong ? plainText : plainText.slice(0, 200) + '...';

  return (
    <View>
      <Text style={richStyles.bodyText}>{displayText}</Text>
      {isLong && (
        <Pressable style={richStyles.expandBtn} onPress={() => setExpanded(!expanded)}>
          <Text style={richStyles.expandText}>{expanded ? '收起 ▲' : '展开全文 ▼'}</Text>
        </Pressable>
      )}
    </View>
  );
}

// ── Comment Item ──
function CommentItem({ comment }: { comment: MockComment }) {
  return (
    <View style={commentStyles.container}>
      <View style={commentStyles.header}>
        <View style={commentStyles.avatarSm}><Ionicons name="person" size={14} color={Colors.textMuted} /></View>
        <Text style={commentStyles.username}>{comment.user.username}</Text>
        <Text style={commentStyles.time}>{comment.createdAt}</Text>
      </View>
      <Text style={commentStyles.content}>{comment.content}</Text>
      <View style={commentStyles.actions}>
        <Pressable hitSlop={8} style={commentStyles.actionRow}><Ionicons name="thumbs-up-outline" size={14} color={Colors.textMuted} /><Text style={commentStyles.actionLabel}> {comment.likeCount}</Text></Pressable>
        <Pressable hitSlop={8}><Text style={commentStyles.actionLabel}>回复</Text></Pressable>
      </View>
      {comment.replies.map((reply: MockComment) => (
        <View key={reply.id} style={commentStyles.reply}>
          <View style={commentStyles.header}>
            <View style={commentStyles.avatarSm}><Ionicons name="person" size={12} color={Colors.textMuted} /></View>
            <Text style={commentStyles.username}>{reply.user.username}</Text>
            <Text style={commentStyles.time}>{reply.createdAt}</Text>
          </View>
          <Text style={commentStyles.content}>{reply.content}</Text>
        </View>
      ))}
    </View>
  );
}

// ── Rich Content styles ──
const richStyles = StyleSheet.create({
  bodyText: {
    fontFamily: 'NotoSansSC-Regular',
    fontSize: TypeScale.body.fontSize,
    lineHeight: TypeScale.body.lineHeight,
    color: Colors.textSecondary,
  },
  expandBtn: { marginTop: Spacing.sm, paddingVertical: 4 },
  expandText: {
    fontFamily: 'NotoSansSC-Medium', fontSize: TypeScale.bodySmall.fontSize,
    color: Colors.textTertiary,
  },
});

// ── Main styles ──
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.bg },
  loadingWrap: { flex: 1, backgroundColor: Colors.bg },
  gallery: {},
  contentHeader: { paddingHorizontal: Spacing.containerX, paddingTop: Spacing.xl, paddingBottom: Spacing.lg },
  category: { fontFamily: 'NotoSansSC-Medium', fontSize: TypeScale.label.fontSize, lineHeight: TypeScale.label.lineHeight, color: Colors.textMuted, letterSpacing: TypeScale.label.letterSpacing, textTransform: 'uppercase', marginBottom: Spacing.sm },
  title: { fontFamily: 'NotoSerifSC-Bold', fontSize: TypeScale.h1.fontSize, lineHeight: TypeScale.h1.lineHeight, color: Colors.text, marginBottom: Spacing.lg },
  metaRow: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.lg, marginBottom: Spacing.md },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaText: { fontFamily: 'NotoSansSC-Medium', fontSize: 13, color: Colors.text },
  metaTextSecondary: { fontFamily: 'NotoSansSC-Regular', fontSize: 13, color: Colors.textTertiary },
  tagsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.xs, marginBottom: Spacing.lg },
  tag: { paddingHorizontal: 8, paddingVertical: 2, borderWidth: Borders.thin, borderColor: Colors.border },
  tagText: { fontFamily: 'NotoSansSC-Regular', fontSize: 10, color: Colors.textTertiary },
  authorRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  avatarPlaceholder: { width: 40, height: 40, backgroundColor: Colors.textDisabled, alignItems: 'center', justifyContent: 'center' },
  authorName: { fontFamily: 'NotoSerifSC-SemiBold', fontSize: 14, color: Colors.text },
  authorBio: { fontFamily: 'NotoSansSC-Regular', fontSize: 12, color: Colors.textMuted, marginTop: 2 },
  richContent: { paddingHorizontal: Spacing.containerX, paddingVertical: Spacing.xl },
  bodyText: { fontFamily: 'NotoSansSC-Regular', fontSize: TypeScale.body.fontSize, lineHeight: TypeScale.body.lineHeight, color: Colors.textSecondary },
  relatedSection: {},
  sectionWrap: { paddingHorizontal: Spacing.containerX, paddingVertical: Spacing.xl },
  relatedScroll: { marginTop: Spacing.md },
  relatedCard: { width: 140, marginRight: Spacing.md },
  relatedInfo: { paddingVertical: Spacing.xs },
  relatedTitle: { fontFamily: 'NotoSerifSC-SemiBold', fontSize: 12, color: Colors.text, lineHeight: 17 },
  relatedMeta: { flexDirection: 'row', alignItems: 'center', gap: 2, marginTop: 2 },
  relatedRating: { fontFamily: 'NotoSansSC-Medium', fontSize: 11, color: Colors.text },
  mapSection: { paddingHorizontal: Spacing.containerX, paddingVertical: Spacing.xl },
  sectionLabel: { fontFamily: 'NotoSansSC-Medium', fontSize: TypeScale.label.fontSize, lineHeight: TypeScale.label.lineHeight, color: Colors.textMuted, letterSpacing: TypeScale.label.letterSpacing, textTransform: 'uppercase', marginBottom: Spacing.md },
  mapPlaceholder: { height: 160, backgroundColor: Colors.textDisabled, alignItems: 'center', justifyContent: 'center', borderWidth: Borders.thin, borderColor: Colors.border, gap: Spacing.sm },
  mapText: { fontFamily: 'NotoSansSC-Medium', fontSize: 14, color: Colors.textSecondary },
  commentsSection: { paddingHorizontal: Spacing.containerX, paddingVertical: Spacing.xl },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: Spacing.lg },
  sectionTitle: { fontFamily: 'NotoSerifSC-SemiBold', fontSize: TypeScale.h3.fontSize, color: Colors.text, borderBottomWidth: Borders.thick, borderBottomColor: Colors.borderHover, paddingBottom: Spacing.sm },
  commentInputRow: { flexDirection: 'row', gap: Spacing.sm, marginBottom: Spacing.xl },
  commentInputFlex: { flex: 1 },
  bottomBar: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: Colors.bg, borderTopWidth: Borders.thin, borderTopColor: Colors.border, paddingBottom: 34 },
  bottomBarInner: { flexDirection: 'row', justifyContent: 'space-around', paddingTop: Spacing.md, paddingHorizontal: Spacing.containerX },
  actionBtn: { alignItems: 'center', gap: 2 },
  actionText: { fontFamily: 'NotoSansSC-Regular', fontSize: 11, color: Colors.textTertiary },
});

const commentStyles = StyleSheet.create({
  container: { paddingVertical: Spacing.lg, borderBottomWidth: Borders.thin, borderBottomColor: Colors.border },
  header: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, marginBottom: Spacing.sm },
  avatarSm: { width: 28, height: 28, backgroundColor: Colors.textDisabled, alignItems: 'center', justifyContent: 'center' },
  username: { fontFamily: 'NotoSerifSC-SemiBold', fontSize: 13, color: Colors.text },
  time: { fontFamily: 'NotoSansSC-Regular', fontSize: 11, color: Colors.textMuted },
  content: { fontFamily: 'NotoSansSC-Regular', fontSize: TypeScale.bodySmall.fontSize, lineHeight: TypeScale.bodySmall.lineHeight, color: Colors.textSecondary, marginBottom: Spacing.sm, paddingLeft: 36 },
  actions: { flexDirection: 'row', gap: Spacing.lg, paddingLeft: 36 },
  actionRow: { flexDirection: 'row', alignItems: 'center' },
  actionLabel: { fontFamily: 'NotoSansSC-Regular', fontSize: 11, color: Colors.textMuted },
  reply: { marginLeft: 36, marginTop: Spacing.sm, paddingTop: Spacing.sm, borderTopWidth: Borders.thin, borderTopColor: Colors.border },
});
