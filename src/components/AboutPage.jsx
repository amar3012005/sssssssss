// AboutPage.jsx
import React, { useState } from 'react';
import ProductCatalog from './AboutSection'; // Import the renamed component (previously AboutSection)
import { Menu, X } from 'lucide-react';

const AboutPage = () => {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Simplified navbar - only menu toggle button */}
      <div className="fixed top-6 right-6 z-40">
        <button
          onClick={() => setIsSideMenuOpen(!isSideMenuOpen)}
          className="flex items-center space-x-2 text-white hover:text-white/80 transition-colors"
          aria-label="Toggle menu"
        >
          <span className="text-xs tracking-wider hidden sm:inline-block">MENU_</span>
          {isSideMenuOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </div>
      
      {/* Side Menu with Left-to-Right Animation */}
      <div 
        className={`fixed inset-0 bg-black/60 z-50 transition-opacity duration-300 ${
          isSideMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsSideMenuOpen(false)}
      >
        <div 
          className={`absolute top-0 bottom-0 right-0 w-full sm:w-96 md:w-[28rem] bg-black border-l border-white/10 
          transition-transform duration-500 ease-out ${
            isSideMenuOpen ? 'translate-x-0' : 'translate-x-[100%]'
          }`}
          onClick={e => e.stopPropagation()}
        >
          {/* Side Menu Header */}
          <div className="h-16 border-b border-white/10 flex items-center justify-between px-6">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-white/70 rounded-full animate-pulse mr-3"></div>
              <h3 className="text-white font-mono text-sm tracking-wider">INFO_PANEL</h3>
            </div>
            <button 
              onClick={() => setIsSideMenuOpen(false)}
              className="text-white/70 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Side Menu Content */}
          <div className="p-6">
            <div className="space-y-6">
              <h4 className="text-white/50 font-mono text-xs mb-4">ABOUT ENIGMA</h4>
              <p className="text-white/70 text-sm">
                ENIGMA represents the pinnacle of innovation and design. Our BLACK_DIODE series embodies strength, 
                resilience, and uncompromising quality.
              </p>
              
              <div className="h-px bg-white/10 my-6"></div>
              
              <h4 className="text-white/50 font-mono text-xs mb-4">OUR MISSION</h4>
              <p className="text-white/70 text-sm">
                To create products that inspire greatness and push boundaries. We believe in forging a path for those 
                who refuse to yield and demand excellence.
              </p>
              
              <div className="h-px bg-white/10 my-6"></div>
              
              <h4 className="text-white/50 font-mono text-xs mb-4">CONTACT</h4>
              <p className="text-white/70 text-sm">
                support@enigma-tech.com<br />
                1-800-ENIGMA1<br />
                Tokyo Design District<br />
                Japan
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="pt-16">
        <ProductCatalog />
      </div>
    </div>
  );
};

export default AboutPage;