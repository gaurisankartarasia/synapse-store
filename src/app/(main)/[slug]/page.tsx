

"use client";

import { useEffect, useState } from "react";
import { useParams  } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { addToCartAsync } from "@/redux/features/cartSlice";
import { RootState, AppDispatch } from "@/redux/store";
import Image from "next/image";
import { Product } from "@/types/store/types";
import { handleAddToWishlist, handleRemoveFromWishlist } from "@/hooks/store/useWishlist";
import { Button } from "@/components/ui/button";
import { HeartIcon as OutlineHeart } from "@heroicons/react/24/outline";
import { HeartIcon as SolidHeart } from "@heroicons/react/24/solid";
import { Spinner } from "@/components/ui/spinner";
import { extractProductId } from "@/utils/url_constructor";
import { useRouter } from "@bprogress/next";

export default function ProductPage() {
  // Get the slug from params
  const params = useParams();
  // Extract the actual product ID from the slug parameter
  const slug = Array.isArray(params.slug) ? params.slug.join('/') : params.slug || '';
  const productId = extractProductId(slug);
  
  const [product, setProduct] = useState<Product | null>(null);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const isInCart = cartItems.some((item) => item.productId === productId);
  const loading = useSelector((state: RootState) => state.cart.loading);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/v1/store/products/${productId}`);
        if (!res.ok) throw new Error("Failed to fetch product");
        const data = await res.json();
        setProduct(data);
        setIsInWishlist(data.isWishlisted ?? false);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    if (productId) fetchProduct();
  }, [productId]);

  const handleWishlistToggle = async () => {
    if (!product) return;
    
    setWishlistLoading(true);
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
      setWishlistLoading(false);
    }
  };

  if (!product) return <div className="py-20 flex justify-center"><Spinner size={40} /></div>;

  return (
    <div className="max-w-screen-xl mx-auto p-4">
      <div className="relative z-50 right-2 top-2">
        <Button 
          variant="ghost"
          size="icon"
          onClick={handleWishlistToggle} 
          disabled={wishlistLoading}
          aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
          title={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          {isInWishlist ? (
            <SolidHeart className=" text-red-500" />
          ) : (
            <OutlineHeart className=" text-gray-600" />
          )}
        </Button>
      </div>

      <Image
        priority
        src={product.imageUrl}
        height={400}
        width={400}
        alt={product.name}
        className="object-cover rounded"
      />

      <h1 className="text-2xl font-bold mt-4">{product.name}</h1>
      <p className="text-gray-500 mt-2">₹{product.price}</p>
      <p className="mt-4">{product.description}</p>

      <div className="flex gap-4 mt-6">
        <Button variant="default">Buy now</Button>

        <Button
          variant="outline"
          onClick={() =>
            product.isInCart
              ? router.push("/cart")
              : dispatch(addToCartAsync({ product, quantity: 1 }))
          }
          disabled={isInCart || loading}
          className={isInCart ? "bg-gray-400 text-white cursor-not-allowed" : ""}
        >
          {product.isInCart ? "Go to Cart" : loading ? "Adding..." : "Add to Cart"}
        </Button>
      </div>
    </div>
  );
}