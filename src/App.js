import { HashRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import HeaderComponent from './Component/HeaderComponent';
import Footer from './Component/FooterComponent';
import HomePage from './Pages/HomePage';
import { LoginPage } from './Pages/Login/LoginPage';
import RegisterPage from './Pages/Login/RegisterPage';
function App() {
  return (
    <HashRouter>
      <HeaderComponent></HeaderComponent>

      <Routes>
        <Route path='/' Component={HomePage}></Route>

        {/* Login */}
        <Route path='/login' Component={LoginPage}></Route>
        <Route path='/register' Component={RegisterPage} />
      </Routes>

      <Footer></Footer>
    </HashRouter>
  );
}

export default App;
