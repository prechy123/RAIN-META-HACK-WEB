"use client";

import { Suspense } from "react";
import AuthProvider from "./AuthProvider";
import ToastProvider from "./ToastProvider";

export default function AllProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense>
      <AuthProvider>
        <ToastProvider>{children}</ToastProvider>
      </AuthProvider>
    </Suspense>
  );
}
