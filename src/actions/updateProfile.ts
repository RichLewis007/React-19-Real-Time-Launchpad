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
    console.log("toggleStar: Starting for productId:", productId);

    // Check if product is already starred
    const isStarred = await db.isProductStarred(userId, productId);
    console.log("toggleStar: isStarred =", isStarred);

    let success = false;
    if (isStarred) {
      // Remove from starred
      console.log("toggleStar: Removing from starred");
      success = await db.removeFromStarred(userId, productId);
    } else {
      // Add to starred
      console.log("toggleStar: Adding to starred");
      success = await db.addToStarred(userId, productId);
    }
    console.log("toggleStar: success =", success);

    if (success) {
      // Verify the change
      const verifyStarred = await db.isProductStarred(userId, productId);
      console.log(
        "toggleStar: After update, isProductStarred =",
        verifyStarred
      );

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

export async function getFavoritesCount(): Promise<number> {
  try {
    const userId = "demo_user";
    const user = await db.getUser(userId);
    console.log("getFavoritesCount: user exists?", !!user);
    if (user) {
      console.log("getFavoritesCount: starredProducts =", user.starredProducts);
    }
    const starredProducts = await db.getStarredProducts(userId);
    console.log("getFavoritesCount: returning count:", starredProducts.length);
    return starredProducts.length;
  } catch (error) {
    console.error("Get favorites count error:", error);
    return 0;
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
