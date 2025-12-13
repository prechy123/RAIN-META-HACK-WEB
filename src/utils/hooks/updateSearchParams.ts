import { useRouter, useSearchParams } from "next/navigation";

export default function useUpdateSearchParams() {
  const router = useRouter();
  const searchParams = useSearchParams()
  return function update(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    router.push(`?${params.toString()}`);
  };
}
