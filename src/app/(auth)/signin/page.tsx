
// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { useDispatch, useSelector } from 'react-redux';
// import { AppDispatch, RootState } from '@/redux/store';
// import { signInWithEmail } from '@/redux/features/authSlice';

// import GoogleSignInButton from './GoogleSignInButton';

// import {
//   Box,
//   Button,
//   TextField,
//   CardContent,
//   CardHeader,
//   CardActions,
//   Typography,
//   Snackbar,
//   Alert,
//   CircularProgress,
//   useMediaQuery, useTheme,
//   IconButton, InputAdornment
// } from '@mui/material';
// import { Visibility, VisibilityOff } from '@mui/icons-material';


// export default function SignIn() {
//   const router = useRouter();
//   const dispatch = useDispatch<AppDispatch>();
//   const [showPassword, setShowPassword] = useState(false);

//   const { loading, error } = useSelector((state: RootState) => state.auth);

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [snackbar, setSnackbar] = useState<{
//     open: boolean;
//     message: string;
//     severity: 'success' | 'error';
//   }>({
//     open: false,
//     message: '',
//     severity: 'success',
//   });

//   const theme = useTheme();
//   const isDesktop = useMediaQuery(theme.breakpoints.up('md')); 

//   const handleCloseSnackbar = () => {
//     setSnackbar((prev) => ({ ...prev, open: false }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const resultAction = await dispatch(signInWithEmail({ email, password }));
//       if (signInWithEmail.fulfilled.match(resultAction)) {
//         setSnackbar({
//           open: true,
//           message: 'Sign in successful',
//           severity: 'success',
//         });
//         router.replace('/');
//       } else {
//         setSnackbar({
//           open: true,
//           message: 'Incorrect email or password',
//           severity: 'error',
//         });
//       }
//     } catch (err) {
//       console.error('Sign in failed:', err);
//       setSnackbar({
//         open: true,
//         message: 'An unexpected error occurred',
//         severity: 'error',
//       });
//     }
//   };

//   return (
//     <Box
//       component="section"
//       display="flex"
//       justifyContent="center"
//       alignItems="center"
//       mt={6}
//       mr={isDesktop ? 40 : 0}
//     >
//       <Box sx={{ maxWidth: 520, width: '100%', p:3,  bgcolor: theme.palette.background.default }}>
//         <CardHeader title="Sign In" />
//         <CardContent>
//           {error && (
//             <Alert severity="error" sx={{ mb: 2 }}>
//               {error}
//             </Alert>
//           )}

//           <Box mb={4}>
//             <GoogleSignInButton />
//             <Typography variant="body2" align="center" mt={4} mb={2}>
//               Or continue with
//             </Typography>
//           </Box>

//           <form onSubmit={handleSubmit}>
//             <Box mb={2}>
//               <TextField
//                 fullWidth
//                 required
//                 label="Email"
//                 type="email"
//                 // variant="filled"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </Box>
//             <Box mb={2}>
//             <TextField
//   fullWidth
//   required
//   label="Password"
//   type={showPassword ? 'text' : 'password'}
//   // variant="filled"
//   value={password}
//   onChange={(e) => setPassword(e.target.value)}
//   slotProps={{
//     input: {
//       endAdornment: (
//         <InputAdornment position="end">
//           <IconButton
//             onClick={() => setShowPassword((prev) => !prev)}
//             edge="end"
//             aria-label="toggle password visibility"
//           >
//             {showPassword ? <VisibilityOff /> : <Visibility />}
//           </IconButton>
//         </InputAdornment>
//       ),
//     },
//   }}
// />


//             </Box>
//             <Button
//             disableRipple
//               fullWidth
//               variant="contained"
//               type="submit"
//               disabled={loading}
//               sx={{ py: 1.5 }}
//             >
//               {loading ? <CircularProgress size={22} color="inherit" /> : 'Sign In'}
//             </Button>
//           </form>

//           <Box mt={2} textAlign="right">
//             <Link href="/forgot-password" passHref>
//               <Typography variant="body2" component="span" sx={{ textDecoration: 'underline', cursor: 'pointer' }}>
//                 Forgot Password?
//               </Typography>
//             </Link>
//           </Box>
//         </CardContent>
//         <CardActions sx={{ justifyContent: 'center' }}>
//           <Typography variant="body2">
//             Don&apos;t have an account?{' '}
//             <Link href="/signup" passHref>
//               <Typography
//                 component="span"
//                 sx={{ textDecoration: 'underline', fontWeight: 500, cursor: 'pointer' }}
//               >
//                 Sign up
//               </Typography>
//             </Link>
//           </Typography>
//         </CardActions>
//       </Box>

//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={4000}
//         onClose={handleCloseSnackbar}
//         anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
//       >
//         <Alert
//           onClose={handleCloseSnackbar}
//           severity={snackbar.severity}
//           variant="filled"
//           sx={{ width: '100%' }}
//         >
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// }




'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { signInWithEmail } from '@/redux/features/authSlice';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

import GoogleSignInButton from '../../../components/auth/GoogleSignInButton';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';

import { Separator } from '@/components/ui/separator';

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
       
        router.replace('/');
      } 
    } catch (err) {
      console.error('Sign in failed:', err);
      
    }
  };

  return (
    <div  className="flex justify-center items-center mt-24 ">
      <Card className="w-full max-w-md border-none shadow-none bg-background">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="mb-6">
            <GoogleSignInButton />
            <div className="relative my-4">
              <Separator className="my-4" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-background px-2 text-sm text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
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
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="text-right">
                <Link href="/forgot-password" className="text-sm underline">
                  Forgot Password?
                </Link>
              </div>

              <Button 
                className="w-full py-2" 
                type="submit"
                disabled={loading}
              >
                {loading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : 'Sign In'}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="underline font-medium">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}