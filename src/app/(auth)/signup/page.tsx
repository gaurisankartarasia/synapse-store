

// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { useDispatch, useSelector } from 'react-redux';
// import { AppDispatch, RootState } from '@/redux/store';
// import { signUpWithEmail } from '@/redux/features/authSlice';
// import GoogleSignInButton from '@/components/auth/GoogleSignInButton';

// import {
//   Card,
//   CardHeader,
//   CardContent,
//   CardFooter,
//   CardTitle
// } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { Alert, AlertTitle } from '@/components/ui/alert';
// import { Label } from '@/components/ui/label';

// import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

// export default function SignUp() {
//   const router = useRouter();
//   const dispatch = useDispatch<AppDispatch>();
//   const { loading, error } = useSelector((state: RootState) => state.auth);

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [username, setUsername] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');

//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const [formError, setFormError] = useState('');

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setFormError('');

//     if (password !== confirmPassword) {
//       setFormError("Passwords don't match");
//       return;
//     }

//     if (password.length < 6) {
//       setFormError('Password must be at least 6 characters long');
//       return;
//     }

//     try {
//       const resultAction = await dispatch(signUpWithEmail({ email, password, username }));
//       if (signUpWithEmail.fulfilled.match(resultAction)) {
//         // router.push(`/${username}`);
//           window.location.href = '/';
//       }
//     } catch (err) {
//       console.error('Sign up failed:', err);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center mt-24">
//       <div className="w-full max-w-md">
//         <Card className='shadow-none border-none' >
//           <CardHeader>
//             <CardTitle>Sign Up</CardTitle>
//           </CardHeader>

//           <CardContent>
//             {(error || formError) && (
//               <Alert variant="destructive" className="mb-4">
//                 <AlertTitle>{error || formError}</AlertTitle>
//               </Alert>
//             )}

//             <GoogleSignInButton />

//             <div className="my-6 flex items-center gap-2">
//               <div className="h-px flex-1 bg-muted" />
//               <p className="text-sm text-muted-foreground">Or sign up with email</p>
//               <div className="h-px flex-1 bg-muted" />
//             </div>

//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div>
//                 <Label htmlFor="username">Username</Label>
//                 <Input
//                   id="username"
//                   type="text"
//                   value={username}
//                   required
//                   onChange={(e) => setUsername(e.target.value)}
//                 />
//               </div>

//               <div>
//                 <Label htmlFor="email">Email</Label>
//                 <Input
//                   id="email"
//                   type="email"
//                   value={email}
//                   required
//                   onChange={(e) => setEmail(e.target.value)}
//                 />
//               </div>

//               <div className="relative">
//                 <Label htmlFor="password">Password</Label>
//                 <Input
//                   id="password"
//                   type={showPassword ? 'text' : 'password'}
//                   value={password}
//                   required
//                   onChange={(e) => setPassword(e.target.value)}
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-[38px] text-muted-foreground"
//                 >
//                   {showPassword ? <EyeSlashIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
//                 </button>
//               </div>

//               <div className="relative">
//                 <Label htmlFor="confirmPassword">Confirm Password</Label>
//                 <Input
//                   id="confirmPassword"
//                   type={showConfirmPassword ? 'text' : 'password'}
//                   value={confirmPassword}
//                   required
//                   onChange={(e) => setConfirmPassword(e.target.value)}
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                   className="absolute right-3 top-[38px] text-muted-foreground"
//                 >
//                   {showConfirmPassword ? <EyeSlashIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
//                 </button>
//               </div>

//               <Button type="submit" className="w-full" disabled={loading}>
//                 {loading ? 'Signing Up...' : 'Sign Up'}
//               </Button>
//             </form>
//           </CardContent>

//           <CardFooter className="justify-center">
//             <p className="text-sm">
//               Already have an account?{' '}
//               <Link href="/signin" className="underline font-medium">
//                 Sign in
//               </Link>
//             </p>
//           </CardFooter>
//         </Card>
//       </div>
//     </div>
//   );
// }




'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { signUpWithEmail } from '@/redux/features/authSlice';

import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { Label } from '@/components/ui/label';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import GoogleSignInButton from '@/components/auth/GoogleSignInButton';
import Image from 'next/image';

export default function SignUp() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formError, setFormError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (password !== confirmPassword) {
      setFormError("Passwords don't match");
      return;
    }

    if (password.length < 6) {
      setFormError('Password must be at least 6 characters long');
      return;
    }

    try {
      const resultAction = await dispatch(signUpWithEmail({ email, password, username }));
      if (signUpWithEmail.fulfilled.match(resultAction)) {
        window.location.href = '/';
      }
    } catch (err) {
      console.error('Sign up failed:', err);
    }
  };

  return (
    <div className="flex flex-col gap-6 mt-20 items-center justify-center px-4">
      <Card className="overflow-hidden w-full max-w-4xl shadow-none border-none">
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
                <h1 className="text-2xl font-bold">Create an account</h1>
                <p className="text-balance text-muted-foreground">
                  Enter your details to get started
                </p>
              </div>

              {(error || formError) && (
                <Alert variant="destructive">
                  <AlertTitle>{error || formError}</AlertTitle>
                </Alert>
              )}

              <GoogleSignInButton />

              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border my-2">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  Or sign up with email
                </span>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  required
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="grid gap-2 relative">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  required
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

              <div className="grid gap-2 relative">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  required
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeSlashIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                </Button>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Signing Up...' : 'Sign Up'}
              </Button>

              <div className="text-center text-sm">
                Already have an account?{' '}
                <Link href="/signin" className="underline underline-offset-4 font-medium">
                  Sign in
                </Link>
              </div>
            </div>
          </form>

       
        </CardContent>
      </Card>

      <div className="text-center text-xs text-muted-foreground text-balance [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        By signing up, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
