import React, { useState, useEffect } from 'react';
import { supabase } from '../../../Supabase';
import { useLocation } from 'react-router-dom'; // Import useLocation

const UserBookingPage = () => {
  // States tetap sama (tidak diubah)
  const [rooms, setRooms] = useState([]); // This state is still useful for room selection dropdown/grid
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [jumlahTamu, setJumlahTamu] = useState(1);
  const [userId, setUserId] = useState(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [messageBox, setMessageBox] = useState({ show: false, message: '', type: '' });

  const location = useLocation(); // Hook to access URL's query parameters

  const showMessageBox = (message, type = 'info') => {
    setMessageBox({ show: true, message, type });
  };
  const hideMessageBox = () => {
    setMessageBox({ show: false, message: '', type: '' });
  };

  useEffect(() => {
    const getSessionAndPreselectRoom = async () => {
      // --- Session Logic (Existing) ---
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

      // --- Room Pre-selection Logic (New) ---
      const params = new URLSearchParams(location.search);
      const preselectedRoomId = params.get('roomId');

      if (preselectedRoomId) {
        setLoading(true); // Indicate loading for room details
        try {
          const { data, error } = await supabase
            .from('kamar')
            .select('*')
            .eq('id', preselectedRoomId)
            .single(); // Use .single() to get one object

          if (error) {
            console.error('Error fetching preselected room:', error);
            showMessageBox('Gagal memuat detail kamar yang dipilih.', 'error');
            setSelectedRoom(null); // Clear selected room if fetch fails
          } else if (data) {
            setSelectedRoom(data);
          } else {
            showMessageBox('Kamar yang dipilih tidak ditemukan.', 'warning');
            setSelectedRoom(null);
          }
        } catch (err) {
          console.error('Unexpected error fetching preselected room:', err);
          showMessageBox('Terjadi kesalahan saat memuat detail kamar.', 'error');
          setSelectedRoom(null);
        } finally {
          setLoading(false); // End loading for room details
        }
      }
    };

    getSessionAndPreselectRoom();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserId(session ? session.user.id : null);
      setIsAuthReady(true);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [location.search]); // Depend on location.search so it re-runs if URL query params change

  // Existing fetchRooms useEffect remains if you want to show other rooms for selection
  useEffect(() => {
    const fetchAllRoomsForSelection = async () => {
      if (!isAuthReady) return; // Wait for auth status before fetching
      // Only fetch if selectedRoom is NOT already set by URL params
      if (selectedRoom === null) {
        const { data, error } = await supabase
          .from('kamar')
          .select('*')
          .eq('status_kamar', 'tersedia')
          .in('tipe_kamar', ['Deluxe', 'Suite', 'Standard']); // Assuming these are the only types bookable
        if (error) {
          console.error('Error fetching rooms for selection:', error);
          showMessageBox('Gagal mengambil data kamar untuk pilihan.', 'error');
        } else {
          setRooms(data);
        }
      }
    };
    fetchAllRoomsForSelection();
  }, [isAuthReady, selectedRoom]); // Added selectedRoom to dependency array

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
      <div className="max-w-4xl w-full mx-auto p-6 bg-white rounded-3xl shadow-xl mt-8 font-sans transition-all duration-300 transform hover:scale-105">
        <h1 className="text-4xl font-extrabold mb-8 text-center" style={{ color: '#FFAD84' }}>Reservasi Kamar</h1>

        {/* Progress Stepper */}
        <div className="flex justify-between items-center mb-8">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white transition-all duration-300 ${
                  currentStep >= step ? 'shadow-md' : 'bg-gray-300'
                }`}
                style={{ backgroundColor: currentStep >= step ? '#FFC47E' : '' }}
              >
                {step}
              </div>
              <span
                className={`text-sm mt-2 ${
                  currentStep >= step ? 'font-semibold' : 'text-gray-500'
                }`}
                style={{ color: currentStep >= step ? '#FFC47E' : '' }}
              >
                {step === 1 ? 'Pilih' : step === 2 ? 'Detail' : 'Konfirmasi'}
              </span>
            </div>
          ))}
        </div>
        {/* End Progress Stepper */}

        {currentStep === 1 && (
          <div className="space-y-6">
            <h2 className="font-bold text-2xl border-b pb-3 mb-4" style={{ color: '#FFAD84' }}>Pilih Kamar & Tanggal</h2>
            {/* Display selected room or allow selection */}
            {selectedRoom ? (
              <div className="p-4 rounded-xl shadow-md border" style={{ backgroundColor: '#FFE382', borderColor: '#FFAD84' }}>
                <p className="font-extrabold text-xl" style={{ color: '#FFAD84' }}>{selectedRoom.tipe_kamar}</p>
                <p className="text-base mt-1 text-gray-700">Harga: Rp {selectedRoom.harga_kamar.toLocaleString('id-ID')}/malam</p>
                <p className="text-sm text-gray-600 mt-1">Nomor Kamar: {selectedRoom.no_kamar}</p>
                <button
                  onClick={() => setSelectedRoom(null)} // Allow user to deselect
                  className="mt-2 text-sm text-red-600 hover:text-red-800 font-semibold"
                >
                  Ganti Kamar
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {rooms.length > 0 ? rooms.map((room) => (
                  <button
                    key={room.id}
                    onClick={() => setSelectedRoom(room)}
                    className={`relative block w-full text-left p-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 ${
                      selectedRoom?.id === room.id ? 'text-white ring-2' : 'bg-white border border-gray-200 hover:bg-yellow-50'
                    }`}
                    style={{
                      backgroundColor: selectedRoom?.id === room.id ? '#FFC47E' : '',
                      borderColor: selectedRoom?.id === room.id ? '#FFAD84' : '',
                      ringColor: selectedRoom?.id === room.id ? '#FFAD84' : ''
                    }}
                  >
                    <p className="font-extrabold text-xl">{room.tipe_kamar}</p>
                    <p className={`text-base mt-1 ${selectedRoom?.id === room.id ? 'text-yellow-100' : 'text-gray-700'}`}>
                      Harga: Rp {room.harga_kamar.toLocaleString('id-ID')}/malam
                    </p>
                    {selectedRoom?.id === room.id && (
                      <span className="absolute top-3 right-3 bg-white text-orange-600 text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-pulse">Terpilih</span>
                    )}
                  </button>
                )) : (
                  <p className="md:col-span-2 text-center text-gray-500 py-8">Memuat kamar atau tidak ada kamar tersedia.</p>
                )}
              </div>
            )}
            {/* Adjusted grid for date and guest inputs to be two columns on larger screens */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
              <div>
                <label htmlFor="check-in" className="block text-sm font-medium text-gray-700 mb-1">Tanggal Check-in</label>
                <input
                  type="date"
                  id="check-in"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 transition duration-200 shadow-sm"
                />
              </div>
              <div>
                <label htmlFor="check-out" className="block text-sm font-medium text-gray-700 mb-1">Tanggal Check-out</label>
                <input
                  type="date"
                  id="check-out"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 transition duration-200 shadow-sm"
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
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 transition duration-200 shadow-sm"
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-6 text-center">
            <h2 className="font-bold text-2xl border-b pb-3 mb-4" style={{ color: '#FFAD84' }}>Detail Tamu</h2>
            <p className="text-gray-700 text-lg">
              Saatnya untuk menambahkan detail tamu! Ini adalah langkah opsional yang bisa Anda kembangkan untuk mengumpulkan informasi seperti nama lengkap, kontak, atau preferensi khusus lainnya.
            </p>
            <p className="font-semibold italic" style={{ color: '#FFC47E' }}>
              (Untuk saat ini, Anda bisa langsung melanjutkan ke konfirmasi.)
            </p>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-6 text-center">
            <h2 className="font-bold text-2xl border-b pb-3 mb-4" style={{ color: '#FFAD84' }}>Konfirmasi & Pembayaran</h2>
            {selectedRoom && (
              <div className="p-6 rounded-lg shadow-lg border transform hover:scale-105 transition-transform duration-300"
                style={{ backgroundColor: '#FFE382', borderColor: '#FFAD84' }}>
                <p className="text-left text-gray-800 mb-2"><strong style={{ color: '#FFAD84' }}>Kamar Dipilih:</strong> <span className="font-semibold">{selectedRoom.tipe_kamar}</span></p>
                <p className="text-left text-gray-800 mb-2"><strong style={{ color: '#FFAD84' }}>Periode Menginap:</strong> {checkIn} - {checkOut}</p>
                <p className="text-left text-gray-800 mb-2"><strong style={{ color: '#FFAD84' }}>Durasi:</strong> {calculateNights()} malam</p>
                <p className="text-left text-gray-800 mb-4"><strong style={{ color: '#FFAD84' }}>Jumlah Tamu:</strong> {jumlahTamu}</p>
                <hr style={{ borderColor: '#FFAD84' }} className="mb-4" />
                <p className="font-extrabold text-2xl mt-2" style={{ color: '#FFAD84' }}>Total Harga: Rp {calculateTotal().toLocaleString('id-ID')}</p>
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
            className={`flex-1 px-6 py-3 rounded-full text-white font-bold shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 ${
              loading ? 'cursor-not-allowed' : ''
            }`}
            style={{ backgroundColor: loading ? '#FFAD84' : '#FFAD84', opacity: loading ? 0.7 : 1 }}
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
            <div
              className={`p-8 rounded-2xl shadow-2xl text-center max-w-sm w-full transform scale-105 animate-pop-in border-2 ${
                messageBox.type === 'error' ? 'bg-red-100 border-red-500 text-red-800' :
                messageBox.type === 'success' ? 'bg-green-100 border-green-500 text-green-800' :
                ''
              }`}
              style={{
                backgroundColor: messageBox.type === 'warning' ? '#FFF78A' : '',
                borderColor: messageBox.type === 'warning' ? '#FFC47E' : '',
                color: messageBox.type === 'warning' ? '#A0522D' : '',
              }}
            >
              <p className="text-xl font-bold mb-5">{messageBox.message}</p>
              <button
                onClick={hideMessageBox}
                className={`px-8 py-3 rounded-full text-white font-bold shadow-lg transition-all duration-300 transform hover:scale-105 ${
                  messageBox.type === 'error' ? 'bg-red-600 hover:bg-red-700' :
                  messageBox.type === 'success' ? 'bg-green-600 hover:bg-green-700' :
                  ''
                }`}
                style={{
                  backgroundColor: messageBox.type === 'warning' ? '#FFC47E' : '',
                  color: messageBox.type === 'warning' ? '#FFFFFF' : '',
                  // Note: Tailwind's hover classes are more complex with inline styles.
                  // For a true hover effect, you'd typically define custom classes in CSS or extend Tailwind config.
                  // This provides the initial background.
                }}
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
