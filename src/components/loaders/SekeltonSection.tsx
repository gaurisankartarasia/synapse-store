// components/SkeletonSection.tsx
import { Skeleton } from "@/components/ui/skeleton"
import { SkeletonProductCard } from "./SkeletonProductCard"

export function SkeletonSection() {
  return (
    <div className="my-6">
      <Skeleton className="h-6 w-32 mb-4" />
      <div className="flex gap-4 flex-wrap">
        {Array.from({ length: 5 }).map((_, i) => (
          <SkeletonProductCard key={i} />
        ))}
      </div>
    </div>
  )
}
