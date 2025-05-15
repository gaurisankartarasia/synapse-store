import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/lib/firebaseAdmin";
import { verifyJWT } from "@/lib/jwt";
import { FieldValue } from "firebase-admin/firestore";
import type { CustomJWTPayload } from "@/types/auth";

export async function DELETE(request: Request) {
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

    const body = await request.json();
    const productId: string = body.productId;

    if (!productId) {
      return NextResponse.json({ error: "Missing productId" }, { status: 400 });
    }

    const wishlistRef = db.collection(`users/${uid}/storeWishlist`).doc(productId);
    const userRef = db.collection("users").doc(uid);

    // Check if the product exists before trying to delete
    const docSnapshot = await wishlistRef.get();
    if (!docSnapshot.exists) {
      return NextResponse.json({ error: "Product not found in wishlist" }, { status: 404 });
    }

    // Delete the wishlist item
    await wishlistRef.delete();

    // Decrement the counter
    await userRef.set(
      {
        itemsInStoreWishlist: FieldValue.increment(-1),
      },
      { merge: true }
    );

    return NextResponse.json({ status: "ok" }, { status: 200 });
  } catch (error) {
    console.error("Remove from Wishlist API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
