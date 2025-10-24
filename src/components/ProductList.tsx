import { Product } from "@/lib/types";
import ProductCard from "./ProductCard.client";

interface ProductListProps {
  products: Product[];
  starredProductIds?: string[];
}

export default function ProductList({ products, starredProductIds = [] }: ProductListProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg">
          No products available
        </div>
        <div className="text-gray-400 text-sm mt-2">
          Try adjusting your search or filters
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard 
          key={product.id} 
          product={product} 
          initialStarred={starredProductIds.includes(product.id)}
        />
      ))}
    </div>
  );
}
