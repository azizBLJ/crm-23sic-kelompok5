import React, { useEffect, useState } from "react";
import { supabase } from "../../../Supabase"; // Sesuaikan path ini
import { Plus, Edit2, Trash2, MapPin } from "lucide-react"; // Import icons
import { FaSortUp, FaSortDown } from 'react-icons/fa'; // Untuk ikon sorting di tabel

// Re-usable Button Component
const Button = ({ children, onClick, className = '', variant = 'primary', type = 'button', ...props }) => {
  let baseClasses = 'inline-flex items-center justify-center px-4 py-2 rounded-lg font-semibold shadow-sm transition-all duration-300 ease-in-out text-sm focus:outline-none focus:ring-2 focus:ring-offset-2';

  if (variant === 'primary') {
    // Tombol utama 'Tambah Fasilitas' dan 'Simpan/Update Fasilitas' di form
    baseClasses += ' bg-[#FF9F6B] hover:bg-[#FF8A4F] text-white focus:ring-orange-400'; // Warna oranye terang
  } else if (variant === 'destructive') {
    // Tombol 'Hapus'
    baseClasses += ' bg-red-600 hover:bg-red-700 text-white focus:ring-red-500';
  } else if (variant === 'edit-table') {
    // Tombol 'Edit' di tabel - Menggunakan warna sidebar (kuning)
    baseClasses += ' bg-[var(--color-sidebar)] hover:bg-yellow-400 text-gray-800 focus:ring-[var(--color-sidebar)]';
  } else if (variant === 'form-cancel') {
    // Tombol 'Batal' di form - Menggunakan warna sidebar (kuning)
    baseClasses += ' bg-[var(--color-sidebar)] hover:bg-yellow-400 text-gray-800 focus:ring-[var(--color-sidebar)]';
  } else if (variant === 'link') {
    // Varian link untuk aksi-aksi yang tidak membutuhkan tombol penuh
    baseClasses = 'text-[var(--color-navbar)] hover:text-orange-600 font-medium transition-colors duration-200';
  }

  return (
    <button type={type} onClick={onClick} className={`${baseClasses} ${className}`} {...props}>
      {children}
    </button>
  );
};

