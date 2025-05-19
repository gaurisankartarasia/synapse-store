
// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { HeartIcon } from "@heroicons/react/24/outline";
// import { Product } from "@/types/store/types";
// import { handleAddToWishlist, handleRemoveFromWishlist } from "@/hooks/store/useWishlist";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";


// interface ProductCardProps {
//   product: Product;
// }

// export default function ProductCard({ product }: ProductCardProps) {
//   const [isInWishlist, setIsInWishlist] = useState(product.isWishlisted ?? false);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleWishlistClick = async (e: React.MouseEvent) => {
//     e.preventDefault(); // Prevent navigation since this is inside a Link
//     e.stopPropagation();
    
//     setIsLoading(true);
//     try {
//       if (isInWishlist) {
//         // Remove from wishlist
//         await handleRemoveFromWishlist(product.productId);
//       } else {
//         // Add to wishlist
//         await handleAddToWishlist(product);
//       }
//       // Toggle wishlist state
//       setIsInWishlist(!isInWishlist);
//     } catch (error) {
//       console.error(`Failed to ${isInWishlist ? 'remove from' : 'add to'} wishlist:`, error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <Card className="group relative overflow-hidden border-0 shadow-none rounded-lg transition-all hover:shadow-lg hover:scale-105 ">
//       <Button
//         variant="ghost"
//         size="icon"
//         onClick={handleWishlistClick}
//         disabled={isLoading}
//         className="absolute right-2 top-2 z-10"
//         aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
//         title={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
//       >
//         <HeartIcon
//           className={`h-4 w-4 ${isInWishlist ? "fill-red-500 text-red-500" : ""}`}
//         />
//       </Button>
      
//       <Link href={`/products/${product.productId}`} className="block">
//         <div className="relative h-40 w-full">
//           <Image
//             src={product.imageUrl}
//             alt={product.name ?? "Product image"}
//             fill
//             sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
//             priority
//             className="object-contain"
//           />
//         </div>
        
//         <CardContent className="p-4">
//           <h3 className="mb-1 truncate text-sm font-medium" title={product.name}>
//             {product.name}
//           </h3>
//           <p className="mt-2 font-medium">₹{product.price}</p>
//         </CardContent>
//       </Link>
//     </Card>
//   );
// }




"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { HeartIcon } from "@heroicons/react/24/outline";
import { Product } from "@/types/store/types";
import { handleAddToWishlist, handleRemoveFromWishlist } from "@/hooks/store/useWishlist";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getProductUrl } from '@/utils/url_constructor';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const productUrl = getProductUrl(product.name, product.productId);

  const [isInWishlist, setIsInWishlist] = useState(product.isWishlisted ?? false);
  const [isLoading, setIsLoading] = useState(false);

  const handleWishlistClick = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation since this is inside a Link
    e.stopPropagation();
    
    setIsLoading(true);
    try {
      if (isInWishlist) {
        // Remove from wishlist
        await handleRemoveFromWishlist(product.productId);
      } else {
        // Add to wishlist
        await handleAddToWishlist(product);
      }
      // Toggle wishlist state
      setIsInWishlist(!isInWishlist);
    } catch (error) {
      console.error(`Failed to ${isInWishlist ? 'remove from' : 'add to'} wishlist:`, error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="group relative overflow-hidden border-0 shadow-none transition-all hover:shadow-lg  ">
      <Button
        variant="ghost"
        size="icon"
        onClick={handleWishlistClick}
        disabled={isLoading}
        className="absolute right-2 top-2 z-10"
        aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
        title={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
      >
        <HeartIcon
          className={`h-4 w-4 ${isInWishlist ? "fill-red-500 text-red-500" : ""}`}
        />
      </Button>
      
      <Link  href={productUrl} className="block">
        <div className="relative h-40 w-full">
          <Image
            src={product.imageUrl}
            alt={product.name ?? "Product image"}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-contain"
             loading="lazy"
          />
        </div>
        
        <CardContent className="p-4">
          <h3 className="mb-1 truncate text-sm font-medium" title={product.name}>
            {product.name}
          </h3>
          <p className="mt-2 font-medium">₹{product.price}</p>
        </CardContent>
      </Link>
    </Card>
  );
}