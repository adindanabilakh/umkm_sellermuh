"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ArrowUpRight, ArrowDownRight, DollarSign } from "lucide-react";

// This is mock data. In a real application, you would fetch this data from your backend.
const mockData = [
  { date: "2023-01", income: 5000 },
  { date: "2023-02", income: 6200 },
  { date: "2023-03", income: 5800 },
  { date: "2023-04", income: 7000 },
  { date: "2023-05", income: 6500 },
  { date: "2023-06", income: 7200 },
];

export function IncomeStatistics() {
  const [dateRange, setDateRange] = useState("6months");

  const currentMonthIncome = mockData[mockData.length - 1].income;
  const previousMonthIncome = mockData[mockData.length - 2].income;
  const percentageChange =
    ((currentMonthIncome - previousMonthIncome) / previousMonthIncome) * 100;

  const filteredData = mockData.slice(-6); // Show last 6 months by default

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Income Statistics</CardTitle>
        <Select
          value={dateRange}
          onValueChange={setDateRange}
          options={[
            { label: "Last 3 Months", value: "3months" },
            { label: "Last 6 Months", value: "6months" },
            { label: "Last 12 Months", value: "12months" },
          ]}
        />
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="p-4 bg-primary text-primary-foreground rounded-lg">
            <h3 className="text-lg font-semibold">This Month</h3>
            <div className="flex items-center">
              <DollarSign className="mr-2 h-8 w-8" />
              <span className="text-3xl font-bold">{currentMonthIncome}</span>
            </div>
          </div>
          <div className="p-4 bg-secondary text-secondary-foreground rounded-lg">
            <h3 className="text-lg font-semibold">Previous Month</h3>
            <div className="flex items-center">
              <DollarSign className="mr-2 h-8 w-8" />
              <span className="text-3xl font-bold">{previousMonthIncome}</span>
            </div>
          </div>
          <div className="p-4 bg-accent text-accent-foreground rounded-lg">
            <h3 className="text-lg font-semibold">Change</h3>
            <div className="flex items-center">
              {percentageChange >= 0 ? (
                <ArrowUpRight className="mr-2 h-8 w-8 text-green-500" />
              ) : (
                <ArrowDownRight className="mr-2 h-8 w-8 text-red-500" />
              )}
              <span
                className={`text-3xl font-bold ${
                  percentageChange >= 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {Math.abs(percentageChange).toFixed(2)}%
              </span>
            </div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={filteredData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="income"
              stroke="#8884d8"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
