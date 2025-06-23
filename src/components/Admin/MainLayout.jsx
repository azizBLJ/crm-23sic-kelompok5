import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useState } from "react";

export default function MainLayout() {
  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <div id="app-container" className="bg-gray-100 min-h-screen flex w-full">
      {showSidebar && <Sidebar />}
      <div id="main-content" className={`flex-1 flex flex-col `}>
       <Header onToggleSidebar={() => setShowSidebar(!showSidebar)} />
        <main className="flex-1 overflow-y-auto">
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
