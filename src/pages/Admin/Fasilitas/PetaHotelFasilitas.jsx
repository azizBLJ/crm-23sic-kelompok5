import React, { useEffect, useState } from "react";
import { supabase } from "../../../Supabase";
import { FaEdit, FaSortUp, FaSortDown } from "react-icons/fa";

export default function PetaHotelFasilitas() {
  const [fasilitas, setFasilitas] = useState([]);
  const [form, setForm] = useState({
    nama: "",
    lokasi: "",
    // Change 'gambar' to null initially, as it will be a string (URL)
    gambar: "",
    status: "Aktif",
  });
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [sortBy, setSortBy] = useState(null);
  const [sortDir, setSortDir] = useState("asc");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state

  const filteredFasilitas = fasilitas.filter((item) =>
    item.nama_fasilitas.toLowerCase().includes(query.toLowerCase()) ||
    item.lokasi_fasilitas.toLowerCase().includes(query.toLowerCase()) // Also allow search by location
  );

  useEffect(() => {
    fetchFasilitas();
  }, []);

  const fetchFasilitas = async () => {
    setLoading(true); // Start loading
    const { data, error } = await supabase
      .from("fasilitas")
      .select("*")
      .order("nama_fasilitas", { ascending: true });
    if (!error) {
      setFasilitas(data);
      setError(null); // Clear any previous errors
    } else {
      console.error("Error fetching facilities:", error);
      setError("Failed to load facilities. Please try again later."); // Set error message
    }
    setLoading(false); // End loading
  };

  // Removed uploadFoto as we are using direct links now

  const handleInputChange = (e) => {
    const { name, value } = e.target; // 'files' is no longer relevant for text input
    setForm({ ...form, [name]: value });
  };

  const handleAdd = async () => {
    // Check if image link is provided and is a valid URL format (simple check)
    if (!form.nama || !form.lokasi || !form.gambar) {
      alert("Nama fasilitas, lokasi, dan link gambar wajib diisi!");
      return;
    }
    // Basic URL validation
    if (!/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(form.gambar)) {
      alert("Link gambar tidak valid. Pastikan ini adalah URL gambar (contoh: http://example.com/image.jpg).");
      return;
    }

    // Since we are using a direct link, photoUrl is simply form.gambar
    const photoUrl = form.gambar;

    const { error } = await supabase.from("fasilitas").insert({
      nama_fasilitas: form.nama,
      lokasi_fasilitas: form.lokasi,
      foto_fasilitas: photoUrl, // Use the provided URL directly
      status_fasilitas: form.status,
    });

    if (error) {
      console.error("Insert error:", error.message);
      alert("Gagal menyimpan ke database: " + error.message);
    } else {
      fetchFasilitas();
      // Reset form to initial state including empty string for gambar
      setForm({ nama: "", lokasi: "", gambar: "", status: "Aktif" });
      setShowForm(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Hapus fasilitas ini?")) {
      const { error } = await supabase.from("fasilitas").delete().eq("id", id);
      if (error) {
        console.error("Delete error:", error.message);
        alert("Gagal menghapus fasilitas: " + error.message);
      } else {
        fetchFasilitas();
      }
    }
  };

  const handleEdit = (item) => {
    setForm({
      nama: item.nama_fasilitas,
      lokasi: item.lokasi_fasilitas,
      // Set the current image URL for editing
      gambar: item.foto_fasilitas,
      status: item.status_fasilitas,
    });
    setEditId(item.id);
    setShowForm(true); // Show form when editing
  };

  const handleUpdate = async () => {
    if (!form.nama || !form.lokasi || !form.gambar) {
      alert("Nama fasilitas, lokasi, dan link gambar wajib diisi!");
      return;
    }
    if (!/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(form.gambar)) {
      alert("Link gambar tidak valid. Pastikan ini adalah URL gambar (contoh: http://example.com/image.jpg).");
      return;
    }

    const { error } = await supabase
      .from("fasilitas")
      .update({
        nama_fasilitas: form.nama,
        lokasi_fasilitas: form.lokasi,
        foto_fasilitas: form.gambar, // Use the updated URL directly
        status_fasilitas: form.status,
      })
      .eq("id", editId);

    if (error) {
      console.error("Update error:", error.message);
      alert("Gagal memperbarui fasilitas: " + error.message);
    } else {
      fetchFasilitas();
      setForm({ nama: "", lokasi: "", gambar: "", status: "Aktif" });
      setEditId(null);
      setShowForm(false);
    }
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
  const perbaikan = fasilitas.filter(
    (f) => f.status_fasilitas === "NonAktif"
  ).length;
  const aktif = fasilitas.filter((f) => f.status_fasilitas === "Aktif").length;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl text-gray-700">
        Memuat data fasilitas...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-xl text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="p-8 font-sans bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-700">
        Peta Hotel & Fasilitas (Admin)
      </h1>

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

      <button
        onClick={() => {
          setShowForm(!showForm);
          // Reset form and editId when closing/opening the form
          setForm({ nama: "", lokasi: "", gambar: "", status: "Aktif" });
          setEditId(null);
        }}
        className="mb-4 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
      >
        {showForm ? "Tutup Form" : "Tambah Fasilitas"}
      </button>

      {showForm && (
        <div className="mb-6 bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">
            {editId ? "Edit Fasilitas" : "Tambah Fasilitas Baru"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <input
              name="nama"
              value={form.nama}
              onChange={handleInputChange}
              placeholder="Nama fasilitas"
              className="border px-3 py-2 rounded focus:ring-2 focus:ring-blue-300"
            />
            <input
              name="lokasi"
              value={form.lokasi}
              onChange={handleInputChange}
              placeholder="Lokasi"
              className="border px-3 py-2 rounded focus:ring-2 focus:ring-blue-300"
            />
            {/* Changed type to 'text' for image link input */}
            <input
              name="gambar"
              type="text"
              value={form.gambar} // Bind value to form.gambar
              onChange={handleInputChange}
              placeholder="Link Gambar (URL: http://example.com/image.jpg)"
              className="border px-3 py-2 rounded col-span-1 sm:col-span-2 focus:ring-2 focus:ring-blue-300"
            />
            <select
              name="status"
              value={form.status}
              onChange={handleInputChange}
              className="border px-3 py-2 rounded focus:ring-2 focus:ring-blue-300"
            >
              <option value="Aktif">Aktif</option>
              <option value="NonAktif">NonAktif</option>
            </select>
          </div>
          <button
            onClick={editId ? handleUpdate : handleAdd}
            className={`px-4 py-2 text-white rounded ${
              editId ? "bg-blue-600 hover:bg-blue-700" : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {editId ? "Update Fasilitas" : "Simpan Fasilitas"}
          </button>
          {editId && (
            <button
              onClick={() => {
                setEditId(null);
                setForm({ nama: "", lokasi: "", gambar: "", status: "Aktif" });
                setShowForm(false);
              }}
              className="ml-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Batal
            </button>
          )}
        </div>
      )}

      {/* Tabel */}
      <div className="bg-white p-4 rounded shadow mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari nama atau lokasi fasilitas..."
          className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-orange-300"
        />
      </div>

      <div className="overflow-x-auto bg-white rounded shadow mt-6">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold uppercase">
                Gambar
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-bold uppercase cursor-pointer"
                onClick={() => handleSort("nama_fasilitas")}
              >
                Nama{" "}
                {sortBy === "nama_fasilitas" &&
                  (sortDir === "asc" ? <FaSortUp /> : <FaSortDown />)}
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-bold uppercase cursor-pointer"
                onClick={() => handleSort("lokasi_fasilitas")}
              >
                Lokasi{" "}
                {sortBy === "lokasi_fasilitas" &&
                  (sortDir === "asc" ? <FaSortUp /> : <FaSortDown />)}
              </th>
              <th className="px-6 py-3 text-center text-xs font-bold uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-center text-xs font-bold uppercase">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredFasilitas.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4">
                  <img
                    src={item.foto_fasilitas} // This will now be a URL
                    alt={item.nama_fasilitas}
                    className="w-20 h-14 object-cover rounded"
                  />
                </td>
                <td className="px-6 py-4">{item.nama_fasilitas}</td>
                <td className="px-6 py-4">{item.lokasi_fasilitas}</td>
                <td className="px-6 py-4 text-center">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      item.status_fasilitas === "NonAktif"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {item.status_fasilitas}
                  </span>
                </td>
                <td className="px-6 py-4 text-center space-x-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FaEdit />
                  </button>
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