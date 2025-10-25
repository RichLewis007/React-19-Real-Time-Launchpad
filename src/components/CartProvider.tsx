"use client";

import { createContext, useContext, useState, useEffect } from "react";

interface CartProviderState {
  cartCount: number;
  favoritesCount: number;
  updateCartCount: (count: number) => void;
  updateFavoritesCount: (count: number) => void;
  incrementFavorites: () => void;
  decrementFavorites: () => void;
  incrementCart: (amount?: number) => void;
  decrementCart: (amount?: number) => void;
}

const CartContext = createContext<CartProviderState | undefined>(undefined);

export function CartProvider({
  children,
  initialCartCount,
  initialFavoritesCount,
}: {
  children: React.ReactNode;
  initialCartCount: number;
  initialFavoritesCount: number;
}) {
  const [cartCount, setCartCount] = useState(initialCartCount);
  const [favoritesCount, setFavoritesCount] = useState(initialFavoritesCount);

  // Manual increment/decrement for favorites to avoid DB state issues
  const incrementFavorites = () => setFavoritesCount((prev) => prev + 1);
  const decrementFavorites = () =>
    setFavoritesCount((prev) => Math.max(0, prev - 1));

  // Manual increment/decrement for cart to avoid DB state issues
  const incrementCart = (amount = 1) => setCartCount((prev) => prev + amount);
  const decrementCart = (amount = 1) =>
    setCartCount((prev) => Math.max(0, prev - amount));

  // Listen for custom events dispatched when cart/favorites change
  useEffect(() => {
    const handleCartUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<number>;
      setCartCount(customEvent.detail);
    };

    const handleFavoritesUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<number>;
      setFavoritesCount(customEvent.detail);
    };

    window.addEventListener("cartUpdated", handleCartUpdate);
    window.addEventListener("favoritesUpdated", handleFavoritesUpdate);

    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate);
      window.removeEventListener("favoritesUpdated", handleFavoritesUpdate);
    };
  }, []);

  // Expose update functions for external use
  useEffect(() => {
    // @ts-expect-error - Adding to window for external access
    window.updateCartCount = setCartCount;
    // @ts-expect-error - Adding to window for external access
    window.updateFavoritesCount = setFavoritesCount;

    return () => {
      // @ts-expect-error - Removing from window
      delete window.updateCartCount;
      // @ts-expect-error - Removing from window
      delete window.updateFavoritesCount;
    };
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartCount,
        favoritesCount,
        updateCartCount: setCartCount,
        updateFavoritesCount: setFavoritesCount,
        incrementFavorites,
        decrementFavorites,
        incrementCart,
        decrementCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
