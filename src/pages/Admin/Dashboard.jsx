import React, { useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar, Line, Pie } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
)

// Data statis untuk demo filter
const dataSets = {
  day: {
    labels: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
    income: Array.from({ length: 30 }, () => Math.floor(Math.random() * 2000000) + 500000),
    booking: Array.from({ length: 30 }, () => Math.floor(Math.random() * 10) + 1),
  },
  month: {
    labels: ['Jul 2024','Aug 2024','Sep 2024','Oct 2024','Nov 2024','Dec 2024','Jan 2025','Feb 2025','Mar 2025','Apr 2025','May 2025','Jun 2025'],
    income: [10259962,13366958,19224439,16689635,15924563,20380915,22926792,22762475,11025739,11533145,20071852,21372578],
    booking: [35, 60, 28, 51, 57, 28, 44, 44, 58, 30, 40, 34],
  },
  year: {
    labels: ['2022', '2023', '2024', '2025'],
    income: [120000000, 145000000, 160000000, 110000000],
    booking: [420, 510, 480, 320],
  }
}

const topCustomers = [
  { name: "Budi Santoso", total_nights: 45 },
  { name: "Siti Aminah", total_nights: 42 },
  { name: "Andi Wijaya", total_nights: 39 },
  { name: "Dewi Lestari", total_nights: 35 },
  { name: "Rudi Hartono", total_nights: 33 },
]

const roomLabels = ['101', '202', '103', '305', '404', '105', '208']
const roomCounts = [50, 81, 76, 97, 92, 73, 31]
const roomStatus = { Penuh: 72, Kosong: 28 }

const suggestions = [
  { id: 1, name: "Dewi Lestari", comment: "Tolong tambahkan menu makanan vegetarian" },
  { id: 2, name: "Andi Wijaya", comment: "Sebaiknya ada early check-in" },
  { id: 3, name: "Budi Santoso", comment: "AC kamar 305 perlu diperbaiki" },
  { id: 4, name: "Siti Aminah", comment: "Pelayanan sangat baik, lanjutkan!" },
  { id: 5, name: "Rudi Hartono", comment: "Perlu lebih banyak spot foto instagramable" },
]

export default function Dashboard() {
  const [filter, setFilter] = useState('month')
  const { labels, income, booking } = dataSets[filter]

  const incomeBar = {
    labels,
    datasets: [{
      label: 'Pendapatan',
      data: income,
      backgroundColor: '#FFAD84'
    }]
  }

  const bookingLine = {
    labels,
    datasets: [{
      label: 'Jumlah Pemesanan',
      data: booking,
      borderColor: '#4F46E5',
      backgroundColor: 'rgba(79,70,229,0.3)',
      fill: true,
      tension: 0.3
    }]
  }

  const roomPie = {
    labels: roomLabels,
    datasets: [{
      data: roomCounts,
      backgroundColor: ['#FFAD84', '#FFE382', '#FFC47E', '#FFF78A', '#A3D8FF', '#FFA1C9', '#A0F0C4'],
    }]
  }

  const availabilityPie = {
    labels: Object.keys(roomStatus),
    datasets: [{
      data: Object.values(roomStatus),
      backgroundColor: ['#FF6B6B', '#51CF66'],
    }]
  }

  // Ambil data terakhir untuk card (jika ada)
  const lastIncome = income.at(-1)
  const lastBooking = booking.at(-1)

  return (
    <div className="p-6 space-y-8">
      <div className="flex justify-start mb-2">
      <button className="border rounded px-3 py-1 text-sm bg-orange-500 text-black  hover:bg-orange-600">
        <select
          className=" bg-transparent focus:outline-none"
          value={filter}
          onChange={e => setFilter(e.target.value)}
        >
          <option value="day">Hari</option>
          <option value="month">Bulan</option>
          <option value="year">Tahun</option>
        </select>
        </button>
      </div>

      {/* Card Ringkasan */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-5 rounded-xl shadow border-l-4 border-orange-400">
          <p className="text-sm text-gray-500">
            {filter === 'day' ? 'Pendapatan Hari Ini' : filter === 'month' ? 'Pendapatan Bulan Ini' : 'Pendapatan Tahun Ini'}
          </p>
          <h2 className="text-2xl font-bold text-orange-600">Rp {lastIncome?.toLocaleString()}</h2>
        </div>
        <div className="bg-white p-5 rounded-xl shadow border-l-4 border-blue-400">
          <p className="text-sm text-gray-500">
            {filter === 'day' ? 'Transaksi Hari Ini' : filter === 'month' ? 'Total Transaksi Bulan Ini' : 'Total Transaksi Tahun Ini'}
          </p>
          <h2 className="text-2xl font-bold text-blue-600">{lastBooking} Transaksi</h2>
        </div>
        <div className="bg-white p-5 rounded-xl shadow border-l-4 border-green-400">
          <p className="text-sm text-gray-500">Kamar Penuh</p>
          <h2 className="text-2xl font-bold text-green-600">{roomStatus.Penuh} Kamar</h2>
        </div>
        <div className="bg-white p-5 rounded-xl shadow border-l-4 border-gray-400">
          <p className="text-sm text-gray-500">Kamar Kosong</p>
          <h2 className="text-2xl font-bold text-gray-600">{roomStatus.Kosong} Kamar</h2>
        </div>
      </div>

      {/* Chart Pendapatan */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-3">
          {filter === 'day' ? 'Pendapatan Harian' : filter === 'month' ? 'Pendapatan Bulanan' : 'Pendapatan Tahunan'}
        </h2>
        <div className="h-[240px]">
          <Bar data={incomeBar} options={{ responsive: true, maintainAspectRatio: false }} height={280} />
        </div>
      </div>

      {/* Chart Pemesanan */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-3">
          {filter === 'day' ? 'Jumlah Pemesanan per Hari' : filter === 'month' ? 'Jumlah Pemesanan per Bulan' : 'Jumlah Pemesanan per Tahun'}
        </h2>
        <div className="h-[240px]">
          <Line data={bookingLine} options={{ responsive: true, maintainAspectRatio: false }} height={280} />
        </div>
      </div>

      {/* Pie Chart Kamar Populer & Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-3">Kamar Paling Sering Dipesan</h2>
          <Pie data={roomPie} />
        </div>
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-3">Status Kamar</h2>
          <Pie data={availabilityPie} />
        </div>
      </div>

      {/* Top 5 Pelanggan */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4">Top 5 Pelanggan Terlama</h2>
        <ul className="space-y-2">
          {topCustomers.map((cust, i) => (
            <li key={i} className="flex justify-between border-b pb-2">
              <span>{cust.name}</span>
              <span className="text-sm text-gray-500">{cust.total_nights} malam</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Tabel Saran */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4">Masukan Pelanggan (Terbaru)</h2>
        <table className="w-full text-left">
          <thead className="text-sm text-gray-500 border-b">
            <tr>
              <th className="py-2">Nama</th>
              <th className="py-2">Saran</th>
            </tr>
          </thead>
          <tbody>
            {suggestions.map((s) => (
              <tr key={s.id} className="border-b hover:bg-gray-50">
                <td className="py-2">{s.name}</td>
                <td className="py-2 text-sm text-gray-600">{s.comment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}