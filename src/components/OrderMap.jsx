import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

// Map coordinates for major Indian cities (approximate for visualization)
const CITY_COORDINATES = {
  'Mumbai': { x: 20, y: 60 },
  'Delhi': { x: 30, y: 28 },
  'Bangalore': { x: 30, y: 75 },
  'Hyderabad': { x: 35, y: 65 },
  'Chennai': { x: 35, y: 80 },
  'Kolkata': { x: 60, y: 45 },
  'Pune': { x: 25, y: 62 },
  'Ahmedabad': { x: 18, y: 50 },
  'Jaipur': { x: 25, y: 40 },
  'Surat': { x: 15, y: 55 },
  'Lucknow': { x: 40, y: 40 },
  'Kanpur': { x: 38, y: 42 },
  'Nagpur': { x: 40, y: 55 },
  'Indore': { x: 30, y: 50 },
  'Thane': { x: 19, y: 59 },
  'Bhopal': { x: 35, y: 52 }
};

const OrderMap = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    // Load order data from localStorage
    const loadOrders = () => {
      const savedOrders = localStorage.getItem('enigmaOrderHistory');
      if (savedOrders) {
        setOrders(JSON.parse(savedOrders));
      }
    };

    loadOrders();
    
    // Simulate map loading for effect
    setTimeout(() => {
      setMapLoaded(true);
    }, 800);
    
    // Refresh every minute to update time displays
    const intervalId = setInterval(() => {
      loadOrders();
    }, 60000);
    
    return () => clearInterval(intervalId);
  }, []);

  // Format time passed since order
  const formatTimePassed = (timestamp) => {
    const now = Date.now();
    const diffMs = now - timestamp;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) {
      return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    }
    
    if (diffHours > 0) {
      return `${diffHours} hr${diffHours > 1 ? 's' : ''} ago`;
    }
    
    return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header Bar */}
      <div className="border-b border-white/10 p-4 flex items-center justify-between">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center space-x-2 text-white/70 hover:text-white transition-colors"
        >
          <ArrowLeft size={16} />
          <span className="font-mono text-sm">BACK</span>
        </button>
        
        <div className="font-mono text-sm">ENIGMA_ORDER_MAP</div>
        
        <div className="w-8"></div> {/* Spacer for alignment */}
      </div>
      
      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="mb-8">
          <h1 className="font-mono text-2xl mb-2">LIVE_ORDERS</h1>
          <p className="text-white/60 font-mono text-sm">
            Visualization of ENIGMA BLACK_DIODE customers from across India
          </p>
        </div>
        
        {/* Map Container */}
        <div className="relative border border-white/20 aspect-square max-w-4xl mx-auto mb-8 bg-zinc-900/40">
          {!mapLoaded ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="font-mono text-sm text-white/60">LOADING MAP DATA...</div>
            </div>
          ) : (
            <>
              {/* Map of India outline (simplified SVG) */}
              <svg 
                viewBox="0 0 100 100" 
                className="w-full h-full opacity-50" 
                fill="none" 
                stroke="rgba(255,255,255,0.3)" 
                strokeWidth="0.5"
              >
                {/* Simplified India map path */}
                <path d="M15,45 C20,25 30,15 40,15 C50,15 60,20 65,30 C70,40 75,50 70,60 C65,70 60,75 50,80 C40,85 30,80 25,70 C20,60 10,65 15,45 Z" />
                
                {/* Grid lines */}
                {[...Array(10)].map((_, i) => (
                  <line key={`v-${i}`} x1={i*10} y1="0" x2={i*10} y2="100" strokeWidth="0.2" />
                ))}
                {[...Array(10)].map((_, i) => (
                  <line key={`h-${i}`} x1="0" y1={i*10} x2="100" y2={i*10} strokeWidth="0.2" />
                ))}
              </svg>
              
              {/* City markers */}
              {Object.entries(CITY_COORDINATES).map(([city, coords]) => (
                <div 
                  key={city}
                  className="absolute w-1.5 h-1.5 rounded-full bg-white/30"
                  style={{ 
                    left: `${coords.x}%`, 
                    top: `${coords.y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  <div className="absolute top-3 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                    <div className="text-[8px] font-mono text-white/50">{city}</div>
                  </div>
                </div>
              ))}
              
              {/* Order pins */}
              {orders.map((order, index) => {
                const coords = CITY_COORDINATES[order.location];
                if (!coords) return null;
                
                return (
                  <div 
                    key={index}
                    className={`absolute w-2.5 h-2.5 bg-pink-400 rounded-full 
                              ${index >= orders.length - 3 ? 'animate-ping' : ''}`}
                    style={{ 
                      left: `${coords.x}%`, 
                      top: `${coords.y}%`,
                      transform: 'translate(-50%, -50%)',
                      opacity: Math.max(0.4, 1 - (index * 0.1))
                    }}
                  >
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 pointer-events-none">
                      <div className="bg-black/80 border border-pink-400/30 px-2 py-1 text-center whitespace-nowrap">
                        <div className="text-[10px] font-mono text-white">{order.name}</div>
                        <div className="text-[8px] font-mono text-pink-400/70">{formatTimePassed(order.timestamp)}</div>
                      </div>
                      <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-pink-400/30 mx-auto"></div>
                    </div>
                  </div>
                );
              })}
            </>
          )}
          
          {/* Map grid overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none"></div>
          
          {/* Scan line effect */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="w-full h-1 bg-pink-400/10 absolute animate-[mapScan_4s_ease-in-out_infinite_alternate]"></div>
          </div>
          
          {/* Corner decorations */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-white/20"></div>
          <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-white/20"></div>
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-white/20"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-white/20"></div>
        </div>
        
        {/* Recent Orders List */}
        <div className="max-w-4xl mx-auto">
          <h2 className="font-mono text-sm mb-4 text-white/60">RECENT_TRANSACTIONS</h2>
          <div className="space-y-2">
            {orders.slice(0, 10).map((order, index) => (
              <div 
                key={index} 
                className="border-l-2 border-pink-400/40 bg-white/5 px-4 py-2 flex justify-between items-center"
              >
                <div className="font-mono text-sm">
                  <span className="text-white">{order.name}</span>
                  <span className="text-white/40"> · </span>
                  <span className="text-white/70">{order.location}</span>
                </div>
                <div className="text-xs font-mono text-pink-400/80">
                  {formatTimePassed(order.timestamp)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="border-t border-white/10 p-4 text-center text-xs font-mono text-white/40">
        ENIGMA.ANALYTICS.SYSTEM · BLACK_DIODE_TRANSACTIONS
      </div>
    </div>
  );
};

export default OrderMap;
