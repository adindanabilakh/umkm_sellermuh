"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"

const data = [
  { name: "Jan", total: 4500, newCustomers: 120, avgOrderValue: 37.5 },
  { name: "Feb", total: 5300, newCustomers: 150, avgOrderValue: 35.3 },
  { name: "Mar", total: 6200, newCustomers: 180, avgOrderValue: 34.4 },
  { name: "Apr", total: 5800, newCustomers: 160, avgOrderValue: 36.3 },
  { name: "May", total: 7100, newCustomers: 210, avgOrderValue: 33.8 },
  { name: "Jun", total: 8000, newCustomers: 250, avgOrderValue: 32.0 },
  { name: "Jul", total: 7600, newCustomers: 230, avgOrderValue: 33.0 },
  { name: "Aug", total: 8400, newCustomers: 270, avgOrderValue: 31.1 },
  { name: "Sep", total: 7900, newCustomers: 240, avgOrderValue: 32.9 },
  { name: "Oct", total: 8700, newCustomers: 290, avgOrderValue: 30.0 },
  { name: "Nov", total: 9200, newCustomers: 310, avgOrderValue: 29.7 },
  { name: "Dec", total: 10000, newCustomers: 350, avgOrderValue: 28.6 },
]

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border rounded p-2 shadow-lg">
        <p className="font-bold">{label}</p>
        <p className="text-sm">Revenue: ${payload[0].value.toLocaleString()}</p>
        <p className="text-sm">New Customers: {payload[0].payload.newCustomers}</p>
        <p className="text-sm">Avg Order Value: ${payload[0].payload.avgOrderValue.toFixed(2)}</p>
      </div>
    )
  }
  return null
}

export function RevenueChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value}`}
            />
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="total"
              fill="#adfa1d"
              radius={[4, 4, 0, 0]}
              className="transition-all duration-300 hover:opacity-80"
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

