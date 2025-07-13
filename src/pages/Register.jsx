import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../Supabase'; // pastikan path ini benar

export default function Register() {
  const [form, setForm] = useState({
    nama: '',
    email: '',
    password: '',
    confirm: '',
    foto: null,
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'foto') {
      setForm((prev) => ({ ...prev, foto: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirm) {
      setError('Password dan konfirmasi tidak cocok!');
      return;
    }

    // Cek apakah email sudah terdaftar
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('email', form.email)
      .single();

    if (existingUser) {
      setError('Email sudah digunakan.');
      return;
    }

    let fotoUrl = null;

    if (form.foto) {
      const fileName = `fotoakun/${Date.now()}-${form.foto.name}`;
      const { error: uploadError } = await supabase.storage
        .from('fotoakun')
        .upload(fileName, form.foto);

      if (uploadError) {
        setError('Gagal mengunggah foto.');
        console.error(uploadError);
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from('fotoakun')
        .getPublicUrl(fileName);

      fotoUrl = publicUrlData.publicUrl;
    }

    const { error: insertError } = await supabase.from('users').insert({
      nama: form.nama,
      email: form.email,
      password: form.password,
      foto: fotoUrl,
      status: 'user',
    });

    if (insertError) {
      setError('Gagal registrasi akun.');
      console.error(insertError);
    } else {
      alert('Registrasi berhasil! Silakan login.');
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FFE382] via-[#FFC47E] to-[#FFAD84]">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-br from-[#FFE382] via-[#FFC47E] to-[#FFAD84] p-3 rounded-md shadow-md inline-block">
              <img
                src="../template/img/logommh.png"
                alt="Mutiara Merdeka Hotel"
                className="w-24 h-auto"
              />
            </div>
          </div>
          <h1 className="text-3xl font-extrabold text-gray-800">
            Welcome to <span className="text-orange-500">Mutiara Merdeka Hotel</span>
          </h1>
          <p className="text-gray-500 text-sm mt-2">Silakan registrasi untuk melanjutkan</p>
        </div>

        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-1">Nama Lengkap</label>
            <input
              type="text"
              name="nama"
              required
              value={form.nama}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Masukkan nama lengkap"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-1">Email</label>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Masukkan email"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-1">Password</label>
            <input
              type="password"
              name="password"
              required
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Masukkan password"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-1">Konfirmasi Password</label>
            <input
              type="password"
              name="confirm"
              required
              value={form.confirm}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Ulangi password"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm mb-1">Foto Profil</label>
            <input
              type="file"
              name="foto"
              accept="image/*"
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md bg-white"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-orange-600 transition"
          >
            Daftar Sekarang
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Sudah punya akun?{' '}
          <span
            className="text-orange-600 cursor-pointer hover:underline"
            onClick={() => navigate('/login')}
          >
            Login di sini
          </span>
        </p>
      </div>
    </div>
  );
}
