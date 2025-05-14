// 'use client';

// import { useEffect, useState } from 'react';
// import { Skeleton } from '@/components/ui/skeleton';
// import ProductCard from '@/components/wishlist/ProductCard_WL'
// import { Product } from '@/types/store/types';


// export default function WishlistPage() {
//   const [wishlist, setWishlist] = useState<Product[] | null>(null);

//   const fetchWishlist = async () => {
//     const res = await fetch('/api/v1/store/products/wishlist');
//     if (res.ok) {
//       const data = await res.json();
//       setWishlist(data.wishlist);
//     } else {
//       console.error('Failed to fetch wishlist');
//     }
//   };

//   useEffect(() => {
//     fetchWishlist();
//   }, []);

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h1 className="text-2xl font-semibold mb-4">My Wishlist</h1>
//       {wishlist === null ? (
//         <div className="grid gap-4">
//           {[1, 2, 3].map((i) => (
//             <Skeleton key={i} className="h-24 w-full rounded-lg" />
//           ))}
//         </div>
//       ) : wishlist.length === 0 ? (
//         <p className="text-muted-foreground">You have no items in your wishlist.</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//           {wishlist.map((item) => (
//            <ProductCard key={item.productId} product={item} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }


'use client';

import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import ProductCard from '@/components/wishlist/ProductCard_WL'
import { Product } from '@/types/store/types';
import { handleRemoveFromWishlist } from '@/hooks/store/useWishlist';


export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<Product[] | null>(null);

  const fetchWishlist = async () => {
    const res = await fetch('/api/v1/store/products/wishlist');
    if (res.ok) {
      const data = await res.json();
      setWishlist(data.wishlist);
    } else {
      console.error('Failed to fetch wishlist');
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const handleRemove = async (productId: string) => {
  try {
    await handleRemoveFromWishlist(productId);
    // Optimistically update UI
    setWishlist((prev) => prev?.filter((item) => item.productId !== productId) || []);
  } catch (error) {
    console.error("Failed to remove product:", error);
  }
};

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">My Wishlist</h1>
      {wishlist === null ? (
        <div className="grid gap-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-24 w-full rounded-lg" />
          ))}
        </div>
      ) : wishlist.length === 0 ? (
        <p className="text-muted-foreground">You have no items in your wishlist.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {wishlist.map((item) => (
           <ProductCard key={item.productId} product={item} onRemove={handleRemove} />

          ))}
        </div>
      )}
    </div>
  );
}
