import React, { useState, useEffect } from 'react';
import { supabase } from '../../../Supabase';
import { Plus, Trash2, Edit2 } from 'lucide-react';

// BUTTON COMPONENT
const Button = ({ children, onClick, className = '', variant = 'default', type = 'button', ...props }) => {
  let baseClasses = 'px-4 py-2 rounded-lg font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  if (variant === 'default') baseClasses += ' bg-blue-600 hover:bg-blue-700 text-white shadow-sm focus:ring-blue-500';
  else if (variant === 'outline') baseClasses += ' border border-gray-300 text-gray-700 hover:bg-gray-100 focus:ring-gray-300';
  else if (variant === 'destructive') baseClasses += ' bg-red-600 hover:bg-red-700 text-white shadow-sm focus:ring-red-500';
  else if (variant === 'secondary') baseClasses += ' bg-gray-200 hover:bg-gray-300 text-gray-800 shadow-sm focus:ring-gray-300';
  else if (variant === 'primary-orange') baseClasses += ' bg-[#FFAD84] hover:bg-[#f5956a] text-white shadow-sm focus:ring-[#FFAD84]';
  else if (variant === 'secondary-orange') baseClasses += ' bg-[#FFE382] hover:bg-[#ffdf63] text-gray-800 shadow-sm focus:ring-[#FFE382]';

  return (
    <button type={type} onClick={onClick} className={`${baseClasses} ${className}`} {...props}>
      {children}
    </button>
  );
};

const Input = ({ type = 'text', placeholder, value, onChange, className = '', ...props }) => (
  <input type={type} placeholder={placeholder} value={value} onChange={onChange} className={`input ${className}`} {...props} />
);

const Textarea = ({ placeholder, value, onChange, className = '', ...props }) => (
  <textarea placeholder={placeholder} value={value} onChange={onChange} className={`input min-h-[120px] ${className}`} {...props}></textarea>
);

const Dialog = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-white rounded-xl shadow-3xl w-full max-w-lg p-7 relative transform scale-95 opacity-0 animate-scale-in">
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

const TableHeader = ({ children }) => (<thead><tr>{children}</tr></thead>);
const TableBody = ({ children }) => (<tbody className="divide-y divide-gray-200">{children}</tbody>);
const TableRow = ({ children }) => (<tr className="hover:bg-orange-50 transition-colors">{children}</tr>);
const TableHead = ({ children, className = '' }) => (
  <th className={`px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider ${className}`}>{children}</th>
);
const TableCell = ({ children, className = '' }) => (
  <td className={`px-6 py-4 whitespace-nowrap text-gray-800 ${className}`}>{children}</td>
);
const Label = ({ children, htmlFor, className = '' }) => (
  <label htmlFor={htmlFor} className={`block text-sm font-medium text-gray-700 mb-2 ${className}`}>{children}</label>
);
const Card = ({ children, className = '' }) => (
  <div className={`card transition-shadow hover:shadow-xl duration-300 ${className}`}>{children}</div>
);
const CardHeader = ({ children, className = '' }) => (<div className={`mb-5 ${className}`}>{children}</div>);
const CardTitle = ({ children, className = '' }) => (<h3 className={`text-2xl font-extrabold text-gray-900 ${className}`}>{children}</h3>);
const CardContent = ({ children, className = '' }) => (<div className={`${className}`}>{children}</div>);

