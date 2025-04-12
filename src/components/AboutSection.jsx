import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// Product categories
const categories = ['all', 'tech', 'apparel', 'accessories', 'limited'];

// Sample product data
const productData = [
  {
    id: 1,
    name: "AW.QUANTUM_WATCH",
    category: ["tech", "accessories"],
    rating: 4.8,
    price: 249.99,
    deliveryTime: "3-5",
    image: "/images/alpha.jpeg", // Use existing image as placeholder
    tags: ["Smart Watch", "Tech", "New"],
    stockStatus: "in-stock",
    features: ["AI Assistant", "Health Tracking", "Holographic Display"]
  },
  {
    id: 2,
    name: "NEURO_HEADSET",
    category: ["tech"],
    rating: 4.9,
    price: 599.99,
    deliveryTime: "7-10",
    image: "/images/beta.jpeg", // Use existing image as placeholder
    tags: ["Limited Edition", "Smart Device", "Premium"],
    stockStatus: "limited",
    features: ["Neural Interface", "Spatial Audio", "AR Compatible"]
  },
  {
    id: 3,
    name: "URBAN_TECHWEAR",
    category: ["apparel"],
    rating: 4.7,
    price: 179.99,
    deliveryTime: "2-4",
    image: "/images/gamma.jpeg", // Use existing image as placeholder
    tags: ["Waterproof", "Modular", "Streetwear"],
    stockStatus: "in-stock",
    features: ["Temperature Regulation", "Adaptive Fit", "Smart Fabric"]
  },
  {
    id: 4,
    name: "NANO_BACKPACK",
    category: ["accessories"],
    rating: 4.5,
    price: 129.99,
    deliveryTime: "2-3",
    image: "/images/delta.jpeg", // Use existing image as placeholder
    tags: ["Anti-Theft", "USB Charging", "Tactical"],
    stockStatus: "in-stock",
    features: ["RFID Protection", "Expandable", "Water Resistant"]
  },
  {
    id: 5,
    name: "HOLO_PROJECTOR",
    category: ["tech", "limited"],
    rating: 4.9,
    price: 899.99,
    deliveryTime: "10-14",
    image: "/images/pi.jpeg", // Use existing image as placeholder
    tags: ["Limited Drop", "Collectible", "Premium"],
    stockStatus: "pre-order",
    features: ["3D Projection", "Voice Control", "Gesture Recognition"]
  }
];

