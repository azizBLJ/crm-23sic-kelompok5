// src/pages/sistem_membership/SistemMembership.jsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../../../Supabase';
import { Plus, Trash2, Edit2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SistemMembership = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('sistem_membership').select('*').order('id');
    if (error) {
      console.error('Gagal mengambil data:', error);
    } else {
      setList(data);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Yakin hapus data ini?')) {
      const { error } = await supabase.from('sistem_membership').delete().eq('id', id);
      if (!error) {
        alert('Data berhasil dihapus!');
        fetchData();
      } else {
        alert('Gagal hapus data!');
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Sistem Membership</h1>
          <p className="text-gray-600">Atur level dan hari minimal untuk tiap membership</p>
        </div>
        <button
          onClick={() => navigate('/admin/SistemMembership/add')}
          className="bg-orange-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-orange-600"
        >
          <Plus size={18} /> Tambah
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Level Member</th>
              <th className="p-3 text-left">Hari Minimal</th>
              <th className="p-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="4" className="text-center py-4">Loading...</td></tr>
            ) : list.length === 0 ? (
              <tr><td colSpan="4" className="text-center py-4">Belum ada data</td></tr>
            ) : (
              list.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="p-3">{item.id}</td>
                  <td className="p-3 font-semibold">{item.level_member}</td>
                  <td className="p-3">{item.hari_minimal} hari</td>
                  <td className="p-3 text-center flex justify-center gap-2">
                    <button
                      onClick={() => navigate(`/admin/SistemMembership/edit/${item.id}`)}
                      className="text-blue-600 hover:text-blue-800 p-1"
                      title="Edit"
                    >
                      <Edit2 size={16} />
                    </button>

                    <button
                      onClick={() => handleDelete(item.id)}
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

export default SistemMembership;
