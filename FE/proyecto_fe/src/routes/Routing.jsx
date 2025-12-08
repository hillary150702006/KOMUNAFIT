import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PagRegistro from '../pages/PagRegistro';
import PagLogin from '../pages/PagLogin';
import PagPerfil from '../pages/PagPerfil';
import PagEntrenadores from '../pages/PagEntrenadores';
 import PagRetos from '../pages/PagRetos';
 import PagComunidad from '../pages/PagComunidad';
import Inicio from '../pages/Inicio';
import PagClases from '../pages/PagClases';

const Routing = () => {
    return (
        
            <Routes>
                <Route path="/" element={<Inicio/>} />
                <Route path="/login" element={<PagLogin />} />
                <Route path="/perfil" element={<PagPerfil />} />
                <Route path="/registro" element={<PagRegistro />} />
                <Route path="/comunidad" element={<PagComunidad/>} />
                <Route path="/entrenadores" element={<PagEntrenadores />} />
                <Route path="/Retos" element={<PagRetos/>} />
                 <Route path="/clases" element={<PagClases/>} />
            </Routes>
        
    );
};

export default Routing;