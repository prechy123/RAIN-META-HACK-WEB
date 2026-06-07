"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type { Business } from "@/services/authService";
import { useAuthService } from "@/services/authService";
import { showSuccessToast } from "@/libs/utils/showToast";

interface BusinessContextValue {
  business: Business;
  /** Persists a partial update via the API and refreshes local state. */
  updateBusiness: (
    changes: Partial<Business>,
    successMessage?: string,
  ) => Promise<boolean>;
}

const BusinessContext = createContext<BusinessContextValue | null>(null);

export function BusinessProvider({
  initialBusiness,
  children,
}: {
  initialBusiness: Business;
  children: ReactNode;
}) {
  const { updateBusinessDetails } = useAuthService();
  const [business, setBusiness] = useState<Business>(initialBusiness);

  const updateBusiness = useCallback(
    async (changes: Partial<Business>, successMessage?: string) => {
      try {
        const res = await updateBusinessDetails(business.business_id, changes);
        const next = res.business ?? { ...business, ...changes };
        setBusiness(next);
        localStorage.setItem("businessData", JSON.stringify(next));
        if (successMessage) showSuccessToast(successMessage);
        return true;
      } catch {
        // axios layer surfaces the error toast
        return false;
      }
    },
    [business, updateBusinessDetails],
  );

  return (
    <BusinessContext.Provider value={{ business, updateBusiness }}>
      {children}
    </BusinessContext.Provider>
  );
}

export function useBusiness() {
  const ctx = useContext(BusinessContext);
  if (!ctx) {
    throw new Error("useBusiness must be used within a BusinessProvider");
  }
  return ctx;
}
