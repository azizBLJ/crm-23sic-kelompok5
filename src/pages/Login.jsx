// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { users } from "../data/users";
import { useEffect } from 'react';

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const found = users.find(
      (u) => u.username === username && u.password === password
    );

    if (found) {
      localStorage.setItem("user", JSON.stringify(found));
      navigate(found.role === "admin" ? "/admin" : "/user");
    } else {
      alert("Username atau Password salah!");
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.role === "admin") navigate("/admin");
    else if (user?.role === "user") navigate("/user");
  }, []);

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
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
          <button type="submit" className="w-full bg-orange-600 text-white py-2 rounded hover:bg-blue-700">
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
};