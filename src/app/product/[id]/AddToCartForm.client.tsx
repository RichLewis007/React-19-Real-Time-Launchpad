"use client";

import { useActionState, useEffect } from "react";
import { addToCart } from "@/actions/addToCart";
import FormButton from "@/components/FormButton.client";
import { Product } from "@/lib/types";
import { useCart } from "@/components/CartProvider";

interface AddToCartFormProps {
  product: Product;
}

export default function AddToCartForm({ product }: AddToCartFormProps) {
  const [state, formAction] = useActionState(addToCart, { ok: false });
  const { incrementCart } = useCart();

  // Update cart count after successful add
  useEffect(() => {
    if (state.ok && state.data) {
      // Get quantity from the form or default to 1
      const quantity = state.data.quantity || 1;
      incrementCart(quantity);
    }
  }, [state.ok, state.data, incrementCart]);

  const handleSubmit = async (formData: FormData) => {
    formAction(formData);
  };

  return (
    <div className="space-y-4">
      <form action={handleSubmit} className="space-y-4">
        <input type="hidden" name="productId" value={product.id} />
        <input type="hidden" name="userId" value="demo_user" />

        <div className="flex items-center space-x-4">
          <div>
            <label
              htmlFor="quantity"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              min="1"
              max={product.stock}
              defaultValue="1"
              className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={product.stock === 0}
            />
          </div>
          <div className="flex-1">
            <FormButton className="w-full" disabled={product.stock === 0}>
              {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
            </FormButton>
          </div>
        </div>
      </form>

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
