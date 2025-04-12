import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import './styles.css';

const FuturisticHero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [glitchText, setGlitchText] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [notification, setNotification] = useState(null);
  const [showOrdersSlider, setShowOrdersSlider] = useState(false);
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const productImageRef = useRef(null);
  const ordersHistoryRef = useRef([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Check if the device is mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Generate random Indian names
  const generateRandomName = () => {
    const firstNames = ["Rahul", "Priya", "Amit", "Neha", "Vikram", "Anjali", "Raj", "Sneha", 
                       "Arjun", "Kavita", "Sanjay", "Divya", "Kiran", "Ananya", "Vijay", "Pooja"];
    const lastNames = ["Sharma", "Patel", "Singh", "Verma", "Gupta", "Desai", "Kumar", "Joshi", 
                      "Shah", "Malhotra", "Chopra", "Mehta", "Agarwal", "Reddy", "Iyer", "Kapoor"];
    
    return `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
  };

  // Generate random Indian cities
  const generateRandomLocation = () => {
    const cities = ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata", 
                   "Pune", "Ahmedabad", "Jaipur", "Surat", "Lucknow", "Kanpur", 
                   "Nagpur", "Indore", "Thane", "Bhopal"];
    
    return cities[Math.floor(Math.random() * cities.length)];
  };

  // Show random purchase notifications
  useEffect(() => {
    // Initial delay before first notification
    const initialDelay = setTimeout(() => {
      showRandomNotification();
    }, 5000);

    // Load any existing order history from localStorage
    const savedOrders = localStorage.getItem('enigmaOrderHistory');
    if (savedOrders) {
      ordersHistoryRef.current = JSON.parse(savedOrders);
    }

    return () => clearTimeout(initialDelay);
  }, []);

  // Function to show a notification
  const showRandomNotification = () => {
    const name = generateRandomName();
    const location = generateRandomLocation();
    const timestamp = Date.now();
    
    const newOrder = {
      name,
      location,
      timestamp
    };
    
    // Store order in history
    ordersHistoryRef.current = [...ordersHistoryRef.current, newOrder].slice(-50); // Keep last 50 orders
    localStorage.setItem('enigmaOrderHistory', JSON.stringify(ordersHistoryRef.current));
    
    setNotification(newOrder);
    setShowOrdersSlider(true);
    
    // Hide notification after 4 seconds
    setTimeout(() => {
      setNotification(null);
      
      // Keep the slider visible a bit longer
      setTimeout(() => {
        setShowOrdersSlider(false);
      }, 3000);
      
      // Schedule next notification after random delay (between 20-160 seconds)
      const nextDelay = 2000 + Math.floor(Math.random() * 100000);
      setTimeout(showRandomNotification, nextDelay);
    }, 4000);
  };

  const handleViewOrdersMap = () => {
    navigate('/order-map'); // Navigate to the order map page
  };

  useEffect(() => {
    // Trigger entrance animations with slight delay
    const loadTimer = setTimeout(() => setIsLoaded(true), 300);
    
    // Set up glitch text effect interval
    const glitchInterval = setInterval(() => {
      setGlitchText(true);
      setTimeout(() => setGlitchText(false), 200);
    }, 3000);
    
    // Add 3D rotation effect to product image on mouse move
    const handleMouseMove = (e) => {
      if (productImageRef.current) {
        const box = productImageRef.current;
        const boxRect = box.getBoundingClientRect();
        const boxCenterX = boxRect.left + boxRect.width / 2;
        const boxCenterY = boxRect.top + boxRect.height / 2;
        
        // Calculate mouse position relative to center of box
        const mouseX = e.clientX - boxCenterX;
        const mouseY = e.clientY - boxCenterY;
        
        // Calculate rotation angle (max 10 degrees)
        const rotateY = 10 * (mouseX / (boxRect.width / 2));
        const rotateX = -10 * (mouseY / (boxRect.height / 2));
        
        // Apply transformation
        box.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      }
    };
    
    // Reset transform when mouse leaves
    const handleMouseLeave = () => {
      if (productImageRef.current) {
        productImageRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
      }
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    
    // Prevent body scrolling when side menu is open
    if (isSideMenuOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    
    return () => {
      clearTimeout(loadTimer);
      clearInterval(glitchInterval);
      document.removeEventListener('mousemove', handleMouseMove);
      document.body.classList.remove('overflow-hidden');
    };
  }, [isSideMenuOpen]);

  const handleProductsClick = () => {
    navigate('/products/enigma-black-diode'); // Navigate to the new product page
  };

  return (
    <div className="relative h-screen overflow-hidden bg-black" ref={containerRef}>
      {/* Minimalist Notification System */}
      {notification && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 animate-slideDown">
          <div className="bg-black border-l-2 border-pink-400 px-5 py-2 flex items-center space-x-4 shadow-[0_0_15px_rgba(236,72,153,0.15)]">
            <div className="w-2 h-2 bg-pink-400 rounded-full animate-ping"></div>
            <div className="font-mono text-xs text-white">
              <span className="text-white">{notification.name}</span>
              <span className="text-white/50"> · </span>
              <span className="text-white">{notification.location}</span>
              <span className="text-white/50"> · </span>
              <span className="text-pink-400">ORDERED</span>
            </div>
          </div>
        </div>
      )}
      
      {/* Orders Map Slider */}
      <div 
        className={`fixed bottom-8 left-0 z-40 transform transition-transform duration-500 ${
          showOrdersSlider ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div 
          onClick={handleViewOrdersMap}
          className="bg-black border border-pink-400/30 border-l-0 pl-5 pr-8 py-3 flex items-center cursor-pointer group"
        >
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full border border-pink-400/50 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-pink-400">
                <circle cx="12" cy="10" r="3"></circle>
                <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z"></path>
              </svg>
            </div>
            <div className="font-mono text-xs">
              <div className="text-white">VIEW LIVE ORDERS</div>
              <div className="text-pink-400/70 text-[10px]">SEE WHO'S JOINING ENIGMA</div>
            </div>
          </div>
          <div className="absolute right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-400/70">
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </div>
        </div>
      </div>
      
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
      
      {/* Side Menu with Right-to-Left Animation */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          isSideMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsSideMenuOpen(false)}
      >
        <div 
          className={`absolute top-0 bottom-0 right-0 w-full sm:w-96 md:w-[28rem] bg-gradient-to-b from-gray-50 to-gray-100 
          transition-transform duration-500 ease-out shadow-[0_0_25px_rgba(0,0,0,0.2)] ${
            isSideMenuOpen ? 'translate-x-0' : 'translate-x-[100%]'
          }`}
          onClick={e => e.stopPropagation()}
        >
          {/* Space theme background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Star field */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0)_0,_rgba(255,255,255,.15)_3px,_rgba(255,255,255,0)_4px)] bg-[size:30px_30px]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0)_0,_rgba(255,255,255,.1)_2px,_rgba(255,255,255,0)_3px)] bg-[size:20px_20px]"></div>
            
            {/* Space nebula effects */}
            <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-gradient-to-br from-indigo-200/10 via-purple-300/10 to-transparent opacity-40 blur-3xl"></div>
            <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-gradient-to-tr from-blue-200/10 via-cyan-300/10 to-transparent opacity-40 blur-3xl"></div>
            
            {/* Moving star effect */}
            <div className="absolute h-px w-16 bg-white/50 top-1/4 left-0 animate-[shooting-star_8s_ease-in-out_infinite_alternate]"></div>
            <div className="absolute h-px w-8 bg-white/30 top-3/4 right-1/3 animate-[shooting-star_12s_ease-in-out_infinite_alternate-reverse]"></div>
          </div>
          
          {/* Side Menu Header */}
          <div className="relative h-16 border-b border-slate-200 flex items-center justify-between px-6">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse mr-3"></div>
              <h3 className="text-slate-800 font-mono text-sm tracking-wider">ENIGMA_SYSTEM</h3>
            </div>
            <button 
              onClick={() => setIsSideMenuOpen(false)}
              className="text-slate-500 hover:text-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Side Menu Content */}
          <div className="relative p-6">
            <div className="space-y-8">
              {/* Featured Product with Cosmic Frame */}
              <div className="mb-8">
                <h4 className="text-slate-500 font-mono text-xs mb-4">BLACK_DIODE SERIES</h4>
                <div className="border border-slate-200 shadow-inner p-4 bg-white/80 backdrop-blur-sm rounded-sm overflow-hidden relative">
                  {/* Cosmic Product Frame */}
                  <div className="relative aspect-square mb-3 overflow-hidden border border-slate-300 shadow-lg rounded-sm bg-gradient-to-br from-white to-slate-100">
                    {/* Corner Decorations */}
                    <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-blue-400"></div>
                    <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-blue-400"></div>
                    <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-blue-400"></div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-blue-400"></div>
                    
                    {/* Cosmic background for product */}
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-black opacity-80"></div>
                    
                    <img 
                      src="/images/black_diodev1.png" 
                      alt="ENIGMA BLACK_DIODE" 
                      className="w-full h-full object-cover relative z-10"
                    />
                    <div className="absolute bottom-2 right-2 bg-slate-900/80 backdrop-blur-sm px-2 py-1 font-mono text-xs text-white z-20">
                      $849
                    </div>
                  </div>
                  <h5 className="text-slate-800 font-mono text-sm font-medium">ENIGMA BLACK_DIODE</h5>
                  <div 
                    onClick={handleProductsClick}
                    className="flex items-center space-x-2 text-blue-500 text-xs mt-2 hover:text-blue-700 transition-colors cursor-pointer group"
                  >
                    <span>EXPLORE SERIES</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover:translate-x-1 transition-transform">
                      <path d="M5 12h14"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </svg>
                  </div>
                  
                  {/* Decorative lines */}
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent"></div>
                </div>
              </div>

              {/* Navigation Links */}
              <div className="space-y-3">
                <h4 className="text-slate-500 font-mono text-xs mb-4">NAVIGATION</h4>
                
                <div 
                  onClick={() => navigate('/')}
                  className="flex items-center justify-between py-3 px-4 bg-white shadow-sm border-l-2 border-blue-500 text-slate-800 rounded-r-sm transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-blue-500 font-mono text-xs">01</span>
                    <span className="text-sm sm:text-base font-mono">HOME</span>
                  </div>
                  <div className="text-blue-400/70">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m9 18 6-6-6-6"></path>
                    </svg>
                  </div>
                </div>
                
                <div 
                  onClick={() => navigate('/about')}
                  className="flex items-center justify-between py-3 px-4 bg-white/50 hover:bg-white hover:shadow-sm border-l-2 border-transparent hover:border-blue-400 text-slate-600 hover:text-slate-800 rounded-r-sm transition-all duration-300 cursor-pointer group"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-slate-400 group-hover:text-blue-500 font-mono text-xs transition-colors">02</span>
                    <span className="text-sm sm:text-base font-mono">PRODUCTS</span>
                  </div>
                  <div className="text-slate-300 group-hover:text-blue-400/70">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m9 18 6-6-6-6"></path>
                    </svg>
                  </div>
                </div>
                
                <div 
                  onClick={() => navigate('/products/enigma-black-diode')}
                  className="flex items-center justify-between py-3 px-4 bg-white/50 hover:bg-white hover:shadow-sm border-l-2 border-transparent hover:border-blue-400 text-slate-600 hover:text-slate-800 rounded-r-sm transition-all duration-300 cursor-pointer group"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-slate-400 group-hover:text-blue-500 font-mono text-xs transition-colors">03</span>
                    <span className="text-sm sm:text-base font-mono">BLACK_DIODE</span>
                  </div>
                  <div className="text-slate-300 group-hover:text-blue-400/70">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m9 18 6-6-6-6"></path>
                    </svg>
                  </div>
                </div>
                
                <div 
                  onClick={() => navigate('/terms')}
                  className="flex items-center justify-between py-3 px-4 bg-white/50 hover:bg-white hover:shadow-sm border-l-2 border-transparent hover:border-blue-400 text-slate-600 hover:text-slate-800 rounded-r-sm transition-all duration-300 cursor-pointer group"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-slate-400 group-hover:text-blue-500 font-mono text-xs transition-colors">04</span>
                    <span className="text-sm sm:text-base font-mono">ABOUT</span>
                  </div>
                  <div className="text-slate-300 group-hover:text-blue-400/70">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m9 18 6-6-6-6"></path>
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Cosmic Connection Status */}
              <div className="mt-8 pt-4 border-t border-slate-200">
                <div className="px-4 py-3 rounded-sm bg-white/50 backdrop-blur-sm">
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-slate-500 font-mono">SYSTEM STATUS</div>
                    <div className="flex items-center space-x-1">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                      <div className="text-xs text-slate-500 font-mono">ONLINE</div>
                    </div>
                  </div>
                  <div className="mt-2 h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full w-3/4 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full"></div>
                  </div>
                  <div className="mt-1 flex justify-between">
                    <div className="text-[10px] text-slate-400 font-mono">LOADING SEQUENCE</div>
                    <div className="text-[10px] text-slate-600 font-mono">75%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Side Menu Footer */}
          <div className="absolute bottom-0 left-0 right-0 border-t border-slate-200 p-4 backdrop-blur-sm">
            <div className="flex justify-between items-center">
              <div className="text-slate-500 font-mono text-xs">ENIGMA_2025</div>
              <div className="text-blue-500 font-mono text-xs">BLACK_DIODE</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced background grid patterns - more premium look */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,#333_1px,transparent_1px),linear-gradient(-45deg,#222_1px,transparent_1px)] bg-[size:22px_22px]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,#333_1px,transparent_1px),linear-gradient(90deg,#222_1px,transparent_1px)] bg-[size:50px_50px] opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-900/20 to-black" />
      </div>
      
      {/* Premium ENIGMA text overlay */}
      <div className="absolute inset-0 flex items-center justify-center z-0 opacity-5 pointer-events-none overflow-hidden">
        <h1 className="text-white text-[30vw] font-bold tracking-tighter font-mono">ENIGMA</h1>
      </div>
      
      {/* Enhanced diagonal stripes */}
      <div className="absolute right-0 top-0 h-full w-1/3">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,rgba(255,255,255,0.05)_0px,rgba(255,255,255,0.05)_10px,transparent_10px,transparent_20px)]" />
      </div>

      {/* Abstract geometric shapes for premium background */}
      <div className="absolute -left-20 top-1/4 w-40 h-40 border border-white/10 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute right-10 bottom-1/4 w-96 h-96 border border-white/5 rounded-full opacity-10"></div>
      <div className="absolute bottom-10 left-1/4 w-60 h-60 border border-white/10 rounded-full opacity-5"></div>

      {/* Main content container */}
      <div className={`relative z-10 max-w-7xl mx-auto pt-12 md:pt-20 px-4 md:px-8 h-full flex flex-col 
        transition-all duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        
        {/* Enhanced top section with premium logo and code */}
        <div className="mb-4 md:mb-8 flex justify-between items-start">
          <div className="flex flex-col animate-slideInFromLeft">
            <div className="text-xs text-white/50 font-mono mb-1 md:mb-2 tracking-widest">ELEVATE | CONQUER | ACHIEVE</div>
            <div className="flex items-center space-x-3 md:space-x-4">
              <div className="w-12 h-12 md:w-16 md:h-16 border border-white/40 flex items-center justify-center bg-gradient-to-br from-black to-zinc-900 overflow-hidden">
                <img 
                  src="images/logo.jpeg" 
                  alt="ENIGMA Logo" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-xl md:text-2xl font-mono tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">ENIGMA</div>
            </div>
          </div>
          <div className="text-right text-xs text-white/50 font-mono animate-slideInFromRight">
            <div>STRENGTH SERIES</div>
            <div className="mt-1">BLACK_DIODE</div>
            <div className="mt-1 text-white/30">ED.2025</div>
          </div>
        </div>
        
        {/* Enhanced main headline with inspirational text - optimized for mobile */}
        <div className="my-8 md:my-16 animate-fadeIn">
          <h1 className={`text-4xl md:text-7xl font-mono font-bold tracking-wide mb-4 md:mb-6 
            ${glitchText ? 'animate-glitch' : ''} leading-tight`}>
            BE<br className="md:hidden" /> LIMITLESS<br />
          </h1>
          <p className="text-white/70 font-mono text-xs md:text-sm leading-relaxed max-w-lg">
            Embody strength with every step, Chase Dopamine with every heartbeat,
            and conquer the world with every breath.
          </p>
    
          <div className="h-px bg-gradient-to-r from-white/40 via-white/20 to-transparent w-full mt-4 md:mt-6"></div>
        </div>
        
        {/* Enhanced featured product section - reorganized for mobile */}
        <div className="mt-auto mb-10 md:mb-20">
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 ${isMobile ? 'flex flex-col-reverse' : ''}`}>
            
            {/* Product display - appears first on mobile */}
            <div className={`${isMobile ? 'mb-8' : 'flex justify-end'} animate-slideInFromRight`}>
              <div 
                className={`${isMobile ? 'w-full aspect-square max-w-xs mx-auto' : 'w-96 h-96'} relative overflow-hidden transition-all duration-500 
                hover:shadow-[0_0_35px_rgba(255,255,255,0.2)] bg-gradient-to-br from-zinc-900 to-black`}
              >
                {/* Premium frame with double border */}
                <div className="absolute inset-[3px] border border-white/30 z-10 pointer-events-none"></div>
                <div className="absolute inset-[6px] border border-white/10 z-10 pointer-events-none"></div>
                
                {/* Ambient lighting effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-black via-zinc-900/50 to-zinc-800/10 opacity-80"></div>
                <div className="absolute -left-20 -top-20 w-40 h-40 bg-gradient-to-br from-indigo-500/10 to-transparent rounded-full blur-2xl"></div>
                <div className="absolute -right-20 -bottom-20 w-40 h-40 bg-gradient-to-br from-pink-500/10 to-transparent rounded-full blur-2xl"></div>
                
                {/* Technical grid overlay with enhanced precision */}
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:10px_10px]"></div>
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
                
                {/* Static geometric elements */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-3/4 h-3/4 border border-white/5 rounded-full"></div>
                  <div className="absolute w-1/2 h-1/2 border border-white/8 rounded-full"></div>
                  <div className="absolute w-1/3 h-1/3 border border-white/10 rounded-full"></div>
                </div>
                
                {/* Scan line effect with subtle animation */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent absolute top-1/3 animate-[moveVertical_8s_ease-in-out_infinite_alternate]"></div>
                  <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent absolute top-2/3 animate-[moveVertical_12s_ease-in-out_infinite_alternate-reverse]"></div>
                </div>
                
                {/* Enhanced product image with premium lighting effects */}
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <div className="relative w-4/5 h-auto">
                    {/* Reflection/shadow effect */}
                    <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-2/3 h-4 bg-gradient-to-t from-pink-500/15 to-transparent blur-md"></div>
                    
                    <img 
                      src="/images/black_diodev1.png" 
                      alt="ENIGMA BLACK_DIODE" 
                      className="w-full h-auto object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.25)] hover:scale-105 transition-all duration-700"
                    />
                  </div>
                </div>
                
                {/* Premium corner elements */}
                <div className="absolute top-0 left-0 w-10 h-10">
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-white/40 to-transparent"></div>
                  <div className="absolute top-0 left-0 h-full w-[1px] bg-gradient-to-b from-white/40 to-transparent"></div>
                </div>
                <div className="absolute top-0 right-0 w-10 h-10">
                  <div className="absolute top-0 right-0 w-full h-[1px] bg-gradient-to-l from-white/40 to-transparent"></div>
                  <div className="absolute top-0 right-0 h-full w-[1px] bg-gradient-to-b from-white/40 to-transparent"></div>
                </div>
                <div className="absolute bottom-0 left-0 w-10 h-10">
                  <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-white/40 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 h-full w-[1px] bg-gradient-to-t from-white/40 to-transparent"></div>
                </div>
                <div className="absolute bottom-0 right-0 w-10 h-10">
                  <div className="absolute bottom-0 right-0 w-full h-[1px] bg-gradient-to-l from-white/40 to-transparent"></div>
                  <div className="absolute bottom-0 right-0 h-full w-[1px] bg-gradient-to-t from-white/40 to-transparent"></div>
                </div>
                
                {/* Technical data displays with premium styling */}
                <div className="absolute top-4 left-6 right-6 md:left-12 md:right-12 flex justify-between items-center z-30">
                  <div className="px-2 py-1 md:px-3 md:py-1 border border-white/10 rounded-sm bg-black/40">
                    <div className="text-[10px] md:text-xs font-mono text-white/60 flex items-center space-x-2">
                      <span className="inline-block w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                      <span>PREMIUM</span>
                    </div>
                  </div>
                  <div className="text-[10px] md:text-xs font-mono text-white/60 tracking-wider">ED.2025</div>
                </div>
                
                {/* Product specs overlay with enhanced styling */}
                <div className="absolute bottom-4 inset-x-4 px-3 py-2 md:px-4 md:py-2 backdrop-blur-sm bg-black/30 border border-white/10 z-30">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-sm md:text-base text-white font-mono font-bold tracking-wide">BLACK_DIODE</div>
                      <div className="text-[10px] md:text-xs text-white/60 mt-0.5 font-mono">FLAGSHIP EDITION</div>
                    </div>
                    <div className="font-mono text-[10px] md:text-xs py-1 px-2 md:px-3 border border-white/20 text-white/90">
                      $849
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Product info - appears second on mobile */}
            <div className="space-y-4 md:space-y-8 self-center animate-slideInFromLeft">
              <h2 className="text-2xl md:text-3xl font-mono font-bold tracking-wider text-center md:text-left">
                |LATEST DROP : BLACK_DIODE<span className="text-white/50">v1</span>
              </h2>
              <div className="flex items-center space-x-3 justify-center md:justify-start">
                <div className="w-6 md:w-8 h-1 bg-white/40"></div>
                <span className="text-white/70 text-xs md:text-sm font-mono">FLAGSHIP EDITION</span>
              </div>
              
              <div className="flex items-center space-x-4 justify-center md:justify-start">
                <button 
                  onClick={handleProductsClick}
                  className="px-6 md:px-8 py-2.5 md:py-3 bg-gradient-to-r from-white/10 to-white/5 border border-white/20 font-mono text-sm hover:border-white/40 transition-all duration-300 group flex items-center"
                >
                  <span>EXPLORE NOW</span>
                  <div className="w-0 h-[1px] bg-white group-hover:w-6 transition-all duration-300 ml-0 group-hover:ml-3"></div>
                </button>
                <div className="text-white/40 text-[10px] md:text-xs font-mono">
                  LIMITED RELEASE
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Enhanced footer details - optimized for mobile */}
        <div className="py-4 flex justify-between text-[10px] md:text-xs font-mono text-white/40">
          <div>FORGED FOR GREATNESS</div>
          <div>ENIGMA.BLACK_DIODE.2025™</div>
        </div>
      </div>
      
      {/* Enhanced geometric elements */}
      <div className="absolute top-0 right-1/4 h-full w-px bg-gradient-to-b from-transparent via-white/20 to-transparent transform rotate-45"></div>
      <div className="absolute top-0 left-1/3 h-full w-px bg-gradient-to-b from-transparent via-white/15 to-transparent transform -rotate-45"></div>
      
      {/* Enhanced decorative animations */}
      <div className="absolute top-0 left-0 w-px h-full bg-white/10 animate-pulse"></div>
      <div className="absolute top-0 right-0 w-px h-full bg-white/10 animate-pulse"></div>
      <div className="absolute top-0 left-0 w-full h-px bg-white/10"></div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-white/10"></div>
      
      {/* Additional data streams with enhanced styling */}
      <div className="absolute bottom-4 left-4 text-white/40 text-xs font-mono">
        <div>エニグマ</div>
        <div>STRENGTH • PRIDE • LEGACY</div>
      </div>
      
      <div className="absolute bottom-4 right-4 text-white/40 text-xs font-mono text-right">
        <div>ENIGMA</div>
        <div>BD-2025</div>
      </div>
    </div>
  );
};

