import { useEffect, useState } from "react";
import { supabase } from "../../../Supabase";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const AdminManageBookingPage = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const { data, error } = await supabase.from('booking').select('*');
      if (error) {
        console.error(error);
      } else {
        setBookings(data);
      }
    };
    fetchBookings();
  }, []);

  const kamarCount = bookings.reduce((acc, curr) => {
    acc[curr.tipe_kamar] = (acc[curr.tipe_kamar] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.keys(kamarCount).map((tipe) => ({
    name: tipe,
    jumlah: kamarCount[tipe],
  }));

  return (
    <div className="min-h-screen bg-white p-8 font-inter">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-orange-600 text-center mb-6">
          Manajemen Pemesanan
        </h1>

        <div className="bg-white p-6 rounded-xl shadow-xl mb-8 overflow-x-auto">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Daftar Pemesanan</h2>
          <table className="min-w-full text-left border border-orange-200">
            <thead>
              <tr className="bg-orange-200 text-gray-800">
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Tipe Kamar</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Check-in</th>
                <th className="px-4 py-2">Check-out</th>
                <th className="px-4 py-2">Tanggal Booking</th>
                <th className="px-4 py-2">Total Hari</th>
                <th className="px-4 py-2">Total Harga</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id} className="border-b hover:bg-orange-50">
                  <td className="px-4 py-2">{b.id}</td>
                  <td className="px-4 py-2">{b.tipe_kamar}</td>
                  <td className="px-4 py-2 capitalize">{b.status}</td>
                  <td className="px-4 py-2">{b.time_checkin ? new Date(b.time_checkin).toLocaleDateString('id-ID') : '-'}</td>
                  <td className="px-4 py-2">{b.time_checkout ? new Date(b.time_checkout).toLocaleDateString('id-ID') : '-'}</td>
                  <td className="px-4 py-2">{b.tanggal_booking ? new Date(b.tanggal_booking).toLocaleDateString('id-ID') : '-'}</td>
                  <td className="px-4 py-2">{b.total_hari}</td>
                  <td className="px-4 py-2">Rp {Number(b.total_harga).toLocaleString('id-ID')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-xl">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Statistik Tipe Kamar</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="jumlah" fill="#f97316" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminManageBookingPage;