"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MetricCard } from "./metric-card";
import { ProductTable } from "./product-table";
import { RevenueChart } from "./revenue-chart";
import { CategoryDistribution } from "./category-distribution";
import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

interface UMKM {
  id: number;
  name: string;
  type: string;
  status: string;
  address: string;
  location_url: string;
  email: string;
  document?: string;
  annual_revenue?: number;
  products?: { id: number; name: string; price: number }[];
}

export default function Dashboard() {
  // ✅ Ambil data UMKM dari localStorage
  const umkmData = localStorage.getItem("umkm");
  const umkm = umkmData ? JSON.parse(umkmData) : null;
  const umkmId = umkm?.id;

  const [umkmDetails, setUmkmDetails] = useState<UMKM | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (!umkmId) return;

      try {
        const res = await axios.get(`${API_BASE_URL}/api/umkms/${umkmId}`);
        setUmkmDetails(res.data);
      } catch (error) {
        console.error("Error fetching UMKM details:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [umkmId]); // ✅ Pastikan hanya fetch jika umkmId tersedia

  if (isLoading) {
    return <div className="text-center p-6">Loading...</div>;
  }

  if (!umkmDetails) {
    return <div className="text-center p-6 text-red-500">UMKM Not Found</div>;
  }

  return (
    <div className="container mx-auto py-6 px-3">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        <MetricCard
          title="Total Products"
          value={umkmDetails.products ? umkmDetails.products.length : 0}
          icon="Package"
          change={umkmDetails.products ? umkmDetails.products.length : 0}
        />

        <MetricCard
          title="UMKM Status"
          value={umkmDetails.status || "Pending"}
          icon="Info"
          change={0}
        />

        <MetricCard
          title="Location"
          value={umkmDetails.address || "Unknown"}
          icon="MapPin"
          change={0}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-6 grid gap-6 md:grid-cols-2"
      >
        {/* <RevenueChart />
        <CategoryDistribution /> */}
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
  );
}
