import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import MainLayout from './components/MainLayout'
import Dashboard from './pages/Dashboard'
import SalesManagement from './pages/SalesManagement'
import ProductManagement from './pages/Produk'
import Pelanggan from './pages/Pelanggan' 
import SistemMembership from './pages/SistemMembership'
import { FaQ } from 'react-icons/fa6'
import FAQ from './pages/FAQ'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Routes>
      <Route  element={<MainLayout />}>
        <Route path="/" element={<Dashboard />}/>
        <Route path="/penjualan" element={<SalesManagement />}/>
        {/* <Route path="/penjualan" element={<SalesManagement />}/> */}
        <Route path="/produk" element={<ProductManagement />}/>
        <Route path="Pelanggan" element={<Pelanggan />} />
         <Route path="SistemMembership" element={<SistemMembership />} />
         <Route path="FAQ" element={<FAQ/>} />
      </Route>
    </Routes>
    </>
  )
}

export default App
