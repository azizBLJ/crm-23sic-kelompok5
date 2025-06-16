
import { Routes, Route} from "react-router-dom";
import './App.css'

//Admin
import FAQ from './pages/Admin/FAQ/FAQ';
import Dashboard from "./pages/Admin/Dashboard";
import MainLayout from "./components/Admin/MainLayout";
import RoomDetail from './pages/Admin/Rooms/RoomDetail';
import Pelanggan from "./pages/Admin/Pelanggan/Pelanggan";
import Membership from './pages/Admin/Membership/Membership';
import MembershipForm from './pages/Admin/Membership/MembershipForm';
import AdminBookingPage from './pages/Admin/Booking/AdminBookingPage';
import RiwayatTransaksi from './pages/Admin/Transaksi/RiwayatTransaksi';
import BookingDetailPage from './pages/Admin/Booking/BookingDetailPage';
import SistemMembership from './pages/Admin/Membership/SistemMembership';
import AvailableRoomsAdmin from './pages/Admin/Rooms/AvailableRoomsAdmin';
import PetaHotelFasilitas from './pages/Admin/Fasilitas/PetaHotelFasilitas';
//----------------------------------------------------------------------------------------------------------------------------



function App() {
  return (
   
      <Routes>
        <Route  element={<MainLayout />}>
          <Route path="/" element={<Dashboard />}/>
          <Route path="Pelanggan" element={<Pelanggan />} />
          <Route path="/AdminBookingPage" element={<AdminBookingPage />} />
          <Route path="/booking-detail/:id" element={<BookingDetailPage />} />
          <Route path="SistemMembership" element={<SistemMembership />} />
          <Route path="FAQ" element={<FAQ/>} />
          <Route path="/riwayatTransaksi" element={<RiwayatTransaksi/>} />
          <Route path="/PetaHotelFasilitas" element={<PetaHotelFasilitas/>} />
          <Route path="/AvailableRoomsAdmin" element={<AvailableRoomsAdmin />} />
          <Route path="/AvailableRoomsAdmin/:id" element={<RoomDetail />} />
          <Route path="/membership" element={<Membership />}>
          <Route path="add" element={<MembershipForm />} />
          </Route>
        </Route>
      </Routes>
      
  );
}

export default App;