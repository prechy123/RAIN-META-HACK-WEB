import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthState } from "../types/user";
import Cookies from "js-cookie";
import { googleLogout } from "@react-oauth/google";

const initialState = {
  isAuthenticated: false,
  token: "",
  user: {
    email: "",
    picture: "",
    name: "",
    id: "",
  },
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

  useEffect(() => {
    async function fetchUser() {
      const data = localStorage.getItem("moment-user");
      if (!data) {
        const adminData = localStorage.getItem("moment-admin");
        if (!adminData) return;
        const adminUser = JSON.parse(adminData);
        setAuth({
          ...adminUser,
          isAuthenticated: true,
          setAuth: setAuth,
          logout: handleLogout,
        });
        return;
      }
      const user = JSON.parse(data);
      if (user) {
        setAuth({
          ...user,
          isAuthenticated: true,
          setAuth: setAuth,
          logout: handleLogout,
        });
      }
    }
    fetchUser();
  }, []);

  const handleLogout = () => {
    try {
      localStorage.removeItem("moment-user");
      localStorage.removeItem("moment-admin");
      Cookies.remove("token");
      googleLogout();

      setAuth({
        isAuthenticated: false,
        token: "",
        user: {
          email: "",
          picture: "",
          name: "",
          id: "",
        },
        setAuth: setAuth,
        logout: handleLogout,
      });

      window.location.href = "/login";
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const value: AuthState = {
    ...auth,
    setAuth: (newAuth: AuthState): void => {
      setAuth({
        ...newAuth,
        logout: handleLogout,
      });
    },
    logout: handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};
