import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail]     = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm]   = useState('');
  const [error, setError]       = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirm) {
      setError('Password tidak cocok!');
      return;
    }

    // Simulasi penyimpanan user (boleh disambung ke localStorage atau API)
    console.log('User registered:', { username, email, password });

    setError('');
    alert('Registrasi berhasil! Silakan login.');
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FFE382] via-[#FFC47E] to-[#FFAD84]">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
         {/* Logo & Header */}
        <div className="text-center mb-8 ">
          <h1 className="text-3xl font-extrabold text-gray-800">
          <div className="flex justify-center mb-4">
  <div className="bg-gradient-to-br from-[#FFE382] via-[#FFC47E] to-[#FFAD84] p-3 rounded-md shadow-md inline-block">
    <img
      src="../template/img/logommh.png"
      alt="Mutiara Merdeka Hotel"
      className="w-24 h-auto"
    />
  </div>
</div>
            Welcome to <span className="text-orange-500">Mutiara Merdeka Hotel</span>
          </h1>
          <p className="text-gray-500 text-sm mt-2">Silakan login untuk melanjutkan</p>
        </div>

        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-1">Username</label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Masukkan username"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Masukkan email"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Masukkan password"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm mb-1">Konfirmasi Password</label>
            <input
              type="password"
              required
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Ulangi password"
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
            onClick={() => navigate('/')}
          >
            Login di sini
          </span>
        </p>
      </div>
    </div>
  );
}
