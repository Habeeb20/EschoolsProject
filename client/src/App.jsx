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
import ExamHomepage from './pages/ExamHomPage/ExamHomepage'
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
import DataInState from './component/landingPage/DataInState'
import BookLogin from './pages/Book/BookLogin'
import BookRegister from './pages/Book/BookRegister'
import BookDashboard from './pages/Book/BookDashboard'
import StoreDashboard from './pages/store/StoreDashboard'
import StoreLogin from './pages/store/StoreLogin'
import StoreRegister from './pages/store/StoreRegister'
import StoreHomepage from './pages/storeHomepage/StoreHomepage'
import StoreDetails from './pages/storeHomepage/StoreDetails'
import TutorialHomePage from './pages/tutorialHomepage/TutorialHomePage'
import TutorialLogin from './pages/tutorial/TutorialLogin'
import TutorialRegister from "./pages/tutorial/TutorialRegister"
import TutorialDashboard from './pages/tutorial/TutorialDashboard'
import TutorialDetails from './pages/tutorialHomepage/TutorialDetails'
import Comparison from './pages/Admission/Comparison'
import JobList from './pages/job/JobList'
import JobLogin from './pages/job/JobLogin'
import JobRegister from './pages/job/JobRegister'
import PostJob from './pages/job/PostJob'
import Application from './pages/job/Application'
import JobDashboard from './pages/job/JobDashboard'
import Admission from './pages/Admission/Admission'
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
      <Route path="/data/:location" element={<DataInState />} />
   

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


       <Route path="/bookshoplogin" element={<BookLogin />} />
       <Route path="/bookshopregister" element={<BookRegister />} />
       <Route path="/bookshopdashboard" element={<BookDashboard />} />

       <Route path="/storedashboard" element={<StoreDashboard />} />
       <Route path="/storelogin" element={<StoreLogin />} />
       <Route path="/storeregister" element={<StoreRegister />} />
       <Route path="/storehomepage" element={<StoreHomepage />} />
       <Route path="/store/:id" element={<StoreDetails />} />


       <Route path="/tutorialhomepage" element={<TutorialHomePage />} />
        <Route path="/tutoriallogin" element={<TutorialLogin />} />
        <Route path="/tutorialregister" element={<TutorialRegister />} />
        <Route path="/tutorialdashboard" element={<TutorialDashboard />} />
        <Route path="/tutorial/:id" element={<TutorialDetails />}/>



        <Route path="/admission" element={<Admission />} />
        <Route path="/comparison" element={<Comparison />} />

        <Route path="/joblist" element={<JobList />} />
        <Route path="/joblogin" element={<JobLogin />} />
        <Route path="/jobregister" element={<JobRegister />} />
        <Route path="/post-job" element={<PostJob />} />
        <Route path="/applications" element={<Application />} />
        <Route path="/jobdashboard" element={<JobDashboard />} />
      </Routes>
      <Footer />
    
 
    </Router>

    
  
    </>
  )
}

export default App
