// components/SkeletonProductCard.tsx
import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonProductCard() {
  return (
    <div className="flex flex-col gap-3 w-56"> {/* Increased width from w-40 to w-56 */}
      <Skeleton className="h-36 w-full rounded-md" /> {/* Increased height from h-24 to h-36 */}
      <Skeleton className="h-5 w-4/5" />              {/* Name */}
      <Skeleton className="h-4 w-1/4" />              {/* Price */}
    </div>
  )
}
