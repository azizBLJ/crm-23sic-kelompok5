import { Search, User, Menu } from 'lucide-react';

const Header = ({ onToggleSidebar }) => {
  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white shadow-sm border-b sticky top-0 z-10">
      
      {/* Kiri: Tombol Toggle + Breadcrumb */}
      <div className="flex items-center gap-4">
        {/* Tombol Toggle Sidebar */}
        <button
          onClick={onToggleSidebar}
          className="text-gray-600 hover:text-gray-900 md:inline-block hidden"
          title="Toggle Sidebar"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Breadcrumb / Judul */}
        <div className="text-sm text-gray-500">
          Pages / <span className="text-gray-900 font-semibold">Dashboard</span>
        </div>
      </div>

      {/* Kanan: Search + Profile */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Type here..."
            className="px-4 py-2 pl-10 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-300"
          />
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
        </div>
        <div className="flex items-center gap-2 text-sm cursor-pointer text-gray-700 hover:text-purple-700">
          <User className="w-4 h-4" />
          Sign In
        </div>
      </div>
    </header>
  );
};

export default Header;
