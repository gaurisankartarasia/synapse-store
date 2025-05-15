import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Badge } from "@/components/ui/badge"

interface SizeSelectorProps {
    sizes: { name: string; available: boolean; price?: number }[];
    selectedSize: string | null;
    onSelectSize: (size: string) => void;
    sizePrefix?: string; // Optional prefix for size labels (e.g., "US")
    showPrice ?: boolean; // Optional, show price difference
}

const SizeSelector: React.FC<SizeSelectorProps> = ({
    sizes,
    selectedSize,
    onSelectSize,
    sizePrefix = '',
    showPrice  = false,
}) => {
    // Use useCallback for memoization, good for performance with repeated renders
    const handleSizeSelect = useCallback(
        (sizeName: string) => {
            onSelectSize(sizeName);
        },
        [onSelectSize]
    );

    return (
        <div className="flex flex-wrap gap-2">
            {sizes.map((size) => {
                const isSelected = selectedSize === size.name;
                const buttonText = sizePrefix ? `${sizePrefix} ${size.name}` : size.name;

                return (
                    <div key={size.name}>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleSizeSelect(size.name)}
                            disabled={!size.available}
                            className={cn(
                                "rounded-full px-4 py-2", // Consistent padding
                                "transition-colors duration-200", // Smooth transitions
                                "flex items-center gap-1", // Space between text and badge
                                isSelected
                                    ? "bg-black text-white hover:bg-gray-800" // Selected state
                                    : size.available
                                        ? "text-gray-900 hover:bg-gray-100" // Available state
                                        : "text-gray-400 cursor-not-allowed", // Unavailable state
                                "border", // Explicit border
                                isSelected ? "border-black" : "border-gray-300", // Selected border
                                "font-medium" // Make the text bold
                            )}
                        >
                            {buttonText}
                            {showPrice  && size.price && (
                                <Badge
                                    variant={isSelected ? "secondary" : "outline"} // Use outline for non-selected
                                    className={cn(
                                        "text-xs font-medium", // Smaller font size
                                         isSelected ? "bg-white text-black" : "bg-gray-100 text-gray-700"
                                    )}
                                >
                                    {size.price > 0 ? `+$${size.price.toFixed(2)}` : ''}
                                </Badge>
                            )}
                        </Button>
                    </div>
                );
            })}
        </div>
    );
};

export default SizeSelector;
