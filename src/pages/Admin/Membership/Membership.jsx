import React, { useState, useEffect } from 'react';
import { supabase } from "../../../Supabase"; // Mengimpor instance supabase dari file terpisah
import { Plus, Edit2, Trash2 } from 'lucide-react'; // Import icons for buttons

// --- Enhanced UI Components ---

const Button = ({ children, onClick, className = '', variant = 'default', type = 'button', ...props }) => {
  let baseClasses = 'inline-flex items-center justify-center px-4 py-2 rounded-lg font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  if (variant === 'default') {
    baseClasses += ' bg-blue-600 hover:bg-blue-700 text-white shadow-sm focus:ring-blue-500';
  } else if (variant === 'outline') {
    baseClasses += ' border border-gray-300 text-gray-700 hover:bg-gray-100 focus:ring-gray-300';
  } else if (variant === 'destructive') {
    baseClasses += ' bg-red-600 hover:bg-red-700 text-white shadow-sm focus:ring-red-500';
  } else if (variant === 'secondary') {
    baseClasses += ' bg-gray-200 hover:bg-gray-300 text-gray-800 shadow-sm focus:ring-gray-300';
  } else if (variant === 'orange') { // New orange variant
    baseClasses += ' bg-[#F97316] hover:bg-[#E06714] text-white shadow-md focus:ring-orange-500';
  }
  return (
    <button type={type} onClick={onClick} className={`${baseClasses} ${className}`} {...props}>
      {children}
    </button>
  );
};

const Input = ({ type = 'text', placeholder, value, onChange, className = '', ...props }) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all duration-200 text-gray-800 placeholder-gray-400 ${className}`}
    {...props}
  />
);

const Select = ({ children, value, onChange, className = '', ...props }) => (
  <select
    value={value}
    onChange={onChange}
    className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all duration-200 bg-white text-gray-800 ${className}`}
    {...props}
  >
    {children}
  </select>
);

const Dialog = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-7 relative transform scale-95 opacity-0 animate-scale-in">
        <h2 className="text-2xl font-bold mb-5 text-gray-800 border-b pb-3 border-gray-200">{title}</h2>
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

const Table = ({ children }) => (
  <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-lg bg-white">
    <table className="min-w-full divide-y divide-gray-200 text-sm">{children}</table>
  </div>
);

const TableHeader = ({ children }) => (
  <thead className="bg-orange-50">
    <tr>{children}</tr>
  </thead>
);

const TableBody = ({ children }) => (
  <tbody className="divide-y divide-gray-200">{children}</tbody>
);

const TableRow = ({ children }) => (
  <tr className="hover:bg-orange-50 transition-colors">{children}</tr>
);

const TableHead = ({ children, className = '' }) => (
  <th className={`px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider ${className}`}>
    {children}
  </th>
);

const TableCell = ({ children, className = '' }) => (
  <td className={`px-6 py-4 whitespace-nowrap text-gray-800 ${className}`}>
    {children}
  </td>
);

const Label = ({ children, htmlFor, className = '' }) => (
  <label htmlFor={htmlFor} className={`block text-sm font-medium text-gray-700 mb-2 ${className}`}>
    {children}
  </label>
);

