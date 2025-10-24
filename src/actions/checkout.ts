"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { ActionState } from "@/lib/types";

export async function checkout(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    const userId = String(formData.get("userId") || "demo_user");

    const cart = await db.getCart(userId);
    if (!cart || cart.items.length === 0) {
      return { ok: false, error: "Cart is empty" };
    }

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // In a real app, you would:
    // 1. Process payment
    // 2. Create order
    // 3. Update inventory
    // 4. Send confirmation email
    // 5. Clear cart

    // For demo purposes, we'll just clear the cart
    cart.items = [];
    cart.updatedAt = new Date();

    revalidatePath("/cart");
    revalidatePath("/");

    return { 
      ok: true, 
      data: { 
        message: "Order placed successfully!",
        orderId: `order_${Date.now()}`,
        total: cart.items.reduce((sum, item) => sum + (item.priceAtAddCents * item.quantity), 0)
      } 
    };
  } catch (error) {
    console.error("Checkout error:", error);
    return { 
      ok: false, 
      error: error instanceof Error ? error.message : "Failed to process checkout" 
    };
  }
}
