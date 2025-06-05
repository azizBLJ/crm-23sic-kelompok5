import React, { useState } from "react";

const dataTransaksi = [
  { id: 1, nama: "Budi Santoso", kamar: "101", tanggal: "2025-06-01", total: 350000 },
  { id: 2, nama: "Siti Aminah", kamar: "202", tanggal: "2025-06-03", total: 480000 },
  { id: 3, nama: "Andi Wijaya", kamar: "103", tanggal: "2025-06-05", total: 400000 },
];

export default function RiwayatTransaksi() {
  const [query, setQuery] = useState("");

  const filtered = dataTransaksi.filter((item) =>
    item.nama.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Riwayat Transaksi & Aktivitas</h1>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Cari nama pelanggan..."
        className="mb-4 w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Nama</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">No Kamar</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Tanggal</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Total (Rp)</th>
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
