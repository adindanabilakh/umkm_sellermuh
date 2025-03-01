"use client";

import { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  TrendingUp,
} from "lucide-react";
import { format } from "date-fns";

// Tipe data untuk IncomeEntry
interface IncomeEntry {
  id: string;
  date: string;
  amount: number;
}

// Tipe data untuk Chart Tooltip
interface TooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

// Tipe data untuk Custom Dot
interface CustomDotProps {
  cx?: number;
  cy?: number;
  payload?: { month: string; amount: number };
}

// Tipe data untuk AnimatedNumber
interface AnimatedNumberProps {
  value: number;
}

// Tipe data untuk hasil useMemo
interface IncomeData {
  monthlyData: { month: string; amount: number; index: number }[];
  totalIncome: number;
  previousMonthIncome: number;
  percentageChange: number;
  averageIncome: number;
  highestMonth: { amount: number; month: string };
}

// Custom Tooltip
const CustomTooltip: React.FC<TooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return null;
  }
  return null;
};

// Custom Active Dot
const CustomActiveDot: React.FC<CustomDotProps> = ({ cx, cy, payload }) => {
  if (!payload) return null;

  return (
    <g>
      <circle
        cx={cx}
        cy={cy}
        r={8}
        fill="#ff0000"
        stroke="#fff"
        strokeWidth={3}
      />
      <foreignObject x={cx! - 100} y={cy! - 120} width={200} height={100}>
        <div className="bg-black/80 p-4 rounded-lg shadow-lg border border-gray-800 text-white">
          <p className="font-bold text-lg">{payload.month}</p>
          <p className="text-green-400">
            Income:{" "}
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(payload.amount)}
          </p>
        </div>
      </foreignObject>
    </g>
  );
};

// Animated Number
const AnimatedNumber: React.FC<AnimatedNumberProps> = ({ value }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const start = 0;
    const end = Math.round(value);
    if (start === end) return;

    const duration = 1000;
    const frameDuration = 1000 / 60;
    const totalFrames = Math.round(duration / frameDuration);
    let frame = 0;

    const timer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const currentValue = Math.round(end * progress);

      if (frame === totalFrames) {
        clearInterval(timer);
        setDisplayValue(end);
      } else {
        setDisplayValue(currentValue);
      }
    }, frameDuration);

    return () => clearInterval(timer);
  }, [value]);

  return <span>{displayValue.toFixed(2)}</span>;
};

// Income Overview Component
export function IncomeOverview({
  incomeEntries,
}: {
  incomeEntries: IncomeEntry[];
}) {
  const {
    monthlyData,
    totalIncome,
    previousMonthIncome,
    percentageChange,
    averageIncome,
    highestMonth,
  } = useMemo<IncomeData>(() => {
    const sortedEntries = [...incomeEntries].sort(
      (a, b) =>
        new Date(a.date.split(" to ")[0]).getTime() -
        new Date(b.date.split(" to ")[0]).getTime()
    );

    const monthlyData = sortedEntries.map((entry, index) => ({
      month: format(new Date(entry.date.split(" to ")[0]), "MMM yyyy"),
      amount: Number(entry.amount),
      index: index,
    }));

    const totalIncome = monthlyData.reduce(
      (sum, entry) => sum + entry.amount,
      0
    );
    const averageIncome = totalIncome / (monthlyData.length || 1);

    const currentMonthIncome = monthlyData[monthlyData.length - 1]?.amount || 0;
    const previousMonthIncome =
      monthlyData[monthlyData.length - 2]?.amount || 0;
    const percentageChange =
      previousMonthIncome !== 0
        ? ((currentMonthIncome - previousMonthIncome) / previousMonthIncome) *
          100
        : 100;

    const highestMonth = monthlyData.reduce(
      (max, entry) => (entry.amount > max.amount ? entry : max),
      {
        amount: 0,
        month: "",
      }
    );

    return {
      monthlyData,
      totalIncome,
      previousMonthIncome,
      percentageChange,
      averageIncome,
      highestMonth,
    };
  }, [incomeEntries]);

  return (
    <Card className="bg-black">
      <CardHeader>
        <CardTitle className="text-white">Monthly Income Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <motion.div
            className="p-4 bg-gray-900 text-white rounded-lg border border-gray-800"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-sm font-semibold mb-2 text-gray-400">
              Total Income
            </h3>
            <div className="flex items-center">
              <span className="text-2xl font-bold">
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(totalIncome)}
              </span>
            </div>
          </motion.div>
        </div>
        <div className="h-[400px] bg-black p-4 rounded-lg border border-gray-800">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={monthlyData}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="month" stroke="#666" tick={{ fill: "#666" }} />
              <YAxis
                stroke="#666"
                tick={{ fill: "#666" }}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#ff0000"
                strokeWidth={3}
                dot={{ r: 6, fill: "#ff0000", strokeWidth: 2 }}
                activeDot={<CustomActiveDot />}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
