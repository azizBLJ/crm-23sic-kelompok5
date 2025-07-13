import React, { useState, useEffect } from 'react';
import { supabase } from '../../../Supabase'; // Sesuaikan path ini
import { Plus, Edit2, Trash2, Users } from 'lucide-react';

// BUTTON COMPONENT (Untuk Membership.jsx)
const Button = ({ children, onClick, className = '', variant = 'primary', type = 'button', ...props }) => {
  let base = 'inline-flex items-center justify-center px-4 py-2 rounded-lg font-semibold shadow transition duration-200';

  if (variant === 'primary') {
    // Tombol utama 'Tambah Membership' dan 'Tambah/Simpan' di dialog
    base += ' bg-[#FF9F6B] hover:bg-[#FF8A4F] text-white'; // Warna oranye terang
  } else if (variant === 'destructive') {
    // Tombol 'Hapus'
    base += ' bg-red-600 hover:bg-red-700 text-white';
  } else if (variant === 'outline') {
    // Tombol outline (jika digunakan)
    base += ' border border-gray-300 text-gray-700 hover:bg-gray-100';
  } else if (variant === 'edit-table') {
    // Tombol 'Edit' di tabel
    base += ' bg-[var(--color-sidebar)] hover:bg-yellow-400 text-gray-800';
  } else if (variant === 'dialog-cancel') {
    // Tombol 'Batal' di dialog
    base += ' bg-[var(--color-sidebar)] hover:bg-yellow-400 text-gray-800';
  }
  return <button type={type} onClick={onClick} className={`${base} ${className}`} {...props}>{children}</button>;
};

// INPUT COMPONENT
const Input = ({ value, onChange, className = '', ...props }) => (
  <input {...props} value={value} onChange={onChange} className={`input ${className}`} />
);

// SELECT COMPONENT
const Select = ({ value, onChange, className = '', children, ...props }) => (
  <select value={value} onChange={onChange} className={`input ${className}`} {...props}>{children}</select>
);

// LABEL COMPONENT
const Label = ({ htmlFor, children }) => (
  <label htmlFor={htmlFor} className="block mb-2 font-semibold text-gray-700 tracking-wide uppercase text-sm">{children}</label>
);

// Dialog Component
const Dialog = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-white rounded-xl shadow-3xl w-full max-w-lg p-8 relative transform scale-95 opacity-0 animate-scale-in">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 border-b pb-4 border-gray-200">{title}</h2>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-3xl transition-colors"
          aria-label="Close"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};


