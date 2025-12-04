// app/components/ProductCard.tsx
"use client";

import { Product } from "@/data/product";
import { useCartStore } from "@/store/cartStore";
import { useLikeStore } from "@/store/likeStore";
import { FaHeart } from "react-icons/fa";
import toast from "react-hot-toast";
import { motion, scale } from "framer-motion";
import { useRef, useState } from "react";

type Props = {
  product: Product;
};

export default function ProductCard({ product: p }: Props) {
  const addItem = useCartStore((s) => s.addItem);
  const { likedIds, toggleLike } = useLikeStore();
  const isLiked = likedIds.includes(p.id);

  const emojiRef = useRef<HTMLDivElement | null>(null);

  const [fly, setFly] = useState<{
    left: number;
    top: number;
    x: number;
    y: number;
  } | null>(null);

  const emojiMotion = () => {
    // 1. 출발점(이모지) 위치
    const emojiRect = emojiRef.current?.getBoundingClientRect();
    // 2. 도착점(헤더 카트 아이콘) 위치
    const cartEl = document.getElementById("cart-icon");
    const cartRect = cartEl?.getBoundingClientRect();

    if (emojiRect && cartRect) {
      // 화면 기준 중심 좌표 계산
      const startX = emojiRect.left + emojiRect.width / 2;
      const startY = emojiRect.top + emojiRect.height / 2;
      const endX = cartRect.left + cartRect.width / 2;
      const endY = cartRect.top + cartRect.height / 2;

      // state에 저장 (fixed + translate용)
      setFly({
        left: startX,
        top: startY,
        x: endX - startX,
        y: endY - startY,
      });

      // 애니메이션 끝난 뒤 유령 지우기 (0.5초 정도)
      setTimeout(() => setFly(null), 500);
    }
  };

  return (
    <div className="relative mb-2 cursor-pointer group">
      <div
        className="relative rounded-xl flex flex-col items-center md:w-45 w-35 p-2"
        onClick={() => {
          emojiMotion();
          addItem(p);
          toast.success("장바구니에 추가되었습니다!");
        }}
      >
        <div className="relative md:w-40 md:h-40 w-30 h-30">
          <div
            ref={emojiRef}
            className="bg-neutral-100 md:w-40 md:h-40 w-30 h-30 rounded-2xl flex items-center justify-center text-6xl lg:text-[80px] mb-2"
          >
            {p.emoji}
          </div>

          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              toggleLike(p.id);
            }}
            whileTap={{ scale: 0.85 }}
            animate={isLiked ? { scale: [1, 1.5, 0.8, 1] } : { scale: 1 }}
            transition={{ duration: 0.3 }}
            className={`absolute cursor-pointer bottom-1.5 right-1.5 w-6 h-6 md:text-lg text-sm flex items-center justify-center rounded-full transition ${
              isLiked ? "text-red-400" : "text-neutral-300"
            }`}
          >
            <FaHeart />
          </motion.button>

          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 border-2 border-neutral-400 rounded-2xl flex items-center justify-center transition pointer-events-none">
            <p className="bg-neutral-300/60 w-7 h-7 lg:w-9 lg:h-9 rounded-full text-neutral-600 text-lg lg:text-2xl font-bold flex items-center justify-center">
              +
            </p>
          </div>
        </div>

        <div>
          <h2 className="md:text-md pt-1.5 font-semibold text-sm">{p.name}</h2>
          <p className="md:text-sm text-xs text-neutral-600">{p.description}</p>
          <p className="md:text-xl text-lg font-semibold mt-1.5">
            {p.price.toLocaleString("ko-KR")}원
          </p>
        </div>
      </div>

      {fly && (
        <motion.div
          className="fixed z-50 pointer-events-none flex items-center justify-center"
          style={{
            left: fly.left,
            top: fly.top,
          }}
          initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
          animate={{ x: fly.x, y: fly.y, scale: 0.4, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <div className="w-8 h-8 flex items-center justify-center">
            <span className="text-2xl">{p.emoji}</span>
          </div>
        </motion.div>
      )}
    </div>
  );
}
