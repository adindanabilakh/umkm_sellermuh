"use client"

import { motion } from "framer-motion"
import { MetricCard } from "./metric-card"
import { ProductTable } from "./product-table"
import { RevenueChart } from "./revenue-chart"
import { CategoryDistribution } from "./category-distribution"

export default function Dashboard() {
  return (
    <div className="container mx-auto py-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
      >
        <MetricCard title="Total Products" value="234" icon="Package" change={5.7} />
        <MetricCard title="Monthly Revenue" value="$52,000" icon="DollarSign" change={-2.3} />
        <MetricCard title="New Orders" value="87" icon="ShoppingCart" change={12.5} />
        <MetricCard title="Customer Satisfaction" value="4.8/5" icon="Star" change={0.2} />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-6 grid gap-6 md:grid-cols-2"
      >
        <RevenueChart />
        <CategoryDistribution />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-6"
      >
        <ProductTable />
      </motion.div>
    </div>
  )
}

