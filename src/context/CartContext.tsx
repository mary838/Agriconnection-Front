"use client";

import { createContext, useContext, useState, useEffect, useCallback, useRef, ReactNode } from "react";
import { useAuth } from "@/context/AuthContext";
import { carts as cartsApi, type Cart } from "@/lib/api";

type CartCtx = {
  cart: Cart | null;
  loading: boolean;
  count: number;
  refresh: () => Promise<void>;
  addItem: (productId: string, quantity: number) => Promise<void>;
  updateItem: (itemId: string, quantity: number) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
};

const CartContext = createContext<CartCtx>({
  cart: null,
  loading: false,
  count: 0,
  refresh: async () => {},
  addItem: async () => {},
  updateItem: async () => {},
  removeItem: async () => {},
  clearCart: async () => {},
});

export function CartProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(false);
  const requestId = useRef(0);

  const refresh = useCallback(async () => {
    const id = ++requestId.current;
    setLoading(true);
    try {
      const data = await cartsApi.me();
      if (id === requestId.current) setCart(data);
    } catch {
      if (id === requestId.current) setCart(null);
    } finally {
      if (id === requestId.current) setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user?.role === "customer") {
      refresh();
    } else {
      setCart(null);
    }
  }, [user, refresh]);

  const addItem = async (productId: string, quantity: number) => {
    await cartsApi.addItem({ productId, quantity });
    await refresh();
  };

  const updateItem = async (itemId: string, quantity: number) => {
    await cartsApi.updateItem(itemId, { quantity });
    await refresh();
  };

  const removeItem = async (itemId: string) => {
    await cartsApi.removeItem(itemId);
    await refresh();
  };

  const clearCart = async () => {
    await cartsApi.clear();
    await refresh();
  };

  const count = cart?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return (
    <CartContext.Provider
      value={{ cart, loading, count, refresh, addItem, updateItem, removeItem, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
