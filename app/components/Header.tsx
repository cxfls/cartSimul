"use client";

import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";
import { useCartStore } from "@/store/cartStore";

export default function Header() {
  const totalCount = useCartStore((s) => s.getTotalCount());

  return (
    <header className="sticky top-0 z-20 border-b border-neutral-200 bg-white ">
      <div className="max-w-5xl mx-auto flex items-center justify-between p-3">
        <Link href="/" className="text-2xl font-bold">
          Cart Simulator
        </Link>
        <Link
          href="/cart"
          className="p-3 rounded-full flex items-center justify-center transition duration-120 relative"
        >
          <FaShoppingCart className="text-xl" />
          <div className="absolute right-1 top-1 bg-sky-400 text-white w-4 h-4 rounded-full text-xs flex items-center justify-center">
            {totalCount}
          </div>
        </Link>
      </div>
    </header>
  );
}
