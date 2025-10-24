import { Suspense } from "react";
import { db } from "@/lib/db";
import ProductList from "@/components/ProductList";
import { ErrorBoundary } from "@/components/ErrorBoundary.client";
import { TrendingUp, Sparkles, Loader2 } from "lucide-react";
import Image from "next/image";

// Server Component for trending products
async function TrendingProducts() {
  const userId = "demo_user";
  const [products, starredProducts] = await Promise.all([
    db.getTrendingProducts(),
    db.getStarredProducts(userId)
  ]);
  const starredProductIds = starredProducts.map(p => p.id);
  
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
        <TrendingUp className="h-6 w-6 text-blue-600" />
        Trending Now
      </h2>
      <ProductList products={products} starredProductIds={starredProductIds} />
    </div>
  );
}

// Server Component for recommended products
async function RecommendedProducts() {
  const userId = "demo_user";
  const [products, starredProducts] = await Promise.all([
    db.getRecommendedProducts(userId),
    db.getStarredProducts(userId)
  ]);
  const starredProductIds = starredProducts.map(p => p.id);
  
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
        <Sparkles className="h-6 w-6 text-purple-600" />
        Recommended for You
      </h2>
      <ProductList products={products} starredProductIds={starredProductIds} />
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
      <div className="relative mb-12">
        <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
          {/* Colorful gradient background - less pink */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-blue-500 to-orange-400"></div>
          
          {/* Animated background elements */}
          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-20 h-20 bg-white/20 rounded-full animate-drift-1"></div>
            <div className="absolute top-20 right-20 w-16 h-16 bg-yellow-300/30 rounded-full animate-drift-2"></div>
            <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-cyan-300/40 rounded-full animate-drift-3"></div>
            <div className="absolute bottom-10 right-1/3 w-8 h-8 bg-green-300/50 rounded-full animate-drift-4"></div>
          </div>
          
          {/* Hero content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white px-6">
              <div className="inline-block mb-4">
                <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-white/20 backdrop-blur-sm border border-white/30">
                  🚀 React 19 Demo
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-yellow-200 to-pink-200 bg-clip-text text-transparent">
                Real-Time Launchpad
              </h1>
              <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8 text-white/90 leading-relaxed">
                Experience the future of e-commerce with React 19's latest features: 
                <span className="font-semibold text-yellow-200"> Server Components</span>, 
                <span className="font-semibold text-cyan-200"> Suspense streaming</span>, and 
                <span className="font-semibold text-pink-200"> optimistic updates</span>.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/search" 
                  className="inline-flex items-center px-8 py-4 bg-white text-purple-600 font-bold rounded-full hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  🛍️ Start Shopping
                </a>
                <a 
                  href="/starred" 
                  className="inline-flex items-center px-8 py-4 bg-white/20 backdrop-blur-sm text-white font-bold rounded-full hover:bg-white/30 transition-all duration-300 transform hover:scale-105 border border-white/30"
                >
                  ⭐ View Favorites
                </a>
              </div>
            </div>
          </div>
        </div>
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
