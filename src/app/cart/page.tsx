import { db } from "@/lib/db";
import { formatPrice } from "@/lib/utils";
import { ErrorBoundary } from "@/components/ErrorBoundary.client";
import { ShoppingCart } from "lucide-react";
import CartItem from "./CartItem.client";
import CheckoutForm from "./CheckoutForm.client";

export default async function CartPage() {
  const cart = await db.getCart("demo_user");
  const cartItems = cart?.items || [];

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <ShoppingCart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">
            Add some products to get started!
          </p>
          <a
            href="/search"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            Start Shopping
          </a>
        </div>
      </div>
    );
  }

  const total = cartItems.reduce(
    (sum, item) => sum + (item.priceAtAddCents * item.quantity),
    0
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
        <p className="text-gray-600">
          Review your items and proceed to checkout
        </p>
      </div>

      <ErrorBoundary>
        <div className="space-y-6">
          {await Promise.all(cartItems.map(async (item) => {
            const product = await db.getProduct(item.productId);
            if (!product) return null;

            return <CartItem key={item.productId} item={item} product={product} />;
          }))}

          {/* Cart Summary */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center text-lg font-semibold">
              <span>Total:</span>
              <span>{formatPrice(total)}</span>
            </div>
            
            <CheckoutForm />
          </div>
        </div>
      </ErrorBoundary>
    </div>
  );
}
