

'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Spinner } from "@/components/ui/spinner";
import { ShoppingCart, Trash2, ArrowRight, Package } from 'lucide-react';

interface CartItem {
  productId: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    price: number;
    imageUrl?: string;
  } | null;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await fetch('/api/v1/store/cart');
        const data = await res.json();
        if (res.ok) {
          setCartItems(data.items);
        } else {
          console.error('Failed to load cart:', data.error);
        }
      } catch (err) {
        console.error('Error fetching cart:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  const handleRemove = async (productId: string) => {
    try {
      const res = await fetch('/api/v1/store/cart/remove', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId }),
      });
      const result = await res.json();
      if (res.ok) {
        setCartItems((prev) => prev.filter((item) => item.productId !== productId));
      } else {
        console.error('Remove failed:', result.error);
      }
    } catch (err) {
      console.error('Error removing item:', err);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => {
      return sum + (item.product?.price || 0) * item.quantity;
    }, 0);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 ">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <ShoppingCart className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold tracking-tight">Cart</h1>
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <div className="flex justify-center mb-6">
              <Package className="h-16 w-16 text-gray-300" />
            </div>
            <h2 className="text-2xl font-semibold mb-3">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">Looks like you haven't added any products to your cart yet.</p>
            <Button 
              onClick={() => router.push('/')}
              size="lg"
              className="px-6"
            >
              Continue Shopping
            </Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-medium mb-4">Items ({cartItems.length})</h2>
                <div className="divide-y">
                  {cartItems.map((item) => (
                    <div key={item.productId} className="py-4 flex items-center">
                      <div className="flex-shrink-0 mr-4">
                        {item.product?.imageUrl ? (
                          <div className="relative h-24 w-24 overflow-hidden rounded-md border bg-gray-100">
                            <Image
                              src={item.product.imageUrl}
                              alt={item.product.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <div className="h-24 w-24 bg-gray-100 flex items-center justify-center rounded-md">
                            <span className="text-xs text-gray-500">No Image</span>
                          </div>
                        )}
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-medium text-gray-900">
                          {item.product?.name ?? 'Product unavailable'}
                        </h3>
                        <div className="mt-1 flex items-center text-sm text-gray-500">
                          <span className="mr-2">Quantity: {item.quantity}</span>
                          {item.product && (
                            <span className="font-medium text-gray-800">
                              ₹{item.product.price.toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="ml-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemove(item.productId)}
                          className="text-red-600 hover:text-red-800 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="md:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
                <h2 className="text-lg font-medium mb-4">Order Summary</h2>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>₹{calculateTotal().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between font-medium text-base">
                      <span>Total</span>
                      <span>₹{calculateTotal().toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                <Button 
                  className="w-full mt-6 flex items-center justify-center gap-2"
                  size="lg"
                  onClick={() => router.push('/checkout')}
                >
                  Proceed to Checkout
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}