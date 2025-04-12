import React from 'react';
import { useNavigate } from 'react-router-dom';

const CampusSelection = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-black min-h-screen flex flex-col items-center justify-center p-4">
      {/* Background patterns */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,#242_1px,transparent_1px),linear-gradient(-45deg,#111_1px,transparent_1px)] bg-[size:20px_20px]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,#222_1px,transparent_1px),linear-gradient(90deg,#111_1px,transparent_1px)] bg-[size:40px_40px] opacity-50" />
      </div>

      {/* Content */}
      <div className="relative space-y-8">
        <h1 className="text-2xl md:text-3xl font-mono text-white text-center">
          YOU ARE FROM ?
        </h1>
        
        <div className="space-y-4">
          <button
            onClick={() => navigate('/about')}
            className="w-64 p-6 border border-white/10 bg-black/90 hover:border-white/30 
                     transition-all duration-300 group"
          >
            <div className="text-xl font-mono text-white text-center group-hover:text-green-400">
              NORTH CAMPUS
            </div>
            
            {/* Decorative corners */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/30" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/30" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/30" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/30" />
          </button>

          <button
            onClick={() => alert('South Campus coming soon!')}
            className="w-64 p-6 border border-white/10 bg-black/90 hover:border-red-500/30 
                     transition-all duration-300 group relative"
          >
            <div className="text-xl font-mono text-white/50 text-center group-hover:text-red-400">
              SOUTH CAMPUS
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-mono text-red-400/70">Coming Soon</span>
            </div>
            
            {/* Decorative corners */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/30" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/30" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/30" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/30" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CampusSelection;
