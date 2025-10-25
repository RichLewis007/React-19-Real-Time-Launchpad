import { db } from "@/lib/db";
import StarredProductsList from "./StarredProductsList";

export default async function StarredPage() {
  const userId = "demo_user"; // In a real app, this would come from authentication
  const starredProducts = await db.getStarredProducts(userId);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Favorites</h1>
        <p className="text-gray-600">
          Products you&apos;ve starred for easy access
        </p>
      </div>

      <StarredProductsList 
        initialProducts={starredProducts}
        userId={userId}
      />
    </div>
  );
}
