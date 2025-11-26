"use client";

import { mockProducts } from "@/data/product";
import { useCartStore } from "@/store/cartStore";
import { Toaster } from "react-hot-toast";
import { FaHeart } from "react-icons/fa";
import toast from "react-hot-toast";
import { useLikeStore } from "@/store/likeStore";

export default function MainPage() {
  const addItem = useCartStore((s) => s.addItem);
  const { likedIds, toggleLike } = useLikeStore();

  return (
    <div className="max-w-5xl px-3 lg:px-0 mx-auto">
      <div className="grid lg:grid-cols-5 md:grid-cols-4 grid-cols-3 justify-items-center">
        {mockProducts.map((p) => (
          <div
            key={p.id}
            className="md:w-40 w-30 mb-4 cursor-pointer group relative"
            onClick={() => {
              addItem(p);
              toast.success("장바구니에 추가되었습니다!");
            }}
          >
            <div className="md:w-40 md:h-40 h-30 w-30 rounded-xl bg-neutral-100 flex items-center justify-center lg:text-[80px] text-6xl">
              {p.emoji}
            </div>
            <div className="absolute bg-white/50 md:w-40 md:h-40 w-30 h-30 opacity-0 group-hover:opacity-100 inset-0 flex items-center justify-center rounded-xl transition">
              <p className="bg-neutral-300/70 w-7 h-7 lg:w-9 lg:h-9 rounded-full text-white text-lg lg:text-2xl font-bold flex items-center justify-center">
                +
              </p>
            </div>

            <h2 className="md:text-lg pt-1.5">{p.name}</h2>
            <p className="md:text-sm text-xs text-neutral-600">
              {p.description}
            </p>
            <div className="flex items-center justify-between">
              <p className="md:text-lg  font-semibold">
                {p.price.toLocaleString("ko-KR")}원
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleLike(p.id);
                }}
                className={`cursor-pointer border border-neutral-200 w-6 h-6 text-xs flex items-center justify-center rounded-full transition ${
                  likedIds.includes(p.id) ? "text-red-400" : "text-neutral-300"
                }`}
              >
                <FaHeart />
              </button>
            </div>
          </div>
        ))}
      </div>
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            background: "rgba(20,20,20,0.85)",
            color: "white",
            backdropFilter: "blur(6px)",
            borderRadius: "10px",
            padding: "12px 16px",
          },
          success: {
            iconTheme: {
              primary: "#38bdf8",
              secondary: "#000000",
            },
          },
        }}
      />
    </div>
  );
}
