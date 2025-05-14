// hooks/useCart.ts
import { useEffect, useState } from 'react';

export interface CartItem {
  productId: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    price: number;
    imageUrl?: string;
  } | null;
}

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

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

  const removeFromCart = async (productId: string) => {
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

  return {
    cartItems,
    loading,
    removeFromCart,
  };
};
