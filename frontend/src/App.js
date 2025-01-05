import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Importovanie potrebných komponentov
import Header from './components/Header';
import Footer from './components/Footer';
import Index from './components/Index'; // Komponent pre domovskú stránku
import Register from './components/Register'; // Komponent pre registráciu
import Hobbies from './components/Hobbies'; // Komponent pre Hobbies
import Changes from './components/Changes'; // Komponent pre Changes
import Vypis from './components/Vypis' // Komponent pre Vypis
import GDPRNotification from "./components/GDPRNotification";

function App() {
  return (
    <Router> {/* Router obklopuje celú aplikáciu */}
      <div className="app">
        <Header /> {/* Hlavička */}
        <Routes>
          <Route path="/" element={<Index />} /> {/* Domovská stránka */}
          <Route path="/register" element={<Register />} /> {/* Registrácia */}
          <Route path="/hobbies" element={<Hobbies />} /> {/* Podstránka Hobbies */}
          <Route path="/changes" element={<Changes />} /> {/* Podstránka Changes */}
          <Route path="/vypis" element={<Vypis />} /> {/*Podstránka Vypis */}
        </Routes>
        <Footer /> {/* Pätička */}
        <GDPRNotification /> {/* Umiestni GDPR upozornenie */}
      </div>
    </Router>
  );
}

export default App;
