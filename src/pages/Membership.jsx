import React, { useState } from 'react';
import { UserPlus, X, Edit2, Trash2 } from 'lucide-react';

const Membership = () => {
  const [showForm, setShowForm] = useState(false);
  const [members, setMembers] = useState([
    { id: 1, nama: 'Amelia Putri', email: 'amelia@email.com', telepon: '08123456789', level: 'Gold', status: 'Aktif' },
    { id: 2, nama: 'Riko Wijaya', email: 'riko@email.com', telepon: '08211223344', level: 'Silver', status: 'Nonaktif' },
  ]);

  const [form, setForm] = useState({ nama: '', email: '', telepon: '', level: '', status: true });
  const [editingId, setEditingId] = useState(null);

  const toggleForm = () => {
    setShowForm(!showForm);
    setForm({ nama: '', email: '', telepon: '', level: '', status: true });
    setEditingId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newData = {
      ...form,
      status: form.status ? 'Aktif' : 'Nonaktif',
    };

    if (editingId) {
      setMembers(members.map((m) => (m.id === editingId ? { ...newData, id: editingId } : m)));
    } else {
      setMembers([...members, { ...newData, id: Date.now() }]);
    }

    toggleForm();
  };

  const handleEdit = (member) => {
    setForm({
      nama: member.nama,
      email: member.email,
      telepon: member.telepon,
      level: member.level,
      status: member.status === 'Aktif',
    });
    setEditingId(member.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setMembers(members.filter((m) => m.id !== id));
  };

  const levelBadgeColor = (level) => {
    switch (level) {
      case 'Gold': return 'bg-yellow-100 text-yellow-800';
      case 'Platinum': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-center text-2xl font-bold text-black mb-8 tracking-wide drop-shadow">
        Membership
        </h1>

        <div className="mb-6">
          <button
            onClick={toggleForm}
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-5 py-2.5 rounded-md shadow transition duration-200"
          >
            {showForm ? <X size={18} /> : <UserPlus size={18} />}
            {showForm ? 'Batal Tambah Member' : 'Tambah Member'}
          </button>
        </div>

        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="bg-white border border-gray-300 shadow-xl rounded-lg p-6 space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Nama</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFC47E]"
                  placeholder="Masukkan nama"
                  value={form.nama}
                  onChange={(e) => setForm({ ...form, nama: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFC47E]"
                  placeholder="email@domain.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Telepon</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFC47E]"
                  placeholder="08xxxxxxxx"
                  value={form.telepon}
                  onChange={(e) => setForm({ ...form, telepon: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Level</label>
                <select
                  className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFC47E]"
                  value={form.level}
                  onChange={(e) => setForm({ ...form, level: e.target.value })}
                  required
                >
                  <option value="">-- Pilih Level --</option>
                  <option value="Silver">Silver</option>
                  <option value="Gold">Gold</option>
                  <option value="Platinum">Platinum</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.checked })}
                className="h-4 w-4 text-[#FFC47E] border-[#FFC47E] rounded"
              />
              <label className="text-sm text-gray-700">Status Aktif</label>
            </div>

            <button
              type="submit"
              className="mt-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md font-medium shadow transition duration-200"
            >
              {editingId ? 'Update Member' : 'Simpan Member'}
            </button>
          </form>
        )}

        <div className="overflow-x-auto bg-white rounded-lg shadow-md mt-10">
          <table className="min-w-full divide-y divide-[#FFC47E] text-sm">
            <thead className="bg-[#FFC47E]/40 text-[gray]">
              <tr>
                <th className="p-4 text-left font-semibold">Nama</th>
                <th className="p-4 text-left font-semibold">Email</th>
                <th className="p-4 text-left font-semibold">Telepon</th>
                <th className="p-4 text-left font-semibold">Level</th>
                <th className="p-4 text-left font-semibold">Status</th>
                <th className="p-4 text-left font-semibold">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {members.map((m) => (
                <tr key={m.id} className="hover:bg-gray-50">
                  <td className="p-4 text-gray-800 font-medium">{m.nama}</td>
                  <td className="p-4 text-gray-700">{m.email}</td>
                  <td className="p-4 text-gray-700">{m.telepon}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${levelBadgeColor(m.level)}`}>
                      {m.level}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      m.status === 'Aktif' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-600'
                    }`}>
                      {m.status}
                    </span>
                  </td>
                  <td className="p-4 flex items-center gap-3">
                    <button onClick={() => handleEdit(m)} className="text-blue-600 hover:text-blue-800 transition">
                      <Edit2 size={18} />
                    </button>
                    <button onClick={() => handleDelete(m.id)} className="text-red-600 hover:text-red-800 transition">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Membership;