const Card = ({ children, className = '' }) => (
  <div className={`bg-white rounded-xl shadow-lg border border-orange-100 p-7 ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children, className = '' }) => (
  <div className={`mb-5 ${className}`}>
    {children}
  </div>
);

const CardTitle = ({ children, className = '' }) => (
  <h3 className={`text-2xl font-extrabold text-gray-900 ${className}`}>
    {children}
  </h3>
);

const CardContent = ({ children, className = '' }) => (
  <div className={`${className}`}>
    {children}
  </div>
);

// --- Main Membership Component ---

const Membership = () => {
  const [memberships, setMemberships] = useState([]);
  const [sistemMembershipLevels, setSistemMembershipLevels] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [isAddEditDialogOpen, setIsAddEditDialogOpen] = useState(false);
  const [editingMembership, setEditingMembership] = useState(null);
  const [formData, setFormData] = useState({ user_id: '', level_membership: '', total_harga_booking: '', total_hari: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [membershipToDelete, setMembershipToDelete] = useState(null);

  const fetchAllData = async () => {
    setLoading(true);
    setError('');
    try {
      const { data: membershipsData, error: membershipsError } = await supabase
        .from('membership')
        .select(`
          id,
          total_harga_booking,
          total_hari,
          users ( id, email ),
          sistem_membership ( level_member )
        `)
        .order('id', { ascending: true });

      if (membershipsError) throw membershipsError;

      const { data: sistemLevelsData, error: sistemLevelsError } = await supabase
        .from('sistem_membership')
        .select('level_member')
        .order('level_member', { ascending: true });

      if (sistemLevelsError) throw sistemLevelsError;

      const { data: usersData, error: usersError } = await supabase
        .from('users')
        .select('id, email')
        .order('email', { ascending: true });

      if (usersError) throw usersError;

      setMemberships(membershipsData);
      setSistemMembershipLevels(sistemLevelsData.map(item => item.level_member));
      setUsersList(usersData);

    } catch (err) {
      console.error("Error fetching all data:", err.message);
      setError("Gagal memuat data: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const validateForm = () => {
    if (!formData.user_id) {
      setError('User ID tidak boleh kosong.');
      return false;
    }
    if (!formData.level_membership.trim()) {
      setError('Level Membership tidak boleh kosong.');
      return false;
    }
    const totalHarga = parseFloat(formData.total_harga_booking);
    if (isNaN(totalHarga) || totalHarga < 0) {
      setError('Total Harga Booking harus angka non-negatif.');
      return false;
    }
    const totalHari = parseInt(formData.total_hari, 10);
    if (isNaN(totalHari) || totalHari <= 0) {
      setError('Total Hari harus angka positif.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError('');

    const membershipData = {
      user_id: formData.user_id,
      level_membership: formData.level_membership.trim(),
      total_harga_booking: parseFloat(formData.total_harga_booking),
      total_hari: parseInt(formData.total_hari, 10),
    };

    try {
      if (editingMembership) {
        const { data, error } = await supabase
          .from('membership')
          .update(membershipData)
          .eq('id', editingMembership.id)
          .select(`
            id,
            total_harga_booking,
            total_hari,
            users ( id, email ),
            sistem_membership ( level_member )
          `);

        if (error) throw error;

        setMemberships((prev) =>
          prev.map((m) => (m.id === editingMembership.id ? data[0] : m))
        );
      } else {
        const { data, error } = await supabase
          .from('membership')
          .insert([membershipData])
          .select(`
            id,
            total_harga_booking,
            total_hari,
            users ( id, email ),
            sistem_membership ( level_member )
          `);

        if (error) throw error;

        setMemberships((prev) => [...prev, data[0]]);
      }
      setIsAddEditDialogOpen(false);
      setEditingMembership(null);
      setFormData({ user_id: '', level_membership: '', total_harga_booking: '', total_hari: '' });
    } catch (err) {
      console.error("Error saving data:", err.message);
      setError("Gagal menyimpan data keanggotaan: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddClick = () => {
    setEditingMembership(null);
    setFormData({ user_id: '', level_membership: '', total_harga_booking: '', total_hari: '' });
    setError('');
    setIsAddEditDialogOpen(true);
  };

  const handleEditClick = (membership) => {
    setEditingMembership(membership);
    setFormData({
      user_id: membership.users?.id || '', // Ensure user_id is set for the select
      level_membership: membership.sistem_membership?.level_member || '', // Ensure level_membership is set for the select
      total_harga_booking: String(membership.total_harga_booking),
      total_hari: String(membership.total_hari),
    });
    setError('');
    setIsAddEditDialogOpen(true);
  };

  const handleDeleteClick = (membership) => {
    setMembershipToDelete(membership);
    setShowConfirmationDialog(true);
  };

  const confirmDelete = async () => {
    if (!membershipToDelete) return;

    setLoading(true);
    setError('');

    try {
      const { error } = await supabase
        .from('membership')
        .delete()
        .eq('id', membershipToDelete.id);

      if (error) throw error;

      setMemberships((prev) => prev.filter((m) => m.id !== membershipToDelete.id));
      setShowConfirmationDialog(false);
      setMembershipToDelete(null);
    } catch (err) {
      console.error("Error deleting data:", err.message);
      setError("Gagal menghapus data keanggotaan: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const cancelDelete = () => {
    setShowConfirmationDialog(false);
    setMembershipToDelete(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-gray-100 p-4 sm:p-6 lg:p-8 font-sans antialiased">
      <style>
        {`
          @keyframes fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes scale-in {
            from { transform: scale(0.95); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
          }
          .animate-fade-in {
            animation: fade-in 0.3s ease-out forwards;
          }
          .animate-scale-in {
            animation: scale-in 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
          }
        `}
      </style>
      <div className="max-w-5xl mx-auto">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Manajemen Membership Pengguna</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-6 text-lg leading-relaxed">
              Kelola detail keanggotaan pengguna, termasuk level, total harga booking, dan total hari.
              Pastikan setiap pengguna memiliki level membership yang sesuai.
            </p>
            <Button onClick={handleAddClick} className="flex items-center gap-2 text-lg py-3 px-6" variant="orange">
              <Plus size={20} /> Tambah Membership Baru
            </Button>
          </CardContent>
        </Card>

        {loading && (
          <div className="text-center p-6 text-gray-600 text-lg">Memuat data membership...</div>
        )}

        {error && (
          <div className="text-center p-6 text-red-600 font-semibold text-lg bg-red-50 rounded-lg shadow-sm mx-auto max-w-md">Error: {error}</div>
        )}

        {!loading && !error && memberships.length === 0 && (
          <div className="text-center p-8 text-gray-500 text-lg bg-white rounded-xl shadow-lg border border-gray-200">
            Belum ada data membership yang tersedia. Klik "Tambah Membership Baru" untuk memulai.
          </div>
        )}

        {!loading && !error && memberships.length > 0 && (
          <Table>
            <TableHeader>
              <TableHead>ID</TableHead>
              <TableHead>User Email</TableHead>
              <TableHead>Level Membership</TableHead>
              <TableHead>Total Harga Booking</TableHead>
              <TableHead>Total Hari</TableHead>
              <TableHead className="text-center">Aksi</TableHead>
            </TableHeader>
            <TableBody>
              {memberships.map((membership) => (
                <TableRow key={membership.id}>
                  <TableCell className="font-mono text-gray-600">{membership.id}</TableCell>
                  <TableCell className="max-w-xs sm:max-w-sm lg:max-w-md truncate font-medium text-gray-900">
                    {membership.users?.email || 'N/A'}
                  </TableCell>
                  <TableCell className="text-gray-700">
                    {membership.sistem_membership?.level_member || 'N/A'}
                  </TableCell>
                  <TableCell className="text-gray-700">
                    Rp{parseFloat(membership.total_harga_booking).toLocaleString('id-ID')}
                  </TableCell>
                  <TableCell className="text-gray-700">
                    {membership.total_hari} hari
                  </TableCell>
                  <TableCell className="text-center space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => handleEditClick(membership)}
                      className="px-4 py-2 text-sm rounded-md hover:bg-orange-100 border-orange-200 text-orange-600"
                    >
                      <Edit2 size={16} className="inline-block mr-1" /> Edit
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleDeleteClick(membership)}
                      className="px-4 py-2 text-sm rounded-md"
                    >
                      <Trash2 size={16} className="inline-block mr-1" /> Hapus
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        {/* Add/Edit Membership Dialog */}
        <Dialog
          isOpen={isAddEditDialogOpen}
          onClose={() => setIsAddEditDialogOpen(false)}
          title={editingMembership ? 'Edit Membership' : 'Tambah Membership Baru'}
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label htmlFor="user_id">User Email</Label>
              <Select
                id="user_id"
                name="user_id"
                value={formData.user_id}
                onChange={handleInputChange}
                required
              >
                <option value="">Pilih User</option>
                {usersList.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.email}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <Label htmlFor="level_membership">Level Membership</Label>
              <Select
                id="level_membership"
                name="level_membership"
                value={formData.level_membership}
                onChange={handleInputChange}
                required
              >
                <option value="">Pilih Level</option>
                {sistemMembershipLevels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <Label htmlFor="total_harga_booking">Total Harga Booking</Label>
              <Input
                id="total_harga_booking"
                name="total_harga_booking"
                type="number"
                step="0.01"
                value={formData.total_harga_booking}
                onChange={handleInputChange}
                placeholder="Contoh: 1500000"
                required
              />
            </div>
            <div>
              <Label htmlFor="total_hari">Total Hari</Label>
              <Input
                id="total_hari"
                name="total_hari"
                type="number"
                value={formData.total_hari}
                onChange={handleInputChange}
                placeholder="Contoh: 30"
                required
              />
            </div>
            {error && <p className="text-red-600 text-sm mt-3 font-medium bg-red-50 p-3 rounded-lg border border-red-200">{error}</p>}
            <div className="flex justify-end space-x-3 pt-5">
              <Button type="button" variant="secondary" onClick={() => setIsAddEditDialogOpen(false)} className="px-5 py-2.5">
                Batal
              </Button>
              <Button type="submit" disabled={loading} className="px-5 py-2.5">
                {loading ? 'Menyimpan...' : (editingMembership ? 'Simpan Perubahan' : 'Tambah Membership')}
              </Button>
            </div>
          </form>
        </Dialog>

        {/* Confirmation Dialog for Deletion */}
        <Dialog
          isOpen={showConfirmationDialog}
          onClose={cancelDelete}
          title="Konfirmasi Hapus Membership"
        >
          <p className="text-gray-700 mb-6 text-lg">
            Apakah Anda yakin ingin menghapus membership untuk user <span className="font-bold text-red-600">"{membershipToDelete?.users?.email}"</span> (Level: <span className="font-bold text-red-600">"{membershipToDelete?.sistem_membership?.level_member}"</span>)?
            Tindakan ini tidak dapat dibatalkan.
          </p>
          <div className="flex justify-end space-x-3 pt-5">
            <Button type="button" variant="secondary" onClick={cancelDelete} className="px-5 py-2.5">
              Batal
            </Button>
            <Button type="button" variant="destructive" onClick={confirmDelete} disabled={loading} className="px-5 py-2.5">
              {loading ? 'Menghapus...' : 'Hapus Sekarang'}
            </Button>
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default Membership;