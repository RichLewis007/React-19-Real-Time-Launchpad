"use server";

import { db } from "@/lib/db";
import { revalidatePath, updateTag } from "next/cache";
import { ActionState } from "@/lib/types";

export async function updateQuantity(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    const productId = String(formData.get("productId"));
    const quantity = Number(formData.get("quantity"));
    const userId = String(formData.get("userId") || "demo_user");

    if (!productId) {
      return { ok: false, error: "Product ID is required" };
    }

    if (quantity < 0) {
      return { ok: false, error: "Quantity cannot be negative" };
    }

    const product = await db.getProduct(productId);
    if (!product) {
      return { ok: false, error: "Product not found" };
    }

    if (quantity > 0 && product.stock < quantity) {
      return { ok: false, error: "Not enough stock available" };
    }

    await db.updateCartItem(userId, productId, quantity);
    
    // Next.js 16: Use updateTag for immediate cache updates
    updateTag(`cart-${userId}`);
    updateTag(`product-${productId}`);
    
    revalidatePath("/cart");

    return { 
      ok: true, 
      data: { 
        message: quantity === 0 ? "Item removed from cart" : "Cart updated",
        productId,
        quantity 
      } 
    };
  } catch (error) {
    console.error("Update quantity error:", error);
    return { 
      ok: false, 
      error: error instanceof Error ? error.message : "Failed to update cart item" 
    };
  }
}
