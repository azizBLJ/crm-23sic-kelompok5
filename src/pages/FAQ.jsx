import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const FAQ = () => {
  const [faqList, setFaqList] = useState([
    {
      id: 1,
      question: 'Bagaimana cara mendaftar akun?',
      answer: 'Klik tombol daftar dan isi data Anda.',
      createdAt: new Date().toISOString(),
    },
    {
      id: 2,
      question: 'Apa itu membership?',
      answer: '',
      createdAt: new Date().toISOString(),
    },
  ]);

  const [form, setForm] = useState({ question: '', answer: '' });
  const [editId, setEditId] = useState(null);
  const [filter, setFilter] = useState('semua');
  const [openId, setOpenId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.question) return;

    if (editId) {
      setFaqList((prev) =>
        prev.map((f) =>
          f.id === editId ? { ...f, question: form.question, answer: form.answer } : f
        )
      );
      setEditId(null);
    } else {
      const newFaq = {
        id: faqList.length ? Math.max(...faqList.map((f) => f.id)) + 1 : 1,
        question: form.question,
        answer: form.answer,
        createdAt: new Date().toISOString(),
      };
      setFaqList([...faqList, newFaq]);
    }

    setForm({ question: '', answer: '' });
  };

  const handleEdit = (faq) => {
    setForm({ question: faq.question, answer: faq.answer });
    setEditId(faq.id);
  };

  const handleDelete = (id) => {
    setFaqList(faqList.filter((f) => f.id !== id));
    if (editId === id) {
      setForm({ question: '', answer: '' });
      setEditId(null);
    }
  };

  const filteredFaq = faqList.filter((faq) => {
    const matchFilter =
      filter === 'semua' ||
      (filter === 'belum' && faq.answer.trim() === '') ||
      (filter === 'sudah' && faq.answer.trim() !== '');
    const matchSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase());
    return matchFilter && matchSearch;
  });

  const pieData = [
    { name: 'Sudah Dijawab', value: faqList.filter(f => f.answer.trim() !== '').length },
    { name: 'Belum Dijawab', value: faqList.filter(f => f.answer.trim() === '').length },
  ];

  const COLORS = ['#10b981', '#f59e0b'];

  return (
    <div style={{ padding: '2rem', maxWidth: '1000px', margin: 'auto' }}>
      <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '1.5rem' }}>Manajemen FAQ</h2>

      {/* Filter & Search */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', gap: '10px' }}>
        <label style={{ fontWeight: '500' }}>Filter:</label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{ padding: '8px', borderRadius: '6px', border: '1px solid #d1d5db', minWidth: '200px' }}
        >
          <option value="semua">Semua</option>
          <option value="belum">Belum Dijawab</option>
          <option value="sudah">Sudah Dijawab</option>
        </select>
        <input
          type="text"
          placeholder="Cari pertanyaan..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '8px', borderRadius: '6px', border: '1px solid #d1d5db', flex: 1 }}
        />
      </div>

      {/* Form */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '12px', marginBottom: '2rem' }}>
        <input
          name="question"
          placeholder="Pertanyaan"
          value={form.question}
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          name="answer"
          placeholder="Jawaban"
          value={form.answer}
          onChange={handleChange}
          style={inputStyle}
        />
        <button onClick={handleSubmit} style={buttonStyle}>
          {editId ? 'Update' : 'Tambah'}
        </button>
      </div>

      {/* List */}
      {filteredFaq.map((faq) => (
        <div
          key={faq.id}
          style={{
            background: '#f9fafb',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            marginBottom: '1.5rem',
            padding: '1rem 1.5rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
          }}
        >
          <div
            onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
            style={{ cursor: 'pointer', fontWeight: '600', fontSize: '16px', marginBottom: '4px', color: '#111827' }}
          >
            {faq.question}
          </div>

          {openId === faq.id && (
            <div>
              <p style={{ marginTop: '8px', lineHeight: '1.5' }}>
                <strong>Jawaban:</strong> {faq.answer || <i>(Belum dijawab)</i>}
              </p>
              <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>
                Masuk pada: {new Date(faq.createdAt).toLocaleString('id-ID')}
              </p>
              <div style={{ marginTop: '12px' }}>
                <button onClick={() => handleEdit(faq)} style={smallButton}>Edit</button>
                <button onClick={() => handleDelete(faq.id)} style={{ ...smallButton, color: 'red' }}>
                  Hapus
                </button>
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Pie Chart di bawah */}
      <div style={{ height: 250, marginTop: '3rem' }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const inputStyle = {
  padding: '10px',
  border: '1px solid #d1d5db',
  borderRadius: '6px',
  width: '100%',
  fontSize: '14px'
};

const buttonStyle = {
  padding: '10px 20px',
  backgroundColor: '#2563eb',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  fontWeight: 'bold',
  cursor: 'pointer'
};

const smallButton = {
  background: 'none',
  border: 'none',
  color: '#2563eb',
  cursor: 'pointer',
  marginRight: '12px',
  fontSize: '14px'
};

export default FAQ;
