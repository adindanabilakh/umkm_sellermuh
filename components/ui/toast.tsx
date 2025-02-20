"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { toast as sonnerToast } from "sonner";

export const toast = sonnerToast;

export function Toast({
  message,
  action,
}: {
  message: string;
  action?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between p-4 bg-gray-800 text-white rounded-md shadow-lg"
      )}
    >
      <span>{message}</span>
      {action}
    </div>
  );
}
