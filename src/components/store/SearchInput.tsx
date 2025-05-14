

"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import useDebounce from '@/hooks/useDebounce';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Spinner } from '../ui/spinner';

// Define the structure for suggestions matching the API response
interface Suggestion {
  id: string;
  name: string;
  type: 'product';
  imageUrl?: string;
}

export default function SearchInput() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Debounce the search term (wait 300ms after user stops typing)
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Fetch suggestions function
  const fetchSuggestions = useCallback(async (query: string) => {
    if (query.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      setIsLoading(false);
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);
    setShowSuggestions(true);

    try {
      const response = await fetch(`/api/v1/store/search-suggestions?q=${encodeURIComponent(query)}`);
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      setSuggestions(data.suggestions || []);
    } catch (err: any) {
      console.error("Failed to fetch suggestions:", err);
      setError('Could not load suggestions.');
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Effect to fetch when debounced term changes
  useEffect(() => {
    fetchSuggestions(debouncedSearchTerm);
  }, [debouncedSearchTerm, fetchSuggestions]);

  // Handle input change
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // Handle form submission
  const handleSearchSubmit = (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setShowSuggestions(false);
      setSearchTerm('');
    }
  };

  // Handle outside clicks to close suggestions
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={searchContainerRef} className="relative w-full max-w-lg mx-auto ">
      <form onSubmit={handleSearchSubmit} role="search" className="relative ">
        <div className="relative ">
          <Input
            type="search"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleInputChange}
            onFocus={() => searchTerm.length >= 2 && setShowSuggestions(true)}
            className="w-full pr-10"
            aria-label="Search products"
          />
          <Button
            type="submit"
            size="icon"
            variant="ghost"
            className="absolute inset-y-0 right-0 px-3 text-muted-foreground hover:text-primary"
            aria-label="Submit search"
          >
            <MagnifyingGlassIcon className="h-4 w-4" />
          </Button>
        </div>
      </form>

      {showSuggestions && (
        <Card className="absolute bg-white/90 backdrop-blur-2xl z-20 w-full mt-1 max-h-80 overflow-y-auto rounded-b-3xl rounded-t-none shadow-2xl">
          {isLoading && (
            <div className="flex items-center justify-center p-4 text-muted-foreground ">
              <Spinner  />
            </div>
          )}
          
          {error && !isLoading && (
            <div className="p-4 text-destructive">{error}</div>
          )}
          
          {!isLoading && !error && suggestions.length === 0 && debouncedSearchTerm.length >= 2 && (
            <div className="p-4 text-muted-foreground text-center">No results found for "{debouncedSearchTerm}".</div>
          )}
          
          {!isLoading && !error && suggestions.length > 0 && (
            <ul>
              {suggestions.map((suggestion) => (
                <li key={suggestion.id} className="border-b border-border  last:border-b-0">
                  <Link 
                    href={`/search?q=${encodeURIComponent(suggestion.name)}`}
                    className="flex items-center w-full px-4 py-2 text-left hover:bg-accent"
                    onClick={() => setShowSuggestions(false)}
                  >
                    {suggestion.imageUrl ? (
                      <Image
                        src={suggestion.imageUrl}
                        alt=""
                        width={32}
                        height={32}
                        className="w-8 h-8 object-contain rounded-sm mr-3 flex-shrink-0"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-muted rounded-sm mr-3 flex-shrink-0" />
                    )}
                    <span className="truncate text-sm">{suggestion.name}</span>
                  </Link>
                </li>
              ))}
              
              <li className="border-t border-border">
                <Link
                  href={`/search?q=${encodeURIComponent(searchTerm.trim())}`}
                  className="flex items-center w-full px-4 py-2 text-left text-sm font-semibold text-primary hover:bg-accent focus:outline-none focus:bg-accent"
                  onClick={() => setShowSuggestions(false)}
                >
                  <MagnifyingGlassIcon className="h-4 w-4 mr-2" />
                  <span>See all results for "{debouncedSearchTerm}"</span>
                </Link>
              </li>
            </ul>
          )}
        </Card>
      )}
    </div>
  );
}