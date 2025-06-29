import { 
  MdEventAvailable, 
  MdOutlineCardMembership, 
  MdRememberMe, 
  MdMap 
} from "react-icons/md";

import { 
  LayoutDashboard,  
  Settings,      
  LogIn,
  UserPlus,
} from 'lucide-react';

import { 
  FaQuestion,
  FaHistory,
} from "react-icons/fa";

import { IoIosBed } from "react-icons/io";
import { Link, useLocation } from 'react-router-dom';

const menuItems = [
  { name: 'Dashboard', icon: <LayoutDashboard />, path: '/admin' },
  { name: 'Booking', icon: <IoIosBed />, path: '/admin/AdminBookingPage' },
  { name: 'Riwayat Transaksi', icon: <FaHistory />, path: '/admin/riwayatTransaksi' },
  { name: 'Peta Hotel & Fasilitas', icon: <MdMap />, path: '/admin/PetaHotelFasilitas' },
  { name: 'FAQ', icon: <FaQuestion />, path: '/admin/FAQ' },
  { name: 'Membership', icon: <MdRememberMe />, path: '/admin/membership' },
  { name: 'Kamar Available', icon: <MdEventAvailable />, path: '/admin/AvailableRoomsAdmin' },
  { name: 'Sistem Membership', icon: <MdEventAvailable />, path: '/admin/SistemMembership' },
];


const accountItems = [
  { name: 'Pengaturan Akun', icon: <Settings />, path: '/admin/KelolaAkunAdmin' },
];


const handleLogout = () => {
  localStorage.removeItem("user");
  window.location.href = "/";
};



const Sidebar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <aside className="bg-gradient-to-br from-[#FFE382] via-[#FFC47E] to-[#FFAD84] w-64 min-h-screen px-4 py-6 shadow-lg hidden md:block">
      {/* Logo / Judul */}
      <div className="text-xl font-bold mb-8 text-gray-800">
      <img src="../template/img/logommh.png" alt="Mutiara Merdeka Hotel"></img>
      </div>
      {/* Menu Utama */}
      <nav className="space-y-1 text-sm">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-yellow-300 transition ${
              isActive(item.path)
                ? 'bg-yellow-400 text-black font-semibold'
                : 'text-gray-700'
            }`}
          >
            <span className="w-5 h-5">{item.icon}</span>
            {item.name}
          </Link>
        ))}
      </nav>

      {/* Garis Pemisah */}
      <div className="mt-8 text-xs font-semibold text-gray-600">AKUN</div>

      {/* Menu Akun */}
      <nav className="mt-2 space-y-1 text-sm">
        {accountItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-yellow-300 transition ${
              isActive(item.path)
                ? 'bg-yellow-400 text-black font-semibold'
                : 'text-gray-700'
            }`}
          >
            <span className="w-5 h-5">{item.icon}</span>
            {item.name}
          </Link>
        ))}
       

        {/* Tombol Sign Out */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-yellow-300 transition text-gray-700 w-full"
        >
          <span className="w-5 h-5"><LogIn /></span>
          Sign Out
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