// Add these new animations to your styles.css file
const AnimationStyles = () => {
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      @keyframes moveVertical {
        0% { transform: translateY(0); }
        100% { transform: translateY(300px); }
      }
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      @keyframes reverse {
        0% { transform: rotate(360deg); }
        100% { transform: rotate(0deg); }
      }
      @keyframes slideDown {
        0% { transform: translate(-50%, -100%); opacity: 0; }
        10% { transform: translate(-50%, 0); opacity: 1; }
        90% { transform: translate(-50%, 0); opacity: 1; }
        100% { transform: translate(-50%, -100%); opacity: 0; }
      }
      @keyframes slideInFromLeft {
        0% { transform: translateX(-30px); opacity: 0; }
        100% { transform: translateX(0); opacity: 1; }
      }
      @keyframes slideInFromRight {
        0% { transform: translateX(30px); opacity: 0; }
        100% { transform: translateX(0); opacity: 1; }
      }
      @keyframes fadeIn {
        0% { opacity: 0; }
        100% { opacity: 1; }
      }
    `;
    document.head.appendChild(styleElement);
    
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);
  
  return null;
};

const FuturisticHomepage = () => {
  const [apiStatus, setApiStatus] = useState(null);
  
  useEffect(() => {
    // Connect to API if needed
    const initializeApi = async () => {
      try {
        // This is a placeholder for any API initialization
        setApiStatus('connected');
        console.log('✓ API connection initialized');
      } catch (error) {
        console.error('Failed to initialize API:', error);
      }
    };

    initializeApi();

    return () => {
      // Clear any data when unmounting
      sessionStorage.clear();
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <AnimationStyles />
      <div className="relative">
        <FuturisticHero />
      </div>
    </div>
  );
};

export default FuturisticHomepage;