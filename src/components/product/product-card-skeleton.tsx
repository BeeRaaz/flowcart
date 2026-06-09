export function ProductCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-3/4 rounded-lg bg-border mb-3" />
      <div className="space-y-2">
        <div className="h-2.5 bg-border rounded w-1/4" />
        <div className="h-3.5 bg-border rounded w-3/4" />
        <div className="h-3.5 bg-border rounded w-1/3" />
      </div>
    </div>
  );
}
