"use client";

import { useState, useDeferredValue, Suspense } from "react";
import ClientSearchBox from "@/components/ClientSearchBox.client";
import SearchResults from "./SearchResults";
import { ErrorBoundary } from "@/components/ErrorBoundary.client";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Search Products
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Experience real-time search with React 19's useTransition and useDeferredValue for smooth, responsive interactions.
        </p>
      </div>

      <div className="max-w-2xl mx-auto mb-8">
        <ClientSearchBox onQuery={setQuery} />
      </div>

      <ErrorBoundary>
        <Suspense fallback={
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
        }>
          <SearchResults query={deferredQuery} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
