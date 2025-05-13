

// // src/components/Store/catalog/ProductCard.tsx
// "use client";

// import { Card, CardContent, IconButton, Box } from "@mui/material";
// import { FavoriteBorder, Favorite } from "@mui/icons-material";
// import Image from "next/image";
// import Link from "next/link";
// import  { Product } from "@/types/store/types";
// import { handleAddToWishlist } from "@/hooks/store/useWishlist";
// import { useState } from "react";

// interface ProductCardProps {
//   product: Product;
// }

// export default function ProductCard({ product }: ProductCardProps) {
//   const [isInWishlist, setIsInWishlist] = useState(product.isWishlisted ?? false);
//   const [isLoading, setIsLoading] = useState(false); // Add loading state

//   const handleWishlistClick = async () => {
//     setIsLoading(true); // Disable button during request
//     try {
//       await handleAddToWishlist(product);
//       setIsInWishlist(!isInWishlist); // Update state only on success
//     } catch (error) {
//       console.error("Failed to update wishlist:", error);
//       // Optionally show an error message to the user (e.g., using a toast)
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <Box sx={{ width: 280, borderRadius: 7, "&:hover": { border: 1 } }}>
//       <IconButton
//         onClick={handleWishlistClick}
//         disabled={isLoading} // Disable button while loading
//         className="float-end absolute z-50 right-2 top-2"
//       >
//         {isInWishlist ? <Favorite color="error" /> : <FavoriteBorder />}
//       </IconButton>
//         <CardContent  component={Link} href={`/store/products/${product.id}`}>
//           <div className="relative w-full h-40 sm:h-40">
//             <Image
//               src={product.imageUrl}
//               alt={product.name ?? "Product image"}
//               fill
//               sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
//               priority
//               className="object-contain"
//             />
//           </div>
//           <div className="flex flex-col flex-grow px-3 py-2">
//             <h3 className="text-md font-medium mb-1 truncate" title={product.name}>
//               {product.name}
//             </h3>
//             <div className="mt-auto">
//               <p className="text-md font-medium mb-3">₹{product.price.toFixed(2)}</p>
//             </div>
//           </div>
//         </CardContent>
//     </Box>
//   );
// }

"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { Product } from "@/types/store/types";
import { handleAddToWishlist } from "@/hooks/store/useWishlist";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isInWishlist, setIsInWishlist] = useState(product.isWishlisted ?? false);
  const [isLoading, setIsLoading] = useState(false);

  const handleWishlistClick = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation since this is inside a Link
    e.stopPropagation();
    
    setIsLoading(true);
    try {
      await handleAddToWishlist(product);
      setIsInWishlist(!isInWishlist);
    } catch (error) {
      console.error("Failed to update wishlist:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="group relative overflow-hidden border-0 shadow-none rounded-lg transition-all hover:border-gray-300 ">
      <Button
        variant="ghost"
        size="icon"
        onClick={handleWishlistClick}
        disabled={isLoading}
        className="absolute right-2 top-2 z-10 h-8 w-8 rounded-full bg-white/80 p-0"
      >
        <Heart
          className={`h-4 w-4 ${isInWishlist ? "fill-red-500 text-red-500" : ""}`}
        />
      </Button>
      
      <Link href={`/products/${product.id}`} className="block">
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
          <p className="mt-2 font-medium">₹{product.price.toFixed(2)}</p>
        </CardContent>
      </Link>
    </Card>
  );
}