import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Dashboard from "./pages/Dashboard";
import Pelanggan from "./pages/Pelanggan";
import PesanKamar from "./pages/PesanKamar";
import KonfirmasiPesanan from "./pages/KonfirmasiPesanan";
import './App.css'
import SalesManagement from './pages/SalesManagement'
import ProductManagement from './pages/Produk'


function App() {
  return (
    <Routes>
      <Route  element={<MainLayout />}>
        <Route path="/" element={<Dashboard />}/>
        <Route path="/penjualan" element={<SalesManagement />}/>
        <Route path="/produk" element={<ProductManagement />}/>
        <Route path="Pelanggan" element={<Pelanggan />} />
        <Route path="/PesanKamar" element={<PesanKamar />} />
        <Route path="/PesanKamar/Konfirmasi" element={<KonfirmasiPesanan />} />
      </Route>
    </Routes>
  );
}

export default App;
