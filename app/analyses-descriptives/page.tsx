'use client';

import Link from 'next/link';
import { 
  BarChart2, 
  TrendingUp, 
  DollarSign, 
  Percent,
  Database,
  FileText,
  ShoppingCart,
  ArrowUpRight
} from 'lucide-react';
import { motion } from 'framer-motion';

// Définition des items du menu pour les analyses descriptives
const descriptiveMenuItems = [
  { 
    label: "Taux de change", 
    path: "/analyses-descriptives/taux-de-change",
    icon: <DollarSign className="w-6 h-6" />,
    color: "from-blue-600 to-blue-800",
    description: "Évolution historique des taux de change de l'Ariary"
  },
  { 
    label: "Inflation et taux de change", 
    path: "/analyses-descriptives/inflation-taux-de-change",
    icon: <Percent className="w-6 h-6" />,
    color: "from-cyan-600 to-cyan-800",
    description: "Corrélation entre inflation et variations du taux de change"
  },
  { 
    label: "Réserves internationales", 
    path: "/analyses-descriptives/reserves",
    icon: <Database className="w-6 h-6" />,
    color: "from-teal-600 to-teal-800",
    description: "État et évolution des réserves en devises étrangères"
  },
  { 
    label: "Dette extérieure", 
    path: "/analyses-descriptives/dette",
    icon: <FileText className="w-6 h-6" />,
    color: "from-indigo-600 to-indigo-800",
    description: "Analyse de la dette extérieure et son impact sur l'économie"
  },
  { 
    label: "Balance commerciale", 
    path: "/analyses-descriptives/balance-commerciale",
    icon: <ShoppingCart className="w-6 h-6" />,
    color: "from-violet-600 to-violet-800",
    description: "Étude des importations et exportations et leur équilibre"
  },
  { 
    label: "Croissance économique", 
    path: "/analyses-descriptives/croissance-economique",
    icon: <TrendingUp className="w-6 h-6" />,
    color: "from-sky-600 to-sky-800",
    description: "Analyse de la croissance du PIB et des facteurs économiques"
  },
];

// Animation variants pour l'effet d'apparition
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
 
export default function DescriptiveAnalysisPage() {
  return (
    <div className="min-h-screen bg-[#212121] text-white py-12 px-4 md:px-8">
      {/* En-tête avec titre et description */}
      <div className="max-w-7xl mx-auto mb-12 text-center">
        <div className="flex items-center justify-center mb-4">
          <BarChart2 className="w-8 h-8 mr-3 text-blue-400" />
          <h1 className="text-3xl md:text-4xl font-bold">Analyses Descriptives</h1>
        </div>
        <p className="text-gray-400 max-w-3xl mx-auto">
          Explorez nos analyses détaillées des indicateurs économiques clés pour comprendre 
          les tendances et facteurs qui influencent l'économie malgache.
        </p>
      </div>

      {/* Grille de cartes de menu */}
      <motion.div 
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {descriptiveMenuItems.map((item, index) => (
          <motion.div key={index} variants={itemVariants}>
            <Link href={item.path} className="block h-full">
              <div className={`h-full bg-[#2A2A2A] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-800 group`}>
                <div className={`bg-gradient-to-r ${item.color} p-6 relative overflow-hidden`}>
                  <div className="absolute -right-4 -top-4 bg-white bg-opacity-20 rounded-full p-8 transform rotate-12 group-hover:scale-110 transition-transform duration-300"></div>
                  <div className="relative z-10 text-white">
                    {item.icon}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-blue-400 transition-colors duration-300 flex items-center">
                    {item.label}
                    <ArrowUpRight className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-300" />
                  </h3>
                  <p className="text-gray-400 text-sm">{item.description}</p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Note informative */}
      <div className="max-w-7xl mx-auto mt-12 text-center">
        <p className="text-gray-500 text-sm">
          Les données présentées sont basées sur les statistiques officielles de la Banque Centrale de Madagascar
          et d'autres institutions financières internationales.
        </p>
      </div>
    </div>
  );
}