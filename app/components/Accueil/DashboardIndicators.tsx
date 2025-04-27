'use client';

import { TrendingUp, TrendingDown, AlertCircle, DollarSign, Percent } from 'lucide-react';
import CountUp from 'react-countup';

export default function DashboardIndicators() {
  const indicators = [
    {
      name: "Taux de change",
      value: 4429.58,
      unit: "Ar/USD",
      trend: "up",
      percentage: "8,1%",
      icon: DollarSign,
      description: "Le taux continue d'augmenter"
    },
    {
      name: "Inflation",
      value: 9.87,
      unit: "%",
      trend: "up",
      percentage: "1,71%",
      icon: Percent,
      description: "Hausse de l'inflation par rapport à 2022"
    },
    {
      name: "Dette extérieure",
      value: 41.78,
      unit: "% du RNB",
      trend: "up",
      percentage: "1,56%",
      icon: AlertCircle,
      description: "Niveau d'endettement en hausse"
    },
    {
      name: "Réserves",
      value: 2.63,
      unit: "Mrd USD",
      trend: "up",
      percentage: "21,9%",
      icon: TrendingUp,
      description: "Réserves en augmentation"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8  ">
      {indicators.map((indicator, index) => (
        <div
          key={index}
          className="p-5 bg-[#2A2A2A] border border-[#333] rounded-2xl shadow-sm transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <indicator.icon className="h-7 w-7 text-[#60A5FA]" />
              <h3 className="text-base font-semibold text-gray-200">{indicator.name}</h3>
            </div>
          </div>

          <div className="flex items-baseline space-x-2 mt-4">
            <span className="text-3xl font-bold text-white">
              <CountUp end={indicator.value} duration={1.2} separator=" " decimals={2} decimal="," />
            </span>
            <span className="text-sm text-gray-400">{indicator.unit}</span>
          </div>

          <div className="flex items-center mt-2 space-x-1">
            {indicator.trend === 'up' ? (
              <TrendingUp className="h-4 w-4 text-green-400" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-400" />
            )}
            <span className={`text-sm font-medium ${indicator.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
              {indicator.percentage}
            </span>
          </div>

          <p className="mt-3 text-sm text-gray-400">{indicator.description}</p>
        </div>
      ))}
    </div>
  );
}
