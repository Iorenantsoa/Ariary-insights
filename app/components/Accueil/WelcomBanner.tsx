'use client';

import { useEffect, useState } from 'react';

export default function SimpleBanner() {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Activer l'animation après le chargement
    setIsLoaded(true);
  }, []);

  return (
    <div className={`  w-full bg-gradient-to-r from-blue-900 to-indigo-800 overflow-hidden relative mb-8 transition-all duration-700 ease-in-out  ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* Overlay sombre avec motif */}
      <div className="absolute inset-0 bg-black bg-opacity-10"></div>
      
      {/* Contenu */}
      <div className="relative z-2 py-16 px-4 text-center">
        <h1 className={`text-3xl md:text-4xl font-bold text-white mb-2 transition-all duration-1000 transform ${isLoaded ? 'translate-y-0' : 'translate-y-10'}`}>
          Bienvenue sur <span className="text-blue-300">Ariary Insights</span>
        </h1>
        
        <div className={`h-1 w-40 md:w-56 bg-blue-400 mx-auto my-3 rounded transition-all duration-1000 delay-300 transform ${isLoaded ? 'scale-x-100' : 'scale-x-0'}`}></div>
        
        <p className={`text-gray-200 text-sm md:text-base max-w-xl mx-auto transition-opacity duration-1000 delay-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          Explorer l'évolution économique de Madagascar à travers ses données (1960-2023)
        </p>
      </div>

      {/* Effet de transition vers le graphique */}
      <svg className="w-full h-6 text-[#2A2A2A] block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 30" preserveAspectRatio="none">
        <path fill="currentColor" d="M0,0 C300,30 800,30 1200,0 L1200,30 L0,30 Z"></path>
      </svg>
    </div>
  );
}