// MAIN COMPONENT
const FAQ = () => {
  const [faqs, setFaqs] = useState([]);
  const [isAddEditDialogOpen, setIsAddEditDialogOpen] = useState(false);
  const [editingFAQ, setEditingFAQ] = useState(null);
  const [formData, setFormData] = useState({ pertanyaan: '', jawaban: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [faqToDelete, setFaqToDelete] = useState(null);

  const fetchFAQs = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from('faq').select('id, pertanyaan, jawaban, tanggal_input').order('id', { ascending: true });
      if (error) throw error;
      setFaqs(data);
    } catch (err) {
      setError('Gagal memuat data: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchFAQs(); }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const validateForm = () => {
    if (!formData.pertanyaan.trim()) { setError('Pertanyaan tidak boleh kosong.'); return false; }
    if (!formData.jawaban.trim()) { setError('Jawaban tidak boleh kosong.'); return false; }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    const faqData = {
      pertanyaan: formData.pertanyaan.trim(),
      jawaban: formData.jawaban.trim(),
    };

    try {
      if (editingFAQ) {
        const { data, error } = await supabase.from('faq').update(faqData).eq('id', editingFAQ.id).select();
        if (error) throw error;
        setFaqs((prev) => prev.map((faq) => (faq.id === editingFAQ.id ? data[0] : faq)));
      } else {
        const { data, error } = await supabase.from('faq').insert([faqData]).select();
        if (error) throw error;
        setFaqs((prev) => [...prev, data[0]]);
      }
      setIsAddEditDialogOpen(false);
      setFormData({ pertanyaan: '', jawaban: '' });
      setEditingFAQ(null);
    } catch (err) {
      setError('Gagal menyimpan FAQ: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (faq) => {
    setEditingFAQ(faq);
    setFormData({ pertanyaan: faq.pertanyaan, jawaban: faq.jawaban });
    setIsAddEditDialogOpen(true);
  };

  const handleDeleteClick = (faq) => {
    setFaqToDelete(faq);
    setShowConfirmationDialog(true);
  };

  const confirmDelete = async () => {
    if (!faqToDelete) return;
    setLoading(true);
    try {
      const { error } = await supabase.from('faq').delete().eq('id', faqToDelete.id);
      if (error) throw error;
      setFaqs((prev) => prev.filter((faq) => faq.id !== faqToDelete.id));
      setShowConfirmationDialog(false);
      setFaqToDelete(null);
    } catch (err) {
      setError('Gagal menghapus FAQ: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fef9f5] p-6 font-sans antialiased">
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
          .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
          .animate-scale-in { animation: scale-in 0.3s ease-out forwards; }
        `}
      </style>

      <div className="max-w-5xl mx-auto">
        <Card className="mb-8 p-6 bg-white shadow-lg rounded-xl">
          <CardHeader>
            <CardTitle>Manajemen FAQ Admin</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-6 text-lg leading-relaxed">
              Kelola pertanyaan dan jawaban yang sering diajukan untuk meningkatkan pengalaman pengguna.
            </p>
            <Button onClick={() => { setIsAddEditDialogOpen(true); setEditingFAQ(null); setFormData({ pertanyaan: '', jawaban: '' }); setError(''); }} className="mb-4 flex items-center gap-2 text-base py-2.5 px-5" variant="primary-orange">
              <Plus size={18} /> Tambah FAQ Baru
            </Button>
          </CardContent>
        </Card>

        {loading && <div className="text-center p-6 text-gray-600 text-lg">Memuat data FAQ...</div>}
        {error && <div className="text-center p-6 text-red-600 font-semibold text-lg bg-red-50 rounded-lg shadow-sm">{error}</div>}
        {!loading && faqs.length === 0 && !error && (
          <div className="text-center p-8 text-gray-500 text-lg bg-white rounded-xl shadow-lg border border-gray-200">
            Belum ada FAQ yang tersedia.
          </div>
        )}

        {!loading && faqs.length > 0 && (
          <Table>
            <TableHeader>
              <TableHead>ID</TableHead>
              <TableHead>Pertanyaan</TableHead>
              <TableHead>Jawaban</TableHead>
              <TableHead>Tanggal Input</TableHead>
              <TableHead className="text-center">Aksi</TableHead>
            </TableHeader>
            <TableBody>
              {faqs.map((faq) => (
                <TableRow key={faq.id}>
                  <TableCell className="font-mono text-gray-600">{faq.id}</TableCell>
                  <TableCell className="max-w-xs font-medium text-gray-900">{faq.pertanyaan}</TableCell>
                  <TableCell className="max-w-md text-gray-700 line-clamp-2">{faq.jawaban}</TableCell>
                  <TableCell className="text-gray-500 text-sm">{faq.tanggal_input ? new Date(faq.tanggal_input).toLocaleDateString('id-ID') : 'N/A'}</TableCell>
                  <TableCell className="text-center space-x-2">
                    <Button variant="secondary-orange" onClick={() => handleEditClick(faq)} className="px-4 py-2 text-sm rounded-lg">
                      <Edit2 size={16} className="inline-block mr-1" /> Edit
                    </Button>
                    <Button variant="destructive" onClick={() => handleDeleteClick(faq)} className="px-4 py-2 text-sm rounded-lg">
                      <Trash2 size={16} className="inline-block mr-1" /> Hapus
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        {/* Form Dialog */}
        <Dialog isOpen={isAddEditDialogOpen} onClose={() => setIsAddEditDialogOpen(false)} title={editingFAQ ? 'Edit FAQ' : 'Tambah FAQ Baru'}>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label htmlFor="pertanyaan">Pertanyaan</Label>
              <Input id="pertanyaan" name="pertanyaan" value={formData.pertanyaan} onChange={handleInputChange} placeholder="Masukkan pertanyaan" required />
            </div>
            <div>
              <Label htmlFor="jawaban">Jawaban</Label>
              <Textarea id="jawaban" name="jawaban" value={formData.jawaban} onChange={handleInputChange} placeholder="Masukkan jawaban" required />
            </div>
            {error && <p className="text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-200">{error}</p>}
            <div className="flex justify-end space-x-3 pt-5">
              <Button type="button" variant="secondary-orange" onClick={() => setIsAddEditDialogOpen(false)}>Batal</Button>
              <Button type="submit" disabled={loading} variant="primary-orange">
                {loading ? 'Menyimpan...' : (editingFAQ ? 'Simpan Perubahan' : 'Tambah FAQ')}
              </Button>
            </div>
          </form>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog isOpen={showConfirmationDialog} onClose={() => setShowConfirmationDialog(false)} title="Konfirmasi Hapus FAQ">
          <p className="text-gray-700 mb-6 text-lg">
            Apakah Anda yakin ingin menghapus FAQ ini: <span className="font-bold text-red-600">"{faqToDelete?.pertanyaan}"</span>?
          </p>
          <div className="flex justify-end space-x-3 pt-5">
            <Button variant="secondary-orange" onClick={() => setShowConfirmationDialog(false)}>Batal</Button>
            <Button variant="destructive" onClick={confirmDelete} disabled={loading}>
              {loading ? 'Menghapus...' : 'Hapus Sekarang'}
            </Button>
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default FAQ;
