import { usePathname, useRouter, useSearchParams } from "next/navigation";

// Custom hook to get the router, pathname, and searchParams
export default function useRPS() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  return { router, pathname, searchParams };
}
