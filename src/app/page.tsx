import { Suspense } from "react";
import { db } from "@/lib/db";
import ProductList from "@/components/ProductList";
import { ErrorBoundary } from "@/components/ErrorBoundary.client";
import { TrendingUp, Sparkles, Loader2 } from "lucide-react";

// Server Component for trending products
async function TrendingProducts() {
  const products = await db.getTrendingProducts();
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
        <TrendingUp className="h-6 w-6 text-blue-600" />
        Trending Now
      </h2>
      <ProductList products={products} />
    </div>
  );
}

// Server Component for recommended products
async function RecommendedProducts() {
  const products = await db.getRecommendedProducts("demo_user");
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
        <Sparkles className="h-6 w-6 text-purple-600" />
        Recommended for You
      </h2>
      <ProductList products={products} />
    </div>
  );
}

// Loading component for Suspense
function SectionSkeleton({ title }: { title: string }) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
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
    </div>
  );
}

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to Real-Time Launchpad
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Experience the future of e-commerce with React 19's latest features: 
          Server Components, Suspense streaming, and optimistic updates.
        </p>
      </div>

      {/* Featured Products Grid */}
      <div className="space-y-12">
        {/* Trending Products with Suspense */}
        <ErrorBoundary>
          <Suspense fallback={<SectionSkeleton title="Trending Now" />}>
            <TrendingProducts />
          </Suspense>
        </ErrorBoundary>

        {/* Recommended Products with Suspense */}
        <ErrorBoundary>
          <Suspense fallback={<SectionSkeleton title="Recommended for You" />}>
            <RecommendedProducts />
          </Suspense>
        </ErrorBoundary>
      </div>

      {/* Features Showcase */}
      <div className="mt-16 bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          React 19 Features Showcase
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="text-center p-4">
            <div className="bg-blue-100 rounded-full p-3 w-12 h-12 mx-auto mb-3 flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Server Components</h3>
            <p className="text-gray-600 text-sm">
              Product listings are rendered on the server for better performance and SEO.
            </p>
          </div>
          <div className="text-center p-4">
            <div className="bg-purple-100 rounded-full p-3 w-12 h-12 mx-auto mb-3 flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Suspense Streaming</h3>
            <p className="text-gray-600 text-sm">
              Sections load progressively with streaming for faster perceived performance.
            </p>
          </div>
          <div className="text-center p-4">
            <div className="bg-green-100 rounded-full p-3 w-12 h-12 mx-auto mb-3 flex items-center justify-center">
              <Loader2 className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Optimistic Updates</h3>
            <p className="text-gray-600 text-sm">
              Instant UI feedback with automatic rollback on errors.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
