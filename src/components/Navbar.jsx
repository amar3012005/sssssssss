import React, { useState, useEffect } from 'react';
import { ChevronDown, Menu, X, ArrowRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const [currentTime, setCurrentTime] = useState('00:00:00');
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [featuredProduct, setFeaturedProduct] = useState({
    name: "HOLO_PROJECTOR",
    image: "/images/pi.jpeg",
    price: "$899.99"
  });
  
  useEffect(() => {
    // Set active section based on current path
    const path = location.pathname;
    if (path === '/') setActiveSection('home');
    else if (path === '/about') setActiveSection('products');
    else if (path === '/underprogress') setActiveSection('orders');
    else if (path === '/terms') setActiveSection('about');
  }, [location]);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { hour12: false }));
    }, 1000);
    
    // Add body class when side menu is open to prevent scrolling
    if (isSideMenuOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    
    return () => {
      clearInterval(timer);
      document.body.classList.remove('overflow-hidden');
    };
  }, [isSideMenuOpen]);

  const handleNavigation = (section) => {
    setActiveSection(section);
    setIsSideMenuOpen(false);
  };

  return (
    <>
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
          className={`absolute top-0 bottom-0 left-0 w-full sm:w-96 md:w-[28rem] bg-black border-r border-white/10 
          transition-transform duration-500 ease-out ${
            isSideMenuOpen ? 'translate-x-0' : 'translate-x-[-100%]'
          }`}
          onClick={e => e.stopPropagation()}
        >
          {/* Side Menu Header */}
          <div className="h-16 border-b border-white/10 flex items-center justify-between px-6">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-white/70 rounded-full animate-pulse mr-3"></div>
              <h3 className="text-white font-mono text-sm tracking-wider">NAV_SYSTEM</h3>
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
              {/* Featured Product with Rectangular Frame */}
              <div className="mb-8">
                <h4 className="text-white/50 font-mono text-xs mb-4">FEATURED_PRODUCT</h4>
                <div className="border border-white/20 p-3 bg-black/50">
                  {/* Rectangular Product Frame */}
                  <div className="relative aspect-square mb-3 overflow-hidden border-2 border-white/30">
                    {/* Corner Decorations */}
                    <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white/60"></div>
                    <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-white/60"></div>
                    <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-white/60"></div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white/60"></div>
                    
                    <img 
                      src={featuredProduct.image} 
                      alt={featuredProduct.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 font-mono text-xs text-white">
                      {featuredProduct.price}
                    </div>
                  </div>
                  <h5 className="text-white font-mono text-sm">{featuredProduct.name}</h5>
                  <Link 
                    to="/about" 
                    className="flex items-center space-x-2 text-white/50 text-xs mt-2 hover:text-white transition-colors"
                    onClick={() => setIsSideMenuOpen(false)}
                  >
                    <span>VIEW DETAILS</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>

              {/* Navigation Links */}
              <div className="space-y-6">
                <h4 className="text-white/50 font-mono text-xs mb-4">NAVIGATION</h4>
                
                <Link
                  to="/"
                  onClick={() => handleNavigation('home')}
                  className={`flex items-center justify-between py-3 px-4 border-l-2 ${
                    activeSection === 'home' 
                      ? 'border-white text-white bg-white/5' 
                      : 'border-transparent text-white/70 hover:text-white hover:border-white/50 hover:bg-white/5'
                  } transition-all duration-300`}
                >
                  <div className="flex items-center">
                    <span className="text-sm sm:text-base font-mono">01 / HOME</span>
                  </div>
                  <div className="text-xs text-white/50">{currentTime}</div>
                </Link>
                
                <Link
                  to="/about"
                  onClick={() => handleNavigation('products')}
                  className={`flex items-center justify-between py-3 px-4 border-l-2 ${
                    activeSection === 'products' 
                      ? 'border-white text-white bg-white/5' 
                      : 'border-transparent text-white/70 hover:text-white hover:border-white/50 hover:bg-white/5'
                  } transition-all duration-300`}
                >
                  <div className="flex items-center">
                    <span className="text-sm sm:text-base font-mono">02 / PRODUCTS</span>
                  </div>
                  <div className="text-xs text-white/50">{currentTime}</div>
                </Link>
                
                <Link
                  to="/underprogress"
                  onClick={() => handleNavigation('orders')}
                  className={`flex items-center justify-between py-3 px-4 border-l-2 ${
                    activeSection === 'orders' 
                      ? 'border-white text-white bg-white/5' 
                      : 'border-transparent text-white/70 hover:text-white hover:border-white/50 hover:bg-white/5'
                  } transition-all duration-300`}
                >
                  <div className="flex items-center">
                    <span className="text-sm sm:text-base font-mono">03 / DROPS</span>
                  </div>
                  <div className="text-xs text-white/50">{currentTime}</div>
                </Link>
                
                <Link
                  to="/terms"
                  onClick={() => handleNavigation('about')}
                  className={`flex items-center justify-between py-3 px-4 border-l-2 ${
                    activeSection === 'about' 
                      ? 'border-white text-white bg-white/5' 
                      : 'border-transparent text-white/70 hover:text-white hover:border-white/50 hover:bg-white/5'
                  } transition-all duration-300`}
                >
                  <div className="flex items-center">
                    <span className="text-sm sm:text-base font-mono">04 / ABOUT</span>
                  </div>
                  <div className="text-xs text-white/50">{currentTime}</div>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Side Menu Footer */}
          <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 p-4">
            <div className="flex justify-between items-center">
              <div className="text-white/50 font-mono text-xs">SYSTEM_V2.6</div>
              <div className="text-white/50 font-mono text-xs">{currentTime}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;