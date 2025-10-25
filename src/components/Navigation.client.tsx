"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, Star } from "lucide-react";
import { useState } from "react";

interface NavigationProps {
  initialCartCount: number;
  initialFavoritesCount: number;
}

export default function Navigation({
  initialCartCount,
  initialFavoritesCount,
}: NavigationProps) {
  const pathname = usePathname();
  const [cartCount] = useState(initialCartCount);
  const [favoritesCount] = useState(initialFavoritesCount);

  // Note: In a real app, you might want to listen for updates
  // to cart and favorites and update these counts dynamically

  const isActive = (path: string) => pathname === path;

  const getLinkClassName = (path: string, isSpecial: boolean = false) => {
    const baseClasses = isSpecial
      ? "flex items-center gap-2 text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200"
      : "text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors";

    if (isActive(path)) {
      return `${baseClasses} bg-blue-50 text-blue-600 border border-blue-200`;
    }
    return baseClasses;
  };

  const getCartLinkClassName = () => {
    const baseClasses =
      "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200";

    if (isActive("/cart")) {
      return `${baseClasses} bg-blue-600 text-white border border-blue-700`;
    }

    if (cartCount > 0) {
      return `${baseClasses} bg-blue-50 text-blue-700 hover:bg-blue-100 hover:text-blue-800 border border-blue-200`;
    }

    return `${baseClasses} bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-300`;
  };

  return (
    <nav className="hidden md:flex space-x-2">
      <Link href="/" className={getLinkClassName("/")}>
        Home
      </Link>
      <Link href="/search" className={getLinkClassName("/search")}>
        Search
      </Link>
      <Link href="/starred" className={getLinkClassName("/starred", true)}>
        <Star
          className={`h-4 w-4 ${
            favoritesCount > 0 ? "fill-yellow-400 text-yellow-400" : ""
          }`}
        />
        <span>Favorites</span>
        {favoritesCount > 0 && (
          <span className="ml-1 bg-yellow-400 text-yellow-900 text-xs font-bold px-1.5 py-0.5 rounded-full">
            {favoritesCount}
          </span>
        )}
      </Link>
      <Link href="/cart" className={getCartLinkClassName()}>
        {cartCount > 0 ? (
          <ShoppingCart className="h-4 w-4 fill-current" />
        ) : (
          <ShoppingCart className="h-4 w-4" />
        )}
        <span>Cart</span>
        {cartCount > 0 && (
          <span className="ml-1 bg-white text-blue-700 text-xs font-bold px-1.5 py-0.5 rounded-full">
            {cartCount}
          </span>
        )}
      </Link>
      <Link href="/profile" className={getLinkClassName("/profile")}>
        Profile
      </Link>
      <Link href="/admin" className={getLinkClassName("/admin")}>
        Admin
      </Link>
    </nav>
  );
}
