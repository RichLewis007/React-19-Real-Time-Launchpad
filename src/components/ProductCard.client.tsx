"use client";

import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { ShoppingCart, Star } from "lucide-react";
import { OptimisticStar } from "./OptimisticStar.client";
import { addToCart } from "@/actions/addToCart";
import { useActionState, useEffect } from "react";
import { useId } from "react";
import ImageWithFallback from "./ImageWithFallback.client";
import { useCart } from "./CartProvider";

/**
 * ProductCard Component
 *
 * This component demonstrates several key React 19 patterns:
 * 1. Server Actions integration with useActionState
 * 2. Optimistic updates for the star/favorite functionality
 * 3. Form handling without traditional API endpoints
 * 4. Responsive design with Tailwind CSS
 *
 * Why I built it this way:
 * - useActionState provides built-in loading states and error handling
 * - OptimisticStar shows immediate feedback while server processes the request
 * - Form submission is handled by Server Actions, no need for fetch requests
 * - The component is self-contained with all its functionality
 */

interface ProductCardProps {
  product: Product;
  initialStarred?: boolean;
  priority?: boolean;
}

export default function ProductCard({
  product,
  initialStarred = false,
  priority = false,
}: ProductCardProps) {
  // useActionState is a React 19 hook that manages form state for Server Actions
  // It provides the current state and an action function that can be used in forms
  // The second parameter is the initial state
  const [state, formAction] = useActionState(addToCart, { ok: false });
  const { incrementCart } = useCart();

  // useId generates unique IDs for form elements to avoid conflicts
  // This is especially important when multiple ProductCards are rendered
  // Note: Currently unused but kept for future use
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _formId = useId();

  // Update cart count when add to cart succeeds
  useEffect(() => {
    if (state.ok && state.data) {
      // Get quantity from the response or default to 1
      const quantity = state.data.quantity || 1;
      incrementCart(quantity);
    }
  }, [state.ok, state.data, incrementCart]);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
      {/* Product Image */}
      <div className="aspect-square bg-gray-100 relative overflow-hidden">
        {/* Product images are sourced from Unsplash (https://unsplash.com) */}
        <ImageWithFallback
          src={product.images[0] || "/placeholder-product.svg"}
          alt={product.title}
          width={400}
          height={400}
          className="w-full h-full object-cover"
          fallbackSrc="/placeholder-product.svg"
          loading={priority ? "eager" : "lazy"}
        />
        {/* OptimisticStar demonstrates React 19's optimistic updates pattern */}
        {/* It shows immediate feedback when clicked, then reverts if the server request fails */}
        <div className="absolute top-2 right-2">
          <OptimisticStar
            productId={product.id}
            initialStarred={initialStarred}
            className="bg-white/80 backdrop-blur-sm"
          />
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
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
            {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
          </span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {product.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Add to Cart Form - demonstrates Server Actions integration */}
        {/* The form's action attribute points to the Server Action function */}
        {/* No need for fetch requests, event handlers, or complex state management */}
        <form action={formAction} className="space-y-2">
          {/* Hidden inputs provide data to the Server Action */}
          <input type="hidden" name="productId" value={product.id} />
          <input type="hidden" name="userId" value="demo_user" />

          <div className="flex items-center space-x-2">
            <input
              type="number"
              name="quantity"
              min="1"
              max={product.stock}
              defaultValue="1"
              className="w-16 px-2 py-1 border border-gray-300 rounded text-center"
              disabled={product.stock === 0}
            />
            <button
              type="submit"
              disabled={product.stock === 0}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
            >
              <ShoppingCart className="h-4 w-4" />
              <span>
                {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
              </span>
            </button>
          </div>
        </form>

        {/* Status Messages - automatically provided by useActionState */}
        {/* These show success/error feedback from the Server Action */}
        {!state.ok && state.error && (
          <div className="text-red-600 text-sm mt-2">{state.error}</div>
        )}
        {state.ok && (
          <div className="text-green-600 text-sm mt-2">
            {state.data?.message}
          </div>
        )}
      </div>
    </div>
  );
}
