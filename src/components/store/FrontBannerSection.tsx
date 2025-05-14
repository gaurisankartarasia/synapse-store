


'use client';

import { FC } from 'react';
import { useBanner } from '@/hooks/store/useBanner';
import Link from 'next/link';
import { Button } from '@/components/ui/button'; // shadcn button

const Banner: FC = () => {
  const { banner, isLoading, isError } = useBanner();

  // Loading state
  if (isLoading) return null;

  // Error or missing banner state
  if (isError || !banner) return <div className="text-center py-10">Failed to load banner.</div>;

  // Destructure with fallbacks
  const {
    image = '/fallback-banner.jpg',
    title = 'Featured Product',
    description = 'Check out our latest release.',
    buttonText = 'Learn More',
    buttonUrl = '#'
  } = banner;

  return (
    <div
      className="relative w-full rounded-[40px]  bg-cover bg-center flex items-center text-[#3c4043]"
     style={{ backgroundImage: `url(${image})`, height: '40vh', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}

    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 rounded-[40px] bg-gradient-to-r from-black/40 to-black/10" />

      <div className="relative z-10 px-4 md:px-12 text-center md:text-left">
        <h1 className="text-3xl md:text-5xl font-semibold mb-2 text-white">
          {title}
        </h1>
        <p className="text-lg md:text-xl mb-4 max-w-[300px] mx-auto md:mx-0 text-white">
          {description}
        </p>
        <Button asChild variant="outline" className="text-lg px-6">
          <Link href={buttonUrl}>{buttonText}</Link>
        </Button>
      </div>
    </div>
  );
};

export default Banner;
