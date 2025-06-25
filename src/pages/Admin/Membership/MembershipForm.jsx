// src/pages/membership/MembershipForm.jsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../../../Supabase';
import { useNavigate, useParams } from 'react-router-dom';

const MembershipForm = () => {
  const [form, setForm] = useState({
    user_id: '',
    level_membership: '',
    total_harga_booking: '',
    total_hari: '',
  });
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchUsers = async () => {
    const { data } = await supabase.from('users').select('id');
    setUsers(data || []);
  };

  const fetchMembership = async () => {
    const { data, error } = await supabase.from('membership').select('*').eq('id', id).single();
    if (error) {
      console.error('Gagal ambil data:', error.message);
    } else {
      setForm(data);
    }
  };

  useEffect(() => {
    fetchUsers();
    if (id) fetchMembership();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const payload = {
      user_id: form.user_id,
      level_membership: form.level_membership,
      total_harga_booking: parseFloat(form.total_harga_booking),
      total_hari: parseInt(form.total_hari),
    };

    let result;
    if (id) {
      result = await supabase.from('membership').update(payload).eq('id', id);
    } else {
      result = await supabase.from('membership').insert([payload]);
    }

    if (result.error) {
      setError(`Gagal menyimpan data: ${result.error.message}`);
    } else {
      alert('Data berhasil disimpan!');
      navigate('/admin/membership');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">{id ? 'Edit' : 'Tambah'} Membership</h2>

      {error && <div className="bg-red-100 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          name="user_id"
          value={form.user_id}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Pilih User ID</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.id}
            </option>
          ))}
        </select>

        <select
          name="level_membership"
          value={form.level_membership}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Pilih Level Membership</option>
          <option value="Silver">Silver</option>
          <option value="Gold">Gold</option>
          <option value="Platinum">Platinum</option>
        </select>

        <input
          type="number"
          name="total_harga_booking"
          value={form.total_harga_booking}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Total Harga Booking"
          required
        />

        <input
          type="number"
          name="total_hari"
          value={form.total_hari}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Total Hari Booking"
          required
        />

        <button
          type="submit"
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded"
        >
          {id ? 'Update' : 'Tambah'}
        </button>
      </form>
    </div>
  );
};

export default MembershipForm;