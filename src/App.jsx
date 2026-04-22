import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LabTests from './pages/LabTests';
import Medicines from './pages/Medicines';
import Doctors from './pages/Doctors';
import './index.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lab-tests" element={<LabTests />} />
        <Route path="/medicines" element={<Medicines />} />
        <Route path="/doctors" element={<Doctors />} />
      </Routes>
    </BrowserRouter>
  );
}
