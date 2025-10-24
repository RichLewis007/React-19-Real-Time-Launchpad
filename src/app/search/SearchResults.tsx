import { db } from "@/lib/db";
import ProductList from "@/components/ProductList";
import { simulateSlowResponse, getSlowMode } from "@/lib/slow";

interface SearchResultsProps {
  query: string;
}

export default async function SearchResults({ query }: SearchResultsProps) {
  let products;

  if (query.trim()) {
    products = await db.searchProducts(query);
    
    // Simulate slow response if slow mode is enabled
    if (getSlowMode()) {
      products = await simulateSlowResponse(products, 1500);
    }
  } else {
    products = await db.getProducts({ limit: 12 });
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">
          {query.trim() ? `Search Results for "${query}"` : "All Products"}
        </h2>
        <span className="text-gray-600">
          {products.length} {products.length === 1 ? "product" : "products"} found
        </span>
      </div>
      
      <ProductList products={products} />
    </div>
  );
}
