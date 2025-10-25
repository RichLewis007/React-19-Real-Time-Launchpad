import { NextResponse } from "next/server";
import { getFavoritesCount } from "@/actions/updateProfile";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const count = await getFavoritesCount();
    return NextResponse.json({ count });
  } catch (error) {
    console.error("Error fetching favorites count:", error);
    return NextResponse.json(
      { error: "Failed to fetch favorites count" },
      { status: 500 }
    );
  }
}
