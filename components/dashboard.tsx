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

// ✅ Tambahkan interface untuk tipe data UMKM
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
  const [umkm, setUmkm] = useState<UMKM | null>(null); // ✅ Fix TypeScript

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/umkms/1`); // Ganti dengan ID dinamis jika perlu
        setUmkm(res.data);
      } catch (error) {
        console.error("Error fetching UMKM details:", error);
      }
    }

    fetchData();
  }, []);

  if (!umkm) {
    return <div className="text-center p-6">Loading...</div>;
  }

  return (
    <div className="container mx-auto py-6 px-3">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {/* 🔥 Ambil jumlah produk dari UMKM */}
        {/* ✅ Pastikan jumlah produk benar-benar dihitung */}
        <MetricCard
          title="Total Products"
          value={umkm.products ? umkm.products.length : 0}
          icon="Package"
          change={umkm.products ? umkm.products.length : 0}
        />

        {/* 🔥 Hitung Monthly Revenue dari Annual Revenue (jika ada) */}
        {/* <MetricCard
          title="Monthly Revenue"
          value={
            umkm.annual_revenue
              ? `Rp ${(umkm.annual_revenue / 12).toLocaleString("id-ID")}`
              : "Rp 0"
          }
          icon="DollarSign"
          change={-2.3}
        /> */}

        {/* 🔥 Status UMKM sebagai gantinya */}
        <MetricCard
          title="UMKM Status"
          value={umkm.status || "Pending"}
          icon="Info"
          change={0}
        />

        {/* 🔥 Ganti dengan alamat UMKM */}
        <MetricCard
          title="Location"
          value={umkm.address || "Unknown"}
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
