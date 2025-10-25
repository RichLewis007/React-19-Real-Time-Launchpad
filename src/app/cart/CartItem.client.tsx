"use client";

import { useActionState } from "react";
import { updateQuantity } from "@/actions/updateQuantity";
import { formatPrice } from "@/lib/utils";
import { Product, CartItem as CartItemType } from "@/lib/types";
import { Trash2, Minus, Plus } from "lucide-react";

interface CartItemProps {
  item: CartItemType;
  product: Product;
}

export default function CartItem({ item, product }: CartItemProps) {
  const [state, formAction] = useActionState(updateQuantity, { ok: false });

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center space-x-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.images[0] || "/placeholder-product.svg"}
          alt={product.title}
          className="w-20 h-20 object-cover rounded-lg"
        />
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">
            {product.title}
          </h3>
          <p className="text-gray-600">
            {formatPrice(item.priceAtAddCents)} each
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <form action={formAction} className="flex items-center space-x-2">
            <input type="hidden" name="productId" value={item.productId} />
            <input type="hidden" name="userId" value="demo_user" />
            <input
              type="hidden"
              name="quantity"
              value={Math.max(0, item.quantity - 1)}
            />
            <button
              type="submit"
              disabled={item.quantity <= 1}
              className="p-1 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Minus className="h-4 w-4" />
            </button>
          </form>

          <span className="text-lg font-medium min-w-[2rem] text-center">
            {item.quantity}
          </span>

          <form action={formAction} className="flex items-center space-x-2">
            <input type="hidden" name="productId" value={item.productId} />
            <input type="hidden" name="userId" value="demo_user" />
            <input type="hidden" name="quantity" value={item.quantity + 1} />
            <button
              type="submit"
              disabled={item.quantity >= product.stock}
              className="p-1 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus className="h-4 w-4" />
            </button>
          </form>

          <div className="text-right">
            <div className="text-lg font-semibold text-gray-900">
              {formatPrice(item.priceAtAddCents * item.quantity)}
            </div>
          </div>

          <form action={formAction}>
            <input type="hidden" name="productId" value={item.productId} />
            <input type="hidden" name="userId" value="demo_user" />
            <input type="hidden" name="quantity" value="0" />
            <button
              type="submit"
              className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Status Messages */}
      {!state.ok && state.error && (
        <div className="text-red-600 text-sm mt-2">{state.error}</div>
      )}
      {state.ok && (
        <div className="text-green-600 text-sm mt-2">{state.data?.message}</div>
      )}
    </div>
  );
}
