

"use client";

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Product } from '@/types/store/types';
import ProductCard from '@/components/store/shared/ProductCard';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Spinner } from "@/components/ui/spinner";

interface SearchResults {
  products: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Separate component that uses useSearchParams
function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchResults, setSearchResults] = useState<SearchResults | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>('relevance');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query || query.length < 2) {
        setSearchResults(null);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `/api/v1/store/search?q=${encodeURIComponent(query)}&page=${currentPage}&sortBy=${sortBy}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch search results');
        }

        const data = await response.json();
        setSearchResults(data);
      } catch (err: any) {
        console.error('Error fetching search results:', err);
        setError(err.message || 'Failed to load search results');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSearchResults();
  }, [query, currentPage, sortBy]);

  const handleSortChange = (value: string) => {
    setSortBy(value);
    setCurrentPage(1); // Reset to first page when sorting changes
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > (searchResults?.totalPages || 1)) return;
    setCurrentPage(page);
    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Generate pagination items
  const renderPagination = () => {
    if (!searchResults || searchResults.totalPages <= 1) return null;

    const pages = [];
    const totalPages = searchResults.totalPages;
    const currentPageNum = searchResults.page;

    // Always show first page
    pages.push(
      <Button
        key="first"
        variant={currentPageNum === 1 ? "default" : "outline"}
        size="sm"
        onClick={() => handlePageChange(1)}
      >
        1
      </Button>
    );

    // Calculate range of pages to show
    const startPage = Math.max(2, currentPageNum - 1);
    const endPage = Math.min(totalPages - 1, currentPageNum + 1);

    // Show ellipsis after first page if needed
    if (startPage > 2) {
      pages.push(
        <span key="ellipsis1" className="px-2">
          ...
        </span>
      );
    }

    // Show middle pages
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <Button
          key={i}
          variant={currentPageNum === i ? "default" : "outline"}
          size="sm"
          onClick={() => handlePageChange(i)}
        >
          {i}
        </Button>
      );
    }

    // Show ellipsis before last page if needed
    if (endPage < totalPages - 1) {
      pages.push(
        <span key="ellipsis2" className="px-2">
          ...
        </span>
      );
    }

    // Always show last page if there's more than one page
    if (totalPages > 1) {
      pages.push(
        <Button
          key="last"
          variant={currentPageNum === totalPages ? "default" : "outline"}
          size="sm"
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </Button>
      );
    }

    return (
      <div className="mt-8 flex justify-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(currentPageNum - 1)}
          disabled={currentPageNum === 1}
        >
          Previous
        </Button>
        {pages}
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(currentPageNum + 1)}
          disabled={currentPageNum === totalPages}
        >
          Next
        </Button>
      </div>
    );
  };

  return (
    <>
      <div className="mb-6">
        <h1 className="mb-2 text-2xl font-bold">Search Results for "{query}"</h1>
        {searchResults && (
          <p className="text-gray-600">
            {searchResults.total} {searchResults.total === 1 ? 'result' : 'results'} found
          </p>
        )}
      </div>

      {/* Search Controls */}
      {searchResults && searchResults.total > 0 && (
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <label htmlFor="sort-by" className="text-sm font-medium">
              Sort by:
            </label>
            <Select value={sortBy} onValueChange={handleSortChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="price_asc">Price: Low to High</SelectItem>
                <SelectItem value="price_desc">Price: High to Low</SelectItem>
                <SelectItem value="name_asc">Name: A to Z</SelectItem>
                <SelectItem value="name_desc">Name: Z to A</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-20">
          <Spinner size={40} />
        </div>
      )}

      {/* Error State */}
      {error && !isLoading && (
        <div className="rounded border border-red-200 bg-red-50 px-4 py-3 text-red-700">
          <p>{error}</p>
        </div>
      )}

      {/* No Results */}
      {!isLoading && !error && searchResults && searchResults.products.length === 0 && (
        <div className="py-10 text-center">
          <p className="text-xl text-gray-600">No products found for "{query}"</p>
          <p className="mt-2 text-gray-500">Try using different keywords or browse our categories</p>
        </div>
      )}

      {/* Results Grid */}
      {!isLoading && !error && searchResults && searchResults.products.length > 0 && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {searchResults.products.map((product) => (
            <ProductCard key={product.productId} product={product} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {searchResults && searchResults.totalPages > 1 && renderPagination()}
    </>
  );
}

// Loading fallback component
function SearchPageFallback() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <div className="mb-2 h-8 w-64 animate-pulse rounded bg-gray-200"></div>
        <div className="h-4 w-32 animate-pulse rounded bg-gray-200"></div>
      </div>
      <div className="flex items-center justify-center py-20">
        <Spinner />
        <span className="ml-2">Loading search results...</span>
      </div>
    </div>
  );
}

// Main page component
export default function SearchPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense fallback={<SearchPageFallback />}>
        <SearchResults />
      </Suspense>
    </div>
  );
}