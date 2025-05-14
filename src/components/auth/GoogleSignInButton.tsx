
'use client';

import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { signInWithGoogle } from '@/redux/features/authSlice';
import type { AppDispatch, RootState } from '@/redux/store';
import Image from 'next/image';
import { Spinner } from "@/components/ui/spinner";
import { Button } from '@/components/ui/button';

export default function GoogleSignInButton() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.auth);

  const handleGoogleSignIn = async () => {
    try {
      const resultAction = await dispatch(signInWithGoogle());
      
      if (signInWithGoogle.fulfilled.match(resultAction)) {
        router.push('/');
      } else {
        console.error('Failed to sign in with Google');
      }
    } catch (err) {
      console.error('Google sign in failed:', err);
    }
  };

  return (
    <Button
      onClick={handleGoogleSignIn}
      disabled={loading}
      variant="outline"
      className="w-full font-medium flex gap-2 justify-center items-center"
    >
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Image
            src="https://firebasestorage.googleapis.com/v0/b/quixxle.appspot.com/o/assets%2FgoogleIcon.png?alt=media&token=627be043-9734-4414-986f-1a6c1bf25698"
            height={18}
            width={18}
            alt="google"
          />
          Continue with Google
        </>
      )}
    </Button>
  );
}