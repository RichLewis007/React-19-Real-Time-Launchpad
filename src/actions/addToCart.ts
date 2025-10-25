"use server";

import { db } from "@/lib/db";
import { revalidatePath, updateTag } from "next/cache";
import { ActionState } from "@/lib/types";

export async function addToCart(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    const productId = String(formData.get("productId"));
    const quantity = Number(formData.get("quantity") || 1);
    const userId = String(formData.get("userId") || "demo_user");

    if (!productId) {
      return { ok: false, error: "Product ID is required" };
    }

    if (quantity <= 0) {
      return { ok: false, error: "Quantity must be greater than 0" };
    }

    const product = await db.getProduct(productId);
    if (!product) {
      return { ok: false, error: "Product not found" };
    }

    if (product.stock < quantity) {
      return { ok: false, error: "Not enough stock available" };
    }

    await db.addToCart(userId, productId, quantity);

    // Next.js 16: Use updateTag for read-your-writes semantics
    // This ensures the user sees their changes immediately
    updateTag(`cart-${userId}`);
    updateTag(`product-${productId}`);

    // Also revalidate paths for immediate UI updates
    revalidatePath("/cart");
    revalidatePath("/");

    return {
      ok: true,
      data: {
        message: `${quantity} ${product.title} added to cart`,
        productId,
        quantity,
      },
    };
  } catch (error) {
    console.error("Add to cart error:", error);
    return {
      ok: false,
      error:
        error instanceof Error ? error.message : "Failed to add item to cart",
    };
  }
}
