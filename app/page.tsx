"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie"; // ✅ Import library cookies
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Dashboard from "@/components/dashboard";


export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token"); // ✅ Cek token dari cookies

    if (token) {
      router.push("/dashboard"); // ✅ Redirect jika sudah login
    }
  }, []);

  return (
    // <div className="flex min-h-screen flex-col items-center justify-center p-24">
    //   <h1 className="text-4xl font-bold mb-8">Welcome to UMKM Dashboard</h1>
    //   <p className="text-xl mb-8">Manage your UMKM details with joy</p>
    //   <div className="flex space-x-4">
    //     <Button asChild>
    //       <Link href="/login">Login</Link>
    //     </Button>
    //     <Button asChild variant="outline">
    //       <Link href="/register">Register</Link>
    //     </Button>
    //   </div>
    // </div>
    <Dashboard />
  );
}
