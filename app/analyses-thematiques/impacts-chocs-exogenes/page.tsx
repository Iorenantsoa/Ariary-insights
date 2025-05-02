"use client"
import React, { useState } from 'react';
import { BarChart2, TrendingDown, TrendingUp, DollarSign } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function ImpactAnalysis() {
  const [activeTab, setActiveTab] = useState('inflation');

  // Données de l'analyse des chocs exogènes
  const impactData = [
    { 
      variable: "Inflation, consumer prices (annual %)", 
      avecChoc: 8.56, 
      sansChoc: 11.50,
      id: 'inflation',
      icon: <TrendingUp className="w-6 h-6 text-orange-400" />,
      description: "L'inflation moyenne est plus faible pendant les périodes de choc (8.56%) que pendant les périodes sans choc (11.50%)."
    },
    { 
      variable: "Official exchange rate (LCU per US$, period average)", 
      avecChoc: 1724.51, 
      sansChoc: 1008.85,
      id: 'exchange',
      icon: <DollarSign className="w-6 h-6 text-green-400" />,
      description: "Le taux de change est significativement plus élevé pendant les périodes de choc (1724.51) que pendant les périodes sans choc (1008.85)."
    },
    { 
      variable: "Balance commerciale (% PIB)", 
      avecChoc: -10.15, 
      sansChoc: -5.60,
      id: 'balance',
      icon: <TrendingDown className="w-6 h-6 text-red-400" />,
      description: "La balance commerciale se détériore davantage pendant les périodes de choc (-10.15%) par rapport aux périodes sans choc (-5.60%)."
    }
  ];

  // Données pour le graphique
  const chartData = impactData.map(item => ({
    name: item.variable.length > 20 ? item.variable.substring(0, 20) + '...' : item.variable,
    'Avec Choc': item.avecChoc,
    'Sans Choc': item.sansChoc
  }));

  return (
    <div className="min-h-screen bg-[#212121] text-gray-200 pb-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center mb-4">
            <BarChart2 className="w-12 h-12 mr-3 text-blue-400" />
            <h1 className="text-2xl md:text-4xl font-bold text-white">
              Analyse des Investissements Directs Étrangers<br /> à Madagascar (1960-2023)
            </h1>
          </div>
        </div>

        {/* Section titre */}
        <div className="max-w-4xl mx-auto mt-16 mb-8">
          <h2 className="text-2xl font-bold text-blue-400 mb-4">Analyse des chocs exogènes et leur impact</h2>
          <p className="text-gray-300">
            Cette analyse compare les principales variables économiques de Madagascar pendant les périodes de chocs exogènes 
            par rapport aux périodes sans chocs. Les résultats montrent comment ces chocs ont influencé l&apos;inflation, le taux de change 
            et la balance commerciale.
          </p>
        </div>

        {/* Graphique de comparaison */}
        <div className="bg-[#262626] border border-[#333] rounded-xl p-4 shadow-md mb-8">
          <h3 className="text-xl font-semibold text-white mb-4">Comparaison des indicateurs avec/sans chocs</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis 
                  dataKey="name" 
                  angle={-45} 
                  textAnchor="end" 
                  tick={{ fill: '#9ca3af' }}
                  height={70}
                />
                <YAxis tick={{ fill: '#9ca3af' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#333', borderColor: '#444' }}
                  labelStyle={{ color: '#fff' }}
                />
                <Legend wrapperStyle={{ paddingTop: 20 }} />
                <Bar dataKey="Avec Choc" fill="#3b82f6" name="Avec Choc" />
                <Bar dataKey="Sans Choc" fill="#64748b" name="Sans Choc" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Tabs pour les détails */}
        <div className="max-w-4xl mx-auto">
          <div className="flex border-b border-[#333] mb-6">
            {impactData.map((item) => (
              <button
                key={item.id}
                className={`py-3 px-4 font-medium flex items-center ${
                  activeTab === item.id
                    ? 'border-b-2 border-blue-400 text-blue-400'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
                onClick={() => setActiveTab(item.id)}
              >
                <span className="mr-2">{item.icon}</span>
                {item.id === 'inflation' && 'Inflation'}
                {item.id === 'exchange' && 'Taux de change'}
                {item.id === 'balance' && 'Balance commerciale'}
              </button>
            ))}
          </div>

          {/* Contenu détaillé pour chaque indicateur */}
          {impactData.map((item) => (
            <div 
              key={item.id} 
              className={`bg-[#262626] border border-[#333] rounded-xl p-6 shadow-md ${
                activeTab === item.id ? 'block' : 'hidden'
              }`}
            >
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold text-white">{item.variable}</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-[#2a2a2a] p-4 rounded-lg">
                  <div className="text-sm text-gray-400 mb-1">Moyenne avec choc</div>
                  <div className="text-2xl font-bold text-white">{item.avecChoc.toFixed(2)}</div>
                </div>
                <div className="bg-[#2a2a2a] p-4 rounded-lg">
                  <div className="text-sm text-gray-400 mb-1">Moyenne sans choc</div>
                  <div className="text-2xl font-bold text-white">{item.sansChoc.toFixed(2)}</div>
                </div>
              </div>
              
              <div className="bg-[#2a2a2a] p-4 rounded-lg">
                <h4 className="text-lg font-medium text-blue-400 mb-2">Analyse</h4>
                <p className="text-gray-300">{item.description}</p>
                
                {item.id === 'inflation' && (
                  <div className="mt-4">
                    <p className="text-gray-300">
                      Cette observation pourrait suggérer que les politiques monétaires mises en place pendant les périodes de choc 
                      ont été relativement efficaces pour contrôler l&apos;inflation, malgré les perturbations économiques.
                    </p>
                  </div>
                )}
                
                {item.id === 'exchange' && (
                  <div className="mt-4">
                    <p className="text-gray-300">
                      La dépréciation significative de la monnaie nationale pendant les périodes de choc reflète 
                      la vulnérabilité de l&apos;économie malgache aux chocs exogènes et la pression sur les réserves de change.
                    </p>
                  </div>
                )}
                
                {item.id === 'balance' && (
                  <div className="mt-4">
                    <p className="text-gray-300">
                      Le déficit commercial s&apos;aggrave considérablement pendant les périodes de choc, ce qui indique une 
                      perturbation des exportations et/ou une augmentation des importations, possiblement liée à la nécessité 
                      d&apos;importer des biens essentiels dans un contexte de crise.
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}