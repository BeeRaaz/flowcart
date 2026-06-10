import { Review } from "@/types";
import { useQuery } from "@tanstack/react-query";

async function fetchReviews(): Promise<Review[]> {
  const res = await fetch("/api/reviews");
  if (!res.ok) throw new Error("Failed to fetch reviews");
  return res.json();
}

export function useReviews() {
  return useQuery({
    queryKey: ["reviews"],
    queryFn: fetchReviews,
    staleTime: 1000 * 60 * 5,
  });
}
