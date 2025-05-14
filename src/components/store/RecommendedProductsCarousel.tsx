
"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide, SwiperRef } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import type { Product } from '@/types/store/types';

// Import Shadcn UI components
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Spinner } from '../ui/spinner';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

export default function RecommendedProductsCarousel() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const swiperRef = useRef<SwiperRef>(null);
  
  // State to track if we can navigate left/right
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch from the relative API route
        const res = await fetch('/api/v1/store/recommendations');
        if (!res.ok) {
          throw new Error(`Failed to fetch recommendations: ${res.statusText}`);
        }
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setProducts(data.products || []);
      } catch (err: any) {
        console.error("Fetch error:", err);
        setError(err.message || 'Could not load recommendations.');
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  if (loading) {
    return null
  }

  if (error) {
    return (
      <div className="p-4">
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (products.length === 0) {
    // Don't render the section if there are no recommendations
    return null;
  }

  // Handle swiper events to track position
  const handleSwiperInit = (swiper: any) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  const handleSwiperSlideChange = (swiper: any) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  return (
    <div className="py-8">
      <div className="max-w-6xl mx-auto px-4 relative">
        <h2 className="text-center text-2xl font-medium mb-6">
          Our Top Recommendations
        </h2>

        <div className="relative">
          <Swiper
            ref={swiperRef}
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={2}
            onInit={handleSwiperInit}
            onSlideChange={handleSwiperSlideChange}
            breakpoints={{
              640: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 30,
              },
            }}
            className="pb-4"
          >
            {products.map((product) => (
              <SwiperSlide key={product.productId} className="h-auto">
                <Link href={`/products/${product.productId}`} className="block no-underline">
                  <Card className="shadow-none border-none">
                    <CardContent className="p-4">
                      <Image
                        className="rounded-lg"
                        src={product.imageUrl}
                        alt={product.name ?? 'Recommended product'}
                        width={200}
                        height={200}
                        style={{ objectFit: "contain", maxHeight: '100%', maxWidth: '100%' }}
                      />
                      <div className="text-sm font-medium text-center mt-2">
                        {product.name}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Only show the left button if we're not at the beginning */}
          {!isBeginning && (
            <Button
              size="icon"
              variant="outline"
              className="absolute top-1/2 left-0 md:-left-4 -translate-y-1/2 z-10 bg-white shadow-md hover:bg-gray-100"
              onClick={() => swiperRef.current?.swiper.slidePrev()}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous slide</span>
            </Button>
          )}

          {/* Only show the right button if we're not at the end */}
          {!isEnd && (
            <Button
              size="icon"
              variant="outline"
              className="absolute top-1/2 right-0 md:-right-4 -translate-y-1/2 z-10 bg-white shadow-md hover:bg-gray-100"
              onClick={() => swiperRef.current?.swiper.slideNext()}
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next slide</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}