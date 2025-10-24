// Demo utilities for testing the application

import { db } from './db';

export async function seedDemoData() {
  // Add some items to the demo user's cart for testing
  try {
    await db.addToCart("demo_user", "p_1", 2);
    await db.addToCart("demo_user", "p_3", 1);
    await db.addToCart("demo_user", "p_5", 1);
    
    console.log("Demo data seeded successfully!");
    return true;
  } catch (error) {
    console.error("Error seeding demo data:", error);
    return false;
  }
}

export async function clearDemoData() {
  // Clear the demo user's cart
  try {
    const cart = await db.getCart("demo_user");
    if (cart) {
      cart.items = [];
      cart.updatedAt = new Date();
    }
    
    console.log("Demo data cleared successfully!");
    return true;
  } catch (error) {
    console.error("Error clearing demo data:", error);
    return false;
  }
}

// Auto-seed demo data on module load (for development)
if (typeof window === 'undefined') {
  seedDemoData();
}