const Membership = () => {
  const [memberships, setMemberships] = useState([]);
  const [users, setUsers] = useState([]);
  const [levels, setLevels] = useState([]);
  const [form, setForm] = useState({ user_id: '', level: '', price: '', days: '' });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError('');
    try {
      const { data: m, error: mError } = await supabase.from('membership').select(`id, total_harga_booking, total_hari, users ( id, email ), sistem_membership ( level_member )`).order('id');
      if (mError) throw mError;
      const { data: u, error: uError } = await supabase.from('users').select('id, email').order('email');
      if (uError) throw uError;
      const { data: l, error: lError } = await supabase.from('sistem_membership').select('level_member');
      if (lError) throw lError;

      setMemberships(m || []);
      setUsers(u || []);
      setLevels(l.map(x => x.level_member) || []);
    } catch (err) {
      setError('Gagal memuat data: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const openDialog = (data = null) => {
    setError(''); // Clear error when opening dialog
    if (data) {
      setEditId(data.id);
      setForm({
        user_id: data.users?.id || '',
        level: data.sistem_membership?.level_member || '',
        price: data.total_harga_booking,
        days: data.total_hari
      });
    } else {
      setEditId(null);
      setForm({ user_id: '', level: '', price: '', days: '' });
    }
    setIsDialogOpen(true);
  };

  const validateForm = () => {
    if (!form.user_id) { setError('User harus dipilih.'); return false; }
    if (!form.level) { setError('Level Membership harus dipilih.'); return false; }
    if (!form.price || +form.price <= 0) { setError('Harga harus diisi dan lebih dari 0.'); return false; }
    if (!form.days || +form.days <= 0) { setError('Hari harus diisi dan lebih dari 0.'); return false; }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError('');
    const payload = {
      user_id: form.user_id,
      level_membership: form.level,
      total_harga_booking: +form.price,
      total_hari: +form.days
    };
    try {
      if (editId) {
        const { error } = await supabase.from('membership').update(payload).eq('id', editId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('membership').insert([payload]);
        if (error) throw error;
      }
      fetchData(); // Re-fetch data to reflect changes
      setIsDialogOpen(false);
    } catch (err) {
      setError('Gagal menyimpan data: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus membership ini?")) return;
    setLoading(true);
    setError('');
    try {
      const { error } = await supabase.from('membership').delete().eq('id', id);
      if (error) throw error;
      fetchData(); // Re-fetch data
    } catch (err) {
      setError('Gagal menghapus data: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-[#fef9f5] font-sans antialiased">
      {/* Defined CSS variables for consistency, ideally in a global CSS file */}
      <style>
        {`
          :root {
            --color-navbar: #FF9F6B; /* Oranye terang */
            --color-sidebar: #FDDD88; /* Kuning */
            --color-warning: #FEF3C7; /* Merah muda untuk warning */
          }
          @keyframes fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes scale-in {
            from { transform: scale(0.95); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
          }
          .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
          .animate-scale-in { animation: scale-in 0.3s ease-out forwards; }
        `}
      </style>

      {/* Header Section (Manajemen Membership) */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8 border border-gray-100">
        <div className="pb-3 mb-2 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
            <Users size={28} className="text-[var(--color-navbar)]" />
            Manajemen Membership
          </h1>
        </div>
        <p className="text-gray-600 mb-4 text-base leading-relaxed">
          Kelola data keanggotaan pengguna, termasuk level, harga, dan durasi membership.
        </p>
        <Button onClick={() => openDialog()} variant="primary" className="py-2 px-4 text-base">
          <Plus className="mr-2" size={18} />Tambah Membership
        </Button>
      </div>

      {/* Loading message */}
      {loading && (
        <div className="flex items-center justify-center p-8 bg-white rounded-xl shadow-lg border border-gray-200 mt-8">
          <svg className="animate-spin h-5 w-5 mr-3 text-gray-600" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="text-gray-600 text-lg">Memuat data membership...</span>
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="bg-[var(--color-warning)] text-red-700 font-semibold p-6 rounded-lg shadow-sm border border-red-200 mt-8 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span className="text-lg">{error}</span>
        </div>
      )}

      {/* Empty state message */}
      {!loading && memberships.length === 0 && !error && (
        <div className="text-center p-10 text-gray-500 text-lg bg-white rounded-xl shadow-lg border border-gray-200 mt-8">
          Belum ada data membership yang tersedia.
        </div>
      )}

      {/* Table section */}
      {!loading && memberships.length > 0 && (
        <div className="overflow-x-auto rounded-lg border border-gray-100 shadow-md bg-white mt-8">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">ID</th>
                <th className="p-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Email User</th>
                <th className="p-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Level Membership</th>
                <th className="p-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Total Harga Booking</th>
                <th className="p-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Total Hari</th>
                <th className="p-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {memberships.map(m => (
                <tr key={m.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-3 font-mono text-gray-600">{m.id}</td>
                  <td className="p-3 text-gray-800">{m.users?.email || 'N/A'}</td>
                  <td className="p-3 text-gray-800">{m.sistem_membership?.level_member || 'N/A'}</td>
                  <td className="p-3 text-gray-800">Rp{parseFloat(m.total_harga_booking).toLocaleString('id-ID')}</td>
                  <td className="p-3 text-gray-800">{m.total_hari} hari</td>
                  <td className="p-3 text-center space-x-2 flex justify-center items-center">
                    <Button variant="edit-table" onClick={() => openDialog(m)} className="px-3 py-1.5 text-sm">
                      <Edit2 size={16} />
                      <span className="ml-1">Edit</span>
                    </Button>
                    <Button variant="destructive" onClick={() => handleDelete(m.id)} className="px-3 py-1.5 text-sm">
                      <Trash2 size={16} />
                      <span className="ml-1">Hapus</span>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Dialog for Add/Edit Membership */}
      <Dialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} title={`${editId ? 'Edit' : 'Tambah'} Membership`}>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <Label htmlFor="user_id">User</Label>
            <Select name="user_id" id="user_id" value={form.user_id} onChange={e => setForm({ ...form, user_id: e.target.value })}>
              <option value="">Pilih User</option>
              {users.map(u => <option key={u.id} value={u.id}>{u.email}</option>)}
            </Select>
          </div>
          <div>
            <Label htmlFor="level">Level Membership</Label>
            <Select name="level" id="level" value={form.level} onChange={e => setForm({ ...form, level: e.target.value })}>
              <option value="">Pilih Level</option>
              {levels.map(l => <option key={l} value={l}>{l}</option>)}
            </Select>
          </div>
          <div>
            <Label htmlFor="price">Total Harga Booking</Label>
            <Input name="price" id="price" type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="days">Total Hari</Label>
            <Input name="days" id="days" type="number" value={form.days} onChange={e => setForm({ ...form, days: e.target.value })} />
          </div>
          {error && <p className="text-red-600 text-sm bg-[var(--color-warning)] p-4 rounded-lg border border-red-200 mt-4">{error}</p>}
          <div className="flex justify-end space-x-3 pt-4">
            <Button variant="dialog-cancel" type="button" onClick={() => setIsDialogOpen(false)}>Batal</Button>
            <Button type="submit" variant="primary">{editId ? 'Simpan' : 'Tambah'}</Button>
          </div>
        </form>
      </Dialog>
    </div>
  );
};

export default Membership;