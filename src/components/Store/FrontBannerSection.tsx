
// 'use client';

// import { Box, Button, Container, Typography } from '@mui/material';
// import { FC } from 'react';
// import { useBanner } from '@/hooks/store/useBanner';
// import Link from 'next/link';

// const Banner: FC = () => {
//   const { banner, isLoading, isError } = useBanner();

//   if (isLoading) return <div>Loading banner...</div>;
//   if (isError || !banner) return <div>Failed to load banner.</div>;

//   return (
//     <Box
//       sx={{  backgroundImage: `url(${banner.image})`,
//         position: 'relative',
//         width: '100%',
//         height: { xs: '30vh', md: '40vh' },
//         backgroundSize: 'cover',
//         display: 'flex',
//         alignItems: 'center',
//         color: '#3c4043',
//         borderRadius: '40px',
//         border: '1px solid #0000008f',
//       }}
//     >
//       <Box
//         sx={{
//           position: 'absolute',
//           inset: 0,
//           borderRadius: '40px',
//         }}
//       />
//       <Container
//         sx={{
//           position: 'relative',
//           zIndex: 1,
//           textAlign: { xs: 'center', md: 'left' },
//         }}
//       >
//         <Typography variant="h3" fontWeight={600} component="h1" gutterBottom>
//           {banner.title}
//         </Typography>
//         <Typography variant="h6" sx={{ mb: 3, maxWidth:'300px' }}>
//           {banner.description}
//         </Typography>
//         <Button
//         LinkComponent={Link}
//           href={banner.buttonUrl}
//           variant="outlined"
//           size="large"
//           sx={{
//             px: 3,
//             fontSize: '1.2rem',
//             color: 'black',
//           }}
//         >
//           {banner.buttonText}
//         </Button>
//       </Container>
//     </Box>
//   );
// };

// export default Banner;


'use client';

import { FC } from 'react';
import { useBanner } from '@/hooks/store/useBanner';
import Link from 'next/link';
import { Button } from '@/components/ui/button'; // shadcn button

const Banner: FC = () => {
  const { banner, isLoading, isError } = useBanner();

  if (isLoading) return <div>Loading banner...</div>;
  if (isError || !banner) return <div>Failed to load banner.</div>;

  return (
    <div
      className="relative w-full  rounded-[40px] border border-black/55 bg-cover bg-center flex items-center text-[#3c4043]"
      style={{ backgroundImage: `url(${banner.image})`, height: '80vh' }}
    >
      <div className="absolute inset-0 rounded-[40px] bg-black/0" />

      <div className="relative z-10 px-4 md:px-12 text-center md:text-left">
        <h1 className="text-3xl md:text-5xl font-semibold mb-2">
          {banner.title}
        </h1>
        <p className="text-lg md:text-xl mb-4 max-w-[300px] mx-auto md:mx-0">
          {banner.description}
        </p>
        <Button asChild variant="outline" className="text-lg px-6">
          <Link href={banner.buttonUrl}>{banner.buttonText}</Link>
        </Button>
      </div>
    </div>
  );
};

export default Banner;
