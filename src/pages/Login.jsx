// src/pages/Login.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../Supabase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  // ✅ Redirect otomatis jika sudah login
  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem("user"));
  //   if (user) {
  //     navigate(user.status === "admin" ? "/admin" : "/");
  //   }
  // }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .eq("password", password)
      .single();

    if (error || !data) {
      setErrorMsg("Email atau password salah!");
      return;
    }

    // Simpan user ke localStorage
    localStorage.setItem("user", JSON.stringify(data));

    // Redirect sesuai status (user/admin)
    if (data.status === "admin") {
      navigate("/admin");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FFE382] via-[#FFC47E] to-[#FFAD84]">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
        {/* Logo */}
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
          <p className="text-gray-500 text-sm mt-2">Silakan login untuk melanjutkan</p>
        </div>

        {errorMsg && (
          <p className="text-red-500 text-sm mb-4 text-center">{errorMsg}</p>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          <button type="submit" className="w-full bg-orange-600 text-white py-2 rounded hover:bg-orange-700">
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Belum punya akun?{" "}
          <span
            className="text-orange-600 cursor-pointer hover:underline"
            onClick={() => navigate("/Register")}
          >
            Daftar sekarang
          </span>
        </p>
      </div>
    </div>
  );
}
