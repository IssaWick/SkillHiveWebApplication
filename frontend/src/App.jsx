import React from 'react'
import SignupForm from './pages/SignupForm'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

const App = () => {
  return (
    <div className="container-fluid p-0">
      <Navbar />
      <SignupForm />
      <Footer />
    </div>
  )
}

export default App
