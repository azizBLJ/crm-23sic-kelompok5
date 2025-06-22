import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import MainLayout from './components/MainLayout'
import Dashboard from './pages/Dashboard'
import ProductManagement from './pages/Produk'
import FAQ from './pages/FAQ'
import Membership from './pages/Membership'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/produk" element={<ProductManagement />} />
          <Route path="FAQ" element={<FAQ />} />
          <Route path="/membership" element={<Membership />}>
          </Route>

        </Route>
      </Routes>
    </>
  )
}

export default App
