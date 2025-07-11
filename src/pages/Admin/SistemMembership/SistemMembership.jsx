import React, { useState, useEffect } from 'react';
import { supabase } from "../../../Supabase"; // Mengimpor instance supabase dari file terpisah

// --- Mock Shadcn UI Components ---
// In a real project, you would import these from your shadcn/ui setup.
// For demonstration, these are simplified versions using Tailwind CSS.

const Button = ({ children, onClick, className = '', variant = 'default', type = 'button', ...props }) => {
  let baseClasses = 'px-4 py-2 rounded-md font-semibold transition-colors duration-200';
  if (variant === 'default') {
    baseClasses += ' bg-blue-600 hover:bg-blue-700 text-white shadow-sm';
  } else if (variant === 'outline') {
    baseClasses += ' border border-gray-300 text-gray-700 hover:bg-gray-100';
  } else if (variant === 'destructive') {
    baseClasses += ' bg-red-600 hover:bg-red-700 text-white shadow-sm';
  } else if (variant === 'secondary') {
    baseClasses += ' bg-gray-200 hover:bg-gray-300 text-gray-800 shadow-sm';
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
    className={`w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${className}`}
    {...props}
  />
);

const Dialog = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">{title}</h2>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
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
  <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
    <table className="min-w-full divide-y divide-gray-200 bg-white">
      {children}
    </table>
  </div>
);

const TableHeader = ({ children }) => (
  <thead className="bg-gray-50">
    <tr>{children}</tr>
  </thead>
);

const TableBody = ({ children }) => (
  <tbody className="divide-y divide-gray-200">{children}</tbody>
);

const TableRow = ({ children }) => (
  <tr className="hover:bg-gray-50 transition-colors duration-150">{children}</tr>
);

