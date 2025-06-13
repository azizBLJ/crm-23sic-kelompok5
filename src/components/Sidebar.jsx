import { MdEventAvailable } from "react-icons/md"; 
import { FaQuestion } from "react-icons/fa"; 
import { MdOutlineCardMembership } from "react-icons/md"; 
import { IoIosBed } from "react-icons/io"; 
import { AiOutlineShoppingCart } from "react-icons/ai"; 
import { MdRememberMe } from "react-icons/md"; 
import { FaQuestionCircle } from "react-icons/fa"; 

import {
  LayoutDashboard,
  Users,         
  ShoppingCart,  
  Box,           
  BarChart2,     
  Settings,      
  User,
  LogIn,
  UserPlus,
  CarTaxiFront,
} from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { MdMap } from 'react-icons/md';
import { FaHistory } from 'react-icons/fa';

const menuItems = [
  { name: 'Dashboard', icon: <LayoutDashboard />, path: '/' },
  { name: 'Booking', icon: <IoIosBed />, path: '/AdminBookingPage' },
  { name: 'Produk', icon: <Box />, path: '/produk' },
  { name: 'Penjualan', icon: <AiOutlineShoppingCart />, path: '/penjualan' },
  { name: 'Pelanggan', icon: <BarChart2 />, path: '/Pelanggan' },
  { name: 'Sistem Membership', icon: <MdOutlineCardMembership />, path: '/SistemMembership' },
  { name: 'Riwayat Transaksi', icon: <FaHistory />, path: '/riwayatTransaksi' },
  { name: 'Peta Hotel & Fasilitas', icon: <MdMap />, path: '/petaHotelFasilitas' },
  { name: 'FAQ', icon: <FaQuestion />, path: '/FAQ' }, 
  { name: 'Membership', icon: <MdRememberMe /> , path: '/Membership' },
  { name: 'Kamar Available', icon: <MdEventAvailable /> , path: '/AvailableRoomsAdmin' },

];

 

const accountItems = [
  { name: 'Pengaturan Akun', icon: <Settings />, path: '/akun' },
  { name: 'Sign In', icon: <LogIn />, path: '/signin' },
  { name: 'Sign Up', icon: <UserPlus />, path: '/signup' },
]

const Sidebar = () => {
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  return (
    <aside className="bg-white w-64 h-screen shadow-lg px-4 py-6 hidden md:block">
      <div className="text-xl font-bold mb-8 text-purple-700">UMKM CRM</div>
      <nav className="space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-purple-100 transition ${
              isActive(item.path)
                ? 'bg-purple-200 text-purple-800 font-semibold'
                : 'text-gray-700'
            }`}
          >
            <span className="w-5 h-5">{item.icon}</span>
            {item.name}
          </Link>
        ))}
      </nav>

      <div className="mt-8 text-xs font-semibold text-gray-500">AKUN</div>
      <nav className="mt-2 space-y-1">
        {accountItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-purple-100 transition ${
              isActive(item.path)
                ? 'bg-purple-200 text-purple-800 font-semibold'
                : 'text-gray-700'
            }`}
          >
            <span className="w-5 h-5">{item.icon}</span>
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar

