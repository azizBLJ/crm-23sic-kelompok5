import React, { useState, useEffect } from 'react';
import { supabase } from '../../../Supabase'; // Adjust path if necessary

const UserRoomsPage = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRooms = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch only 'available' rooms for users
        const { data, error } = await supabase
          .from('kamar')
          .select('*')
          .eq('status_kamar', 'tersedia') // Crucial: Only show available rooms
          .order('tipe_kamar', { ascending: true }); // Order by room type for better organization

        if (error) {
          console.error('Error fetching rooms:', error);
          setError('Gagal mengambil data kamar. Silakan coba lagi.');
        } else {
          setRooms(data);
        }
      } catch (err) {
        console.error('Unexpected error:', err);
        setError('Terjadi kesalahan saat memuat kamar. Mohon coba beberapa saat lagi.');
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  // Helper function to format currency for better readability
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-7xl mx-auto py-12">
        <h1 className="text-5xl font-extrabold text-blue-900 mb-10 text-center drop-shadow-md">
          Temukan Kamar Ideal Anda
        </h1>
        <p className="text-xl text-gray-700 text-center mb-12 max-w-3xl mx-auto">
          Jelajahi pilihan kamar kami yang nyaman dan sesuaikan dengan kebutuhan menginap Anda.
          Kami menjamin kenyamanan dan fasilitas terbaik untuk pengalaman tak terlupakan.
        </p>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-600 mb-4">Sedang mencari kamar terbaik untuk Anda...</p>
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mx-auto"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-100 border border-red-500 text-red-700 px-6 py-4 rounded-lg relative text-center shadow-lg">
            <strong className="font-bold">Oops!</strong>
            <span className="block sm:inline ml-2">{error}</span>
            <p className="text-sm mt-2">Mohon pastikan koneksi internet Anda stabil.</p>
          </div>
        )}

        {/* No Rooms Available State */}
        {!loading && rooms.length === 0 && !error && (
          <div className="text-center py-20 bg-white rounded-xl shadow-lg p-8 border border-gray-200">
            <h2 className="text-3xl text-gray-800 font-bold mb-4">Tidak Ada Kamar Tersedia Saat Ini 😔</h2>
            <p className="text-lg text-gray-600">
              Maaf, semua kamar sedang terisi atau dalam perawatan.
              Silakan periksa kembali nanti atau hubungi layanan pelanggan kami untuk bantuan.
            </p>
            <button
              onClick={() => alert('Fitur Hubungi Kami akan datang!')}
              className="mt-8 bg-blue-600 text-white px-8 py-3 rounded-full font-semibold text-lg shadow-lg hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105"
            >
              Hubungi Kami
            </button>
          </div>
        )}

        {/* Room Listing Grid */}
        {!loading && rooms.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {rooms.map((room) => (
              <div
                key={room.id}
                className="bg-white rounded-3xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl border border-gray-200 group relative"
              >
                {/* Room Image */}
                <div className="h-56 overflow-hidden">
                  <img
                    src={room.image || 'https://via.placeholder.com/600x400?text=Gambar+Kamar+Indah'} // Fallback image for missing ones
                    alt={room.tipe_kamar}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>

                {/* Room Details */}
                <div className="p-6">
                  <h2 className="font-extrabold text-3xl text-blue-800 mb-2 leading-tight">
                    {room.tipe_kamar}
                  </h2>
                  <p className="text-2xl font-bold text-green-600 mb-3">
                    {formatCurrency(room.harga_kamar)}<span className="text-lg text-gray-500 font-medium">/malam</span>
                  </p>
                  <p className="text-gray-700 text-base mb-4 line-clamp-3">
                    {room.deskripsi || 'Kamar nyaman dengan fasilitas lengkap untuk pengalaman menginap tak terlupakan.'}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                    <span className="text-md font-medium text-gray-500">
                      No. Kamar: <strong className="text-gray-800">{room.no_kamar || 'N/A'}</strong>
                    </span>
                    <a
                      href={`/booking?roomId=${room.id}&roomType=${room.tipe_kamar}`} // Example: link to booking page with room pre-selected
                      className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold text-lg shadow-lg hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105"
                    >
                      Pesan Sekarang
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserRoomsPage;