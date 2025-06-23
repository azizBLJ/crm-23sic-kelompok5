import { Routes, Route } from "react-router-dom";
import './App.css'
import MainLayout from './components/Admin/MainLayout'
import Dashboard from './pages/Admin/Dashboard'
import FAQ from './pages/Admin/FAQ/FAQ'
import Membership from './pages/Admin/Membership/Membership'
function App() {
  return (
    <>
    <Routes>
      <Route  element={<MainLayout />}>
        <Route path="/" element={<Dashboard />}/>
         <Route path="FAQ" element={<FAQ />} />
         <Route path="/membership" element={<Membership />} />
    

      </Route>
    </Routes>
    </>
  )
}

export default App;