const TableHead = ({ children, className = '' }) => (
  <th className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${className}`}>
    {children}
  </th>
);

const TableCell = ({ children, className = '' }) => (
  <td className={`px-6 py-4 whitespace-nowrap text-sm text-gray-800 ${className}`}>
    {children}
  </td>
);

const Label = ({ children, htmlFor, className = '' }) => (
  <label htmlFor={htmlFor} className={`block text-sm font-medium text-gray-700 mb-1 ${className}`}>
    {children}
  </label>
);

const Card = ({ children, className = '' }) => (
  <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children, className = '' }) => (
  <div className={`mb-4 ${className}`}>
    {children}
  </div>
);

const CardTitle = ({ children, className = '' }) => (
  <h3 className={`text-xl font-bold text-gray-800 ${className}`}>
    {children}
  </h3>
);

const CardContent = ({ children, className = '' }) => (
  <div className={`${className}`}>
    {children}
  </div>
);

// --- Main MembershipAdmin Component ---

const SistemMembership = () => {
  const [memberships, setMemberships] = useState([]);
  const [isAddEditDialogOpen, setIsAddEditDialogOpen] = useState(false);
  const [editingMembership, setEditingMembership] = useState(null); // null for add, object for edit
  const [formData, setFormData] = useState({ level_member: '', hari_minimal: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [membershipToDelete, setMembershipToDelete] = useState(null);

  // Fungsi untuk mengambil data dari Supabase
  const fetchMemberships = async () => {
    setLoading(true);
    setError('');
    try {
      // Mengambil semua data dari tabel 'sistem_membership' dan mengurutkannya berdasarkan 'id'
      const { data, error } = await supabase
        .from('sistem_membership')
        .select('*')
        .order('id', { ascending: true });

      if (error) {
        throw error;
      }
      setMemberships(data);
    } catch (err) {
      console.error("Error fetching data:", err.message);
      setError("Gagal memuat data keanggotaan: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Panggil fetchMemberships saat komponen dimuat
  useEffect(() => {
    fetchMemberships();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(''); // Hapus error saat input berubah
  };

  const validateForm = () => {
    if (!formData.level_member.trim()) {
      setError('Level Member tidak boleh kosong.');
      return false;
    }
    const hariMinimal = parseInt(formData.hari_minimal, 10);
    if (isNaN(hariMinimal) || hariMinimal <= 0) {
      setError('Hari Minimal harus angka positif.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    setLoading(true); // Atur loading untuk operasi
    setError(''); // Hapus error sebelumnya

    const newMembershipData = {
      level_member: formData.level_member.trim(),
      hari_minimal: parseInt(formData.hari_minimal, 10),
    };

    try {
      if (editingMembership) {
        // Logika untuk memperbarui keanggotaan yang ada di Supabase
        const { data, error } = await supabase
          .from('sistem_membership')
          .update(newMembershipData)
          .eq('id', editingMembership.id)
          .select(); // Mengembalikan data yang diperbarui

        if (error) {
          throw error;
        }

        setMemberships((prev) =>
          prev.map((m) => (m.id === editingMembership.id ? data[0] : m))
        );
      } else {
        // Logika untuk menambahkan keanggotaan baru ke Supabase
        const { data, error } = await supabase
          .from('sistem_membership')
          .insert([newMembershipData])
          .select(); // Mengembalikan data yang baru ditambahkan

        if (error) {
          throw error;
        }

        setMemberships((prev) => [...prev, data[0]]);
      }
      setIsAddEditDialogOpen(false);
      setEditingMembership(null);
      setFormData({ level_member: '', hari_minimal: '' });
    } catch (err) {
      console.error("Error saving data:", err.message);
      setError("Gagal menyimpan data keanggotaan: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddClick = () => {
    setEditingMembership(null);
    setFormData({ level_member: '', hari_minimal: '' });
    setError('');
    setIsAddEditDialogOpen(true);
  };

  const handleEditClick = (membership) => {
    setEditingMembership(membership);
    setFormData({
      level_member: membership.level_member,
      hari_minimal: String(membership.hari_minimal),
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

    setLoading(true); // Atur loading untuk operasi
    setError(''); // Hapus error sebelumnya

    try {
      // Logika untuk menghapus keanggotaan dari Supabase
      const { error } = await supabase
        .from('sistem_membership')
        .delete()
        .eq('id', membershipToDelete.id);

      if (error) {
        throw error;
      }

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
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Manajemen Sistem Membership</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Kelola level keanggotaan dan durasi minimal hari untuk setiap level.
            </p>
            <Button onClick={handleAddClick} className="mb-4">
              Tambah Level Membership Baru
            </Button>
          </CardContent>
        </Card>

        {loading && (
          <div className="text-center p-4 text-gray-600">Memuat data...</div>
        )}

        {error && (
          <div className="text-center p-4 text-red-600 font-semibold">Error: {error}</div>
        )}

        {!loading && !error && memberships.length === 0 && (
          <div className="text-center p-4 text-gray-600">Belum ada data membership.</div>
        )}

        {!loading && !error && memberships.length > 0 && (
          <Table>
            <TableHeader>
              <TableHead>ID</TableHead>
              <TableHead>Level Member</TableHead>
              <TableHead>Hari Minimal</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableHeader>
            <TableBody>
              {memberships.map((membership) => (
                <TableRow key={membership.id}>
                  <TableCell>{membership.id}</TableCell>
                  <TableCell>{membership.level_member}</TableCell>
                  <TableCell>{membership.hari_minimal} hari</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      onClick={() => handleEditClick(membership)}
                      className="mr-2 px-3 py-1 text-sm"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleDeleteClick(membership)}
                      className="px-3 py-1 text-sm"
                    >
                      Hapus
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
          title={editingMembership ? 'Edit Level Membership' : 'Tambah Level Membership Baru'}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="level_member">Level Member</Label>
              <Input
                id="level_member"
                name="level_member"
                value={formData.level_member}
                onChange={handleInputChange}
                placeholder="Contoh: Platinum"
              />
            </div>
            <div>
              <Label htmlFor="hari_minimal">Hari Minimal</Label>
              <Input
                id="hari_minimal"
                name="hari_minimal"
                type="number"
                value={formData.hari_minimal}
                onChange={handleInputChange}
                placeholder="Contoh: 365"
              />
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="secondary" onClick={() => setIsAddEditDialogOpen(false)}>
                Batal
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? 'Menyimpan...' : (editingMembership ? 'Simpan Perubahan' : 'Tambah')}
              </Button>
            </div>
          </form>
        </Dialog>

        {/* Confirmation Dialog for Deletion */}
        <Dialog
          isOpen={showConfirmationDialog}
          onClose={cancelDelete}
          title="Konfirmasi Hapus"
        >
          <p className="text-gray-700 mb-4">
            Apakah Anda yakin ingin menghapus level membership "
            <span className="font-semibold">{membershipToDelete?.level_member}</span>"?
            Tindakan ini tidak dapat dibatalkan.
          </p>
          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="secondary" onClick={cancelDelete}>
              Batal
            </Button>
            <Button type="button" variant="destructive" onClick={confirmDelete} disabled={loading}>
              {loading ? 'Menghapus...' : 'Hapus'}
            </Button>
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default SistemMembership;
