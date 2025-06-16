import { useParams, useLocation } from "react-router-dom";

const BookingDetailPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const booking = location.state;

  if (!booking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 via-orange-200 to-orange-300 p-6 text-red-600 text-xl font-semibold">
        Data pemesanan tidak ditemukan. Harap kembali ke halaman sebelumnya.
      </div>
    );
  }

  return (
    <div className="min-h-screen animated-bg flex flex-col items-center justify-center p-6 font-inter">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap');

          .animated-bg {
            background: linear-gradient(-45deg, #ffad84, #ffc47e, #ffe382, #ffad84);
            background-size: 400% 400%;
            animation: gradientFlow 12s ease infinite;
          }

          @keyframes gradientFlow {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>

      <div className="bg-white/90 backdrop-blur-xl border border-orange-200 shadow-2xl rounded-3xl p-10 w-full max-w-3xl text-gray-800">
        <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-[#ffad84] via-[#ffc47e] to-[#ffe382] mb-8">
          Detail Pemesanan
        </h1>

        <ul className="space-y-4 text-lg font-medium">
          <li className="flex justify-between border-b border-orange-100 pb-2">
            <span className="text-gray-600">ID</span> <span>{id}</span>
          </li>
          <li className="flex justify-between border-b border-orange-100 pb-2">
            <span className="text-gray-600">Nama</span> <span>{booking.nama}</span>
          </li>
          <li className="flex justify-between border-b border-orange-100 pb-2">
            <span className="text-gray-600">Email</span> <span>{booking.email}</span>
          </li>
          <li className="flex justify-between border-b border-orange-100 pb-2">
            <span className="text-gray-600">Check-in</span> <span>{booking.checkin}</span>
          </li>
          <li className="flex justify-between border-b border-orange-100 pb-2">
            <span className="text-gray-600">Check-out</span> <span>{booking.checkout}</span>
          </li>
          <li className="flex justify-between border-b border-orange-100 pb-2">
            <span className="text-gray-600">Tipe Kamar</span> <span>{booking.tipeKamar}</span>
          </li>
          <li className="flex justify-between">
            <span className="text-gray-600">Jumlah Tamu</span> <span>{booking.jumlahTamu}</span>
          </li>
        </ul>

        <div className="mt-8">
          <button
            onClick={() => window.history.back()}
            className="w-full py-3 bg-gradient-to-r from-[#ffad84] via-[#ffc47e] to-[#ffe382] text-white font-semibold rounded-xl hover:brightness-110 transition duration-300"
          >
            ⬅️ Kembali ke Daftar Pemesanan
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailPage;
