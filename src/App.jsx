import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Dashboard from "./pages/Dashboard";
import Pelanggan from "./pages/Pelanggan";
import PesanKamar from "./pages/PesanKamar";
import KonfirmasiPesanan from "./pages/KonfirmasiPesanan";
import SalesManagement from './pages/SalesManagement';
import ProductManagement from './pages/Produk';
import SistemMembership from './pages/SistemMembership';
import FAQ from './pages/FAQ';
import RiwayatTransaksi from './pages/RiwayatTransaksi';
import PetaHotelFasilitas from './pages/PetaHotelFasilitas';
import Membership from './pages/Membership';
import MembershipForm from './pages/MembershipForm';
import AvailableRoomsAdmin from './pages/AvailableRoomsAdmin';
import RoomDetail from './pages/RoomDetail';
import './App.css';

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/penjualan" element={<SalesManagement />} />
        <Route path="/produk" element={<ProductManagement />} />
        <Route path="/Pelanggan" element={<Pelanggan />} />
        <Route path="/SistemMembership" element={<SistemMembership />} />
        <Route path="/FAQ" element={<FAQ />} />
        <Route path="/riwayatTransaksi" element={<RiwayatTransaksi />} />
        <Route path="/PetaHotelFasilitas" element={<PetaHotelFasilitas />} />
        <Route path="/PesanKamar" element={<PesanKamar />} />
        <Route path="/PesanKamar/Konfirmasi" element={<KonfirmasiPesanan />} />

        {/* Routes terpisah untuk Available Rooms */}
        <Route path="/AvailableRoomsAdmin" element={<AvailableRoomsAdmin />} />
        <Route path="/AvailableRoomsAdmin/:id" element={<RoomDetail />} />

        {/* Nested route untuk membership */}
        <Route path="/membership" element={<Membership />}>
          <Route path="add" element={<MembershipForm />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;