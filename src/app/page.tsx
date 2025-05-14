
'use client';

import { useState, useEffect } from 'react';
import { Spinner } from "@/components/ui/spinner";
import Banner from "@/components/store/FrontBannerSection";
import RecommendedProductsCarousel from "@/components/store/RecommendedProductsCarousel";
import ProductCard from "@/components/store/shared/ProductCard";
import { getCatalogData } from "@/hooks/store/getCatalogData";
import { Product } from "@/types/store/types";
import { SkeletonSection } from "@/components/loaders/SekeltonSection"


export default function StorePage() {
  const [catalogData, setCatalogData] = useState<{ categoriesWithProducts: { id: string; name: string; products: Product[] }[] } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getCatalogData();
        setCatalogData(data);
      } catch (e: any) {
        setError("We couldn't load the store data right now. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <main className="flex flex-col min-h-96 items-center justify-center">
         <SkeletonSection title="Electronics" />
      <SkeletonSection title="Men" />
      <SkeletonSection title="Pants" />
      </main>
    );
  }

  if (error) {
    return (
      <main className="container mx-auto px-4 py-8">
        <h1 className="mb-6 text-center text-3xl font-bold text-red-600">Store Unavailable</h1>
        <p className="text-center text-gray-600">{error}</p>
      </main>
    );
  }

  if (!catalogData || !catalogData.categoriesWithProducts || catalogData.categoriesWithProducts.length === 0) {
    return (
      <main className="container mx-auto px-4 py-8">
        <h1 className="mb-6 text-center text-3xl font-bold">Our Store</h1>
        <p className="text-center text-gray-600">
          No products found at the moment. Check back soon!
        </p>
      </main>
    );
  }

  const { categoriesWithProducts } = catalogData;

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <Banner />
      <RecommendedProductsCarousel />
      
      {categoriesWithProducts.map((category) => (
        <section key={category.id} className="mb-12">
          <h2 className="mb-2 pb-1 text-xl font-semibold">{category.name}</h2>
          
          {category.products && category.products.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {category.products.map((product: Product) => (
                <div key={product.productId}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            <p className="italic text-gray-500">
              No products found in this category currently.
            </p>
          )}
        </section>
      ))}
    </div>
  );
}