import { createContext, useContext, useState, useMemo, type ReactNode } from "react";
import type { Course } from "../config/mockCourses";

export interface CartItem {
  course: Course;
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  addItem: (course: Course) => void;
  removeItem: (slug: string) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  function addItem(course: Course) {
    setItems((prev) => {
      const existing = prev.find((i) => i.course.slug === course.slug);
      if (existing) return prev;
      return [...prev, { course, quantity: 1 }];
    });
  }

  function removeItem(slug: string) {
    setItems((prev) => prev.filter((i) => i.course.slug !== slug));
  }

  function clearCart() {
    setItems([]);
  }

  const itemCount = items.length;
  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.course.price * i.quantity, 0),
    [items]
  );

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clearCart, itemCount, subtotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
