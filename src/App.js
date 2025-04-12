import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './components/Homepage';
import Menu from './components/Menu';
import AboutPage from './components/AboutPage';
import UnderProgress from './components/UnderProgress';

import Navbar from './components/Navbar';
import Checkout from './components/Checkout';
import WaitingRoom from './components/WaitingRoom';
import PersonalInfo from './components/PersonalInfo';
import FuturisticOrderConfirmation from './components/FuturisticOrderConfirmation';
import Terms from './components/Terms';
import CampusSelection from './components/campus';
import EnigmaProductSlider from './components/products/EnigmaProductSlider';
import OrderMap from './components/OrderMap';

// Layout with navbar
const Layout = ({ children }) => (
  <div className="min-h-screen bg-black text-white">
    <Navbar />
    <div className="pt-24">
      {children}
    </div>
  </div>
);

// Full screen layout without navbar padding
const FullScreenLayout = ({ children }) => (
  <div className="min-h-screen bg-black text-white">
    {children}
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FullScreenLayout><Homepage /></FullScreenLayout>} />
        <Route path="/menu/:restaurantId" element={<Layout><Menu /></Layout>} />
        <Route path="/about" element={<Layout><AboutPage /></Layout>} />

        <Route path="/checkout" element={<Layout><Checkout /></Layout>} />
        <Route path="/personal-info" element={<Layout><PersonalInfo /></Layout>} />
        <Route path="/waiting-room" element={<Layout><WaitingRoom /></Layout>} />
        <Route path="/order-confirmation" element={<Layout><FuturisticOrderConfirmation /></Layout>} />
        <Route path="/underprogress" element={<UnderProgress />} />
        <Route path="/campus" element={<Layout><CampusSelection /></Layout>} />

        <Route path="/terms" element={<Layout><Terms /></Layout>} />
        
        {/* Product routes */}
        <Route path="/products/enigma-black-diode" element={<FullScreenLayout><EnigmaProductSlider /></FullScreenLayout>} />

        <Route path="/order-map" element={<OrderMap />} />
      </Routes>
    
    </Router>
  );
}

export default App;