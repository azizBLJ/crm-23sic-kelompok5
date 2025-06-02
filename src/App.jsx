import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import MainLayout from './components/MainLayout'
import Dashboard from './pages/Dashboard'
import ProductManagement from './pages/Produk'
import SistemMembership from './pages/SistemMembership'
import FAQ from './pages/FAQ'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Routes>
      <Route  element={<MainLayout />}>
        <Route path="/" element={<Dashboard />}/>
        <Route path="/produk" element={<ProductManagement />}/>
        <Route path="SistemMembership" element={<SistemMembership />} />
         <Route path="FAQ" element={<FAQ />} />
      </Route>
    </Routes>
    </>
  )
}

export default App
