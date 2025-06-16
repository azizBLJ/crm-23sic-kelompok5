import { useParams, Link, useNavigate } from "react-router-dom";
import { useState } from "react";

// Data rooms (dalam aplikasi nyata, ini bisa dari API atau context)
const availableRooms = [
  {
    id: 1,
    tipe: "Deluxe",
    harga: 750000,
    fasilitas: ["AC", "Wi-Fi", "TV", "Kamar Mandi Dalam", "Lemari Es", "Telepon"],
    deskripsi: "Kamar luas dengan fasilitas premium dan pemandangan kota yang menawan. Cocok untuk tamu bisnis maupun wisatawan yang menginginkan kenyamanan ekstra.",
    status: "Tersedia",
    ukuran: "35 m²",
    kapasitas: "2 orang",
    tipeKasur: "King Size",
    lantai: "3-7",
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&h=400&fit=crop"
    ]
  },
  {
    id: 2,
    tipe: "Suite",
    harga: 1200000,
    fasilitas: ["AC", "Wi-Fi", "Bathtub", "Mini Bar", "Breakfast", "Balkon", "Sofa", "Meja Kerja"],
    deskripsi: "Suite mewah cocok untuk keluarga dan pasangan bulan madu. Dilengkapi dengan ruang tamu terpisah dan fasilitas premium untuk pengalaman menginap yang tak terlupakan.",
    status: "Tersedia",
    ukuran: "55 m²",
    kapasitas: "4 orang",
    tipeKasur: "King Size + Sofa Bed",
    lantai: "8-12",
    images: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop"
    ]
  },
  {
    id: 3,
    tipe: "Standar",
    harga: 500000,
    fasilitas: ["Kipas Angin", "Wi-Fi", "TV", "Kamar Mandi Dalam"],
    deskripsi: "Kamar ekonomis dengan fasilitas dasar dan nyaman. Pilihan terbaik untuk traveler yang mengutamakan efisiensi budget tanpa mengorbankan kenyamanan.",
    status: "Tersedia",
    ukuran: "25 m²",
    kapasitas: "2 orang",
    tipeKasur: "Queen Size",
    lantai: "1-2",
    images: [
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop"
    ]
  },
];

const RoomDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');

  const room = availableRooms.find((r) => r.id === parseInt(id));

  if (!room) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl p-8 shadow-2xl text-center max-w-md w-full">
          <div className="mb-6">
            <div className="bg-red-100 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
              <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Kamar Tidak Ditemukan</h2>
            <p className="text-gray-600">Kamar dengan ID {id} tidak tersedia atau telah dihapus.</p>
          </div>
          <button
            onClick={() => navigate('/AvailableRoomsAdmin')}
            className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors duration-300 w-full"
          >
            Kembali ke Daftar Kamar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
      {/* Header dengan Breadcrumb */}
      <div className="bg-white shadow-sm border-b border-orange-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <nav className="flex items-center space-x-2 text-sm">
              <Link to="/AvailableRoomsAdmin" className="text-orange-600 hover:text-orange-700">
                Daftar Kamar
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-600">{room.tipe}</span>
            </nav>
            <button
              onClick={() => navigate('/AvailableRoomsAdmin')}
              className="flex items-center space-x-2 text-orange-600 hover:text-orange-700 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span>Kembali</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Image Gallery */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
              <div className="relative h-96 bg-gradient-to-r from-orange-400 to-orange-600">
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h1 className="text-4xl font-bold mb-2">{room.tipe}</h1>
                  <div className="flex items-center space-x-4">
                    <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">
                      {room.ukuran}
                    </span>
                    <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">
                      {room.kapasitas}
                    </span>
                  </div>
                </div>
                <div className="absolute top-6 right-6">
                  <span className="bg-green-500 text-white px-4 py-2 rounded-full font-semibold">
                    {room.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Room Details */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mt-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Detail Kamar</h2>
              <p className="text-gray-700 leading-relaxed mb-6">{room.deskripsi}</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-orange-50 rounded-xl">
                  <div className="text-orange-600 font-semibold text-lg">{room.ukuran}</div>
                  <div className="text-gray-600 text-sm">Luas Kamar</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-xl">
                  <div className="text-orange-600 font-semibold text-lg">{room.kapasitas}</div>
                  <div className="text-gray-600 text-sm">Kapasitas</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-xl">
                  <div className="text-orange-600 font-semibold text-lg">{room.tipeKasur}</div>
                  <div className="text-gray-600 text-sm">Tipe Kasur</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-xl">
                  <div className="text-orange-600 font-semibold text-lg">{room.lantai}</div>
                  <div className="text-gray-600 text-sm">Lantai</div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Fasilitas Kamar</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {room.fasilitas.map((item, i) => (
                    <div key={i} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
              <div className="mb-6">
                <div className="text-3xl font-bold text-orange-600 mb-2">
                  Rp {room.harga.toLocaleString("id-ID")}
                </div>
                <div className="text-gray-600">per malam</div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Check-in
                  </label>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Check-out
                  </label>
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors duration-300">
                  Pesan Sekarang
                </button>
                <button className="w-full border-2 border-orange-600 text-orange-600 hover:bg-orange-50 py-3 px-4 rounded-lg font-semibold transition-colors duration-300">
                  Tambah ke Favorit
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="text-center text-sm text-gray-600">
                  <p>💰 Pembatalan gratis dalam 24 jam</p>
                  <p>📞 Dukungan 24/7</p>
                  <p>✅ Konfirmasi instan</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetail;