"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { ActionState } from "@/lib/types";

export async function updateProfile(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    const userId = String(formData.get("userId") || "demo_user");
    const name = String(formData.get("name"));
    const email = String(formData.get("email"));
    const notifications = formData.get("notifications") === "on";
    const theme = String(formData.get("theme")) as "light" | "dark" | "system";

    if (!name || !email) {
      return { ok: false, error: "Name and email are required" };
    }

    const user = await db.getUser(userId);
    if (!user) {
      return { ok: false, error: "User not found" };
    }

    // Update user preferences
    await db.updateUserPreferences(userId, {
      notifications,
      theme,
    });

    // In a real app, you would update the user's name and email in the database
    user.name = name;
    user.email = email;

    revalidatePath("/profile");

    return {
      ok: true,
      data: {
        message: "Profile updated successfully",
        user: {
          name,
          email,
          notifications,
          theme,
        },
      },
    };
  } catch (error) {
    console.error("Update profile error:", error);
    return {
      ok: false,
      error:
        error instanceof Error ? error.message : "Failed to update profile",
    };
  }
}

export async function toggleStar(productId: string): Promise<boolean> {
  try {
    const userId = "demo_user"; // In a real app, this would come from authentication

    // Check if product is already starred
    const isStarred = await db.isProductStarred(userId, productId);

    let success = false;
    if (isStarred) {
      // Remove from starred
      success = await db.removeFromStarred(userId, productId);
    } else {
      // Add to starred
      success = await db.addToStarred(userId, productId);
    }

    if (success) {
      // Revalidate pages that show starred products
      revalidatePath("/");
      revalidatePath("/search");
      revalidatePath("/starred");
    }

    return success;
  } catch (error) {
    console.error("Toggle star error:", error);
    return false;
  }
}

export async function removeFromStarred(productId: string): Promise<boolean> {
  try {
    const userId = "demo_user"; // In a real app, this would come from authentication
    return await db.removeFromStarred(userId, productId);
  } catch (error) {
    console.error("Remove from starred error:", error);
    return false;
  }
}
