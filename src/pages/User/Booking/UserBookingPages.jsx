import React, { useState, useEffect } from 'react';
import { supabase } from '../../../Supabase';

const UserBookingPage = () => {
  // States tetap sama (tidak diubah)
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [jumlahTamu, setJumlahTamu] = useState(1);
  const [userId, setUserId] = useState(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [messageBox, setMessageBox] = useState({ show: false, message: '', type: '' });

  const showMessageBox = (message, type = 'info') => {
    setMessageBox({ show: true, message, type });
  };
  const hideMessageBox = () => {
    setMessageBox({ show: false, message: '', type: '' });
  };

  useEffect(() => {
    const getSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error("Error getting session:", error);
          showMessageBox("Gagal mendapatkan sesi pengguna.", "error");
        } else if (session) {
          setUserId(session.user.id);
        } else {
          setUserId(null);
        }
      } catch (error) {
        console.error("Unexpected error during session check:", error);
        showMessageBox("Terjadi kesalahan saat memeriksa sesi.", "error");
      } finally {
        setIsAuthReady(true);
      }
    };

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserId(session ? session.user.id : null);
      setIsAuthReady(true);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const fetchRooms = async () => {
      if (!isAuthReady) return;
      const { data, error } = await supabase
        .from('kamar')
        .select('*')
        .eq('status_kamar', 'tersedia')
        .in('tipe_kamar', ['Deluxe', 'Suite', 'Standard']);
      if (error) {
        console.error('Error fetching rooms:', error);
        showMessageBox('Gagal mengambil data kamar', 'error');
      } else {
        setRooms(data);
      }
    };
    fetchRooms();
  }, [isAuthReady]);

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diff = end - start;
    return diff > 0 ? diff / (1000 * 60 * 60 * 24) : 0;
  };

  const calculateTotal = () => {
    if (!selectedRoom) return 0;
    const nights = calculateNights();
    const subtotal = selectedRoom.harga_kamar * nights;
    const tax = subtotal * 0.1;
    return subtotal + tax;
  };

  const handleBooking = async () => {
    if (currentStep === 1) {
      if (!selectedRoom || !checkIn || !checkOut) {
        showMessageBox('Pilih kamar dan tanggal terlebih dahulu', 'warning');
        return;
      }
      if (new Date(checkIn) >= new Date(checkOut)) {
        showMessageBox('Tanggal Check-out harus setelah tanggal Check-in.', 'warning');
        return;
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setCurrentStep(3);
    } else {
      setLoading(true);
      try {
        const { error } = await supabase.from('booking').insert([{
          user_id: userId,
          kamar_id: selectedRoom.id,
          tipe_kamar: selectedRoom.tipe_kamar,
          status: 'proses',
          time_checkin: new Date(checkIn).toISOString(),
          time_checkout: new Date(checkOut).toISOString(),
          tanggal_booking: new Date().toISOString().split('T')[0],
          total_hari: calculateNights(),
          total_harga: calculateTotal(),
          jumlah_tamu: jumlahTamu
        }]);
        if (error) {
          console.error('Error booking:', error);
          showMessageBox('Gagal booking: ' + error.message, 'error');
        } else {
          showMessageBox('Booking berhasil! Silakan lanjutkan pembayaran.', 'success');
          resetBooking();
        }
      } catch (error) {
        console.error("Unexpected error during booking:", error);
        showMessageBox("Terjadi kesalahan saat melakukan booking.", "error");
      } finally {
        setLoading(false);
      }
    }
  };

  const resetBooking = () => {
    setCurrentStep(1);
    setSelectedRoom(null);
    setCheckIn('');
    setCheckOut('');
    setJumlahTamu(1);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {/* Changed max-w-md to max-w-4xl for a wider layout on larger screens.
          You can adjust this class (e.g., max-w-2xl, max-w-5xl, or even w-full for no max-width)
          based on your design preference. Using `mx-auto` still keeps it centered. */}
      <div className="max-w-4xl w-full mx-auto p-6 bg-white rounded-3xl shadow-xl mt-8 font-sans transition-all duration-300 transform hover:scale-105">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-blue-900 drop-shadow-sm">Reservasi Kamar</h1>

        {/* Progress Stepper */}
        <div className="flex justify-between items-center mb-8">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white transition-all duration-300
                ${currentStep >= step ? 'bg-blue-600 shadow-md' : 'bg-gray-300'}`}>
                {step}
              </div>
              <span className={`text-sm mt-2 ${currentStep >= step ? 'text-blue-700 font-semibold' : 'text-gray-500'}`}>
                {step === 1 ? 'Pilih' : step === 2 ? 'Detail' : 'Konfirmasi'}
              </span>
            </div>
          ))}
        </div>
        {/* End Progress Stepper */}

        {currentStep === 1 && (
          <div className="space-y-6">
            <h2 className="font-bold text-2xl text-blue-800 border-b pb-3 mb-4">Pilih Kamar & Tanggal</h2>
            {/* Adjusted grid for room selection to be potentially two columns on larger screens */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {rooms.length > 0 ? rooms.map((room) => (
                <button
                  key={room.id}
                  onClick={() => setSelectedRoom(room)}
                  className={`relative block w-full text-left p-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1
                    ${selectedRoom?.id === room.id ? 'bg-blue-600 text-white border-blue-700 ring-2 ring-blue-500' : 'bg-white border border-gray-200 hover:bg-blue-50'}`}
                >
                  <p className="font-extrabold text-xl">{room.tipe_kamar}</p>
                  <p className={`text-base mt-1 ${selectedRoom?.id === room.id ? 'text-blue-100' : 'text-gray-700'}`}>
                    Harga: Rp {room.harga_kamar.toLocaleString('id-ID')}/malam
                  </p>
                  {selectedRoom?.id === room.id && (
                    <span className="absolute top-3 right-3 bg-white text-blue-600 text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-pulse">Terpilih</span>
                  )}
                </button>
              )) : (
                <p className="text-center text-gray-500 py-8">Memuat kamar atau tidak ada kamar tersedia.</p>
              )}
            </div>
            {/* Adjusted grid for date and guest inputs to be two columns on larger screens */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
              <div>
                <label htmlFor="check-in" className="block text-sm font-medium text-gray-700 mb-1">Tanggal Check-in</label>
                <input
                  type="date"
                  id="check-in"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-200 shadow-sm"
                />
              </div>
              <div>
                <label htmlFor="check-out" className="block text-sm font-medium text-gray-700 mb-1">Tanggal Check-out</label>
                <input
                  type="date"
                  id="check-out"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-200 shadow-sm"
                />
              </div>
              <div className="md:col-span-2"> {/* Make Jumlah Tamu span both columns on larger screens */}
                <label htmlFor="jumlah-tamu" className="block text-sm font-medium text-gray-700 mb-1">Jumlah Tamu</label>
                <input
                  type="number"
                  id="jumlah-tamu"
                  min="1"
                  value={jumlahTamu}
                  onChange={(e) => setJumlahTamu(parseInt(e.target.value) || 1)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-200 shadow-sm"
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-6 text-center">
            <h2 className="font-bold text-2xl text-blue-800 border-b pb-3 mb-4">Detail Tamu</h2>
            <p className="text-gray-700 text-lg">
              Saatnya untuk menambahkan detail tamu! Ini adalah langkah opsional yang bisa Anda kembangkan untuk mengumpulkan informasi seperti nama lengkap, kontak, atau preferensi khusus lainnya.
            </p>
            <p className="text-blue-500 font-semibold italic">
              (Untuk saat ini, Anda bisa langsung melanjutkan ke konfirmasi.)
            </p>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-6 text-center">
            <h2 className="font-bold text-2xl text-blue-800 border-b pb-3 mb-4">Konfirmasi & Pembayaran</h2>
            {selectedRoom && (
              <div className="bg-blue-50 p-6 rounded-lg shadow-lg border border-blue-200 transform hover:scale-105 transition-transform duration-300">
                <p className="text-left text-gray-800 mb-2"><strong className="text-blue-700">Kamar Dipilih:</strong> <span className="font-semibold">{selectedRoom.tipe_kamar}</span></p>
                <p className="text-left text-gray-800 mb-2"><strong className="text-blue-700">Periode Menginap:</strong> {checkIn} - {checkOut}</p>
                <p className="text-left text-gray-800 mb-2"><strong className="text-blue-700">Durasi:</strong> {calculateNights()} malam</p>
                <p className="text-left text-gray-800 mb-4"><strong className="text-blue-700">Jumlah Tamu:</strong> {jumlahTamu}</p>
                <hr className="border-blue-300 mb-4" />
                <p className="font-extrabold text-2xl text-blue-800 mt-2">Total Harga: Rp {calculateTotal().toLocaleString('id-ID')}</p>
                <p className="text-sm text-gray-600 mt-1">* Termasuk pajak 10%</p>
              </div>
            )}
            <p className="text-gray-700 text-lg">
              Booking Anda siap dikonfirmasi! Tekan tombol di bawah untuk menyelesaikan pemesanan dan melanjutkan ke proses pembayaran.
            </p>
          </div>
        )}

        <div className="mt-8 flex justify-between space-x-4">
          {currentStep > 1 && (
            <button
              onClick={() => setCurrentStep(currentStep - 1)}
              className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-full hover:bg-gray-300 transition-all duration-300 font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Kembali
            </button>
          )}
          <button
            onClick={handleBooking}
            disabled={loading}
            className={`flex-1 px-6 py-3 rounded-full text-white font-bold shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5
              ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-700 hover:bg-blue-800'}`}
          >
            {loading ? 'Memproses...' : currentStep === 1 ? 'Lanjut' : currentStep === 2 ? 'Lanjut Pembayaran' : 'Konfirmasi Booking'}
          </button>
        </div>
        <button
          onClick={resetBooking}
          className="w-full mt-5 bg-red-100 text-red-600 px-6 py-3 rounded-full hover:bg-red-200 transition-all duration-300 font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          Reset Booking
        </button>

        {messageBox.show && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
            <div className={`p-8 rounded-2xl shadow-2xl text-center max-w-sm w-full transform scale-105 animate-pop-in
              ${messageBox.type === 'error' ? 'bg-red-100 border-red-500 text-red-800' :
                messageBox.type === 'success' ? 'bg-green-100 border-green-500 text-green-800' :
                  'bg-blue-100 border-blue-500 text-blue-800'} border-2`}>
              <p className="text-xl font-bold mb-5">{messageBox.message}</p>
              <button
                onClick={hideMessageBox}
                className={`px-8 py-3 rounded-full text-white font-bold shadow-lg
                  ${messageBox.type === 'error' ? 'bg-red-600 hover:bg-red-700' :
                    messageBox.type === 'success' ? 'bg-green-600 hover:bg-green-700' :
                      'bg-blue-600 hover:bg-blue-700'} transition-all duration-300 transform hover:scale-105`}
              >
                OK
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserBookingPage;