"use client";

import { useLikeStore } from "@/store/likeStore";
import { mockProducts } from "@/data/product";
import ProductCard from "../components/ProductCard";
import { Toaster } from "react-hot-toast";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function LikePage() {
  const { likedIds, clearLikes } = useLikeStore();
  const likedProducts = mockProducts.filter((p) => likedIds.includes(p.id));

  return (
    <div className="max-w-5xl px-3 lg:px-0 mx-auto">
      <p className="font-semibold text-xl border-b px-5 pt-4 pb-2">
        찜한 상품 목록
      </p>
      <div className="flex justify-end mt-3">
        <button
          aria-label="상품 전체 삭제"
          onClick={clearLikes}
          className=" bg-neutral-100 hover:bg-neutral-200 transition px-2 py-1.5 rounded-lg text-sm cursor-pointer"
        >
          전체삭제
        </button>
      </div>
      {likedProducts.length === 0 ? (
        <div className=" flex flex-col items-center gap-2 pt-20">
          <div className="text-3xl font-bold">찜한 상품이 없습니다 ㅠ.ㅠ</div>
          <Link href="/">
            <p className="underline cursor-pointer text-sm text-neutral-500">
              찜하러 가기
            </p>
          </Link>
        </div>
      ) : (
        <div>
          <div className="grid lg:grid-cols-5 md:grid-cols-4 grid-cols-3 justify-items-center mt-3">
            <AnimatePresence>
              {likedProducts.map((p) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  key={p.id}
                  className="relative"
                >
                  <ProductCard key={p.id} product={p} />
                </motion.div>
              ))}
            </AnimatePresence>
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
      )}
    </div>
  );
}
