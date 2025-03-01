import * as React from "react";
import { cn } from "@/lib/utils";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: { label: string; value: string }[];
  value: string;
  onValueChange: (value: string) => void;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, options, value, onValueChange, ...props }, ref) => {
    return (
      <select
        className={cn(
          "flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        {...props}
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }
);
Select.displayName = "Select";

const SelectTrigger = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => <div className={cn("relative w-full", className)}>{children}</div>;

const SelectContent = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={cn(
      "absolute mt-1 bg-white border rounded-md shadow-md",
      className
    )}
  >
    {children}
  </div>
);

const SelectItem = ({
  value,
  onSelect,
  children,
}: {
  value: string;
  onSelect: (value: string) => void;
  children: React.ReactNode;
}) => (
  <div
    className="p-2 hover:bg-gray-100 cursor-pointer"
    onClick={() => onSelect(value)}
  >
    {children}
  </div>
);

const SelectValue = ({ value }: { value: string }) => (
  <span className="block truncate">{value}</span>
);

export { Select, SelectTrigger, SelectContent, SelectItem, SelectValue };
