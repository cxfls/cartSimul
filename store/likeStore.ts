import { create } from "zustand";

type LikeState = {
  likedIds: string[];
  toggleLike: (id: string) => void;
  clearLikes: () => void;
  // isLiked: (id: string) => boolean;
};

export const useLikeStore = create<LikeState>((set, get) => ({
  likedIds: [],

  toggleLike: (id) =>
    set((state) => {
      const isAlredyLiked = state.likedIds.includes(id);
      if (isAlredyLiked) {
        return { likedIds: state.likedIds.filter((likedId) => likedId !== id) };
      } else {
        return { likedIds: [...state.likedIds, id] };
      }
    }),

  clearLikes: () => set({ likedIds: [] }),
}));
