import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ChevronLeft, Home, FileText, LogIn, UserPlus } from "lucide-react"

const menuItems = [
  { icon: Home, label: "Dashboard", href: "/" },
  { icon: FileText, label: "UMKM Details", href: "/umkm/1" },
  { icon: LogIn, label: "Login", href: "/login" },
  { icon: UserPlus, label: "Register", href: "/register" },
]

export function Sidebar({ open, setOpen }) {
  return (
    <>
      <motion.div
        initial={false}
        animate={{ width: open ? "256px" : "0px" }}
        transition={{ duration: 0.3 }}
        className={cn("fixed inset-y-0 left-0 z-50 bg-card shadow-lg overflow-hidden", "md:relative md:block")}
      >
        <div className="flex h-full flex-col w-64">
          <div className="flex items-center justify-between px-4 py-2">
            <span className="text-2xl font-bold">UMKM Dashboard</span>
            <Button variant="ghost" size="icon" onClick={() => setOpen(false)} className="md:hidden">
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
        </div>
      </motion.div>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  )
}

