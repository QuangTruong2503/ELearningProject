import {  BrowserRouter, Route, Routes } from 'react-router-dom';
import {SpeedInsights} from '@vercel/speed-insights/react';
import './CssFolder/App.css';
import 'react-toastify/dist/ReactToastify.css';
import HeaderComponent from './Component/Header/HeaderComponent.js';
import Footer from './Component/FooterComponent';
import HomePage from './Pages/HomePage';
import { LoginPage } from './Pages/Login/LoginPage';
import RegisterPage from './Pages/Login/RegisterPage';
import AdminPage from './Pages/Admin/AdminPage';
import { ToastContainer } from 'react-toastify';
import ScrollToTopButton from './Component/ScollToTopComponent.js';
import MyCourses from './Pages/MyCourses/MyCourses.js';
import CoursesDetail from './Pages/Courses/CoursesDetail.js';
import CreateCourses from './Pages/Courses/CreateCourses.js';
import AttendedCourses from './Pages/MyCourses/AttendedCourses.js';
import ManageCourse from './Pages/Courses/ManageCourse/ManageCourse.js';
import ProfileUserPage from './Pages/ProfileUserPage.tsx';
import ExamDetail from './Pages/Exam/ExamDetail.tsx';
import Quizz from './Pages/Exam/Quizz.js';
import ExamResults from './Pages/Exam/ExamResults.js';
import ManageAccount from './Pages/User/ManageAccount.js';
import SearchPage from './Pages/SearchPage.tsx';
import CoursesBySubjectPage from './Pages/CoursesBySubjectPage.tsx'
function App() {
  return (
    <BrowserRouter>
      <HeaderComponent></HeaderComponent>

      <div className='web-content container-lg'>
        <Routes>
          <Route path='/' Component={HomePage}></Route>

          {/* Login */}
          <Route path='/login' Component={LoginPage}></Route>
          <Route path='/register' Component={RegisterPage} />

          {/* Admin Panel */}
          <Route path='admin/*' Component={AdminPage}></Route>

          {/* User */}
          <Route path='user/:userID' Component={ProfileUserPage}/>
          <Route path='account/*' Component={ManageAccount}/>
          {/* My Courses */}
          <Route path='/my-courses' Component={MyCourses}/>

          {/* Khóa học đã tham gia */}
          <Route path='/attended-courses' Component={AttendedCourses}/>

          {/* Course */}
          <Route path='/course/:courseID' Component={CoursesDetail}/>
          <Route path='/course/create' Component={CreateCourses}/>
          {/* ManageCourse */}
          <Route path='/manage-course/:courseID/*' Component={ManageCourse}/>

          {/* Exam */}
          <Route path='exam/:examID' Component={ExamDetail}/>
          <Route path='quizz/:submissionID' Component={Quizz}/>
          <Route path='exam/:examID/result/:submissionID' Component={ExamResults}/>

          <Route path='search/:searchValue' Component={SearchPage}/>
          <Route path='courses/subject/:subjectID' Component={CoursesBySubjectPage}/>
        </Routes>
      </div>
      <SpeedInsights />
      <Footer></Footer>
      <ScrollToTopButton />
      <ToastContainer  stacked={true}/>
    </BrowserRouter>
  );
}

export default App;
