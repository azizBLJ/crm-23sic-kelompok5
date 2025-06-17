import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      navigate('/DashboardAdmin');
    } else if (username === 'user' && password === 'user') {
      navigate('/user');
    } else {
      navigate('/401');
    }
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

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Masukkan username"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Masukkan password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-orange-600 transition"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Belum punya akun? <span className="text-orange-600 cursor-pointer hover:underline" onClick={() => navigate('/Register') }>Daftar sekarang</span>
        </p>
      </div>
    </div>
  );
}
