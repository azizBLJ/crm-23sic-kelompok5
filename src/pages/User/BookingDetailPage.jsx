import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const initialBookings = [
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
 {
    id: 4,
    nama: "Habib",
    email: "Habib.santoso@example.com",
    checkin: "2024-08-07",
    checkout: "2024-08-10",
    tipeKamar: "Deluxe",
    jumlahTamu: 1,
  },
];

const BookingDetailPage = () => {
  const [bookings, setBookings] = useState(initialBookings);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});

  const kamarCount = bookings.reduce((acc, curr) => {
    acc[curr.tipeKamar] = (acc[curr.tipeKamar] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.keys(kamarCount).map((tipe) => ({
    name: tipe,
    jumlah: kamarCount[tipe],
  }));

  const handleDelete = (id) => {
    setBookings(bookings.filter((b) => b.id !== id));
  };

  const handleEdit = (booking) => {
    setEditingId(booking.id);
    setFormData(booking);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    setBookings(
      bookings.map((b) => (b.id === editingId ? { ...formData, id: editingId } : b))
    );
    setEditingId(null);
    setFormData({});
  };

  return (
    <div className="min-h-screen bg-white p-8 font-inter">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-orange-600 text-center mb-6">
          Manajemen Pemesanan & Statistik
        </h1>

        {/* TABEL PEMESANAN */}
        <div className="bg-white p-6 rounded-xl shadow-xl mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Daftar Pemesanan</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left border border-orange-200">
              <thead>
                <tr className="bg-orange-200 text-gray-800">
                  <th className="px-4 py-2">Nama</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Check-in</th>
                  <th className="px-4 py-2">Check-out</th>
                  <th className="px-4 py-2">Tipe</th>
                  <th className="px-4 py-2">Tamu</th>
                  <th className="px-4 py-2">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b.id} className="border-b hover:bg-orange-50">
                    {editingId === b.id ? (
                      <>
                        <td className="px-4 py-2">
                          <input name="nama" value={formData.nama} onChange={handleChange} className="border rounded p-1 w-full" />
                        </td>
                        <td className="px-4 py-2">
                          <input name="email" value={formData.email} onChange={handleChange} className="border rounded p-1 w-full" />
                        </td>
                        <td className="px-4 py-2">
                          <input name="checkin" value={formData.checkin} onChange={handleChange} type="date" className="border rounded p-1 w-full" />
                        </td>
                        <td className="px-4 py-2">
                          <input name="checkout" value={formData.checkout} onChange={handleChange} type="date" className="border rounded p-1 w-full" />
                        </td>
                        <td className="px-4 py-2">
                          <input name="tipeKamar" value={formData.tipeKamar} onChange={handleChange} className="border rounded p-1 w-full" />
                        </td>
                        <td className="px-4 py-2">
                          <input name="jumlahTamu" value={formData.jumlahTamu} onChange={handleChange} type="number" className="border rounded p-1 w-full" />
                        </td>
                        <td className="px-4 py-2">
                          <button onClick={handleSave} className="text-green-600 font-semibold mr-2">Simpan</button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-4 py-2">{b.nama}</td>
                        <td className="px-4 py-2">{b.email}</td>
                        <td className="px-4 py-2">{b.checkin}</td>
                        <td className="px-4 py-2">{b.checkout}</td>
                        <td className="px-4 py-2">{b.tipeKamar}</td>
                        <td className="px-4 py-2">{b.jumlahTamu}</td>
                        <td className="px-4 py-2">
                          <button onClick={() => handleEdit(b)} className="text-blue-600 font-semibold mr-2">Edit</button>
                          <button onClick={() => handleDelete(b.id)} className="text-red-600 font-semibold">Hapus</button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* GRAFIK DITARUH DI BAWAH */}
        <div className="bg-white p-6 rounded-xl shadow-xl">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Statistik Tipe Kamar</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="jumlah" fill="#ffad84" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
};

export default BookingDetailPage;
