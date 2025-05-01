'use client';

import Link from 'next/link';
import { 
  Brain, 
  ArrowUpRight,
  Network,
  LineChart,
  Layers
} from 'lucide-react';
import { motion } from 'framer-motion';

// Définition des items du menu pour les analyses avancées
const advancedMenuItems = [
  { 
    label: "Analyse multivariée", 
    path: "/analyses-avancees/analyse-multivariee",
    icon: <LineChart className="w-6 h-6" />,
    color: "indigo-600",
    description: "Analyse des relations entre variables économiques multiples"
  },
  { 
    label: "ACP", 
    path: "/analyses-avancees/acp",
    icon: <Network className="w-6 h-6" />,
    color: "cyan-600",
    description: "Analyse en Composantes Principales pour réduire la dimensionnalité des données"
  },
  { 
    label: "Clustering économique", 
    path: "/analyses-avancees/clustering-economique",
    icon: <Layers className="w-6 h-6" />,
    color: "violet-600",
    description: "Segmentation des données économiques par groupes similaires"
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

export default function AdvancedAnalysisPage() {
  return (
    <div className="min-h-screen bg-[#212121] text-white py-12 px-4 md:px-8">
      {/* En-tête avec titre et description */}
      <div className="max-w-7xl mx-auto mb-12 text-center">
        <div className="flex items-center justify-center mb-4">
          <Brain className="w-8 h-8 mr-3 text-blue-400" />
          <h1 className="text-3xl md:text-4xl font-bold">Analyses Avancées</h1>
        </div>
        <p className="text-gray-400 max-w-3xl mx-auto">
          Découvrez nos méthodes d'analyse statistique avancées pour une compréhension 
          approfondie des tendances économiques et financières.
        </p>
      </div>

      {/* Grille de cartes de menu - design différent */}
      <motion.div 
        className="max-w-5xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {advancedMenuItems.map((item, index) => (
          <motion.div key={index} variants={itemVariants} className="mb-6">
            <Link href={item.path} className="block">
              <div className="bg-[#2A2A2A] rounded-xl overflow-hidden shadow-lg border border-gray-800 hover:border-blue-400 transition-all duration-300 group">
                <div className="flex flex-col md:flex-row items-stretch">
                  <div className={`bg-${item.color} w-full md:w-24 flex items-center justify-center p-6 md:p-0`}>
                    <div className="text-white">
                      {item.icon}
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-blue-400 transition-colors duration-300 flex items-center">
                        {item.label}
                        <ArrowUpRight className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-300" />
                      </h3>
                      <p className="text-gray-400 text-sm">{item.description}</p>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <div className="bg-gray-800 px-4 py-1 rounded-full text-xs text-gray-400 group-hover:bg-blue-900 group-hover:text-blue-100 transition-all duration-300">
                        Explorer
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Note informative */}
      <div className="max-w-7xl mx-auto mt-12 text-center">
        <p className="text-gray-500 text-sm">
          Les analyses avancées utilisent des modèles statistiques développés par notre équipe 
          d'économistes et de data scientists.
        </p>
      </div>
    </div>
  );
}