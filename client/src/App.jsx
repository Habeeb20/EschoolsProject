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
import ExamDashboard from './pages/exam/ExamDashboard'
import ExamLogin from './pages/exam/ExamLogin'
import ExamRegister from './pages/exam/ExamRegister'
import ExamDetails from './pages/ExamHomPage/ExamDetails'
import ExamHomepage from './pages/ExamHomPage/examHomePage'
import TeacherLogin from './pages/teachers/TeacherLogin'
import TeacherRegister from './pages/teachers/TeacherRegister'
import TeacherDashboard from './pages/teachers/TeacherDashboard'
import TeacherHomepage from './pages/teacherHomePage/TeacherHomepage'
import TeacherDetails from './pages/teacherHomePage/TeacherDetails'
import TrainingLogin from './pages/training/TrainingLogin'
import TrainingRegister from './pages/training/TrainingRegister'
import TrainingDashboard from './pages/training/TrainingDashboard'
import TrainingHomePage from './pages/trainingHomepage/TrainingHomePage'
import TrainingDetails from './pages/trainingHomepage/TrainingDetails'
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


      <Route path="/examdashboard" element={<ExamDashboard />} />
      
      <Route path="/examlogin" element={<ExamLogin />} />
      
      <Route path="/examregister" element={<ExamRegister />} />
      
      <Route path="/exam/:id" element={<ExamDetails />} />
      
      <Route path="/examhomepage" element={<ExamHomepage />} />



      <Route path="/teacherlogin" element={<TeacherLogin />} />
      <Route path="/teacherregister" element={<TeacherRegister />} />
      <Route path="/teacherdashboard" element={<TeacherDashboard />} />
      <Route path="/teacherhomepage" element={<TeacherHomepage />} />
      <Route path="/teacher/:id" element={<TeacherDetails />} />

       <Route path="/traininglogin" element={<TrainingLogin />} />
       <Route path="/trainingregister" element={<TrainingRegister />} />
       <Route path="/trainingdashboard" element={<TrainingDashboard />} />
       <Route path="/traininghomepage" element={<TrainingHomePage />} />
       <Route path="/training/:id" element={<TrainingDetails />} />
      </Routes>
      <Footer />
    
 
    </Router>

    
  
    </>
  )
}

export default App
