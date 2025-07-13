import { useEffect, useState } from "react";
import { supabase } from "../../../Supabase"; // Ensure this path is correct
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const AdminManageBookingPage = () => {
  const [bookings, setBookings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8); // Set how many bookings you want per page

  useEffect(() => {
    fetchBookings();
  }, []);

  /**
   * Fetches all booking data from the Supabase 'booking' table.
   * Orders them by 'tanggal_booking' in descending order (newest first).
   * Updates the 'bookings' state with the fetched data or logs an error.
   */
  const fetchBookings = async () => {
    const { data, error } = await supabase
      .from('booking')
      .select('*')
      .order('tanggal_booking', { ascending: false }); // Order by booking date, newest first

    if (error) {
      console.error("Error fetching bookings:", error);
    } else {
      setBookings(data);
    }
  };

  /**
   * Updates the status of a specific booking in the Supabase 'booking' table.
   * After a successful update, it re-fetches the bookings to refresh the UI.
   * @param {number} id - The ID of the booking to update.
   * @param {string} newStatus - The new status for the booking ('sukses' or 'tolak').
   */
  const updateBookingStatus = async (id, newStatus) => {
    const { error } = await supabase
      .from('booking')
      .update({ status: newStatus })
      .eq('id', id); // Filters the update to apply only to the booking with the given ID

    if (error) {
      console.error("Error updating booking status:", error);
    } else {
      // Re-fetch bookings to update the UI and reflect the status change
      fetchBookings();
    }
  };

  // --- Pagination Logic ---
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBookings = bookings.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(bookings.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  // --- End Pagination Logic ---

  // Calculates the count of each room type from the fetched bookings for the chart.
  const kamarCount = bookings.reduce((acc, curr) => {
    acc[curr.tipe_kamar] = (acc[curr.tipe_kamar] || 0) + 1;
    return acc;
  }, {});

  // Formats the room type counts into an array suitable for the BarChart.
  const chartData = Object.keys(kamarCount).map((tipe) => ({
    name: tipe,
    jumlah: kamarCount[tipe],
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-100 p-8 font-inter">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-extrabold text-orange-700 text-center mb-10 drop-shadow-md">
          Manajemen Pemesanan Kamar
        </h1>

        <div className="bg-white p-8 rounded-2xl shadow-2xl mb-12 overflow-hidden transform transition duration-500 hover:scale-[1.01]">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-orange-300 pb-3">Daftar Pemesanan</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left border-collapse rounded-xl overflow-hidden">
              <thead className="bg-orange-500 text-white">
                <tr>
                  <th className="px-5 py-3 text-sm font-semibold uppercase tracking-wider">ID</th>
                  <th className="px-5 py-3 text-sm font-semibold uppercase tracking-wider">Tipe Kamar</th>
                  <th className="px-5 py-3 text-sm font-semibold uppercase tracking-wider">Status</th>
                  <th className="px-5 py-3 text-sm font-semibold uppercase tracking-wider">Check-in</th>
                  <th className="px-5 py-3 text-sm font-semibold uppercase tracking-wider">Check-out</th>
                  <th className="px-5 py-3 text-sm font-semibold uppercase tracking-wider">Tanggal Booking</th>
                  <th className="px-5 py-3 text-sm font-semibold uppercase tracking-wider">Total Hari</th>
                  <th className="px-5 py-3 text-sm font-semibold uppercase tracking-wider">Total Harga</th>
                  <th className="px-5 py-3 text-sm font-semibold uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentBookings.map((b) => ( // Use currentBookings for pagination
                  <tr key={b.id} className="bg-white hover:bg-orange-50 transition duration-150 ease-in-out">
                    <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-800">{b.id}</td>
                    <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-800">{b.tipe_kamar}</td>
                    <td className="px-5 py-4 whitespace-nowrap text-sm capitalize">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          b.status === 'sukses' ? 'bg-green-100 text-green-800' :
                          b.status === 'tolak' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800' // 'proses' status
                      }`}>
                        {b.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-800">{b.time_checkin ? new Date(b.time_checkin).toLocaleDateString('id-ID') : '-'}</td>
                    <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-800">{b.time_checkout ? new Date(b.time_checkout).toLocaleDateString('id-ID') : '-'}</td>
                    <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-800">{b.tanggal_booking ? new Date(b.tanggal_booking).toLocaleDateString('id-ID') : '-'}</td>
                    <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-800">{b.total_hari}</td>
                    <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-800">Rp {Number(b.total_harga).toLocaleString('id-ID')}</td>
                    <td className="px-5 py-4 whitespace-nowrap text-sm">
                      {b.status === 'proses' ? ( // Conditionally render buttons based on booking status
                        <div className="flex space-x-3">
                          <button
                            onClick={() => updateBookingStatus(b.id, 'sukses')} // Set status to 'sukses' for accept
                            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg text-sm shadow-md hover:shadow-lg transition duration-300 ease-in-out"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => updateBookingStatus(b.id, 'tolak')} // Set status to 'tolak' for deny
                            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg text-sm shadow-md hover:shadow-lg transition duration-300 ease-in-out"
                          >
                            Deny
                          </button>
                        </div>
                      ) : (
                        // Display current status if not 'proses'
                        <span className={`font-bold text-sm ${b.status === 'sukses' ? 'text-green-600' : 'text-red-600'}`}>
                          {b.status.charAt(0).toUpperCase() + b.status.slice(1)}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination Controls */}
          {totalPages > 1 && ( // Only show pagination if there's more than one page
            <div className="flex justify-center mt-8">
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150 ease-in-out"
                >
                  Previous
                </button>
                {[...Array(totalPages).keys()].map((number) => (
                  <button
                    key={number + 1}
                    onClick={() => paginate(number + 1)}
                    className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium transition duration-150 ease-in-out ${
                      currentPage === number + 1 ? 'z-10 bg-orange-100 border-orange-500 text-orange-700' : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {number + 1}
                  </button>
                ))}
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150 ease-in-out"
                >
                  Next
                </button>
              </nav>
            </div>
          )}
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-2xl transform transition duration-500 hover:scale-[1.01]">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-orange-300 pb-3">Statistik Tipe Kamar</h2>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="4 4" stroke="#e0e0e0" />
              <XAxis dataKey="name" tickLine={false} axisLine={false} className="text-sm font-medium text-gray-600" />
              <YAxis allowDecimals={false} tickLine={false} axisLine={false} className="text-sm font-medium text-gray-600" />
              <Tooltip cursor={{ fill: 'rgba(0,0,0,0.05)' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} itemStyle={{ color: '#333' }} labelStyle={{ color: '#666' }} />
              <Bar dataKey="jumlah" fill="#f97316" radius={[8, 8, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminManageBookingPage;