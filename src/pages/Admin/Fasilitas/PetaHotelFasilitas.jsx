import React, { useState } from "react";
import { FaEdit, FaSortUp, FaSortDown } from "react-icons/fa";

const initialFasilitas = [
  { id: 1, nama: "Kolam Renang", lokasi: "Lantai 1 - Area Belakang", gambar: "https://www.mutiaramerdekahotel.com/medias/article/medium/11/dsc00149.jpg", status: "Aktif" },
  { id: 2, nama: "Restoran", lokasi: "Lantai Dasar - Dekat Lobi", gambar: "https://www.mutiaramerdekahotel.com/medias/article/big/7/img-0552.jpg", status: "Perbaikan" },
  { id: 3, nama: "Gym & Fitness", lokasi: "Lantai 2 - Kamar Mutiara Suite", gambar: "https://www.mutiaramerdekahotel.com/medias/room/big/7/82d4a014-7c6e-468e-83e5-79b1e0b2dacb.jpg", status: "Aktif" },
];

export default function PetaHotelFasilitas() {
  const [fasilitas, setFasilitas] = useState(initialFasilitas);
  const [form, setForm] = useState({ nama: "", lokasi: "", gambar: "", status: "Aktif" });
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [sortBy, setSortBy] = useState(null);
  const [sortDir, setSortDir] = useState("asc");
  const [query, setQuery] = useState("");

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

  const handleEdit = (item) => {
    setForm(item);
    setEditId(item.id);
  };

  const handleUpdate = () => {
    setFasilitas(fasilitas.map((item) => (item.id === editId ? { ...form, id: editId } : item)));
    setEditId(null);
    setForm({ nama: "", lokasi: "", gambar: "", status: "Aktif" });
  };

  const handleSort = (key) => {
    const dir = sortBy === key && sortDir === "asc" ? "desc" : "asc";
    setSortBy(key);
    setSortDir(dir);
    const sorted = [...fasilitas].sort((a, b) => {
      if (a[key] < b[key]) return dir === "asc" ? -1 : 1;
      if (a[key] > b[key]) return dir === "asc" ? 1 : -1;
      return 0;
    });
    setFasilitas(sorted);
  };

  const total = fasilitas.length;
  const perbaikan = fasilitas.filter((f) => f.status === "Perbaikan").length;
  const aktif = fasilitas.filter((f) => f.status === "Aktif").length;

  return (
    <div className="p-8 font-sans bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-700">Peta Hotel & Fasilitas</h1>

      {/* Ringkasan */}
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

      {/* Tombol Tambah */}
      <button
        onClick={() => setShowForm((prev) => !prev)}
        className="mb-4 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
      >
        {showForm ? "Tutup Form Tambah" : "Tambah Fasilitas"}
      </button>

      {/* Form Tambah */}
      {showForm && (
        <div className="mb-6 bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Form Tambah Fasilitas</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <input name="nama" value={form.nama} onChange={handleInputChange} placeholder="Nama fasilitas" className="input border px-3 py-2 rounded" />
            <input name="lokasi" value={form.lokasi} onChange={handleInputChange} placeholder="Lokasi" className="input border px-3 py-2 rounded" />
            <input name="gambar" value={form.gambar} onChange={handleInputChange} placeholder="URL Gambar" className="input border px-3 py-2 rounded" />
            <select name="status" value={form.status} onChange={handleInputChange} className="input border px-3 py-2 rounded">
              <option value="Aktif">Aktif</option>
              <option value="Perbaikan">Perbaikan</option>
            </select>
          </div>
          <button onClick={handleAdd} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
            Simpan Fasilitas
          </button>
        </div>
      )}

      {/* Modal Edit */}
      {editId && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/10 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Edit Fasilitas</h2>
            <div className="space-y-3">
              <input name="nama" value={form.nama} onChange={handleInputChange} className="w-full border px-3 py-2 rounded" />
              <input name="lokasi" value={form.lokasi} onChange={handleInputChange} className="w-full border px-3 py-2 rounded" />
              <input name="gambar" value={form.gambar} onChange={handleInputChange} className="w-full border px-3 py-2 rounded" />
              <select name="status" value={form.status} onChange={handleInputChange} className="w-full border px-3 py-2 rounded">
                <option value="Aktif">Aktif</option>
                <option value="Perbaikan">Perbaikan</option>
              </select>
            </div>
            <div className="flex justify-end mt-4 gap-2">
              <button onClick={() => setEditId(null)} className="px-4 py-2 text-gray-600 hover:text-black">Batal</button>
              <button onClick={handleUpdate} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Update</button>
            </div>
          </div>
        </div>
      )}

      {/* Search */}
      <div className="bg-white p-4 rounded shadow mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari nama fasilitas..."
          className="mb-2 w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-300"
        />
      </div>

      {/* Tabel */}
      <div className="overflow-x-auto bg-white rounded shadow mt-6">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold uppercase">Gambar</th>
              <th className="px-6 py-3 text-left text-xs font-bold uppercase cursor-pointer" onClick={() => handleSort("nama")}>
                Nama {sortBy === "nama" && (sortDir === "asc" ? <FaSortUp /> : <FaSortDown />)}
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold uppercase cursor-pointer" onClick={() => handleSort("lokasi")}>
                Lokasi {sortBy === "lokasi" && (sortDir === "asc" ? <FaSortUp /> : <FaSortDown />)}
              </th>
              <th className="px-6 py-3 text-center text-xs font-bold uppercase cursor-pointer" onClick={() => handleSort("status")}>
                Status {sortBy === "status" && (sortDir === "asc" ? <FaSortUp /> : <FaSortDown />)}
              </th>
              <th className="px-6 py-3 text-center text-xs font-bold uppercase">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {fasilitas
              .filter((item) =>
                item.nama.toLowerCase().includes(query.toLowerCase())
              )
              .map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4">
                    <img src={item.gambar} alt={item.nama} className="w-20 h-14 object-cover rounded" />
                  </td>
                  <td className="px-6 py-4">{item.nama}</td>
                  <td className="px-6 py-4">{item.lokasi}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-2 py-1 text-xs rounded-full ${item.status === "Perbaikan" ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center space-x-2">
                    <button onClick={() => handleEdit(item)} className="text-blue-600 hover:text-blue-800">
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-800 font-semibold">
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
