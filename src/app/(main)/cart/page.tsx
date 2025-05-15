

'use client'
import { useCart } from '@/hooks/cart/useCart';
import { CartItemList } from '@/components/cart/CartItemList';
import { OrderSummary } from '@/components/cart/OrderSummary';
import { Spinner } from '@/components/ui/spinner';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function CartPage() {
  const { cartItems, loading, removeFromCart } = useCart();
  const router = useRouter();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Spinner size={40} />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4">
      

        {cartItems.length === 0 ? (
          <div className=" rounded-lg  p-12 text-center">
            <div className="flex justify-center mb-6">
              <Image src="/assets/empty_cart.svg"  loading="lazy" height={350} width={350} alt='Empty Cart' />
            </div>
            <h2 className="text-2xl font-semibold mb-3">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">Looks like you haven't added any products yet.</p>
            <Button onClick={() => router.push('/')} size="lg" className="px-6">
              Continue Shopping
            </Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
              <CartItemList cartItems={cartItems} onRemove={removeFromCart} />
            </div>
            <div className="md:col-span-1">
              <OrderSummary cartItems={cartItems} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