const ProductCatalog = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [isLoaded, setIsLoaded] = useState(false);
  const [products, setProducts] = useState(productData);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const navigate = useNavigate();
  const containerRef = useRef(null);

  useEffect(() => {
    // Animation effect on load
    setIsLoaded(true);
    
    // Add some visual effects on scroll
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (containerRef.current) {
        // Add parallax effect or other scroll-based animations if desired
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  const handleProductClick = (product) => {
    // In a real app, navigate to product detail page
    console.log('Selected product:', product);
    alert(`${product.name} selected - Price: $${product.price}`);
    
    // For future implementation:
    // navigate(`/product/${product.id}`);
  };

  const getStatusDisplay = (product) => {
    switch (product.stockStatus) {
      case 'in-stock':
        return {
          text: 'IN STOCK',
          classes: 'bg-blue-500/20 text-blue-400'
        };
      case 'limited':
        return {
          text: 'LIMITED',
          classes: 'bg-yellow-500/20 text-yellow-400'
        };
      case 'pre-order':
        return {
          text: 'PRE-ORDER',
          classes: 'bg-purple-500/20 text-purple-400'
        };
      case 'sold-out':
        return {
          text: 'SOLD OUT',
          classes: 'bg-red-500/20 text-red-400'
        };
      default:
        return {
          text: 'CHECKING',
          classes: 'bg-gray-500/20 text-gray-400'
        };
    }
  };

  // Data stream effect for visual decoration
  const DataStream = () => (
    <div className="fixed right-4 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-white/40 to-transparent">
      <div className="w-1 h-1 bg-white rounded-full animate-ping absolute top-0 translate-x-[-50%]"></div>
      <div className="w-1 h-1 bg-white rounded-full animate-ping absolute top-0 translate-x-[-50%]" 
        style={{animationDelay: '1.5s'}}></div>
      <div className="w-1 h-1 bg-white rounded-full animate-ping absolute top-0 translate-x-[-50%]"
        style={{animationDelay: '3s'}}></div>
    </div>
  );

  return (
    <div className="bg-black relative p-4 sm:p-8 pb-32 max-w-7xl mx-auto min-h-screen overflow-hidden" ref={containerRef}>
      {/* Background patterns */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,#242_1px,transparent_1px),linear-gradient(-45deg,#111_1px,transparent_1px)] bg-[size:20px_20px]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,#222_1px,transparent_1px),linear-gradient(90deg,#111_1px,transparent_1px)] bg-[size:40px_40px] opacity-50" />
      </div>

      {/* Animated data stream */}
      <DataStream />

      {/* Header with ID Box similar to the reference design */}
      <div className={`flex items-center justify-between mb-12 transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="flex items-center space-x-4">
          <div className="w-3 h-3 bg-white/70 rounded-full animate-pulse" />
          <h2 className="text-2xl sm:text-4xl font-mono font-bold text-white tracking-wide">
            PRODUCT_CATALOG
          </h2>
        </div>
        <div className="text-right text-xs text-white/50 font-mono">
          <div>684</div>
          <div>PD-3P</div>
        </div>
      </div>

      {/* Horizontal line */}
      <div className="h-px w-full bg-white/20 mb-8"></div>

      {/* Category Navigation */}
      <div className="relative mb-10">
        <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide">
          <div className="flex space-x-2 md:space-x-4">
            {categories.map((category) => (
              <button 
                key={category}
                className={`px-6 py-2 transition-all duration-300 border whitespace-nowrap ${
                  activeCategory === category 
                    ? 'bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.3)]' 
                    : 'bg-black border-white/30 text-white/70 hover:bg-white/10'
                }`}
                onClick={() => handleCategoryClick(category)}
              >
                <span className="font-mono">{category.toUpperCase()}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products
          .filter(product => 
            activeCategory === 'all' || 
            (Array.isArray(product.category) 
              ? product.category.includes(activeCategory)
              : product.category === activeCategory)
          )
          .map((product) => {
            const status = getStatusDisplay(product);
            const isHovered = hoveredProduct === product.id;
            
            return (
              <div 
                key={product.id}
                className="relative group cursor-pointer border border-white/10 bg-black/90 
                  hover:border-white/30 transition-all duration-300"
                onClick={() => handleProductClick(product)}
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                {/* Product Image - Updated with rectangular frame */}
                <div className="relative p-4 overflow-hidden">
                  {/* Rectangular Product Frame */}
                  <div className="relative aspect-square overflow-hidden border-2 border-white/20 
                    transition-all duration-300 group-hover:border-white/40">
                    {/* Corner Decorations */}
                    <div className={`absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 transition-colors duration-300 
                      ${isHovered ? 'border-white/70' : 'border-white/40'}`} />
                    <div className={`absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 transition-colors duration-300 
                      ${isHovered ? 'border-white/70' : 'border-white/40'}`} />
                    <div className={`absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 transition-colors duration-300 
                      ${isHovered ? 'border-white/70' : 'border-white/40'}`} />
                    <div className={`absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 transition-colors duration-300 
                      ${isHovered ? 'border-white/70' : 'border-white/40'}`} />
                    
                    {/* Image with gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
                    <img 
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 
                        group-hover:scale-110"
                    />
                    
                    {/* Status Badge */}
                    <div className={`absolute top-4 right-4 px-3 py-1 font-mono text-sm z-20 ${status.classes}`}>
                      {status.text}
                    </div>
                    
                    {/* Price Tag */}
                    <div className="absolute bottom-4 left-4 z-20">
                      <div className="px-3 py-1 bg-black/70 font-mono text-white border border-white/30">
                        ${product.price}
                      </div>
                    </div>
                    
                    {/* Visual hover indicator */}
                    <div className={`absolute inset-0 border-2 border-white/0 transition-all duration-300 z-10
                      ${isHovered ? 'border-white/20' : 'border-transparent'}`}></div>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-mono text-white">{product.name}</h3>
                    <div className="flex items-center space-x-1 bg-blue-500/10 px-2 py-1">
                      <span className="text-blue-400">{product.rating}</span>
                      <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                  </div>

                  <div className="text-white/70 font-mono text-sm space-y-2">
                    <div className="flex items-center">
                      <span className="text-blue-400 mr-2">⟫</span>
                      {product.deliveryTime} days delivery time
                    </div>
                    
                    {/* Features */}
                    <div className="mt-2 pt-2 border-t border-white/10">
                      <div className="text-xs mb-2 text-white/40">FEATURES</div>
                      <ul className="text-xs space-y-1">
                        {product.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center">
                            <span className="text-white/50 mr-2">+</span> {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {product.tags.map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-white/5 text-white/50 text-xs font-mono">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  {/* Interactive button */}
                  <div className={`mt-4 pt-3 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                    <button
                      className="w-full py-2 border border-white/30 font-mono text-sm text-white/70 
                        hover:bg-white/5 hover:text-white transition-colors"
                    >
                      VIEW DETAILS
                    </button>
                  </div>
                </div>
                
                {/* Product card border corners */}
                <div className="absolute top-0 left-0 w-5 h-5 border-t border-l border-white/30" />
                <div className="absolute top-0 right-0 w-5 h-5 border-t border-r border-white/30" />
                <div className="absolute bottom-0 left-0 w-5 h-5 border-b border-l border-white/30" />
                <div className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-white/30" />
              </div>
            );
          })}
      </div>

      {/* Footer information */}
      <div className="mt-16 border-t border-white/10 pt-4 flex justify-between text-xs text-white/50 font-mono">
        <div>DB.ACCESS: PRODUCT_DATABASE</div>
        <div>ITEMS: {products.filter(p => activeCategory === 'all' || p.category.includes(activeCategory)).length}</div>
      </div>
      
      {/* Bottom data indicators */}
      <div className="fixed bottom-4 right-4 flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
          <span className="text-xs text-blue-400 font-mono">DATABASE_CONNECTED</span>
        </div>
      </div>
      
      {/* Japanese text elements from the reference design */}
      <div className="absolute bottom-4 left-4 text-white/30 text-xs font-mono">
        <div>対応端末</div>
        <div>FD-3P</div>
      </div>
    </div>
  );
};

export default ProductCatalog;