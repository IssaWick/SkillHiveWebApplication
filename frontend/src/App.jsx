import React from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import AppRoutes from './routes/AppRoutes'

const App = () => {
  return (
    <div className="container-fluid p-0">
      <Navbar />
      <AppRoutes />
      <Footer />
    </div>
  )
}

export default App