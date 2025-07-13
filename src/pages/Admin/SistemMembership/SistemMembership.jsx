import React, { useState, useEffect } from 'react';
import { supabase } from '../../../Supabase';

// Komponen Button seragam
const Button = ({ children, onClick, className = '', variant = 'default', type = 'button', ...props }) => {
  let baseClasses = 'px-4 py-2 rounded-md font-semibold transition-all duration-200 text-sm';
  if (variant === 'default') baseClasses += ' bg-[#FFAD84] hover:bg-orange-400 text-white';
  else if (variant === 'outline') baseClasses += ' border border-gray-300 text-gray-700 hover:bg-[#FFE382]';
  else if (variant === 'destructive') baseClasses += ' bg-[#FF4D4D] hover:bg-[#E63946] text-white';
  else if (variant === 'secondary') baseClasses += ' bg-gray-200 hover:bg-gray-300 text-gray-800';
  return (
    <button type={type} onClick={onClick} className={`${baseClasses} ${className}`} {...props}>
      {children}
    </button>
  );
};

const SistemMembership = () => {
  const [memberships, setMemberships] = useState([]);
  const [formData, setFormData] = useState({ level_member: '', hari_minimal: '' });
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMemberships();
  }, []);

  const fetchMemberships = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('sistem_membership').select('*').order('id');
    if (!error) setMemberships(data);
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newData = {
      level_member: formData.level_member,
      hari_minimal: parseInt(formData.hari_minimal, 10),
    };

    if (editing) {
      await supabase.from('sistem_membership').update(newData).eq('id', editing);
    } else {
      await supabase.from('sistem_membership').insert([newData]);
    }

    fetchMemberships();
    setShowForm(false);
    setFormData({ level_member: '', hari_minimal: '' });
    setEditing(null);
  };

  const handleEdit = (item) => {
    setFormData({ level_member: item.level_member, hari_minimal: item.hari_minimal });
    setEditing(item.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    await supabase.from('sistem_membership').delete().eq('id', id);
    fetchMemberships();
  };

  return (
    <div className="min-h-screen bg-[#fef9f5] p-6 font-sans">
      <div className="max-w-4xl mx-auto">
        {/* Header Card */}
        <div className="bg-white p-6 rounded-lg shadow-md border mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Manajemen Sistem Membership</h1>
          <p className="text-gray-600 mb-4">
            Kelola level keanggotaan dan durasi minimal hari untuk setiap level.
          </p>
          <Button onClick={() => setShowForm(true)}>Tambah Level Membership Baru</Button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white p-6 rounded-lg shadow-md border mb-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Level Member</label>
                <input
                  type="text"
                  value={formData.level_member}
                  onChange={(e) => setFormData({ ...formData, level_member: e.target.value })}
                  className="border border-gray-300 px-3 py-2 rounded-md w-full focus:ring-2 focus:ring-orange-300"
                  placeholder="Contoh: Platinum"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hari Minimal</label>
                <input
                  type="number"
                  value={formData.hari_minimal}
                  onChange={(e) => setFormData({ ...formData, hari_minimal: e.target.value })}
                  className="border border-gray-300 px-3 py-2 rounded-md w-full focus:ring-2 focus:ring-orange-300"
                  placeholder="Contoh: 365"
                  required
                />
              </div>
              <div className="flex space-x-2">
                <Button type="submit">{editing ? 'Simpan Perubahan' : 'Tambah'}</Button>
                <Button type="button" variant="secondary" onClick={() => { setShowForm(false); setEditing(null); }}>
                  Batal
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Tabel Data */}
        <div className="bg-white rounded-lg shadow-md border overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Level Member</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hari Minimal</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="4" className="text-center p-4 text-gray-500">Memuat...</td>
                </tr>
              ) : memberships.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center p-4 text-gray-500">Belum ada data.</td>
                </tr>
              ) : (
                memberships.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-800">{item.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{item.level_member}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{item.hari_minimal} hari</td>
                    <td className="px-6 py-4 text-sm text-right">
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" onClick={() => handleEdit(item)}>Edit</Button>
                        <Button variant="destructive" onClick={() => handleDelete(item.id)}>Hapus</Button>
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
  );
};

export default SistemMembership;
