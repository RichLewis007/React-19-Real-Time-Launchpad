"use client";

import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { ShoppingCart, Star } from "lucide-react";
import { OptimisticStar } from "./OptimisticStar.client";
import { addToCart } from "@/actions/addToCart";
import { useActionState } from "react";
import { useId } from "react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [state, formAction] = useActionState(addToCart, { ok: false });
  const formId = useId();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
      {/* Product Image */}
      <div className="aspect-square bg-gray-100 relative overflow-hidden">
        <img
          src={product.images[0] || "/placeholder-product.svg"}
          alt={product.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute top-2 right-2">
          <OptimisticStar 
            productId={product.id} 
            initialStarred={false}
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

        {/* Add to Cart Form */}
        <form action={formAction} className="space-y-2">
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
              <span>{product.stock === 0 ? "Out of Stock" : "Add to Cart"}</span>
            </button>
          </div>
        </form>

        {/* Status Messages */}
        {!state.ok && state.error && (
          <div className="text-red-600 text-sm mt-2">
            {state.error}
          </div>
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
