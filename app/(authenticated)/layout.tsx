import { LayoutWithSidebar } from "@/components/layout-with-sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import type React from "react";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <LayoutWithSidebar>{children}</LayoutWithSidebar>
    </ThemeProvider>
  )
}
