// File: PetaHotelFasilitas.js
import React, { useState } from "react";
import { FaTools } from "react-icons/fa";

const initialFasilitas = [
  { id: 1, nama: "Kolam Renang", lokasi: "Lantai 1 - Area Belakang", gambar: "https://www.mutiaramerdekahotel.com/medias/article/medium/11/dsc00149.jpg", status: "Aktif" },
  { id: 2, nama: "Restoran", lokasi: "Lantai Dasar - Dekat Lobi", gambar: "https://www.mutiaramerdekahotel.com/medias/article/big/7/img-0552.jpg", status: "Perbaikan" },
  { id: 3, nama: "Gym & Fitness", lokasi: "Lantai 2 - Kamar Mutiara Suite", gambar: "https://www.mutiaramerdekahotel.com/medias/room/big/7/82d4a014-7c6e-468e-83e5-79b1e0b2dacb.jpg", status: "Aktif" },
];

export default function PetaHotelFasilitas() {
  const [fasilitas, setFasilitas] = useState(initialFasilitas);
  const [form, setForm] = useState({ nama: "", lokasi: "", gambar: "", status: "Aktif" });
  const [showForm, setShowForm] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleAdd = () => {
    if (!form.nama || !form.lokasi || !form.gambar) {
      alert("Semua field wajib diisi!");
      return;
    }
    const newFasilitas = { id: fasilitas.length + 1, ...form };
    setFasilitas([...fasilitas, newFasilitas]);
    setForm({ nama: "", lokasi: "", gambar: "", status: "Aktif" });
    setShowForm(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Hapus fasilitas ini?")) {
      setFasilitas(fasilitas.filter((item) => item.id !== id));
    }
  };

  const total = fasilitas.length;
  const perbaikan = fasilitas.filter((f) => f.status === "Perbaikan").length;
  const aktif = fasilitas.filter((f) => f.status === "Aktif").length;

  return (
    <div className="p-8 font-sans bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-700">Peta Hotel & Fasilitas</h1>

      {/* Informasi Ringkas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow border-l-4 border-orange-400">
          <h3 className="text-sm text-gray-500">Total Fasilitas</h3>
          <p className="text-xl font-semibold">{total}</p>
        </div>
        <div className="bg-white p-4 rounded shadow border-l-4 border-yellow-400">
          <h3 className="text-sm text-gray-500">Sedang Perbaikan</h3>
          <p className="text-xl font-semibold">{perbaikan}</p>
        </div>
        <div className="bg-white p-4 rounded shadow border-l-4 border-green-400">
          <h3 className="text-sm text-gray-500">Aktif</h3>
          <p className="text-xl font-semibold">{aktif}</p>
        </div>
      </div>

      {/* Tombol Tambah Fasilitas */}
      <button
        onClick={() => setShowForm((prev) => !prev)}
        className="mb-4 px-4 py-2 bg-[var(--color-navbar)] text-white rounded hover:bg-orange-500"
      >
        {showForm ? "Tutup Form Tambah" : "Tambah Fasilitas"}
      </button>

      {showForm && (
        <div className="mb-6 bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Form Tambah Fasilitas</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              name="nama"
              value={form.nama}
              onChange={handleInputChange}
              placeholder="Nama fasilitas"
              className="input"
            />
            <input
              type="text"
              name="lokasi"
              value={form.lokasi}
              onChange={handleInputChange}
              placeholder="Lokasi"
              className="input"
            />
            <input
              type="text"
              name="gambar"
              value={form.gambar}
              onChange={handleInputChange}
              placeholder="URL Gambar"
              className="input"
            />
            <select name="status" value={form.status} onChange={handleInputChange} className="input">
              <option value="Aktif">Aktif</option>
              <option value="Perbaikan">Perbaikan</option>
            </select>
          </div>
          <button onClick={handleAdd} className="button-primary">
            Simpan Fasilitas
          </button>
        </div>
      )}

      {/* Tabel Data */}
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="table-header">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase">Gambar</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase">Fasilitas</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase">Lokasi</th>
              <th className="px-6 py-3 text-center text-xs font-medium uppercase">Status</th>
              <th className="px-6 py-3 text-center text-xs font-medium uppercase">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {fasilitas.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <img src={item.gambar} alt={item.nama} className="w-20 h-14 object-cover rounded" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{item.nama}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.lokasi}</td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <span
                    className={`inline-block px-2 py-1 text-xs rounded-full ${
                      item.status === "Perbaikan"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-600 hover:text-red-800 font-semibold"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
            {fasilitas.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-500">
                  Tidak ada data fasilitas
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}