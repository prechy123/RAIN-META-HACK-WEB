import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthState } from "../types/user";
import { useRouter } from "next/navigation";

const initialState = {
  isAuthenticated: false,
  id: "",
  business_id: "",
  setAuth: () => {},
  logout: () => {},
};

const AuthContext = createContext<AuthState>(initialState);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [auth, setAuth] = useState<AuthState>(initialState);
  const router = useRouter();

  useEffect(() => {
    async function fetchUser() {
      // Check for business data first
      // const businessData = localStorage.getItem("businessData");
      // if (businessData) {
      //   const business = JSON.parse(businessData);
      //   setAuth({
      //     ...business,
      //     isAuthenticated: true,
      //     setAuth: setAuth,
      //     logout: () => {},
      //   });
      //   router.push("/dashboard");
      //   return;
      // }

      
    }
    fetchUser();
  }, []);

  const value: AuthState = {
    ...auth,
    setAuth: (newAuth: AuthState): void => {
      setAuth({
        ...newAuth,
      });
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};
