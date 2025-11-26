import { create } from "zustand";
import type { Product } from "@/data/product";

export type CartItem = Product & {
  quantity: number;
};

// store 안에 어떤 상태와 함수들이 들어갈지 설계한 것
type CartState = {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  changeQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  getTotalCount: () => number;
  getTotalPrice: () => number;
};

// set → 상태 변경할 때 사용
// get → 현재 상태 가져올 때 사용
export const useCartStore = create<CartState>((set, get) => ({
  items: [],

  addItem: (product) =>
    set((state) => {
      const existing = state.items.find((it) => it.id === product.id);
      if (existing) {
        // 이미 있으면 수량 +1
        return {
          items: state.items.map((it) =>
            it.id === product.id ? { ...it, quantity: it.quantity + 1 } : it
          ),
        };
      }
      // 없으면 새로 추가
      return {
        items: [...state.items, { ...product, quantity: 1 }],
      };
    }),

  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((it) => it.id !== id),
    })),

  changeQuantity: (id, delta) =>
    set((state) => ({
      items: state.items
        .map((it) =>
          it.id === id ? { ...it, quantity: it.quantity + delta } : it
        )
        // 수량 0 이하는 제거
        .filter((it) => it.quantity > 0),
    })),

  clearCart: () => set({ items: [] }),

  getTotalCount: () => get().items.reduce((sum, it) => sum + it.quantity, 0),

  getTotalPrice: () =>
    get().items.reduce((sum, it) => sum + it.price * it.quantity, 0),
}));
