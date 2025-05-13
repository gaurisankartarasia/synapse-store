

// 'use client';

// import { useState } from 'react';
// import { auth, sendPasswordResetEmail, fetchSignInMethodsForEmail } from '@/lib/firebaseClient';
// import { Button, Card, CardHeader, CardContent, TextField, Box,  Alert, Typography, CardActions, useMediaQuery, useTheme} from '@mui/material'
// import Link from 'next/link';


// export default function ForgotPassword() {
//   const [email, setEmail] = useState('');
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//    const theme = useTheme();
//     const isDesktop = useMediaQuery(theme.breakpoints.up('md')); 

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setMessage('');
//     setError('');
//     setLoading(true);

//     try {
//       // Check if email is registered
//       const signInMethods = await fetchSignInMethodsForEmail(auth, email);

//       if (signInMethods.length === 0) {
//         setMessage('If an account exists, you will receive a password reset email.');
//         return;
//       }

//       // Send reset email if user exists
//       await sendPasswordResetEmail(auth, email);
//       setMessage('If an account exists, you will receive a password reset email.');
//     } catch (err: any) {
//       setError('Something went wrong. Please try again later.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Box display="flex" justifyContent="center" alignItems="center" mt={6} mr={isDesktop ? 40 : 0} >
//     <Card sx={{ maxWidth: 520, width: '100%', p:3  }}>
//       <CardHeader title="Reset Password" />
  
//       <CardContent>
//         {message && (
//           <Alert severity="success" sx={{ mb: 2 }}>
//             {message}
//           </Alert>
//         )}
  
//         {error && (
//           <Alert severity="error" sx={{ mb: 2 }}>
//             {error}
//           </Alert>
//         )}
  
//         <form onSubmit={handleSubmit}>
//           <TextField
//             id="email"
//             label="Email"
//             type="email"
//             fullWidth
//             required
//             margin="normal"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
  
//           <Button
//             fullWidth
//             type="submit"
//             variant="contained"
//             color="primary"
//             disabled={loading}
//             sx={{ mt: 2, py: 1.5 }}
//           >
//             {loading ? 'Processing...' : 'Send Reset Link'}
//           </Button>
//         </form>
//       </CardContent>
  
//       <CardActions sx={{ justifyContent: 'center' }}>
//         <Typography variant="body2">
//           Remembered your password?{' '}
//           <Link href="/signin" passHref>
//             <Typography
//               component="span"
//               sx={{ textDecoration: 'underline', fontWeight: 500, cursor: 'pointer' }}
//             >
//               Sign in
//             </Typography>
//           </Link>
//         </Typography>
//       </CardActions>
//     </Card>
//   </Box>
  
//   );
// }



'use client';

import { useState } from 'react';
import { auth, sendPasswordResetEmail, fetchSignInMethodsForEmail } from '@/lib/firebaseClient';
import Link from 'next/link';

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
import { url } from 'inspector';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setLoading(true);

    try {
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);

      // Send message regardless to avoid account enumeration
      if (signInMethods.length === 0) {
        setMessage('If an account exists, you will receive a password reset email.');
        return;
      }

      await sendPasswordResetEmail(auth, email);
      setMessage('If an account exists, you will receive a password reset email.');
    } catch (err: any) {
      setError('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{backgroundImage : `url('/assets/auth_bg.svg')`}} className="flex justify-center items-center mt-24">
      <div className="w-full max-w-md">
        <Card className='border-none shadow-none' >
          <CardHeader>
            <CardTitle >Reset Password</CardTitle>
          </CardHeader>

          <CardContent>
            {message && (
              <Alert variant="default" className="mb-4">
                <AlertTitle>{message}</AlertTitle>
              </Alert>
            )}

            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertTitle>{error}</AlertTitle>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
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

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Processing...' : 'Send Reset Link'}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="justify-center">
            <p className="text-sm text-center">
              Remembered your password?{' '}
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
