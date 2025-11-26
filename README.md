🛒 Cart Simulator – 쇼핑몰 장바구니 시뮬레이터

사용자가 상품을 장바구니에 담고, 수량을 조절하고, 총 금액을 확인할 수 있는
간단하지만 실전과 가까운 쇼핑몰 장바구니 UI입니다.

상태 관리는 Zustand로 구현하여 가볍고 직관적인 전역 상태 관리 흐름을 익히는 데 집중했습니다.
⸻

🚀 배포 주소

👉 https://cart-simulator-six.vercel.app/cart

⸻

📌 핵심 기능 (MVP)

🛍️ 상품 목록
• 반응형 그리드 UI
• 상품 이미지 / 이름 / 가격 표시
• Hover 시 overlay + “Add to Cart” 인터랙션

🧺 장바구니 기능
• 장바구니에 상품 추가
• 동일 상품은 수량 증가 (중복 추가 X)
• 상품 수량 증가/감소
• 상품 제거
• 장바구니 초기화(clear)
• 총 수량, 총 금액 실시간 계산 (Zustand selector + reduce)

🔔 사용자 피드백
• 장바구니 담을 때 toast 알림 표현
• “장바구니에 추가되었습니다!”
• 비침해적인 UX 구현

⸻

🧩 Zustand로 상태 관리한 이유
• Redux보다 설정이 가볍고 러닝커브가 낮음
• 전역 상태를 함수 기반으로 구조화할 수 있어 명료한 로직 구성 가능
• 특정 state만 구독하여 불필요한 리렌더링을 방지
• 작은 규모의 상태 관리에 가장 최적화된 형태

🖥️ UI 디자인 포인트
• Tailwind로 빠르고 일관성 있는 스타일 적용
• 이미지 hover 시 밝아지는 overlay & + 아이콘 등장
• toast 알림으로 즉각적인 피드백 제공
• 최소한의 컴포넌트 구조로 가독성 유지
⸻

🧰 기술 스택

Frontend
• Next.js (App Router)
• React
• TypeScript
• Tailwind CSS
• Zustand (전역 상태 관리)

ETC
• Vercel 배포
• Unsplash 이미지 리소스 사용

⸻

🧱 프로젝트 구조

```
cart-simulator/
├── app/
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── ProductCard.tsx
│   │   └── ToastProvider.tsx
│   ├── cart/page.tsx
│   ├── page.tsx
│   └── layout.tsx
├── store/
│   └── cartStore.ts
└── public/
```

🗂 Zustand 상태 관리 구조

CartState 타입

```ts
type CartState = {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  changeQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  getTotalCount: () => number;
  getTotalPrice: () => number;
};
```

주요 로직 요약
• items → 장바구니 배열
• addItem(product) → 없으면 추가, 있으면 수량 증가
• changeQuantity(id, delta) → +1 / -1 처리
• removeItem(id) → 해당 id 상품 제거
• clearCart() → 장바구니 초기화
• getTotalCount() / getTotalPrice() → reduce로 합산

📘 배운 점 / 회고
• Zustand 구조가 처음엔 어렵게 느껴졌지만
“set으로 상태 변경 → 화면 자동 반영” 흐름이 익숙해지면서
전역 상태 관리의 핵심을 더 잘 이해하게 됨.
• Next.js App Router 환경에서 전역 상태를 다루는 구조를 경험함
→ 클라이언트 컴포넌트/서버 컴포넌트 구분에 더 익숙해짐
• UI/UX 디테일(hover overlay, toast feedback)을 넣어보면서
“작은 프로젝트라도 디테일을 챙기면 완성도가 확 올라간다”는 걸 깨달음

👩🏻‍💻 만든 사람

이채린 | Frontend Developer

    1.	반응형 + 빈 상태 + 엣지 상태 👉 무조건 마무리
    2.	“주문하기 → 완료 UI + 장바구니 비우기” 👉 가능하면 꼭
    3.	숫자 애니메이션 / 코드 리팩토링 👉 시간 남으면
