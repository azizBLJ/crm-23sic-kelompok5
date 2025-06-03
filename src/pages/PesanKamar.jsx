import { useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";

const BookingPage = () => {
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    checkin: "",
    checkout: "",
    tipeKamar: "",
    jumlahTamu: 1,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("Konfirmasi", { state: formData });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 p-6">
      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-2xl">
        <h2 className="text-3xl font-extrabold mb-8 text-center text-blue-700 tracking-wide">
          Pemesanan Kamar Hotel
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700">Nama Lengkap</label>
            <input
              type="text"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              required
              placeholder="Masukkan nama lengkap Anda"
              className="w-full mt-1 border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
              className="w-full mt-1 border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700">Check-in</label>
              <input
                type="date"
                name="checkin"
                value={formData.checkin}
                onChange={handleChange}
                required
                className="w-full mt-1 border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">Check-out</label>
              <input
                type="date"
                name="checkout"
                value={formData.checkout}
                onChange={handleChange}
                required
                className="w-full mt-1 border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">Tipe Kamar</label>
            <select
              name="tipeKamar"
              value={formData.tipeKamar}
              onChange={handleChange}
              required
              className="w-full mt-1 border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-400"
            >
              <option value="">-- Pilih Tipe Kamar --</option>
              <option value="Standar">Standar</option>
              <option value="Deluxe">Deluxe</option>
              <option value="Suite">Suite</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">Jumlah Tamu</label>
            <input
              type="number"
              name="jumlahTamu"
              value={formData.jumlahTamu}
              onChange={handleChange}
              min="1"
              required
              className="w-full mt-1 border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition duration-300 shadow-md hover:shadow-lg"
          >
            🛏️ Pesan Sekarang
          </button>
        </form>

        {/* Nested Route */}
        <Outlet />
      </div>
    </div>
  );
};

export default BookingPage;