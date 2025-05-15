// import { NextResponse } from "next/server";
// import { cookies } from "next/headers";
// import { db } from "@/lib/firebaseAdmin";
// import { verifyJWT } from "@/lib/jwt";
// import type { CustomJWTPayload } from "@/types/auth";


// export async function GET() {
//   try {
//     const cookieStore = await cookies();
//     const token = cookieStore.get("token")?.value;

//     if (!token) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const decoded = (await verifyJWT(token)) as CustomJWTPayload;
//     const uid = decoded?.uid;

//     if (!uid) {
//       return NextResponse.json({ error: "Invalid token" }, { status: 401 });
//     }

//     const snapshot = await db
//       .collection(`users/${uid}/storeWishlist`)
//       .orderBy("createdAt", "desc")
//       .get();

//     const wishlist = snapshot.docs.map((doc) => doc.data());

//     return NextResponse.json({ wishlist });
//   } catch (error) {
//     console.error("Wishlist fetch error:", error);
//     return NextResponse.json({ error: "Internal server error" }, { status: 500 });
//   }
// }



import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/lib/firebaseAdmin";
import { verifyJWT } from "@/lib/jwt";
import type { CustomJWTPayload } from "@/types/auth";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = (await verifyJWT(token)) as CustomJWTPayload;
    const uid = decoded?.uid;

    if (!uid) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const snapshot = await db
      .collection(`users/${uid}/storeWishlist`)
      .orderBy("createdAt", "desc")
      .get();

    const wishlistWithProductDetails = await Promise.all(
      snapshot.docs.map(async (doc) => {
        const wishlistData = doc.data();
        const productId = wishlistData.productId;

        if (productId) {
          try {
            const productDoc = await db.doc(`products/${productId}`).get();
            const productData = productDoc.data();
            return { ...wishlistData,  ...productData };
          } catch (error) {
            console.error(`Error fetching product details for ${productId}:`, error);
            // Return wishlist data even if product fetch fails to avoid breaking the entire response
            return { ...wishlistData, product: null };
          }
        }

        return { ...wishlistData, product: null }; // Handle cases where productId might be missing
      })
    );

    return NextResponse.json({ wishlist: wishlistWithProductDetails, status: "ok" }, { status: 200 });
  } catch (error) {
    console.error("Wishlist fetch error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}