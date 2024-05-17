import { Route, Routes } from 'react-router-dom';
import './App.css';
import Landing from './Views/Landing/Landing';
import Home from './Views/Home/Home';
import Form from './Views/Form/CreateActivity';
import DetailPage from './Components/DetailPage/DetailPage';
import About from './Components/About/About';

export default function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Landing />} /> {/* Ruta para el componente Landing */}
        <Route path='/home' element={<Home />} /> {/* Ruta para el componente Home */}
        <Route path='/form' element={<Form />} /> {/* Ruta para el componente Form */}
        <Route path='/detail/:id' element={<DetailPage />} /> {/* Ruta para el componente DetailPage */}
        <Route path='/about' element={<About />} /> {/* Ruta para el componente About */}
      </Routes>
    </div>
  );
}

