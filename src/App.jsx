import { Routes, Route } from "react-router-dom";
import './App.css'

// Admin Pages
import FAQAdmin from './pages/Admin/FAQ/FAQ';
import KelolaAkunAdmin from "./pages/Admin/Akun/KelolaAkunAdmin";
import DashboardAdmin from "./pages/Admin/Dashboard";
import MainLayoutAdmin from "./components/Admin/MainLayout";
import PelangganAdmin from "./pages/Admin/Pelanggan/Pelanggan";
import MembershipAdmin from './pages/Admin/Membership/Membership';
import AvailableRoomsAdmin from './pages/Admin/Rooms/AvailableRoomsAdmin';
import AdminBookingPageAdmin from './pages/Admin/Booking/AdminBookingPage';
import RiwayatTransaksiAdmin from './pages/Admin/Transaksi/RiwayatTransaksi';
import PetaHotelFasilitasAdmin from './pages/Admin/Fasilitas/PetaHotelFasilitas';
import SistemMembership from "./pages/Admin/SistemMembership/SistemMembership";

// User Pages
import MainLayoutUser from './components/User/MainLayout';
import DashboardUser from './pages/User/Dashboard'; 
import UserBookingPage from "./pages/User/Booking/UserBookingPages";
import Klasifikasi from "./pages/User/Klasifikasi/Klasifikasi";
import UserRoomsPage from "./pages/User/Kamar/UserRoomsPage";
import PetaHotelFasilitas from "./pages/User/Fasilitas/CustomerFasilitas";

// Auth Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Error401 from './pages/Error401';
import Error404 from './pages/Error404';

import { ProtectedRoute } from "./components/ProtectedRoute";
import FAQ from "./pages/User/FAQ/FAQ";
import About from "./pages/User/About/About";
import Contact from "./pages/User/Contact/Contact";

function App() {
  return (
    <>
    <Routes>
     
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/401" element={<Error401 />} />
      <Route path="*" element={<Error404 />} />

      {/* Admin Protected Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute status="admin">
            <MainLayoutAdmin />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardAdmin />} />
        <Route path="Pelanggan" element={<PelangganAdmin />} />
        <Route path="KelolaAkunAdmin" element={<KelolaAkunAdmin />} />
        <Route path="AdminBookingPage" element={<AdminBookingPageAdmin />} />
        <Route path="FAQ" element={<FAQAdmin />} />
        <Route path="riwayatTransaksi" element={<RiwayatTransaksiAdmin />} />
        <Route path="PetaHotelFasilitas" element={<PetaHotelFasilitasAdmin />} />
        <Route path="AvailableRoomsAdmin" element={<AvailableRoomsAdmin />} />
        <Route path="membership" element={<MembershipAdmin />} />
        <Route path="SistemMembership" element={<SistemMembership />} />
      </Route>

      
      <Route
        path="/"
        element={
            <MainLayoutUser />
        }
      >
        <Route index element={<DashboardUser />} />
        <Route path="/klasifikasi" element={<Klasifikasi />} />
        <Route path="/booking" element={<UserBookingPage />} />
        <Route path="/booking/:bookingId" element={<BookingDetailPage />} />
        <Route path="/kamar" element={<UserRoomsPage />} />
        <Route path="/fasilitas" element={<PetaHotelFasilitas />} />
        <Route path="/FAQ" element={<FAQ />} />
        <Route path="/About" element={<About />} />
        <Route path="/Contact" element={<Contact />} />

        </Route>
    </Routes>
    </>
  )
}

export default App;
