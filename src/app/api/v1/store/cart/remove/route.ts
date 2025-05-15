// // src/app/api/v1/store/cart/remove/route.ts

// import { NextResponse } from "next/server";
// import { cookies } from "next/headers";
// import { db } from "@/lib/firebaseAdmin";
// import { verifyJWT } from "@/lib/jwt";

// export async function DELETE(req: Request) {
//   try {
//     const cookieStore = await cookies();
//     const token = cookieStore.get("token")?.value;

//     if (!token) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const payload = await verifyJWT(token);
//     const uid = payload?.uid;

//     if (!uid) {
//       return NextResponse.json({ error: "Invalid token" }, { status: 401 });
//     }

//     const { productId } = await req.json();

//     if (!productId) {
//       return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
//     }

//     await db.doc(`users/${uid}/storeCart/${productId}`).delete();

//     return NextResponse.json({ message: "Item removed from cart" });
//   } catch (error) {
//     console.error("Error removing item from cart:", error);
//     return NextResponse.json({ error: "Internal server error" }, { status: 500 });
//   }
// }


import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db, FieldValue } from "@/lib/firebaseAdmin";
import { verifyJWT } from "@/lib/jwt";

export async function DELETE(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = await verifyJWT(token);
    const uid = payload?.uid;

    if (!uid) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const { productId } = await req.json();

    if (!productId) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

    const cartDocRef = db.doc(`users/${uid}/storeCart/${productId}`);
    const userDocRef = db.doc(`users/${uid}`);

    const existingCartItem = await cartDocRef.get();

    if (!existingCartItem.exists) {
      return NextResponse.json({ error: "Item not found in cart" }, { status: 404 });
    }

    // Remove the item
    await cartDocRef.delete();

    // Decrement itemsInStoreCart
    await userDocRef.update({
      itemsInStoreCart: FieldValue.increment(-1),
    });

    return NextResponse.json({  status: "ok" });
  } catch (error) {
    console.error("Error removing item from cart:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

