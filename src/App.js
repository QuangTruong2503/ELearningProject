import { HashRouter, Route, Routes } from 'react-router-dom';
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
function App() {
  return (
    <HashRouter>
      <HeaderComponent></HeaderComponent>

      <div className='web-content container-lg'>
        <Routes>
          <Route path='/' Component={HomePage}></Route>

          {/* Login */}
          <Route path='/login' Component={LoginPage}></Route>
          <Route path='/register' Component={RegisterPage} />

          {/* Admin Panel */}
          <Route path='admin/*' Component={AdminPage}></Route>

          {/* My Courses */}
          <Route path='/my-courses' Component={MyCourses}/>

          {/* Course Detail */}
          <Route path='/course/:courseID' Component={CoursesDetail}/>
        </Routes>
      </div>
      <SpeedInsights />
      <Footer></Footer>
      <ScrollToTopButton />
      <ToastContainer />
    </HashRouter>
  );
}

export default App;
