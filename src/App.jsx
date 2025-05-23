import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import MainLayout from './components/MainLayout'
import Dashboard from './pages/Dashboard'
import Pelanggan from './pages/Pelanggan' 

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Routes>
      <Route  element={<MainLayout />}>
        <Route path="/" element={<Dashboard />}/>
        <Route path="Pelanggan" element={<Pelanggan />} />
      </Route>
    </Routes>
    </>
  )
}

export default App
