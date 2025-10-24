"use client";

import { useState, useEffect } from "react";
import ProductList from "@/components/ProductList";
import { simulateSlowResponse, getSlowMode } from "@/lib/slow";

interface SearchResultsProps {
  query: string;
}

export default function SearchResults({ query }: SearchResultsProps) {
  const [products, setProducts] = useState([]);
  const [starredProductIds, setStarredProductIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      
      try {
        // Import db dynamically to avoid server-side issues
        const { db } = await import("@/lib/db");
        
        const userId = "demo_user";
        let fetchedProducts;
        
        if (query.trim()) {
          fetchedProducts = await db.searchProducts(query);
          
          // Simulate slow response if slow mode is enabled
          if (getSlowMode()) {
            fetchedProducts = await simulateSlowResponse(fetchedProducts, 1500);
          }
        } else {
          fetchedProducts = await db.getProducts({ limit: 12 });
        }
        
        // Fetch starred products
        const starredProducts = await db.getStarredProducts(userId);
        const starredIds = starredProducts.map(p => p.id);
        
        setProducts(fetchedProducts);
        setStarredProductIds(starredIds);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
        setStarredProductIds([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [query]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
            <div className="aspect-square bg-gray-200"></div>
            <div className="p-4 space-y-2">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
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
      
      <ProductList products={products} starredProductIds={starredProductIds} />
    </div>
  );
}
