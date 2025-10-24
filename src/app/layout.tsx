import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ErrorBoundary } from "@/components/ErrorBoundary.client";
import { ShoppingCart } from "lucide-react";

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
  description: "A showcase of React 19 and Next.js features including Server Components, Suspense, Actions, and optimistic updates",
  keywords: ["React 19", "Next.js", "Server Components", "Suspense", "E-commerce"],
  authors: [{ name: "Rich Lewis" }],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}
      >
        <ErrorBoundary>
          <div className="min-h-screen flex flex-col">
            <header className="bg-white shadow-sm border-b">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                  <div className="flex items-center">
                    <h1 className="text-xl font-bold text-gray-900">
                      Real-Time Launchpad
                    </h1>
                  </div>
                  <nav className="hidden md:flex space-x-8">
                    <a href="/" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                      Home
                    </a>
                    <a href="/search" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                      Search
                    </a>
                    <a href="/starred" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                      Favorites
                    </a>
                    <a href="/cart" className="flex items-center gap-2 bg-blue-50 text-blue-700 hover:bg-blue-100 hover:text-blue-800 px-4 py-2 rounded-lg text-sm font-semibold border border-blue-200 transition-all duration-200">
                      <ShoppingCart className="h-4 w-4" />
                      Cart
                    </a>
                    <a href="/profile" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                      Profile
                    </a>
                    <a href="/admin" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                      Admin
                    </a>
                  </nav>
                </div>
              </div>
            </header>
            
            <main className="flex-1">
              {children}
            </main>
            
            <footer className="bg-white border-t">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="text-center text-gray-600">
                  <p>Real-Time Launchpad - Demonstrating React 19 & Next.js 16 Features</p>
                  <p className="text-sm mt-2">
                    Built by Rich Lewis with React 19, Next.js 16, Server Components, Suspense, and Actions
                  </p>
                  <p className="text-xs mt-2 text-gray-500">
                    Images by <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">Unsplash</a>
                  </p>
                </div>
              </div>
            </footer>
          </div>
        </ErrorBoundary>
      </body>
    </html>
  );
}
