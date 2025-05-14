// components/cart/OrderSummary.tsx
'use client';
import { Button } from '@/components/ui/button';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

import { useRouter } from 'next/navigation';
import { CartItem } from '@/hooks/cart/useCart';

interface Props {
  cartItems: CartItem[];
}

const calculateTotal = (items: CartItem[]) =>
  items.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0);

export const OrderSummary = ({ cartItems }: Props) => {
  const router = useRouter();
  const total = calculateTotal(cartItems);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
      <h2 className="text-lg font-medium mb-4">Order Summary</h2>
      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span>₹{total.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span>Calculated at checkout</span>
        </div>
        <div className="border-t pt-3 mt-3">
          <div className="flex justify-between font-medium text-base">
            <span>Total</span>
            <span>₹{total.toLocaleString()}</span>
          </div>
        </div>
      </div>
      <Button
        className="w-full mt-6 flex items-center justify-center gap-2"
        size="lg"
        onClick={() => router.push('/checkout')}
      >
        Proceed to Checkout
        <ArrowRightIcon className="h-4 w-4" />
      </Button>
    </div>
  );
};
