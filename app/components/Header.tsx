"use client";

import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";
import { useCartStore } from "@/store/cartStore";
import { FaHeart } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const totalCount = useCartStore((s) => s.getTotalCount());

  return (
    <header className="sticky top-0 z-20 border-b border-neutral-200 bg-white ">
      <div className="max-w-5xl mx-auto flex items-center justify-between p-3">
        <Link href="/" className="text-2xl font-bold">
          Cart Simulator
        </Link>
        <div className="flex">
          <Link
            href="/like"
            className="p-3 rounded-full flex items-center justify-center transition duration-120"
          >
            <FaHeart className="text-xl hover:text-red-400 transition-colors duration-105" />
          </Link>
          <Link
            href="/cart"
            id="cart-icon"
            className="p-3 rounded-full flex items-center justify-center transition duration-120 relative"
          >
            <FaShoppingCart className="text-xl" />
            <AnimatePresence>
              <motion.div
                key={totalCount}
                initial={{ scale: 0, opacity: 0, y: -2 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0, opacity: 0, y: -2 }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
                className="absolute right-1 top-1 bg-sky-400 text-white w-4 h-4 rounded-full text-xs flex items-center justify-center"
              >
                {totalCount}
              </motion.div>
            </AnimatePresence>
          </Link>
        </div>
      </div>
    </header>
  );
}
