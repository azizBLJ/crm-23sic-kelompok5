import { Routes, Route } from "react-router-dom";
import './App.css'
import MainLayout from './components/Admin/MainLayout'
import Dashboard from './pages/Admin/Dashboard'
import FAQ from './pages/Admin/FAQ/FAQ'
import Membership from './pages/Admin/Membership/Membership'
import MembershipForm from "./pages/Admin/Membership/MembershipForm";
import SistemMembership from "./pages/Admin/SistemMembership/SistemMembership";
import SistemMembershipForm from "./pages/Admin/SistemMembership/SistemMembershipForm";
function App() {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/admin/FAQ" element={<FAQ />} />
          <Route path="/admin/membership" element={<Membership />} />
          <Route path="/admin/membership/add" element={<MembershipForm />} />
          <Route path="admin/SistemMembership" element={<SistemMembership />} />
          <Route path="admin/SistemMembership/add" element={<SistemMembershipForm />} />



        </Route>
      </Routes>
    </>
  )
}

export default App;
