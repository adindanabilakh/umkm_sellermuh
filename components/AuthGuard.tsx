"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();

//   useEffect(() => {
//     const token = Cookies.get("token");

//     if (!token) {
//       router.push("/login");
//     } else {
//       setIsAuthenticated(true);
//     }
//   }, []);

//   if (isAuthenticated === null) {
//     return <p>Loading...</p>; // ✅ Bisa diganti dengan spinner
//   }

  return <>{children}</>;
}
