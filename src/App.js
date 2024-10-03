import { HashRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import HeaderComponent from './Component/HeaderComponent';
import HomePage from './Pages/HomePage';
function App() {
  return (
    <HashRouter>
      <HeaderComponent></HeaderComponent>
      <Routes>
        <Route path='/' Component={HomePage}></Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
