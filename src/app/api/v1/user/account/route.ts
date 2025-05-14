// src/app/api/account/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/lib/firebaseAdmin";
import { verifyJWT } from "@/lib/jwt";
import type { CustomJWTPayload } from "@/types/auth";

export async function GET() {
  try {
     const cookieStore =await cookies();
    const token = cookieStore.get('token');

    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const decoded = (await verifyJWT(token.value)) as CustomJWTPayload;
    const uid = decoded?.uid;
    const userRef = db.collection("users").doc(uid);
    const doc = await userRef.get();

    if (!doc.exists) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const data = doc.data();

    return NextResponse.json({
      displayName: data?.displayName || "",
      email: data?.storeEmail || data?.email || "",
      emailFallback: !data?.storeEmail && !!data?.email,
      phone: data?.storePhone || data?.phoneNumber || "",
      phoneFallback: !data?.storePhone && !!data?.phoneNumber,
      gender: data?.gender || "",
    });
  } catch (error) {
    console.error("Account fetch error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
     const cookieStore =await cookies();
    const token = cookieStore.get('token');

    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const decoded = (await verifyJWT(token.value)) as CustomJWTPayload;
    const uid = decoded?.uid;
    const body = await request.json();

    const allowedFields = ["fullName", "storeEmail", "storePhone", "gender"];
    const updatePayload: Record<string, any> = {};

    for (const key of allowedFields) {
      if (key in body) updatePayload[key] = body[key];
    }

    await db.collection("users").doc(uid).set(updatePayload, { merge: true });

    return NextResponse.json({ message: "Account updated" });
  } catch (error) {
    console.error("Account update error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
