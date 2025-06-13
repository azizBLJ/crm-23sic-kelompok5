import { useState } from "react";
import { useNavigate } from "react-router-dom";

const demoBookings = [
  {
    id: 1,
    nama: "Andi Saputra",
    email: "andi.saputra@example.com",
    checkin: "2024-07-10",
    checkout: "2024-07-15",
    tipeKamar: "Deluxe",
    jumlahTamu: 2,
  },
  {
    id: 2,
    nama: "Sari Melati",
    email: "sari.melati@example.com",
    checkin: "2024-07-20",
    checkout: "2024-07-23",
    tipeKamar: "Suite",
    jumlahTamu: 3,
  },
  {
    id: 3,
    nama: "Budi Santoso",
    email: "budi.santoso@example.com",
    checkin: "2024-08-01",
    checkout: "2024-08-05",
    tipeKamar: "Standar",
    jumlahTamu: 1,
  },
];

const AdminBookingPage = () => {
  const [bookings] = useState(demoBookings);
  const navigate = useNavigate();

  const handleViewDetails = (booking) => {
    navigate(`/booking-detail/${booking.id}`, { state: booking });
  };

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap');

          .animated-bg {
            background: linear-gradient(270deg, #ffe382, #ffc47e, #ffad84, #ffe382);
            background-size: 800% 800%;
            animation: gradientShift 15s ease infinite;
          }

          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>

      <div className="min-h-screen animated-bg p-10 font-inter">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-extrabold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-[#ffad84] via-[#ffc47e] to-[#ffe382]">
            Daftar Pemesanan Kamar
          </h1>

          {bookings.length === 0 ? (
            <p className="text-center text-gray-700 text-lg">Tidak ada pemesanan saat ini.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="bg-white/90 backdrop-blur-lg border border-orange-200 rounded-3xl p-6 shadow-xl hover:shadow-2xl transform hover:scale-105 transition duration-300"
                >
                  <h2 className="text-2xl font-semibold text-gray-800">{booking.nama}</h2>
                  <p className="text-gray-600 text-sm mb-1">📧 {booking.email}</p>
                  <p className="text-gray-600 text-sm">🛬 Check-in: {booking.checkin}</p>
                  <p className="text-gray-600 text-sm">🛫 Check-out: {booking.checkout}</p>
                  <p className="text-gray-600 text-sm">🛏️ Tipe Kamar: {booking.tipeKamar}</p>
                  <p className="text-gray-600 text-sm">👥 Jumlah Tamu: {booking.jumlahTamu}</p>
                  <button
                    onClick={() => handleViewDetails(booking)}
                    className="mt-4 w-full py-2 bg-gradient-to-r from-[#ffad84] via-[#ffc47e] to-[#ffe382] text-white font-semibold rounded-xl hover:brightness-110 transition"
                  >
                    🔍 Lihat Detail
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminBookingPage;
