import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import './App.css'
import Dashboard from './pages/schools/Dashboard'
import Register from './pages/schools/Register'
import Login from './pages/schools/Login'
import Navbar from './component/Navbar'
import Home from './pages/landingpage/Home'
import Request from './pages/landingpage/Request'
import Report from './pages/landingpage/Report'
import AschoolDetails from './pages/landingpage/AschoolDetails'
import CategoryPage from './component/landingPage/CategoryPage'
import LocationPage from './component/landingPage/LocationPage'
import SchoolsHomePage from './pages/SchoolsHompage/SchoolsHomePage'
import Footer from './component/Footer'
import SchoolsDetails from './pages/SchoolsHompage/SchoolsDetails'
function App() {


  return (
    <>
    <Router>
    <Navbar />
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/schoolsdashboard" element={<Dashboard />} />
      <Route path="/schoolsregister" element={<Register />} />
      <Route path="/schoolslogin" element={<Login />} />
      <Route path="/schooldetail/:id" element={<AschoolDetails />} />
      <Route path="/category/:category" element={<CategoryPage />} />
      <Route path="/state/:state" element={<LocationPage />} />
   

      <Route path="/request" element={<Request />} />
      <Route path="/report" element={<Report />}  />



      <Route path="/schoolshomepage" element={<SchoolsHomePage/>} />
      <Route path="/schools/:id" element={<SchoolsDetails />} />

      </Routes>
      <Footer />
    
 
    </Router>

    
  
    </>
  )
}

export default App
