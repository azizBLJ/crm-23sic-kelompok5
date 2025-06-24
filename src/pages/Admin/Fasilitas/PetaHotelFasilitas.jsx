import React, { useEffect, useState } from "react";
import { supabase } from "../../../Supabase";
import { FaEdit, FaSortUp, FaSortDown } from "react-icons/fa";

export default function PetaHotelFasilitas() {
  const [fasilitas, setFasilitas] = useState([]);
  const [form, setForm] = useState({
    nama: "",
    lokasi: "",
    gambar: null,
    status: "Aktif",
  });
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [sortBy, setSortBy] = useState(null);
  const [sortDir, setSortDir] = useState("asc");
  const [query, setQuery] = useState("");

  const filteredFasilitas = fasilitas.filter((item) =>
    item.nama_fasilitas.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    fetchFasilitas();
  }, []);

  const fetchFasilitas = async () => {
    const { data, error } = await supabase
      .from("fasilitas")
      .select("*")
      .order("nama_fasilitas", { ascending: true });
    if (!error) setFasilitas(data);
    else console.error(error);
  };

  const uploadFoto = async (file) => {
    if (!file) return null;
    const fileName = `${Date.now()}-${file.name}`;
    const { data, error } = await supabase.storage
      .from("fotofasilitas")
      .upload(`fasilitas/${fileName}`, file);

    if (error) {
      console.error("Upload error:", error.message);
      return null;
    }

    const { data: publicUrl } = supabase.storage
      .from("fotofasilitas")
      .getPublicUrl(`fasilitas/${fileName}`);

    return publicUrl?.publicUrl;
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "gambar") {
      setForm({ ...form, gambar: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleAdd = async () => {
    if (!form.nama || !form.lokasi || !form.gambar) {
      alert("Semua field wajib diisi!");
      return;
    }

    const photoUrl = await uploadFoto(form.gambar);
    if (!photoUrl) {
      alert("Gagal upload gambar.");
      return;
    }

    const { error } = await supabase.from("fasilitas").insert({
      nama_fasilitas: form.nama,
      lokasi_fasilitas: form.lokasi,
      foto_fasilitas: photoUrl,
      status_fasilitas: form.status,
    });

    if (error) {
      console.error("Insert error:", error.message);
      alert("Gagal menyimpan ke database");
    } else {
      fetchFasilitas();
      setForm({ nama: "", lokasi: "", gambar: null, status: "Aktif" });
      setShowForm(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Hapus fasilitas ini?")) {
      const { error } = await supabase.from("fasilitas").delete().eq("id", id);
      if (!error) fetchFasilitas();
    }
  };

  const handleEdit = (item) => {
    setForm({
      nama: item.nama_fasilitas,
      lokasi: item.lokasi_fasilitas,
      gambar: null,
      status: item.status_fasilitas,
    });
    setEditId(item.id);
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

  return (
    <div className="p-8 font-sans bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-700">
        Peta Hotel & Fasilitas
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
        onClick={() => setShowForm(!showForm)}
        className="mb-4 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
      >
        {showForm ? "Tutup Form Tambah" : "Tambah Fasilitas"}
      </button>

      {showForm && (
        <div className="mb-6 bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Form Tambah Fasilitas</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <input
              name="nama"
              value={form.nama}
              onChange={handleInputChange}
              placeholder="Nama fasilitas"
              className="border px-3 py-2 rounded"
            />
            <input
              name="lokasi"
              value={form.lokasi}
              onChange={handleInputChange}
              placeholder="Lokasi"
              className="border px-3 py-2 rounded"
            />
            <input
              name="gambar"
              type="file"
              onChange={handleInputChange}
              className="border px-3 py-2 rounded"
            />
            <select
              name="status"
              value={form.status}
              onChange={handleInputChange}
              className="border px-3 py-2 rounded"
            >
              <option value="Aktif">Aktif</option>
              <option value="NonAktif">NonAktif</option>
            </select>
          </div>
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Simpan Fasilitas
          </button>
        </div>
      )}

      {/* Tabel */}
      <div className="bg-white p-4 rounded shadow mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari nama fasilitas..."
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
                    src={item.foto_fasilitas}
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
