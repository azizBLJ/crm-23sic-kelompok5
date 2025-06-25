import React, { useState } from 'react';
import { supabase } from '../../../Supabase';
import { useNavigate } from 'react-router-dom';

const SistemMembershipForm = () => {
  const [form, setForm] = useState({ level_member: '', hari_minimal: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from('sistem_membership').insert([{
      level_member: form.level_member,
      hari_minimal: parseInt(form.hari_minimal)
    }]);

    setLoading(false);

    if (error) {
      alert('Gagal menambahkan: ' + error.message);
    } else {
      alert('Berhasil menambahkan!');
      navigate('/admin/SistemMembership');
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4 text-gray-700">Tambah Sistem Membership</h2>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-600">Level Member</label>
          <input
            type="text"
            name="level_member"
            value={form.level_member}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-600">Hari Minimal</label>
          <input
            type="number"
            name="hari_minimal"
            value={form.hari_minimal}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
          disabled={loading}
        >
          {loading ? 'Menyimpan...' : 'Simpan'}
        </button>
      </form>
    </div>
  );
};

export default SistemMembershipForm;
