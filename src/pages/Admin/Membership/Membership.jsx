// Membership.jsx
import React, { useState, useEffect } from 'react';
import { supabase } from '../../../Supabase';
import { Plus, Edit2, Trash2 } from 'lucide-react';

const Button = ({ children, onClick, className = '', variant = 'primary', type = 'button', ...props }) => {
  let base = 'inline-flex items-center justify-center px-4 py-2 rounded-lg font-semibold shadow transition duration-200';
  if (variant === 'primary') base += ' bg-[var(--color-navbar)] hover:bg-orange-500 text-white';
  else if (variant === 'secondary') base += ' bg-[var(--color-accent)] hover:bg-orange-400 text-white';
  else if (variant === 'destructive') base += ' bg-red-600 hover:bg-red-700 text-white';
  else if (variant === 'outline') base += ' border border-gray-300 text-gray-700 hover:bg-gray-100';
  return <button type={type} onClick={onClick} className={`${base} ${className}`} {...props}>{children}</button>;
};

const Input = ({ value, onChange, className = '', ...props }) => (
  <input {...props} value={value} onChange={onChange} className={`input ${className}`} />
);

const Select = ({ value, onChange, className = '', children, ...props }) => (
  <select value={value} onChange={onChange} className={`input ${className}`} {...props}>{children}</select>
);

const Label = ({ htmlFor, children }) => (
  <label htmlFor={htmlFor} className="block mb-2 font-semibold text-gray-700 tracking-wide uppercase text-sm">{children}</label>
);

const Card = ({ children }) => <div className="card transition hover:shadow-xl border-[var(--color-accent)] bg-white">{children}</div>;

const Membership = () => {
  const [memberships, setMemberships] = useState([]);
  const [users, setUsers] = useState([]);
  const [levels, setLevels] = useState([]);
  const [form, setForm] = useState({ user_id: '', level: '', price: '', days: '' });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data: m } = await supabase.from('membership').select(`id, total_harga_booking, total_hari, users ( id, email ), sistem_membership ( level_member )`).order('id');
    const { data: u } = await supabase.from('users').select('id, email').order('email');
    const { data: l } = await supabase.from('sistem_membership').select('level_member');
    setMemberships(m || []);
    setUsers(u || []);
    setLevels(l.map(x => x.level_member) || []);
  };

  const openDialog = (data = null) => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      user_id: form.user_id,
      level_membership: form.level,
      total_harga_booking: +form.price,
      total_hari: +form.days
    };
    if (editId) {
      await supabase.from('membership').update(payload).eq('id', editId);
    } else {
      await supabase.from('membership').insert([payload]);
    }
    fetchData();
    setIsDialogOpen(false);
  };

  const handleDelete = async (id) => {
    await supabase.from('membership').delete().eq('id', id);
    fetchData();
  };

  return (
    <div className="min-h-screen p-6 bg-[#fef9f5] font-sans">
      <Card>
        <div className="mb-6 flex justify-between items-center border-b border-gray-200 pb-4">
          <h1 className="text-2xl font-bold text-gray-800">🎉 Manajemen Membership</h1>
          <Button onClick={() => openDialog()} variant="primary"><Plus className="mr-2" size={18} />Tambah</Button>
        </div>
        <div className="overflow-x-auto rounded-xl">
          <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            <thead className="table-header">
              <tr>
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Level</th>
                <th className="p-3 text-left">Harga</th>
                <th className="p-3 text-left">Hari</th>
                <th className="p-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {memberships.map(m => (
                <tr key={m.id} className="hover:bg-orange-50 transition-colors">
                  <td className="p-3 font-mono text-gray-600">{m.id}</td>
                  <td className="p-3">{m.users?.email}</td>
                  <td className="p-3">{m.sistem_membership?.level_member}</td>
                  <td className="p-3">Rp{parseFloat(m.total_harga_booking).toLocaleString('id-ID')}</td>
                  <td className="p-3">{m.total_hari} hari</td>
                  <td className="p-3 text-center space-x-2">
                    <Button variant="outline" onClick={() => openDialog(m)}><Edit2 size={16} /></Button>
                    <Button variant="destructive" onClick={() => handleDelete(m.id)}><Trash2 size={16} /></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl border-t-8 border-[var(--color-accent)]">
            <h2 className="text-xl font-bold text-gray-800 mb-4">{editId ? 'Edit' : 'Tambah'} Membership</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <Label htmlFor="user_id">User</Label>
                <Select name="user_id" value={form.user_id} onChange={e => setForm({ ...form, user_id: e.target.value })}>
                  <option value="">Pilih User</option>
                  {users.map(u => <option key={u.id} value={u.id}>{u.email}</option>)}
                </Select>
              </div>
              <div>
                <Label htmlFor="level">Level Membership</Label>
                <Select name="level" value={form.level} onChange={e => setForm({ ...form, level: e.target.value })}>
                  <option value="">Pilih Level</option>
                  {levels.map(l => <option key={l} value={l}>{l}</option>)}
                </Select>
              </div>
              <div>
                <Label htmlFor="price">Total Harga Booking</Label>
                <Input name="price" type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
              </div>
              <div>
                <Label htmlFor="days">Total Hari</Label>
                <Input name="days" type="number" value={form.days} onChange={e => setForm({ ...form, days: e.target.value })} />
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <Button variant="secondary" type="button" onClick={() => setIsDialogOpen(false)}>Batal</Button>
                <Button type="submit">{editId ? 'Simpan' : 'Tambah'}</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Membership;
