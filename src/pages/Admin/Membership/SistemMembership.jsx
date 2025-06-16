import React, { useState } from 'react';

const getLevel = (poin) => {
  if (poin >= 3000) return 'Platinum';
  if (poin >= 2000) return 'Gold';
  return 'Silver';
};

const getLevelBgColor = (level) => {
  switch (level) {
    case 'Platinum': return '#16a34a'; // hijau emerald
    case 'Gold': return '#facc15';     // kuning
    case 'Silver': return '#6b7280';   // abu-abu
    default: return '#000';
  }
};

const SistemMembership = () => {
  const [pelanggan, setPelanggan] = useState([
    { id: 1, nama: 'Budi Santoso', pembayaran: 1200000, telp: '081234567890' },
    { id: 2, nama: 'Siti Aminah', pembayaran: 950000, telp: '089876543210' },
    { id: 3, nama: 'Andi Wijaya', pembayaran: 2500000, telp: '081299988877' },
    { id: 4, nama: 'Dewi Lestari', pembayaran: 3500000, telp: '081211122233' },
  ]);

  const [form, setForm] = useState({ nama: '', pembayaran: '', telp: '' });
  const [editId, setEditId] = useState(null);

  const handleChange = (e) => { 
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleTambah = () => {
    if (!form.nama || !form.pembayaran || !form.telp) return;
    setPelanggan([...pelanggan, {
      id: Date.now(),
      nama: form.nama,
      pembayaran: parseInt(form.pembayaran),
      telp: form.telp
    }]);
    setForm({ nama: '', pembayaran: '', telp: '' });
  };

  const handleEdit = (p) => {
    setForm({ nama: p.nama, pembayaran: p.pembayaran, telp: p.telp });
    setEditId(p.id);
  };

  const handleUpdate = () => {
    setPelanggan(prev => prev.map(p =>
      p.id === editId ? { ...p, ...form, pembayaran: parseInt(form.pembayaran) } : p
    ));
    setForm({ nama: '', pembayaran: '', telp: '' });
    setEditId(null);
  };

  const handleHapus = (id) => {
    setPelanggan(prev => prev.filter(p => p.id !== id));
  };

  const calculatePoints = (pembayaran) => Math.floor(pembayaran / 1000);

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif', background: '#f4f5f7', minHeight: '100vh' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>Management Pelanggan</h2>

      <div style={{ margin: '16px 0' }}>
        <input name="nama" placeholder="Nama" value={form.nama} onChange={handleChange} style={inputStyle} />
        <input name="pembayaran" placeholder="Nominal" value={form.pembayaran} onChange={handleChange} style={inputStyle}  />
        <input name="telp" placeholder="Telepon" value={form.telp} onChange={handleChange} style={inputStyle} />
        {editId ? (
          <button onClick={handleUpdate} style={buttonStyle}>Update</button>
        ) : (
          <button onClick={handleTambah} style={buttonStyle}>Tambah</button>
        )}
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', borderRadius: '8px', overflow: 'hidden' }}>
        <thead style={{ backgroundColor: '#f1f5f9' }}>
          <tr>
            <th style={thStyle}>NAMA</th>
            <th style={thStyle}>JUMLAH PEMBAYARAN</th>
            <th style={thStyle}>POIN</th>
            <th style={thStyle}>LEVEL</th>
            <th style={thStyle}>TELEPON</th>
            <th style={thStyle}>AKSI</th>
          </tr>
        </thead>
        <tbody>
          {pelanggan.map((p) => {
            const poin = calculatePoints(p.pembayaran);
            const level = getLevel(poin);
            return (
              <tr key={p.id} style={{ textAlign: 'center', borderBottom: '1px solid #e5e7eb' }}>
                <td style={tdStyle}>{p.nama}</td>
                <td style={tdStyle}>{p.pembayaran.toLocaleString('id-ID')}</td>
                <td style={tdStyle}>{poin}</td>
                <td style={tdStyle}>
                  <button
                    style={{
                      fontSize: '12px',
                      padding: '2px 8px',
                      borderRadius: '10px',
                      backgroundColor: getLevelBgColor(level),
                      color: 'white',
                      border: 'none',
                      cursor: 'default',
                      minWidth: '60px',
                    }}
                    disabled
                  >
                    {level}
                  </button>
                </td>
                <td style={tdStyle}>{p.telp}</td>
                <td style={tdStyle}>
                  <button style={{ color: '#2563eb', marginRight: '10px', cursor: 'pointer', background: 'none', border: 'none' }}
                    onClick={() => handleEdit(p)}>
                    Edit
                  </button>
                  <button style={{ color: '#dc2626', cursor: 'pointer', background: 'none', border: 'none' }}
                    onClick={() => handleHapus(p.id)}>
                    Hapus
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const inputStyle = {
  padding: '8px',
  marginRight: '8px',
  borderRadius: '4px',
  border: '1px solid #ccc',
};

const buttonStyle = {
  backgroundColor: '#2563eb',
  color: 'white',
  padding: '8px 12px',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer'
};

const thStyle = {
  padding: '12px',
  textAlign: 'center',
  fontSize: '14px',
  fontWeight: '600',
  color: '#374151',
};

const tdStyle = {
  padding: '12px',
  fontSize: '14px',
};

export default SistemMembership;