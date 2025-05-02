'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function KeyInsights() {
  const balanceData = [
    { year: 2018, value: -4.78 },
    { year: 2019, value: -5.75 },
    { year: 2020, value: -7.96 },
    { year: 2021, value: -8.91 },
    { year: 2022, value: -8.10 },
    { year: 2023, value: -7.04 }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8 ">
      {/* Corrélation inflation */}
      <div className="p-5 bg-[#2A2A2A] border border-[#333] rounded-2xl shadow-sm hover:shadow-md transition duration-300 ease-in-out">
        <h3 className="text-lg font-semibold text-gray-200 mb-4">Corrélation inflation/taux de change</h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={[
              { name: 'Périodes de haute inflation', correlation: 0.78 },
              { name: 'Périodes normales', correlation: 0.43 },
              { name: 'Moyenne globale', correlation: 0.61 }
            ]}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="name" tick={{ fill: '#ccc', fontSize: 12 }} />
              <YAxis domain={[0, 1]} tick={{ fill: '#ccc', fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#333', borderColor: '#555', color: '#fff' }}
                itemStyle={{ color: '#fff' }}
              />
              <Bar dataKey="correlation" fill="#60A5FA" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="mt-3 text-sm text-gray-400">
          L&apos;analyse montre une corrélation significative (0.61) entre l&apos;inflation et les variations du taux de change, 
          particulièrement prononcée durant les périodes de forte inflation ({" > "}10%).
        </p>
      </div>

      {/* Balance commerciale */}
      <div className="p-5 bg-[#2A2A2A] border border-[#333] rounded-2xl shadow-sm hover:shadow-md transition duration-300 ease-in-out">
        <h3 className="text-lg font-semibold text-gray-200 mb-4">Balance commerciale (% du PIB)</h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={balanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="year" tick={{ fill: '#ccc', fontSize: 12 }} />
              <YAxis tick={{ fill: '#ccc', fontSize: 12 }} />
              <Tooltip 
                formatter={(value) => [`${value}%`, 'Balance commerciale']} 
                contentStyle={{ backgroundColor: '#333', borderColor: '#555', color: '#fff' }}
                itemStyle={{ color: '#fff' }}
              />
              <Bar dataKey="value" fill="#82ca9d"  />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="mt-3 text-sm text-gray-400">
          Madagascar présente un déficit commercial chronique qui s&apos;est aggravé après la crise de 2020, 
          contribuant à la pression sur l&apos;Ariary.
        </p>
      </div>

      {/* Réserves en mois d'importations */}
      <div className="p-5 bg-[#2A2A2A] border border-[#333] rounded-2xl shadow-sm hover:shadow-md transition duration-300 ease-in-out">
        <h3 className="text-lg font-semibold text-gray-200 mb-4">Réserves en mois d&apos;importations</h3>
        <div className="flex items-center justify-center h-48">
          <div className="relative w-40 h-40">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <span className="text-3xl font-bold text-white">5.4</span>
                <p className="text-sm text-gray-400">mois</p>
              </div>
            </div>
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <circle cx="50" cy="50" r="45" fill="none" stroke="#444" strokeWidth="10" />
              <circle 
                cx="50" cy="50" r="45" fill="none" 
                stroke="#22c55e" strokeWidth="10" 
                strokeDasharray="282.6" strokeDashoffset={282.6 * (1 - 5.4/6)}
                transform="rotate(-90 50 50)" 
              />
            </svg>
          </div>
        </div>
        <p className="mt-3 text-sm text-gray-400">
          Les réserves internationales couvrent actuellement 5.4 mois d&apos;importations, au-dessus du seuil 
          recommandé de 3 mois, offrant une certaine stabilité monétaire à court terme.
        </p>
      </div>

      {/* Volatilité du taux de change */}
      <div className="p-5 bg-[#2A2A2A] border border-[#333] rounded-2xl shadow-sm hover:shadow-md transition duration-300 ease-in-out">
        <h3 className="text-lg font-semibold text-gray-200 mb-4">Volatilité du taux de change</h3>
        <div className="h-48 flex items-center justify-center">
          <div className="space-y-4 w-full">
            {[
              { period: "1990-2000", volatility: "32.4%" },
              { period: "2000-2010", volatility: "18.7%" },
              { period: "2010-2020", volatility: "12.3%" },
              { period: "2020-2023", volatility: "5.3%" },
            ].map((item, index) => (
              <div key={index}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-400">{item.period}</span>
                  <span className="text-sm font-semibold text-gray-200">{item.volatility}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: item.volatility }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <p className="mt-3 text-sm text-gray-400">
          La volatilité du taux de change a progressivement diminué ces dernières décennies, 
          suggérant une amélioration de la stabilité macroéconomique et de la gestion monétaire.
        </p>
      </div>
    </div>
  );
}
