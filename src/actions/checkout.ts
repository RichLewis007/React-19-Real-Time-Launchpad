"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
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

    // Calculate total before clearing cart
    const total = cart.items.reduce(
      (sum, item) => sum + item.priceAtAddCents * item.quantity,
      0
    );
    const orderId = `order_${Date.now()}`;

    console.log("Checkout debug:", {
      orderId,
      total,
      itemCount: cart.items.length,
    });

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

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

    // Construct URL with proper encoding
    const successUrl = `/checkout/success?orderId=${encodeURIComponent(orderId)}&total=${encodeURIComponent(total.toString())}`;
    console.log("Redirecting to:", successUrl);

    // Redirect to success page with order details
    redirect(successUrl);
  } catch (error) {
    // Check if this is a redirect (which is expected)
    if (
      error &&
      typeof error === "object" &&
      "digest" in error &&
      typeof error.digest === "string" &&
      error.digest.includes("NEXT_REDIRECT")
    ) {
      // This is a redirect, not an error - re-throw it
      throw error;
    }

    console.error("Checkout error:", error);
    return {
      ok: false,
      error:
        error instanceof Error ? error.message : "Failed to process checkout",
    };
  }
}
