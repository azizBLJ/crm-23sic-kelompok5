// src/pages/membership/Membership.jsx
import React, { useState, useEffect } from 'react';
import { supabase } from '../../../Supabase';
import { Trash2, Edit2, Plus, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Membership = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchMembers = async () => {
    setLoading(true);
    setError('');

    const { data, error } = await supabase
      .from('membership')
      .select('*')
      .order('id', { ascending: false });

    if (error) {
      setError(`Gagal memuat data: ${error.message}`);
      setMembers([]);
    } else {
      setMembers(data || []);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Yakin ingin menghapus membership ini?')) return;

    const { error } = await supabase.from('membership').delete().eq('id', id);
    if (error) {
      alert(`Gagal menghapus: ${error.message}`);
    } else {
      alert('Membership berhasil dihapus!');
      fetchMembers();
    }
  };

  const formatCurrency = (amount) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Daftar Membership</h1>
          <p className="text-gray-600">Kelola data membership hotel Anda</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => navigate('/admin/membership/add')}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <Plus size={18} /> Tambah
          </button>
          <button
            onClick={fetchMembers}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            disabled={loading}
          >
            <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
            Refresh
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 text-red-700 px-4 py-3 rounded mb-4">
          <strong>Error:</strong> {error}
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-orange-100">
            <tr>
              <th className="px-4 py-3 text-left">ID</th>
              <th className="px-4 py-3 text-left">User ID</th>
              <th className="px-4 py-3 text-left">Level</th>
              <th className="px-4 py-3 text-right">Total Harga</th>
              <th className="px-4 py-3 text-center">Total Hari</th>
              <th className="px-4 py-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center py-8">Memuat data...</td>
              </tr>
            ) : members.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-8 text-gray-500">
                  Belum ada data membership.
                </td>
              </tr>
            ) : (
              members.map((member) => (
                <tr key={member.id} className="border-t">
                  <td className="px-4 py-3 text-gray-600">#{member.id}</td>
                  <td className="px-4 py-3 font-mono text-xs text-gray-800 break-all">{member.user_id}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      member.level_membership === 'Platinum'
                        ? 'bg-purple-100 text-purple-800'
                        : member.level_membership === 'Gold'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {member.level_membership}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right font-semibold text-green-600">
                    {formatCurrency(member.total_harga_booking)}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                      {member.total_hari} hari
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center flex justify-center gap-2">
                    <button
                      onClick={() => navigate(`/admin/membership/edit/${member.id}`)}
                      className="text-blue-600 hover:text-blue-800 p-1"
                      title="Edit"
                    >
                      <Edit2 size={16} />
                    </button>

                    <button
                      onClick={() => handleDelete(member.id)}
                      className="text-red-600 hover:text-red-800 p-1"
                      title="Hapus"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Membership;
