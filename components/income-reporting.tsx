"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Definisi tipe untuk setiap entri pendapatan
interface IncomeEntry {
  id: string;
  date: string;
  amount: number;
}

interface IncomeReportingProps {
  incomeEntries: IncomeEntry[];
}

export function IncomeReporting({ incomeEntries }: IncomeReportingProps) {
  const [dateRange, setDateRange] = useState("thisMonth");

  const filteredEntries = useMemo(() => {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());

    switch (dateRange) {
      case "thisWeek":
        return incomeEntries.filter(
          (entry: IncomeEntry) => new Date(entry.date) >= startOfWeek
        );
      case "thisMonth":
        return incomeEntries.filter(
          (entry: IncomeEntry) => new Date(entry.date) >= startOfMonth
        );
      case "allTime":
      default:
        return incomeEntries;
    }
  }, [incomeEntries, dateRange]);

  const totalIncome = filteredEntries.reduce(
    (sum: number, entry: IncomeEntry) => sum + Number(entry.amount),
    0
  );

  const chartData = useMemo(() => {
    const data: Record<string, number> = {};
    filteredEntries.forEach((entry: IncomeEntry) => {
      if (data[entry.date]) {
        data[entry.date] += Number(entry.amount);
      } else {
        data[entry.date] = Number(entry.amount);
      }
    });
    return Object.entries(data).map(([date, amount]) => ({ date, amount }));
  }, [filteredEntries]);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Income Report</CardTitle>
        <Select
          value={dateRange}
          onValueChange={setDateRange}
          options={[
            { label: "This Week", value: "thisWeek" },
            { label: "This Month", value: "thisMonth" },
            { label: "All Time", value: "allTime" },
          ]}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue value={dateRange || "Select date range"} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem
              value="thisWeek"
              onSelect={() => setDateRange("thisWeek")}
            >
              This Week
            </SelectItem>
            <SelectItem
              value="thisMonth"
              onSelect={() => setDateRange("thisMonth")}
            >
              This Month
            </SelectItem>
            <SelectItem
              value="allTime"
              onSelect={() => setDateRange("allTime")}
            >
              All Time
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold mb-4">
          Total Income: ${totalIncome.toFixed(2)}
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="amount" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
