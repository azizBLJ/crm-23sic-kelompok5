import { useLocation } from "react-router-dom";

const KonfirmasiPesanan = () => {
  const { state } = useLocation();

  if (!state) return <p>Data tidak ditemukan.</p>;

  return (
    <div className="mt-10 p-6 bg-green-100 rounded-xl shadow-xl">
      <h3 className="text-2xl font-bold mb-4 text-green-800">✅ Konfirmasi Pemesanan</h3>
      <ul className="text-green-900 space-y-2">
        <li><strong>Nama:</strong> {state.nama}</li>
        <li><strong>Email:</strong> {state.email}</li>
        <li><strong>Check-in:</strong> {state.checkin}</li>
        <li><strong>Check-out:</strong> {state.checkout}</li>
        <li><strong>Tipe Kamar:</strong> {state.tipeKamar}</li>
        <li><strong>Jumlah Tamu:</strong> {state.jumlahTamu}</li>
      </ul>
    </div>
  );
};

export default KonfirmasiPesanan;