// Re-usable Input Component
const Input = ({ value, onChange, className = '', ...props }) => (
  <input
    {...props}
    value={value}
    onChange={onChange}
    className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-navbar)] focus:border-transparent outline-none transition-all duration-200 text-sm ${className}`}
  />
);

// Re-usable Label Component
const Label = ({ htmlFor, children }) => (
  <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700 mb-1">{children}</label>
);


export default function PetaHotelFasilitas() {
  const [fasilitas, setFasilitas] = useState([]);
  const [form, setForm] = useState({
    nama: "",
    lokasi: "",
    gambar: "", // This will hold the URL directly
    status: "Aktif",
  });
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [sortBy, setSortBy] = useState(null);
  const [sortDir, setSortDir] = useState("asc");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const filteredFasilitas = fasilitas.filter((item) =>
    item.nama_fasilitas.toLowerCase().includes(query.toLowerCase()) ||
    item.lokasi_fasilitas.toLowerCase().includes(query.toLowerCase())
  ).sort((a, b) => {
    if (!sortBy) return 0;
    // Handle specific sorting logic if needed, otherwise default to direct comparison
    if (a[sortBy] < b[sortBy]) return sortDir === "asc" ? -1 : 1;
    if (a[sortBy] > b[sortBy]) return sortDir === "asc" ? 1 : -1;
    return 0;
  });

  useEffect(() => {
    fetchFasilitas();
  }, []);

  const fetchFasilitas = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from("fasilitas")
        .select("*")
        .order("nama_fasilitas", { ascending: true });
      if (error) throw error;
      setFasilitas(data);
    } catch (err) {
      console.error("Error fetching facilities:", err);
      setError("Gagal memuat fasilitas. Silakan coba lagi nanti.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const validateForm = () => {
    if (!form.nama.trim() || !form.lokasi.trim() || !form.gambar.trim()) {
      setError("Nama fasilitas, lokasi, dan link gambar wajib diisi!");
      return false;
    }
    // Simple URL validation for image link
    if (!/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(form.gambar)) {
      setError("Link gambar tidak valid. Pastikan ini adalah URL gambar (contoh: http://example.com/image.jpg).");
      return false;
    }
    setError(null); // Clear any previous error
    return true;
  };

  const handleAdd = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const { error } = await supabase.from("fasilitas").insert({
        nama_fasilitas: form.nama.trim(),
        lokasi_fasilitas: form.lokasi.trim(),
        foto_fasilitas: form.gambar.trim(),
        status_fasilitas: form.status,
      });
      if (error) throw error;
      fetchFasilitas();
      setForm({ nama: "", lokasi: "", gambar: "", status: "Aktif" });
      setShowForm(false);
    } catch (err) {
      console.error("Insert error:", err.message);
      setError("Gagal menyimpan fasilitas baru: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus fasilitas ini?")) return;
    setLoading(true);
    setError(null);
    try {
      const { error } = await supabase.from("fasilitas").delete().eq("id", id);
      if (error) throw error;
      fetchFasilitas();
    } catch (err) {
      console.error("Delete error:", err.message);
      setError("Gagal menghapus fasilitas: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setError(null); // Clear error when opening form for edit
    setForm({
      nama: item.nama_fasilitas,
      lokasi: item.lokasi_fasilitas,
      gambar: item.foto_fasilitas,
      status: item.status_fasilitas,
    });
    setEditId(item.id);
    setShowForm(true);
  };

  const handleUpdate = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from("fasilitas")
        .update({
          nama_fasilitas: form.nama.trim(),
          lokasi_fasilitas: form.lokasi.trim(),
          foto_fasilitas: form.gambar.trim(),
          status_fasilitas: form.status,
        })
        .eq("id", editId);
      if (error) throw error;
      fetchFasilitas();
      setForm({ nama: "", lokasi: "", gambar: "", status: "Aktif" });
      setEditId(null);
      setShowForm(false);
    } catch (err) {
      console.error("Update error:", err.message);
      setError("Gagal memperbarui fasilitas: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (key) => {
    const dir = sortBy === key && sortDir === "asc" ? "desc" : "asc";
    setSortBy(key);
    setSortDir(dir);
  };

  const total = fasilitas.length;
  const perbaikan = fasilitas.filter(
    (f) => f.status_fasilitas === "NonAktif"
  ).length;
  const aktif = fasilitas.filter((f) => f.status_fasilitas === "Aktif").length;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl text-gray-700">
        <svg className="animate-spin h-8 w-8 mr-3 text-gray-600" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Memuat data fasilitas...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f8f8] p-8 font-sans text-gray-800">
      {/* Defined CSS variables for consistency, ideally in a global CSS file */}
      <style>
        {`
          :root {
            --color-navbar: #FF9F6B; /* Oranye terang */
            --color-sidebar: #FDDD88; /* Kuning */
            --color-warning: #FEF3C7; /* Merah muda untuk warning */
            --color-accent: #FF9F6B; /* Warna aksen untuk input focus */
          }
        `}
      </style>

      {/* Container utama dengan max-width agar konten tidak terlalu lebar di layar besar */}
      <div className="max-w-6xl mx-auto">
        {/* Header Card - disesuaikan dengan gaya SistemMembership */}
        <div className="bg-white p-5 rounded-2xl shadow-lg border border-gray-100 mb-5 transform hover:scale-[1.005] transition-transform duration-300">
          <div className="pb-3 mb-3 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2"> {/* Changed to text-2xl and font-bold */}
              <MapPin size={28} className="text-[var(--color-navbar)]" /> {/* Icon size adjusted */}
              Peta Hotel & Fasilitas
            </h1>
          </div>
          <p className="text-gray-600 mb-4 text-sm leading-relaxed">
            Kelola informasi peta hotel dan fasilitas yang tersedia.
          </p>
          {/* Tombol "Tambah Fasilitas" dengan komponen Button */}
          <Button onClick={() => {
            setShowForm(!showForm);
            setEditId(null);
            setForm({ nama: "", lokasi: "", gambar: "", status: "Aktif" });
            setError(null); // Clear error when toggling form
          }} variant="primary" className="text-sm px-4 py-2">
            <Plus className="mr-2" size={16} /> {showForm ? "Tutup Form" : "Tambah Fasilitas"}
          </Button>
        </div>

        {/* Dashboard Cards (Total, Perbaikan, Aktif) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow border-l-4 border-orange-400">
            <h3 className="text-sm text-gray-500">Total Fasilitas</h3>
            <p className="text-xl font-semibold">{total}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border-l-4 border-yellow-400">
            <h3 className="text-sm text-gray-500">Sedang Perbaikan</h3>
            <p className="text-xl font-semibold">{perbaikan}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border-l-4 border-green-400">
            <h3 className="text-sm text-gray-500">Aktif</h3>
            <p className="text-xl font-semibold">{aktif}</p>
          </div>
        </div>

        {/* Form Add/Edit */}
        {showForm && (
          <div className="bg-white p-5 rounded-2xl shadow-lg border border-gray-100 mb-5 transform hover:scale-[1.005] transition-transform duration-300">
            <h2 className="text-lg font-bold text-gray-800 mb-4">
              {editId ? "Edit Fasilitas" : "Tambah Fasilitas Baru"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <Label htmlFor="nama">Nama Fasilitas</Label>
                <Input
                  id="nama"
                  name="nama"
                  value={form.nama}
                  onChange={handleInputChange}
                  placeholder="Nama fasilitas (contoh: Kolam Renang)"
                  required
                />
              </div>
              <div>
                <Label htmlFor="lokasi">Lokasi Fasilitas</Label>
                <Input
                  id="lokasi"
                  name="lokasi"
                  value={form.lokasi}
                  onChange={handleInputChange}
                  placeholder="Lokasi (contoh: Lantai 2)"
                  required
                />
              </div>
              <div className="col-span-1 sm:col-span-2">
                <Label htmlFor="gambar">Link Gambar (URL)</Label>
                <Input
                  id="gambar"
                  name="gambar"
                  type="text"
                  value={form.gambar}
                  onChange={handleInputChange}
                  placeholder="Contoh: http://example.com/image.jpg"
                  required
                />
              </div>
              <div>
                <Label htmlFor="status">Status Fasilitas</Label>
                <select
                  id="status"
                  name="status"
                  value={form.status}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-navbar)] focus:border-transparent outline-none transition-all duration-200 text-sm"
                >
                  <option value="Aktif">Aktif</option>
                  <option value="NonAktif">NonAktif</option>
                </select>
              </div>
            </div>
            {error && (
              <div className="bg-red-100 border border-red-300 text-red-800 font-medium p-3 rounded-lg mt-3 flex items-center text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span>{error}</span>
              </div>
            )}
            <div className="flex justify-end space-x-2 pt-3">
              <Button type="button" variant="form-cancel" onClick={() => {
                setShowForm(false);
                setEditId(null);
                setForm({ nama: "", lokasi: "", gambar: "", status: "Aktif" });
                setError(null);
              }} className="text-sm px-3 py-1.5">
                Batal
              </Button>
              <Button type="button" onClick={editId ? handleUpdate : handleAdd} variant="primary" className="text-sm px-3 py-1.5">
                {editId ? "Update Fasilitas" : "Simpan Fasilitas"}
              </Button>
            </div>
          </div>
        )}

        {/* Search Input */}
        <div className="bg-white p-4 rounded-2xl shadow-lg border border-gray-100 mb-6">
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari nama atau lokasi fasilitas..."
            className="w-full"
          />
        </div>

        {/* Tabel */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="p-5">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Daftar Fasilitas</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 border-collapse">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">
                      Gambar
                    </th>
                    <th
                      className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200 cursor-pointer"
                      onClick={() => handleSort("nama_fasilitas")}
                    >
                      Nama Fasilitas{" "}
                      {sortBy === "nama_fasilitas" &&
                        (sortDir === "asc" ? <FaSortUp className="inline ml-1" /> : <FaSortDown className="inline ml-1" />)}
                    </th>
                    <th
                      className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200 cursor-pointer"
                      onClick={() => handleSort("lokasi_fasilitas")}
                    >
                      Lokasi{" "}
                      {sortBy === "lokasi_fasilitas" &&
                        (sortDir === "asc" ? <FaSortUp className="inline ml-1" /> : <FaSortDown className="inline ml-1" />)}
                    </th>
                    <th className="px-4 py-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">
                      Status
                    </th>
                    <th className="px-4 py-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {filteredFasilitas.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center py-4 text-gray-500 text-sm">
                        Tidak ada data fasilitas yang ditemukan.
                      </td>
                    </tr>
                  ) : (
                    filteredFasilitas.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-2.5 whitespace-nowrap border-b border-gray-100">
                          <img
                            src={item.foto_fasilitas}
                            alt={item.nama_fasilitas}
                            className="w-20 h-14 object-cover rounded-md shadow-sm"
                          />
                        </td>
                        <td className="px-4 py-2.5 whitespace-nowrap text-sm font-medium text-gray-800 border-b border-gray-100">
                          {item.nama_fasilitas}
                        </td>
                        <td className="px-4 py-2.5 whitespace-nowrap text-sm text-gray-700 border-b border-gray-100">
                          {item.lokasi_fasilitas}
                        </td>
                        <td className="px-4 py-2.5 whitespace-nowrap text-center border-b border-gray-100">
                          <span
                            className={`px-2 py-1 text-xs rounded-full font-semibold ${
                              item.status_fasilitas === "NonAktif"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-green-100 text-green-700"
                            }`}
                          >
                            {item.status_fasilitas}
                          </span>
                        </td>
                        <td className="px-4 py-2.5 whitespace-nowrap text-center border-b border-gray-100">
                          <div className="flex justify-center items-center space-x-2">
                            <Button variant="edit-table" onClick={() => handleEdit(item)} className="px-2 py-1 text-xs">
                              <Edit2 size={14} className="mr-1"/> Edit
                            </Button>
                            <Button variant="destructive" onClick={() => handleDelete(item.id)} className="px-2 py-1 text-xs">
                              <Trash2 size={14} className="mr-1"/> Hapus
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}