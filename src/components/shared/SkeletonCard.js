import { Skeleton } from '@/components/ui/skeleton';

export default function SkeletonCard() {
  return (
    <div className="border rounded-lg overflow-hidden bg-white" data-testid="skeleton-card">
      <Skeleton className="aspect-square w-full" />
      <div className="p-3 md:p-4 space-y-2">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-9 w-full" />
      </div>
    </div>
  );
}
