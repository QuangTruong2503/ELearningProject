import { HashRouter, Route, Routes } from 'react-router-dom';
import {SpeedInsights} from '@vercel/speed-insights/next';
import './CssFolder/App.css';
import HeaderComponent from './Component/Header/HeaderComponent.js';
import Footer from './Component/FooterComponent';
import HomePage from './Pages/HomePage';
import { LoginPage } from './Pages/Login/LoginPage';
import RegisterPage from './Pages/Login/RegisterPage';
import AdminPage from './Pages/Admin/AdminPage';
function App() {
  return (
    <HashRouter>
      <HeaderComponent></HeaderComponent>

      <div className='web-content container'>
        <Routes>
          <Route path='/' Component={HomePage}></Route>

          {/* Login */}
          <Route path='/login' Component={LoginPage}></Route>
          <Route path='/register' Component={RegisterPage} />

          {/* Admin Panel */}
          <Route path='admin/*' Component={AdminPage}></Route>
        </Routes>
      </div>
      <SpeedInsights />
      <Footer></Footer>
    </HashRouter>
  );
}

export default App;
