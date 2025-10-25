"use client";

import { useState, useTransition } from "react";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { ShoppingCart, Star, Trash2 } from "lucide-react";
import { addToCart } from "@/actions/addToCart";
import { removeFromStarred } from "@/actions/updateProfile";
import { useActionState } from "react";
import ImageWithFallback from "@/components/ImageWithFallback.client";

interface StarredProductsListProps {
  initialProducts: Product[];
  userId: string;
}

export default function StarredProductsList({
  initialProducts,
  userId,
}: StarredProductsListProps) {
  const [products, setProducts] = useState(initialProducts);
  const [isPending, startTransition] = useTransition();
  const [, addToCartAction] = useActionState(addToCart, { ok: false });

  const handleRemoveFromStarred = (productId: string) => {
    startTransition(async () => {
      try {
        const success = await removeFromStarred(productId);
        if (success) {
          setProducts((prev) => prev.filter((p) => p.id !== productId));
        }
      } catch (error) {
        console.error("Error removing from starred:", error);
      }
    });
  };

  const handleAddToCart = (productId: string) => {
    startTransition(() => {
      const formData = new FormData();
      formData.append("productId", productId);
      formData.append("quantity", "1");
      formData.append("userId", userId);

      addToCartAction(formData);
    });
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <Star className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          No Favorites Yet
        </h3>
        <p className="text-gray-600 mb-6">
          Star products you like to see them here for easy access.
        </p>
        <a
          href="/search"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
        >
          Browse Products
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">
          {products.length} {products.length === 1 ? "Favorite" : "Favorites"}
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
          >
            {/* Product Image */}
            <div className="aspect-square bg-gray-100 relative overflow-hidden">
              <ImageWithFallback
                src={product.images[0] || "/placeholder-product.svg"}
                alt={product.title}
                width={400}
                height={400}
                className="w-full h-full object-cover"
                fallbackSrc="/placeholder-product.svg"
              />

              {/* Remove from starred button */}
              <div className="absolute top-2 right-2">
                <button
                  onClick={() => handleRemoveFromStarred(product.id)}
                  disabled={isPending}
                  className="bg-white/80 backdrop-blur-sm rounded-md p-2 hover:bg-white transition-colors disabled:opacity-50"
                  title="Remove from favorites"
                >
                  <Trash2 className="h-5 w-5 text-red-500" />
                </button>
              </div>
            </div>

            {/* Product Info */}
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                {product.title}
              </h3>

              <div className="flex items-center mb-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600 ml-2">
                  {product.rating.toFixed(1)}
                </span>
              </div>

              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl font-bold text-gray-900">
                  {formatPrice(product.priceCents)}
                </span>
                <span className="text-sm text-gray-500">
                  {product.stock > 0
                    ? `${product.stock} in stock`
                    : "Out of stock"}
                </span>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={() => handleAddToCart(product.id)}
                disabled={product.stock === 0 || isPending}
                className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
