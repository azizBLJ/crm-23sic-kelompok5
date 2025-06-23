import { Link } from "react-router-dom";
import DELUX from "../../../assets/DELUX.jpg"; 

const availableRooms = [
  {
    id: 1,
    tipe: "Deluxe",
    harga: 750000,
    fasilitas: ["AC", "Wi-Fi", "TV", "Kamar Mandi Dalam"],
    deskripsi: "Kamar luas dengan fasilitas premium dan pemandangan kota.",
    status: "Tersedia",
    image: <DELUX />, // gambar lokal
  },
  {
    id: 2,
    tipe: "Suite",
    harga: 1200000,
    fasilitas: ["AC", "Wi-Fi", "Bathtub", "Mini Bar", "Breakfast"],
    deskripsi: "Suite mewah cocok untuk keluarga dan pasangan bulan madu.",
    status: "Tersedia",
    image: "https://i.pinimg.com/736x/a3/6d/f6/a36df64ce1f8da6e4749efe8f7e4ffc3.jpg"
  },
  {
    id: 3,
    tipe: "Standar",
    harga: 500000,
    fasilitas: ["Kipas Angin", "Wi-Fi", "TV"],
    deskripsi: "Kamar ekonomis dengan fasilitas dasar dan nyaman.",
    status: "Tersedia",
    image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&h=250&fit=crop"
  },
];

const AvailableRoomsAdmin = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-orange-600 mb-4">
            Daftar Kamar Tersedia
          </h1>
          <p className="text-gray-600 text-lg">
            Pilih kamar yang sesuai dengan kebutuhan Anda
          </p>
        </div>

        {/* Statistik */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-orange-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Kamar</p>
                <p className="text-2xl font-bold text-gray-800">{availableRooms.length}</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-full">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-green-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Kamar Tersedia</p>
                <p className="text-2xl font-bold text-green-600">
                  {availableRooms.filter(room => room.status === "Tersedia").length}
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Harga Mulai</p>
                <p className="text-2xl font-bold text-blue-600">
                  Rp {Math.min(...availableRooms.map(r => r.harga)).toLocaleString("id-ID")}
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Kartu Kamar */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {availableRooms.map((room) => (
            <Link
              to={`/admin/AvailableRoomsAdmin/${room.id}`}
              key={room.id}
              className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={room.image}
                  alt={room.tipe}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-300"></div>
                <div className="absolute top-4 right-4">
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {room.status}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h2 className="text-2xl font-bold">{room.tipe}</h2>
                </div>
              </div>

              <div className="p-6">
                <p className="text-gray-600 mb-4 line-clamp-2">{room.deskripsi}</p>

                <div className="mb-4">
                  <p className="text-2xl font-bold text-orange-600">
                    Rp {room.harga.toLocaleString("id-ID")}
                    <span className="text-sm font-normal text-gray-500">/ malam</span>
                  </p>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Fasilitas:</p>
                  <div className="flex flex-wrap gap-2">
                    {room.fasilitas.slice(0, 3).map((item, i) => (
                      <span key={i} className="bg-orange-50 text-orange-700 px-2 py-1 rounded-lg text-xs">
                        {item}
                      </span>
                    ))}
                    {room.fasilitas.length > 3 && (
                      <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-lg text-xs">
                        +{room.fasilitas.length - 3} lainnya
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-orange-600 font-semibold group-hover:text-orange-700 transition-colors">
                    Lihat Detail
                  </span>
                  <svg className="w-5 h-5 text-orange-600 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Tombol Tambah */}
        <div className="text-center mt-12">
          <button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-xl font-semibold transition-colors duration-300 shadow-lg">
            + Tambah Kamar Baru
          </button>
        </div>
      </div>
    </div>
  );
};

export default AvailableRoomsAdmin;
