// //src/components/wishlist/ProductCard_WL.tsx
// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { TrashIcon } from "@heroicons/react/24/outline";
// import { Product } from "@/types/store/types";
// import { handleAddToWishlist } from "@/hooks/store/useWishlist";
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
//       await handleAddToWishlist(product);
//       setIsInWishlist(!isInWishlist);
//     } catch (error) {
//       console.error("Failed to update wishlist:", error);
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
//         className="absolute right-2 top-2 z-10 h-8 w-8 rounded-full bg-white/80 p-0"
//       >
//         <TrashIcon
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



//src/components/wishlist/ProductCard_WL.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { TrashIcon } from "@heroicons/react/24/outline";
import { Product } from "@/types/store/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  product: Product;
   onRemove?: (productId: string) => void;
}

export default function ProductCard({ product, onRemove }: ProductCardProps) {
  const [isInWishlist, setIsInWishlist] = useState(product.isWishlisted ?? false);
  const [isLoading, setIsLoading] = useState(false);



  return (
    <Card className="group relative overflow-hidden border-0 shadow-none rounded-lg transition-all hover:shadow-lg hover:scale-105 ">
      <Button
        variant="ghost"
        size="icon"
         onClick={() => onRemove?.(product.productId)}
        disabled={isLoading}
        className="absolute right-2 top-2 z-10 h-8 w-8 rounded-full bg-white/80 p-0"
      >
        <TrashIcon
          className={`h-4 w-4 `}
        />
      </Button>
      
      <Link href={`/products/${product.productId}`} className="block">
        <div className="relative h-40 w-full">
          <Image
            src={product.imageUrl}
            alt={product.name ?? "Product image"}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            priority
            className="object-contain"
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