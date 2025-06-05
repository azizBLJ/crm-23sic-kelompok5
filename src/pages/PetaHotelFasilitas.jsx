// File: PetaHotelFasilitas.js
import React, { useState } from "react";

const initialFasilitas = [
  { id: 1, nama: "Kolam Renang", lokasi: "Lantai 1 - Area Belakang", gambar: "https://www.mutiaramerdekahotel.com/medias/article/medium/11/dsc00149.jpg" },
  { id: 2, nama: "Restoran", lokasi: "Lantai Dasar - Dekat Lobi", gambar: "https://www.mutiaramerdekahotel.com/medias/article/big/7/img-0552.jpg" },
  { id: 3, nama: "Gym & Fitness", lokasi: "Lantai 2 - Kamar Mutiara Suite", gambar: "https://www.mutiaramerdekahotel.com/medias/room/big/7/82d4a014-7c6e-468e-83e5-79b1e0b2dacb.jpg" },
];

export default function PetaHotelFasilitas() {
  const [fasilitas, setFasilitas] = useState(initialFasilitas);
  const [form, setForm] = useState({ nama: "", lokasi: "", gambar: "" });

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
    setForm({ nama: "", lokasi: "", gambar: "" });
  };

  const handleDelete = (id) => {
    if (window.confirm("Hapus fasilitas ini?")) {
      setFasilitas(fasilitas.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Peta Hotel & Fasilitas</h1>

      <div className="mb-4 bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">Tambah Fasilitas</h2>
        <input
          type="text"
          name="nama"
          placeholder="Nama fasilitas"
          value={form.nama}
          onChange={handleInputChange}
          className="mr-2 px-3 py-2 border rounded"
        />
        <input
          type="text"
          name="lokasi"
          placeholder="Lokasi"
          value={form.lokasi}
          onChange={handleInputChange}
          className="mr-2 px-3 py-2 border rounded"
        />
        <input
          type="text"
          name="gambar"
          placeholder="URL Gambar"
          value={form.gambar}
          onChange={handleInputChange}
          className="mr-2 px-3 py-2 border rounded"
        />
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Tambah
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Gambar</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fasilitas</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Lokasi</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Aksi</th>
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
                <td colSpan={4} className="text-center py-4 text-gray-500">
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
