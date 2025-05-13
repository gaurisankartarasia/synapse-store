

// // src/app/store/page.tsx
// 'use client';

// import Container from "@mui/material/Container";
// import Grid from "@mui/material/Grid";
// import Banner from "@/components/Store/FrontBannerSection";
// import RecommendedProductsCarousel from "@/components/Store/RecommendedProductsCarousel";
// import ProductCard from "@/components/Store/catalog/ProductCard";
// import { getCatalogData } from "@/hooks/store/getCatalogData";
// import { Product } from "@/types/store/types";
// import { useState, useEffect } from 'react';
// import { CircularProgress } from "@mui/material";

// export default function StorePage() {
//   const [catalogData, setCatalogData] = useState<{ categoriesWithProducts: { id: string; name: string; products: Product[] }[] } | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const data = await getCatalogData();
//         setCatalogData(data);
//       } catch (e: any) {
//         setError("We couldn't load the store data right now. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchData();
//   }, []);

//   if (loading) {
//     return (
//       <main className="flex justify-center items-center min-h-96  ">
//        <CircularProgress/>
//       </main>
//     );
//   }

//   if (error) {
//     return (
//       <main className="container mx-auto px-4 py-8">
//         <h1 className="text-3xl font-bold mb-6 text-center text-red-600">Store Unavailable</h1>
//         <p className="text-center text-gray-600">{error}</p>
//       </main>
//     );
//   }

//   if (!catalogData || !catalogData.categoriesWithProducts || catalogData.categoriesWithProducts.length === 0) {
//     return (
//       <main className="container mx-auto px-4 py-8">
//         <h1 className="text-3xl font-bold mb-6 text-center">Our Store</h1>
//         <p className="text-center text-gray-600">
//           No products found at the moment. Check back soon!
//         </p>
//       </main>
//     );
//   }

//   const { categoriesWithProducts } = catalogData;

//   return (
//     <Container maxWidth="xl" className="px-4 py-8">
//       <Banner />
//       <RecommendedProductsCarousel />
//       {categoriesWithProducts.map((category) => (
//         <section key={category.id} className="mb-12">
//           <h2 className="text-xl font-semibold mb-2 pb-1">{category.name}</h2>
//           {category.products && category.products.length > 0 ? (
//             <Grid container spacing={2}>
//               {category.products.map((product: Product) => (
//                 <ProductCard key={product.id} product={product} />
//               ))}
//             </Grid>
//           ) : (
//             <p className="text-gray-500 italic">
//               No products found in this category currently.
//             </p>
//           )}
//         </section>
//       ))}
//     </Container>
//   );
// }

'use client';

import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import Banner from "@/components/Store/FrontBannerSection";
import RecommendedProductsCarousel from "@/components/Store/RecommendedProductsCarousel";
import ProductCard from "@/components/Store/catalog/ProductCard";
import { getCatalogData } from "@/hooks/store/getCatalogData";
import { Product } from "@/types/store/types";

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
      <main className="flex min-h-96 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
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
                <div key={product.id}>
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