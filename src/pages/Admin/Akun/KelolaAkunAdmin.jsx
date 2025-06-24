// File: KelolaAkunAdmin.jsx
import React, { useEffect, useState } from "react";
import { supabase } from "../../../Supabase";

export default function KelolaAkunAdmin() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", photo: null, role: "user" });
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  const fetchUsers = async () => {
    const { data, error } = await supabase.from("users").select("*");
    if (error) console.error(error);
    else setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      setForm((prev) => ({ ...prev, photo: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };
// console.log("Uploading file:", form.photo);

  const uploadPhoto = async (file) => {
    const fileName = `fotoakun/${Date.now()}-${file.name}`;
    const { data, error } = await supabase.storage.from("fotoakun").upload(fileName, file);
    if (error) throw error;
    const { data: publicUrlData } = supabase.storage.from("fotoakun").getPublicUrl(fileName);
    return publicUrlData.publicUrl;
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.photo) {
      alert("Semua field wajib diisi.");
      return;
    }
    try {
      const photoUrl = await uploadPhoto(form.photo);
      if (editId) {
        const { error } = await supabase.from("users").update({
          nama: form.name,
          email: form.email,
          foto: photoUrl,
          status: form.role,
        }).eq("id", editId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("users").insert({
          nama: form.name,
          email: form.email,
          foto: photoUrl,
          status: form.role,
        });
        if (error) throw error;
      }
      fetchUsers();
      setForm({ name: "", email: "", photo: null, role: "user" });
      setEditId(null);
      setShowForm(false);
    } catch (error) {
      console.error("Upload or insert error:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Yakin hapus user ini?")) {
      const { error } = await supabase.from("users").delete().eq("id", id);
      if (error) console.error(error);
      else fetchUsers();
    }
  };

  const handleEdit = (user) => {
    setForm({ name: user.nama, email: user.email, photo: null, role: user.status });
    setEditId(user.id);
    setShowForm(true);
  };

  const total = users.length;
  const totalAdmin = users.filter((u) => u.status === "admin").length;
  const totalUser = users.filter((u) => u.status === "user").length;

  return (
    <div className="p-6 bg-gray-100 min-h-screen font-sans">
      <h1 className="text-2xl font-bold mb-6 text-gray-700">Manajemen Akun</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 shadow rounded border-l-4 border-blue-500">
          <p className="text-sm text-gray-500">Total Akun</p>
          <p className="text-xl font-bold">{total}</p>
        </div>
        <div className="bg-white p-4 shadow rounded border-l-4 border-green-500">
          <p className="text-sm text-gray-500">User</p>
          <p className="text-xl font-bold">{totalUser}</p>
        </div>
        <div className="bg-white p-4 shadow rounded border-l-4 border-purple-500">
          <p className="text-sm text-gray-500">Admin</p>
          <p className="text-xl font-bold">{totalAdmin}</p>
        </div>
      </div>

      <button
        onClick={() => {
          setShowForm(!showForm);
          setEditId(null);
          setForm({ name: "", email: "", photo: null, role: "user" });
        }}
        className="mb-4 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
      >
        {showForm ? "Tutup Form" : "Tambah User"}
      </button>

      {showForm && (
        <div className="bg-white p-4 rounded shadow mb-6">
          <h2 className="text-lg font-semibold mb-2">{editId ? "Edit User" : "Tambah User"}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              name="name"
              placeholder="Nama"
              value={form.name}
              onChange={handleChange}
              className="border px-3 py-2 rounded"
            />
            <input
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="border px-3 py-2 rounded"
            />
            <input
              name="photo"
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="border px-3 py-2 rounded"
            />
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="border px-3 py-2 rounded"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button
            onClick={handleSubmit}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            {editId ? "Update" : "Simpan"}
          </button>
        </div>
      )}

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 text-left text-sm font-semibold text-gray-600 uppercase">
            <tr>
              <th className="px-6 py-3">Foto</th>
              <th className="px-6 py-3">Nama</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Role</th>
              <th className="px-6 py-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-3">
                  <img
                    src={user.foto}
                    alt={user.nama}
                    className="w-10 h-10 object-cover rounded-full"
                  />
                </td>
                <td className="px-6 py-3">{user.nama}</td>
                <td className="px-6 py-3">{user.email}</td>
                <td className="px-6 py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      user.status === "admin"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-3 text-center space-x-2">
                  <button
                    onClick={() => handleEdit(user)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="text-red-600 hover:underline"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-500">
                  Tidak ada data akun.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
