import React, { useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { FaSortUp, FaSortDown } from "react-icons/fa";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const dataTransaksi = [
  { id: 1, nama: "Budi Santoso", kamar: "101", tanggal: "2025-06-01", total: 350000 },
  { id: 2, nama: "Siti Aminah", kamar: "202", tanggal: "2025-06-03", total: 480000 },
  { id: 3, nama: "Andi Wijaya", kamar: "103", tanggal: "2025-06-05", total: 400000 },
];

export default function RiwayatTransaksi() {
  const [query, setQuery] = useState("");
  const [filterTanggal, setFilterTanggal] = useState("");
  const [filterKamar, setFilterKamar] = useState("");
  const [sortBy, setSortBy] = useState(null);
  const [sortDir, setSortDir] = useState("asc");

  const filtered = dataTransaksi
    .filter(
      (item) =>
        item.nama.toLowerCase().includes(query.toLowerCase()) &&
        (!filterTanggal || item.tanggal === filterTanggal) &&
        (!filterKamar || item.kamar === filterKamar)
    )
    .sort((a, b) => {
      if (!sortBy) return 0;
      const valA = a[sortBy];
      const valB = b[sortBy];
      if (valA < valB) return sortDir === "asc" ? -1 : 1;
      if (valA > valB) return sortDir === "asc" ? 1 : -1;
      return 0;
    });

  const handleSort = (key) => {
    const dir = sortBy === key && sortDir === "asc" ? "desc" : "asc";
    setSortBy(key);
    setSortDir(dir);
  };

  const totalTransaksi = filtered.length;
  const totalPendapatan = filtered.reduce((sum, item) => sum + item.total, 0);

  const barData = {
    labels: ["2025-06-01", "2025-06-03", "2025-06-05"],
    datasets: [
      {
        label: "Pendapatan Harian",
        data: [350000, 480000, 400000],
        backgroundColor: "#FFAD84",
      },
    ],
  };

  const kamarCount = dataTransaksi.reduce((acc, trx) => {
    acc[trx.kamar] = (acc[trx.kamar] || 0) + 1;
    return acc;
  }, {});

  const pieData = {
    labels: Object.keys(kamarCount),
    datasets: [
      {
        data: Object.values(kamarCount),
        backgroundColor: ["#FFAD84", "#FFE382", "#FFC47E", "#FFF78A"],
      },
    ],
  };

  return (
    <div className="p-8 font-sans bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-700">Riwayat Transaksi & Aktivitas</h1>

      {/* Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow border-l-4 border-orange-400">
          <h3 className="text-sm text-gray-500">Jumlah Transaksi</h3>
          <p className="text-xl font-semibold">{totalTransaksi}</p>
        </div>
        <div className="bg-white p-4 rounded shadow border-l-4 border-yellow-400">
          <h3 className="text-sm text-gray-500">Total Pendapatan</h3>
          <p className="text-xl font-semibold">Rp {totalPendapatan.toLocaleString()}</p>
        </div>
        <div className="bg-white p-4 rounded shadow border-l-4 border-green-400">
          <h3 className="text-sm text-gray-500">Rata-rata Pendapatan Harian</h3>
          <p className="text-xl font-semibold">
            Rp {totalTransaksi ? Math.round(totalPendapatan / totalTransaksi).toLocaleString() : 0}
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-4 rounded shadow h-80">
          <h2 className="text-lg font-semibold mb-2">Pendapatan Harian</h2>
          <div className="h-[240px]">
            <Bar data={barData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
        <div className="bg-white p-4 rounded shadow h-80">
          <h2 className="text-lg font-semibold mb-2">Distribusi Kamar</h2>
          <div className="h-[240px]">
            <Pie data={pieData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="bg-white p-4 rounded shadow mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari nama pelanggan..."
          className="mb-2 w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-300"
        />
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="date"
            value={filterTanggal}
            onChange={(e) => setFilterTanggal(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
          <input
            type="text"
            placeholder="Filter nomor kamar..."
            value={filterKamar}
            onChange={(e) => setFilterKamar(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
      </div>

      {/* Tabel */}
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              {["nama", "kamar", "tanggal", "total"].map((col) => (
                <th
                  key={col}
                  className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase cursor-pointer"
                  onClick={() => handleSort(col)}
                >
                  {col.charAt(0).toUpperCase() + col.slice(1)}{" "}
                  {sortBy === col && (sortDir === "asc" ? <FaSortUp className="inline" /> : <FaSortDown className="inline" />)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filtered.length > 0 ? (
              filtered.map((trx) => (
                <tr key={trx.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">{trx.nama}</td>
                  <td className="px-6 py-4">{trx.kamar}</td>
                  <td className="px-6 py-4">{trx.tanggal}</td>
                  <td className="px-6 py-4">Rp {trx.total.toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-4 text-gray-500">
                  Tidak ada transaksi ditemukan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
