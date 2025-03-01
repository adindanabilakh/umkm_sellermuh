import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // ✅ Tambahkan useRouter untuk navigasi
import { Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ModeToggle } from "./mode-toggle";

export function Header() {
  const router = useRouter(); // ✅ Inisialisasi router untuk navigasi
  const [umkmData, setUmkmData] = useState<{
    id: number;
    name: string;
    email: string;
  } | null>(null);

  useEffect(() => {
    const storedUMKM = localStorage.getItem("umkm");
    if (storedUMKM) {
      try {
        const parsedUMKM = JSON.parse(storedUMKM);
        setUmkmData({
          id: parsedUMKM.id, // ✅ Ambil ID UMKM
          name: parsedUMKM.name || "Unknown UMKM",
          email: parsedUMKM.email || "No Email",
        });
      } catch (error) {
        console.error("Error parsing UMKM data:", error);
      }
    }
  }, []);

  const handleLogout = async () => {
    try {
      // 🔹 Panggil API Logout ke backend
      await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/umkm/logout`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Kirim token ke backend
        },
        credentials: "include", // Pastikan mengirim cookies jika dibutuhkan
      });

      // 🔹 Hapus token dari cookies
      document.cookie =
        "token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";

      // 🔹 Hapus semua data dari localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("umkm");

      // 🔹 Redirect ke halaman login
      router.push("/auth/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40 w-full border-b">
      <div className="container flex h-16 items-center">
        <div className="flex-1 flex items-center justify-end space-x-4">
          <ModeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {umkmData?.name || "Loading..."}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {umkmData?.email || "Loading..."}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => router.push(`/umkm/${umkmData?.id}`)}
              >
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
