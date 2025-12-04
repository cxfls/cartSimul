"use client";

import { mockProducts } from "@/data/product";
import ProductCard from "./ProductCard";
import { Toaster } from "react-hot-toast";
import { useMemo, useState } from "react";

export default function MainPage() {
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const categories = useMemo(() => {
    const set = new Set<string>();
    mockProducts.forEach((p) => set.add(p.category));
    return ["ALL", ...Array.from(set)];
  }, []);

  const filteredProducts = useMemo(() => {
    if (activeCategory === "ALL") return mockProducts;
    return mockProducts.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="max-w-5xl px-3 lg:px-0 mx-auto">
      <div className="flex flex-wrap items-center justify-center gap-2 px-6 mb-2.5">
        {categories.map((cat) => {
          const isActive = activeCategory === cat;

          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`border rounded-2xl px-2.5 py-1 text-sm cursor-pointer transition ${
                isActive
                  ? "bg-black text-white border-black"
                  : "bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-100"
              }`}
            >
              {cat === "ALL" ? "전체" : cat}
            </button>
          );
        })}
      </div>
      <div className="grid lg:grid-cols-5 md:grid-cols-4 grid-cols-3 justify-items-center">
        {filteredProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
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
