import './App.css';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// - Páginas
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Login from './Login/Login';
import Register from './register/Register';

// - Componentes
import NavBar from './component/NavBar';
import Footer from './component/Footer';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <NavBar/>
        <div className='container'>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/about' element={<About/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
          </Routes>
        </div>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
