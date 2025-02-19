import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, Home, FileText, LogOut } from "lucide-react";

const menuItems = [
  { icon: Home, label: "Dashboard", href: "/dashboard" },
  { icon: FileText, label: "UMKM Details", href: "/umkm/1" },
];

// ✅ Tambahkan Tipe Props
interface SidebarProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export function Sidebar({ open, setOpen }: SidebarProps) {
  const router = useRouter();

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
    <>
      <motion.div
        initial={false}
        animate={{ width: open ? "256px" : "0px" }}
        transition={{ duration: 0.3 }}
        className={cn(
          "fixed inset-y-0 left-0 z-50 bg-card shadow-lg overflow-hidden",
          "md:relative md:block"
        )}
      >
        <div className="flex h-full flex-col w-64">
          <div className="flex items-center justify-between px-4 py-2">
            <span className="text-2xl font-bold">UMKM Dashboard</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setOpen(false)}
              className="md:hidden"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex-1 overflow-y-auto py-4">
            <nav className="space-y-2 px-2">
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center rounded-lg px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="p-4">
            <Button onClick={handleLogout} className="w-full">
              <LogOut className="mr-2 h-4 w-4" /> Logout
            </Button>
          </div>
        </div>
      </motion.div>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}
