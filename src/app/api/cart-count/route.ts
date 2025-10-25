import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const userId = "demo_user";
    const cart = await db.getCart(userId);
    const count =
      cart?.items.reduce((sum, item) => sum + item.quantity, 0) ?? 0;

    return NextResponse.json({ count });
  } catch (error) {
    console.error("Error fetching cart count:", error);
    return NextResponse.json(
      { error: "Failed to fetch cart count" },
      { status: 500 }
    );
  }
}
