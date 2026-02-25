import { Skeleton } from "@/components/ui/skeleton"

export function ProductCardSkeleton() {
    return (
        <div className="flex flex-col gap-1 w-full animate-pulse">
            <Skeleton className="aspect-3/4 w-full rounded-none mb-3 bg-neutral-200" />
            <Skeleton className="h-4 w-3/4 bg-neutral-200" />
            <Skeleton className="h-2 w-1/4 bg-neutral-200" />
            <Skeleton className="h-4 w-1/3 mt-3 bg-neutral-200" />
        </div>
    )
}
