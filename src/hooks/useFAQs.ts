import { FAQ } from "@/types";
import { useQuery } from "@tanstack/react-query";

async function fetchFAQs(): Promise<FAQ[]> {
  const res = await fetch("/api/faqs");
  if (!res.ok) throw new Error("Failed to fetch FAQs");
  return res.json();
}

export function useFAQs() {
  return useQuery({
    queryKey: ["faqs"],
    queryFn: fetchFAQs,
    staleTime: 1000 * 60 * 10,
  });
}
