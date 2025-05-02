'use client';

import Link from 'next/link';
import { 
  AlertTriangle, 
  TrendingUp, 
  Globe,
  CreditCard, 
  DollarSign,
  ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';

// Définition des items du menu pour les analyses thématiques
const thematicMenuItems = [
  { 
    label: "Volatilité du taux de change", 
    path: "/analyses-thematiques/volatilite-taux-change",
    icon: <TrendingUp className="w-6 h-6" />,
    color: "blue-600",
    gradient: "from-blue-600/20 via-blue-500/10 to-transparent",
    description: "Analyse de la variabilité du taux de change et ses impacts économiques"
  },
  { 
    label: "IDE", 
    path: "/analyses-thematiques/ide",
    icon: <Globe className="w-6 h-6" />,
    color: "teal-600",
    gradient: "from-teal-600/20 via-teal-500/10 to-transparent",
    description: "Investissements Directs Étrangers et leurs effets sur l'économie"
  },
  { 
    label: "Remises de fonds", 
    path: "/analyses-thematiques/remises-de-fonds",
    icon: <CreditCard className="w-6 h-6" />,
    color: "violet-600",
    gradient: "from-violet-600/20 via-violet-500/10 to-transparent",
    description: "Impact des transferts de fonds de la diaspora sur l'économie nationale"
  },
  { 
    label: "Impacts Des Chocs Exogènes", 
    path: "/analyses-thematiques/impacts-chocs-exogenes",
    icon: <DollarSign className="w-6 h-6" />,
    color: "indigo-600",
    gradient: "from-indigo-600/20 via-indigo-500/10 to-transparent",
    description: "Évaluation du taux de change réel et de la compétitivité économique"
  },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

export default function ThematicAnalysisPage() {
  return (
    <div className="min-h-screen bg-[#212121] text-white py-12 px-4 md:px-8">
      {/* En-tête avec titre et description */}
      <div className="max-w-7xl mx-auto mb-12 text-center">
        <div className="flex items-center justify-center mb-4">
          <AlertTriangle className="w-8 h-8 mr-3 text-blue-400" />
          <h1 className="text-3xl md:text-4xl font-bold">Analyses Thématiques</h1>
        </div>
        <p className="text-gray-400 max-w-3xl mx-auto">
          Explorez des analyses spécifiques sur des thèmes clés affectant l&apos;économie 
          et le système financier malgache.
        </p>
      </div>

      {/* Grille de cartes de menu - nouveau design */}
      <motion.div 
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {thematicMenuItems.map((item, index) => (
          <motion.div key={index} variants={itemVariants}>
            <Link href={item.path} className="block h-full">
              <div className="relative h-full bg-[#2A2A2A] rounded-xl overflow-hidden shadow-lg border border-gray-800 group hover:border-blue-500 transition-all duration-300">
                {/* Subtil gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} pointer-events-none opacity-80`}></div>
                
                <div className="relative z-10 p-6 flex flex-row items-start">
                  <div className={`flex-shrink-0 mr-5 bg-${item.color}/10 p-3 rounded-lg text-${item.color} group-hover:scale-110 transform transition-all duration-300`}>
                    {item.icon}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-blue-400 transition-colors duration-300">
                      {item.label}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4">{item.description}</p>
                    
                    <div className="inline-flex items-center text-sm text-gray-500 group-hover:text-blue-400 transition-colors duration-300">
                      <span className="mr-2">Explorer</span>
                      <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
                
                {/* Accent line at bottom */}
                <div className={`absolute bottom-0 left-0 w-0 h-1 bg-${item.color} group-hover:w-full transition-all duration-500 ease-out`}></div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Note informative */}
      <div className="max-w-7xl mx-auto mt-12 text-center">
        <p className="text-gray-500 text-sm">
          Ces analyses thématiques sont mises à jour régulièrement en fonction
          des évolutions économiques et financières.
        </p>
      </div>
    </div>
  );
}