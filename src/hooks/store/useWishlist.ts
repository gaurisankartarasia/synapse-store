
// // src/hooks/store/useWishlist.ts
// import { Product } from "@/types/store/types";

// export async function handleAddToWishlist(product: Product) {
//   const res = await fetch("/api/v1/store/products/wishlist/add", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ productId: product.productId }),
//   });

//   const data = await res.json();
//   if (!res.ok) {
//     throw new Error(data.error || "Failed to add to wishlist");
//   }
//   return data; // Return response data (e.g., { message: "Added to wishlist" })
// }



// src/hooks/store/useWishlist.ts
import { Product } from "@/types/store/types";

export async function handleAddToWishlist(product: Product) {
  const res = await fetch("/api/v1/store/products/wishlist/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productId: product.productId }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || "Failed to add to wishlist");
  }
  return data; // Return response data (e.g., { message: "Added to wishlist" })
}

export async function handleRemoveFromWishlist(productId: string) {
  const res = await fetch("/api/v1/store/products/wishlist/remove", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productId }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || "Failed to remove from wishlist");
  }
  return data; // Return response data (e.g., { message: "Removed from wishlist" })
}
