import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Registro from '../pages/Registro';
import Perfil from '../components/Perfil';
import LoginPage from '../pages/Login';

const Routing = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Registro />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/perfil" element={<Perfil />} />
                <Route path="/registro" element={<Registro />} />
            </Routes>
        </Router>
    );
};

export default Routing;