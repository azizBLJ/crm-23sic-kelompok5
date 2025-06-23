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
        
      </div>
    </header>
  );
};

export default Header;
