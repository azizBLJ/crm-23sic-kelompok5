
import { Routes, Route} from "react-router-dom";
import './App.css'

//Admin
import FAQAdmin from './pages/Admin/FAQ/FAQ';
import DashboardAdmin from "./pages/Admin/Dashboard";
import MainLayoutAdmin from "./components/Admin/MainLayout";
import RoomDetailAdmin from './pages/Admin/Rooms/RoomDetail';
import PelangganAdmin from "./pages/Admin/Pelanggan/Pelanggan";
import MembershipAdmin from './pages/Admin/Membership/Membership';
import AvailableRoomsAdmin from './pages/Admin/Rooms/AvailableRoomsAdmin';
import MembershipFormAdmin from './pages/Admin/Membership/MembershipForm';
import AdminBookingPageAdmin from './pages/Admin/Booking/AdminBookingPage';
import RiwayatTransaksiAdmin from './pages/Admin/Transaksi/RiwayatTransaksi';
import BookingDetailPageAdmin from './pages/Admin/Booking/BookingDetailPage';
import SistemMembershipAdmin from './pages/Admin/Membership/SistemMembership';
import PetaHotelFasilitasAdmin from './pages/Admin/Fasilitas/PetaHotelFasilitas';
//----------------------------------------------------------------------------------------------------------------------------
//User

//----------------------------------------------------------------------------------------------------------------------------
// Halaman devoult
import Login from './pages/Login';
import Register from './pages/Register';
import Error401 from './pages/Error401';
import Error404 from './pages/Error404';
//----------------------------------------------------------------------------------------------------------------------------

function App() {
  return (
   
      <Routes>
        <Route path="/401" element={<Error401 />} />
        <Route path="*" element={<Error404 />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />

        <Route  element={<MainLayoutAdmin />}>
          <Route path="/DashboardAdmin" element={<DashboardAdmin />}/>
          <Route path="Pelanggan" element={<PelangganAdmin />} />
          <Route path="/AdminBookingPage" element={<AdminBookingPageAdmin />} />
          <Route path="/booking-detail/:id" element={<BookingDetailPageAdmin />} />
          <Route path="/SistemMembership" element={<SistemMembershipAdmin />} />
          <Route path="/FAQ" element={<FAQAdmin />} />
          <Route path="/riwayatTransaksi" element={<RiwayatTransaksiAdmin />} />
          <Route path="/PetaHotelFasilitas" element={<PetaHotelFasilitasAdmin />} />
          <Route path="/AvailableRoomsAdmin" element={<AvailableRoomsAdmin />} />
          <Route path="/AvailableRoomsAdmin/:id" element={<RoomDetailAdmin />} />
          <Route path="/membership" element={<MembershipAdmin />}>
          <Route path="add" element={<MembershipFormAdmin />} />
          </Route>
        </Route>
      </Routes>
      
  );
}

export default App;