// 旅记 TravelLog — Interaction Store (Zustand)

import { create } from 'zustand';
import { InteractionApi } from '../services/interactionApi';
import type { MockComment } from '../../../shared/utils/mockData';

interface InteractionState {
  comments: MockComment[];
  commentTotal: number;
  commentLoading: boolean;
  likedContentIds: Set<string>;
  favoritedContentIds: Set<string>;

  fetchComments: (contentId: string) => Promise<void>;
  postComment: (contentId: string, content: string, parentId?: string) => Promise<void>;
  toggleLike: (contentId: string, isLiked: boolean) => Promise<void>;
  toggleFavorite: (contentId: string, isFavorited: boolean) => Promise<void>;
}

export const useInteractionStore = create<InteractionState>((set, get) => ({
  comments: [],
  commentTotal: 0,
  commentLoading: false,
  likedContentIds: new Set(),
  favoritedContentIds: new Set(),

  fetchComments: async (contentId) => {
    set({ commentLoading: true });
    try {
      const res = await InteractionApi.getComments(contentId);
      set({ comments: res.list, commentTotal: res.total, commentLoading: false });
    } catch { set({ commentLoading: false }); }
  },

  postComment: async (contentId, content, parentId?) => {
    await InteractionApi.createComment(contentId, content, parentId);
    // Refresh comments
    await get().fetchComments(contentId);
  },

  toggleLike: async (contentId, isLiked) => {
    if (isLiked) {
      await InteractionApi.unlike(contentId);
      const s = new Set(get().likedContentIds); s.delete(contentId);
      set({ likedContentIds: s });
    } else {
      await InteractionApi.like(contentId);
      const s = new Set(get().likedContentIds); s.add(contentId);
      set({ likedContentIds: s });
    }
  },

  toggleFavorite: async (contentId, isFavorited) => {
    if (isFavorited) {
      await InteractionApi.unfavorite(contentId);
      const s = new Set(get().favoritedContentIds); s.delete(contentId);
      set({ favoritedContentIds: s });
    } else {
      await InteractionApi.favorite(contentId);
      const s = new Set(get().favoritedContentIds); s.add(contentId);
      set({ favoritedContentIds: s });
    }
  },
}));
