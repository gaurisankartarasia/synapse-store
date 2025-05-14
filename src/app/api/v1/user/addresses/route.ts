// src/app/api/v1/user/addresses/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyJWT } from '@/lib/jwt';
import { db } from '@/lib/firebaseAdmin';
import { CustomJWTPayload } from '@/types/auth';

export async function GET() {
  try {
    const cookieStore =await cookies();
    const token = cookieStore.get('token');

    if (!token?.value) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const payload = await verifyJWT(token.value) as CustomJWTPayload;
    const uid = payload.uid;

    const addressesSnap = await db.collection(`users/${uid}/addresses`).get();
    const addresses = addressesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    return NextResponse.json({ addresses, viewer:{
        uid: uid,
    } });
  } catch (error) {
    console.error('GET addresses error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const cookieStore =await cookies();
    const token = cookieStore.get('token');

    if (!token?.value) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const payload = await verifyJWT(token.value) as CustomJWTPayload;
    const uid = payload.uid;

    const body = await req.json();
    const { id, ...address } = body;

    if (id) {
      // Update existing
      await db.collection(`users/${uid}/addresses`).doc(id).update(address);
    } else {
      // Create new
      await db.collection(`users/${uid}/addresses`).add(address);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('POST address error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
