
// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { useDispatch, useSelector } from 'react-redux';
// import { AppDispatch, RootState } from '@/redux/store';
// import { signInWithEmail } from '@/redux/features/authSlice';
// import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
// import { Spinner } from "@/components/ui/spinner";

// import GoogleSignInButton from '../../../components/auth/GoogleSignInButton';

// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Card, CardContent,  CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
// import { Label } from '@/components/ui/label';
// import { Alert, AlertDescription } from '@/components/ui/alert';

// import { Separator } from '@/components/ui/separator';

// export default function SignIn() {
//   const router = useRouter();
//   const dispatch = useDispatch<AppDispatch>();
//   const [showPassword, setShowPassword] = useState(false);

//   const { loading, error } = useSelector((state: RootState) => state.auth);

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const resultAction = await dispatch(signInWithEmail({ email, password }));
//       if (signInWithEmail.fulfilled.match(resultAction)) {
//        window.location.href = '/';
//       } 
//     } catch (err) {
//       console.error('Sign in failed:', err);
      
//     }
//   };

//   return (
//     <div  className="flex  justify-center items-center mt-24 ">
//       <Card className="w-full max-w-md border-none shadow-none bg-background">
//         <CardHeader>
//           <CardTitle>Sign In</CardTitle>
//         </CardHeader>
//         <CardContent>
//           {error && (
//             <Alert variant="destructive" className="mb-4">
//               <AlertDescription>{error}</AlertDescription>
//             </Alert>
//           )}

//           <div className="mb-6">
//             <GoogleSignInButton />
//             <div className="relative my-4">
//               <Separator className="my-4" />
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <span className="bg-background px-2 text-sm text-muted-foreground">
//                   Or continue with
//                 </span>
//               </div>
//             </div>
//           </div>

//           <form onSubmit={handleSubmit}>
//             <div className="grid gap-4">
//               <div className="grid gap-2">
//                 <Label htmlFor="email">Email</Label>
//                 <Input
//                   id="email"
//                   type="email"
//                   required
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   placeholder="name@example.com"
//                 />
//               </div>
              
//               <div className="grid gap-2">
//                 <div className="flex items-center justify-between">
//                   <Label htmlFor="password">Password</Label>
//                 </div>
//                 <div className="relative">
//                   <Input
//                     id="password"
//                     type={showPassword ? 'text' : 'password'}
//                     required
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                   />
//                   <Button
//                     type="button"
//                     variant="ghost"
//                     size="icon"
//                     className="absolute right-0 top-0 h-full px-3 py-2"
//                     onClick={() => setShowPassword(!showPassword)}
//                   >
//                     {showPassword ? <EyeSlashIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
//                   </Button>
//                 </div>
//               </div>

//               <div className="text-right">
//                 <Link href="/forgot-password" className="text-sm underline">
//                   Forgot Password?
//                 </Link>
//               </div>

//               <Button 
//                 className="w-full py-2" 
//                 type="submit"
//                 disabled={loading}
//               >
//                 {loading ? <Spinner /> : 'Sign In'}
//               </Button>
//             </div>
//           </form>
//         </CardContent>
//         <CardFooter className="flex justify-center">
//           <p className="text-sm text-muted-foreground">
//             Don&apos;t have an account?{' '}
//             <Link href="/signup" className="underline font-medium">
//               Sign up
//             </Link>
//           </p>
//         </CardFooter>
//       </Card>
//     </div>
//   );
// }


'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { signInWithEmail } from '@/redux/features/authSlice';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { Spinner } from "@/components/ui/spinner";

import GoogleSignInButton from '../../../components/auth/GoogleSignInButton';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Image from 'next/image';

export default function SignIn() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [showPassword, setShowPassword] = useState(false);

  const { loading, error } = useSelector((state: RootState) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const resultAction = await dispatch(signInWithEmail({ email, password }));
      if (signInWithEmail.fulfilled.match(resultAction)) {
       window.location.href = '/';
      } 
    } catch (err) {
      console.error('Sign in failed:', err);
      
    }
  };

  return (
    <div className="flex flex-col gap-6 mt-20 items-center justify-center px-4">
      <Card className="overflow-hidden w-full max-w-4xl shadow-none border-0">
        <CardContent className="grid p-0 md:grid-cols-2">

          <div className="relative hidden bg-muted md:block">
            <Image
              fill  
              src="/assets/auth_page_banner.png"
              alt="Sign in image"
              className="absolute inset-0 object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
          <form onSubmit={handleSubmit} className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-balance text-muted-foreground">
                  Sign in to your account
                </p>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <GoogleSignInButton />

              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border my-2">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                />
              </div>

              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link href="/forgot-password" className="text-sm underline-offset-2 hover:underline">
                    Forgot Password?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 py-2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeSlashIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <Button className="w-full" type="submit" disabled={loading}>
                {loading ? <Spinner /> : 'Sign In'}
              </Button>

              <div className="text-center text-sm">
                Don&apos;t have an account?{' '}
                <Link href="/signup" className="underline underline-offset-4 font-medium">
                  Sign up
                </Link>
              </div>
            </div>
          </form>

        </CardContent>
      </Card>

      <div className="text-center text-xs text-muted-foreground text-balance [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        By signing in, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
