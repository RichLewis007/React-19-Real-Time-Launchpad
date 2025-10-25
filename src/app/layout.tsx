import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ErrorBoundary } from "@/components/ErrorBoundary.client";
import Navigation from "@/components/Navigation.client";
import { CartProvider } from "@/components/CartProvider";
import { db } from "@/lib/db";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Real-Time Launchpad - Modern E-commerce Demo",
  description:
    "A showcase of React 19 and Next.js features including Server Components, Suspense, Actions, and optimistic updates",
  keywords: [
    "React 19",
    "Next.js",
    "Server Components",
    "Suspense",
    "E-commerce",
  ],
  authors: [{ name: "Rich Lewis" }],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Get initial counts for cart and favorites
  const userId = "demo_user";
  const [cart, starredProducts] = await Promise.all([
    db.getCart(userId),
    db.getStarredProducts(userId),
  ]);

  const cartCount =
    cart?.items.reduce((sum, item) => sum + item.quantity, 0) ?? 0;
  const favoritesCount = starredProducts.length;

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}
        data-cart-count={cartCount}
        data-favorites-count={favoritesCount}
      >
        <ErrorBoundary>
          <CartProvider
            initialCartCount={cartCount}
            initialFavoritesCount={favoritesCount}
          >
            <div className="min-h-screen flex flex-col">
              <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                      <h1 className="text-xl font-bold text-gray-900">
                        Real-Time Launchpad
                      </h1>
                    </div>
                    <Navigation />
                  </div>
                </div>
              </header>

              <main className="flex-1">{children}</main>

              <footer className="bg-white border-t">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                  <div className="text-center text-gray-600">
                    <p>
                      Real-Time Launchpad - Demonstrating React 19 & Next.js 16
                      Features
                    </p>
                    <p className="text-sm mt-2">
                      Built by Rich Lewis with React 19, Next.js 16, Server
                      Components, Suspense, and Actions
                    </p>
                    <p className="text-xs mt-2 text-gray-500">
                      Images by{" "}
                      <a
                        href="https://unsplash.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700"
                      >
                        Unsplash
                      </a>
                    </p>
                  </div>
                </div>
              </footer>
            </div>
          </CartProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
