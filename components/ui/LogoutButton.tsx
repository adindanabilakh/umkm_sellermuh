"use client";

import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("token"); // Hapus token dari cookies
    router.push("/login"); // Redirect ke login
  };

  return <button onClick={handleLogout}>Logout</button>;
}
