import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Dashboard from "./pages/Dashboard";
import Pelanggan from "./pages/Pelanggan";
import AdminBookingPage from "./pages/AdminBookingPage";
import BookingDetailPage from "./pages/BookingDetailPage";
import SalesManagement from "./pages/SalesManagement";
import ProductManagement from "./pages/Produk";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/penjualan" element={<SalesManagement />} />
        <Route path="/produk" element={<ProductManagement />} />
        <Route path="/Pelanggan" element={<Pelanggan />} />
        <Route path="/AdminBookingPage" element={<AdminBookingPage />} />
          <Route path="/booking-detail/:id" element={<BookingDetailPage />} />
      </Route>
    </Routes>
  );
}

export default App;
