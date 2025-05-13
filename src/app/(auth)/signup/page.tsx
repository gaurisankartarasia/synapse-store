

// // src/app/(auth)/signup/page.tsx
// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { useDispatch, useSelector } from 'react-redux';
// import { AppDispatch, RootState } from '@/redux/store';
// import { signUpWithEmail } from '@/redux/features/authSlice';
// import GoogleSignInButton from '../../../components/auth/GoogleSignInButton';
// import { Button, Card, CardHeader, CardContent, TextField, Box, Divider, Alert, Typography, CardActions, CircularProgress, useMediaQuery, useTheme, IconButton, InputAdornment } from '@mui/material'
// import { Visibility, VisibilityOff } from '@mui/icons-material';


// export default function SignUp() {
//   const router = useRouter();
//   const dispatch = useDispatch<AppDispatch>();
//   const { loading, error } = useSelector((state: RootState) => state.auth);

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [username, setUsername] = useState('');

//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
// const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const [formError, setFormError] = useState('');

  

//    const theme = useTheme();
//     const isDesktop = useMediaQuery(theme.breakpoints.up('md')); 

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
//         router.push(`/${username}`);
//       }
//     } catch (err) {
//       console.error('Sign up failed:', err);
//     }
//   };

//   return (
//     <Box display="flex" justifyContent="center" alignItems="center" mt={6}  
//      mr={isDesktop ? 40 : 0}
//       >
//   <Box sx={{maxWidth: 520, width: '100%', p:3  }}>
//     <CardHeader title="Sign Up" />

//     <CardContent>
//       {(error || formError) && (
//         <Alert severity="error" sx={{ mb: 2 }}>
//           {error || formError}
//         </Alert>
//       )}

//       <Box mb={4}>
//         <GoogleSignInButton />
//         <Box display="flex" alignItems="center" mt={3}>
//           <Divider sx={{ flexGrow: 1 }} />
//           <Typography variant="body2" sx={{ mx: 2 }}>
//             Or sign up with email
//           </Typography>
//           <Divider sx={{ flexGrow: 1 }} />
//         </Box>
//       </Box>

//       <form onSubmit={handleSubmit}>
//         <TextField
//           id="username"
//           label="Username"
//           fullWidth
//           required
//           margin="normal"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//         <TextField
//           id="email"
//           label="Email"
//           type="email"
//           fullWidth
//           required
//           margin="normal"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//        <TextField
//   id="password"
//   label="Password"
//   type={showPassword ? 'text' : 'password'}
//   fullWidth
//   required
//   margin="normal"
//   value={password}
//   onChange={(e) => setPassword(e.target.value)}
//   InputProps={{
//     endAdornment: (
//       <InputAdornment position="end">
//         <IconButton
//           onClick={() => setShowPassword((prev) => !prev)}
//           edge="end"
//           aria-label="toggle password visibility"
//         >
//           {showPassword ? <VisibilityOff /> : <Visibility />}
//         </IconButton>
//       </InputAdornment>
//     ),
//   }}
// />

// <TextField
//   id="confirmPassword"
//   label="Confirm Password"
//   type={showConfirmPassword ? 'text' : 'password'}
//   fullWidth
//   required
//   margin="normal"
//   value={confirmPassword}
//   onChange={(e) => setConfirmPassword(e.target.value)}
//   InputProps={{
//     endAdornment: (
//       <InputAdornment position="end">
//         <IconButton
//           onClick={() => setShowConfirmPassword((prev) => !prev)}
//           edge="end"
//           aria-label="toggle confirm password visibility"
//         >
//           {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
//         </IconButton>
//       </InputAdornment>
//     ),
//   }}
// />


//         <Button
//           fullWidth
//           type="submit"
//           variant="contained"
//           color="primary"
//           disabled={loading}
//           sx={{ mt: 2, py: 1.5 }}
//         >
//           {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign Up'}
//         </Button>
//       </form>
//     </CardContent>

//     <CardActions sx={{ justifyContent: 'center', mt: 2 }}>
//       <Typography variant="body2">
//         Already have an account?{' '}
//         <Link href="/signin" passHref>
//           <Typography
//             component="span"
//             sx={{ textDecoration: 'underline', fontWeight: 500, cursor: 'pointer' }}
//           >
//             Sign in
//           </Typography>
//         </Link>
//       </Typography>
//     </CardActions>
//   </Box>
// </Box>

//   );
// }




'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { signUpWithEmail } from '@/redux/features/authSlice';
import GoogleSignInButton from '@/components/auth/GoogleSignInButton';

import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { Label } from '@/components/ui/label';

import { Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';

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
        router.push(`/${username}`);
      }
    } catch (err) {
      console.error('Sign up failed:', err);
    }
  };

  return (
    <div className="flex justify-center items-center mt-24">
      <div className="w-full max-w-md">
        <Card className='shadow-none border-none' >
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
          </CardHeader>

          <CardContent>
            {(error || formError) && (
              <Alert variant="destructive" className="mb-4">
                <AlertTitle>{error || formError}</AlertTitle>
              </Alert>
            )}

            <GoogleSignInButton />

            <div className="my-6 flex items-center gap-2">
              <div className="h-px flex-1 bg-muted" />
              <p className="text-sm text-muted-foreground">Or sign up with email</p>
              <div className="h-px flex-1 bg-muted" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  required
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="relative">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-[38px] text-muted-foreground"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <div className="relative">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  required
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-[38px] text-muted-foreground"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Signing Up...' : 'Sign Up'}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="justify-center">
            <p className="text-sm">
              Already have an account?{' '}
              <Link href="/signin" className="underline font-medium">
                Sign in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

