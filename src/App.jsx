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
import MembershipFormAdmin from './pages/Admin/Membership/MembershipForm';
import AdminBookingPageAdmin from './pages/Admin/Booking/AdminBookingPage';
import RiwayatTransaksiAdmin from './pages/Admin/Transaksi/RiwayatTransaksi';
import PetaHotelFasilitasAdmin from './pages/Admin/Fasilitas/PetaHotelFasilitas';
import SistemMembership from "./pages/Admin/SistemMembership/SistemMembership";
import SistemMembershipForm from "./pages/Admin/SistemMembership/SistemMembershipForm";

// User Pages
import MainLayoutUser from './components/User/MainLayout';
import DashboardUser from './pages/User/Dashboard'; 
import UserBookingPage from "./pages/User/Booking/UserBookingPages";

// Auth Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Error401 from './pages/Error401';
import Error404 from './pages/Error404';

import { ProtectedRoute } from "./components/ProtectedRoute";
import BookingDetailPage from "./pages/User/BookingDetailPage";

function App() {
  return (
    <>
    <Routes>
     
      {/* Public Routes */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/401" element={<Error401 />} />
      <Route path="*" element={<Error404 />} />

      {/* Admin Protected Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute role="admin">
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
        <Route path="membership/add" element={<MembershipFormAdmin />} />
        <Route path="admin/SistemMembership" element={<SistemMembership />} />
        <Route path="admin/SistemMembership/add" element={<SistemMembershipForm />} />
      </Route>

      {/* User Route - Uncomment if user dashboard exists */}
      <Route
        path="/user"
        element={
          <ProtectedRoute role="user">
            <MainLayoutUser />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardUser />} />
        <Route path="/dashboard" element={<DashboardUser />} />
        <Route path="booking" element={<UserBookingPage />} />
        </Route>
    </Routes>
    </>
  )
}

export default App;
