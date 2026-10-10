import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import Models from './components/Models/Models'
import WhyChooseUs from './components/WhyChooseUs/WhyChooseUs'
import Contact from './components/Contact/Contact'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import Nosotros from './pages/Nosotros'
import './App.css'

function Home() {
  const [requestedVehicle, setRequestedVehicle] = useState(null)

  return (
    <main className="app">
      <Hero />
      <WhyChooseUs />
      <Models onRequestInfo={setRequestedVehicle} />
      <Contact
        requestedVehicle={requestedVehicle}
        onRequestedVehicleChange={setRequestedVehicle}
      />
    </main>
  )
}

function RouteScroll() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' })
      return
    }

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pathname, hash])

  return null
}

function App() {
  return (
    <BrowserRouter>
      <RouteScroll />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
