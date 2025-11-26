"use client";

import { useCartStore } from "@/store/cartStore";
import Link from "next/link";

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const changeQuantity = useCartStore((s) => s.changeQuantity);
  const totalPrice = useCartStore((s) => s.getTotalPrice());
  const totalCount = useCartStore((s) => s.getTotalCount());
  const clearCart = useCartStore((s) => s.clearCart);

  const handleOrder = () => {
    if (items.length === 0) {
      alert("장바구니가 비어있습니다!");
      return;
    }
    alert("주문이 완료되었습니다!");
    clearCart();
  };

  return (
    <div className="max-w-3xl mx-auto pb-5 px-4 lg:px-0 ">
      <div className="flex items-end justify-end mt-3">
        <button
          aria-label="상품 전체 삭제"
          onClick={() => clearCart()}
          className=" bg-neutral-100 hover:bg-neutral-200 transition px-2 py-1.5 rounded-lg text-sm cursor-pointer"
        >
          전체삭제
        </button>
      </div>
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 py-5">
          <div className="text-5xl font-bold">텅~</div>
          <Link
            href="/"
            className="underline cursor-pointer text-sm text-neutral-500"
          >
            담으러 가기
          </Link>
        </div>
      ) : (
        <div className="relative">
          {items.map((it) => (
            <div
              key={it.id}
              className="flex items-center gap-5 relative pb-5 border-b border-neutral-300 mt-5"
            >
              <div className="w-[120px] h-[120px] rounded-xl bg-neutral-100 flex items-center justify-center text-5xl">
                {it.emoji}
              </div>
              <div className="flex flex-col gap-1">
                <h2 className="text-lg pt-1.5">{it.name}</h2>
                <p className="text-sm text-neutral-600">{it.description}</p>
                <div className="flex gap-2 items-center">
                  <button
                    onClick={() => changeQuantity(it.id, -1)}
                    className=" bg-neutral-100 w-6 h-6 flex items-center justify-center text-sm rounded-full hover:bg-neutral-200 cursor-pointer transition"
                  >
                    -
                  </button>
                  <p className="text-neutral-900 ">{it.quantity}</p>
                  <button
                    onClick={() => changeQuantity(it.id, 1)}
                    className=" bg-neutral-100 w-6 h-6 flex items-center justify-center text-sm rounded-full hover:bg-neutral-200 cursor-pointer transition"
                  >
                    +
                  </button>
                </div>
                <p className="mt-2 text-lg font-semibold">
                  {it.price.toLocaleString("ko-KR")}원
                </p>
              </div>
              <button
                aria-label="상품 삭제"
                onClick={() => removeItem(it.id)}
                className="absolute right-2 top-2 text-neutral-500 hover:text-neutral-800 transition cursor-pointer"
              >
                x
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="mt-10 flex flex-col gap-2">
        <div className="flex gap-2 text-xl">
          <p className="">총 수량:</p>
          <p className="font-bold">{totalCount}개</p>
        </div>
        <div className="flex gap-2 text-xl">
          <p>총 금액:</p>
          <p className="font-bold">{totalPrice.toLocaleString("ko-KR")}원</p>
        </div>
      </div>
      <button
        onClick={handleOrder}
        className=" bg-black text-white w-full py-2 rounded-xl cursor-pointer mt-8"
      >
        주문하기
      </button>
    </div>
  );
}
