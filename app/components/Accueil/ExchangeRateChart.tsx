'use client';

import { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  Area,
  ComposedChart,
  Label
} from 'recharts';

// Types
type DataPoint = {
  year: number;
  rate: number;
};

type HistoricalEvents = {
  [year: number]: string;
};

// Événements historiques enrichis
const historicalEvents: HistoricalEvents = {
  1960: "Indépendance",
  1972: "Renversement 1ère République",
  1975: "Nationalisation sous Ratsiraka",  
  1991: "Transition démocratique",  
  2002: "Crise post-électorale",  
  2009: "Coup d'état",
  2013: "Retour ordre constitutionnel",
  2017: "Sécheresse et cyclones",
  2020: "COVID-19",
  2022: "Guerre en Ukraine/Inflation"
};

export default function ExchangeRateChart() {
  const [hoveredEvent, setHoveredEvent] = useState<number | null>(null);

  const data: DataPoint[] = [
    { year: 1960, rate: 49.37 },
    { year: 1965, rate: 49.37 },
    { year: 1970, rate: 55.54 },
    { year: 1975, rate: 42.86 },
    { year: 1980, rate: 42.26 },
    { year: 1985, rate: 132.50 },
    { year: 1990, rate: 298.83 },
    { year: 1995, rate: 853.13 },
    { year: 2000, rate: 1353.50 },
    { year: 2005, rate: 2003.03 },
    { year: 2010, rate: 2089.95 },
    { year: 2015, rate: 2933.51 },
    { year: 2020, rate: 3787.75 },
    { year: 2022, rate: 4100.00 },
    { year: 2023, rate: 4429.58 }
  ];

  const forecasts: DataPoint[] = [
    { year: 2024, rate: 4587.73 },
    { year: 2025, rate: 4739.78 },
    { year: 2026, rate: 4893.17 },
    { year: 2027, rate: 5043.32 },
    { year: 2028, rate: 5193.09 }
  ];
 
  const combinedData = [...data, ...forecasts];
 
  const sortedYears = Object.keys(historicalEvents)
    .map(year => parseInt(year, 10))
    .sort((a, b) => a - b);
 
  const decadeTicks = [1960, 1970, 1980, 1990, 2000, 2010, 2020];

  return (
    <div className="w-full h-[500px] p-6 bg-[#2A2A2A] border border-[#333] rounded-2xl shadow-sm transition duration-300 ease-in-out transform hover:shadow-lg flex flex-col">
  <h2 className="text-xl font-bold text-white mb-2">
    Évolution du taux de change Ariary/USD (1960-2028)
  </h2>

  <div className="flex-grow relative">
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart data={combinedData} margin={{ top: 20, right: 60, left: 30, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
        <XAxis 
          dataKey="year" 
          ticks={decadeTicks}
          stroke="#ccc"
          domain={['dataMin', 'dataMax']} 
          type="number"
          allowDataOverflow={false}
          padding={{ left: 10, right: 10 }}
        />
        <YAxis 
          domain={[0, (dataMax: number) => dataMax + 500]} 
          tickFormatter={(value: any) => value.toLocaleString()}
          stroke="#ccc"
          width={70}
        />
        <Tooltip 
          contentStyle={{ backgroundColor: '#333', borderColor: '#555', borderRadius: 8 }}
          itemStyle={{ color: '#ddd' }}
          labelStyle={{ color: '#fff', fontWeight: 'bold' }}
          formatter={(value: number, name: string) => {
            if (name === "Ariary/USD") return [`${value.toLocaleString()} Ar`, name];
            if (name === "Projection") return [`${value.toLocaleString()} Ar`, name];
            return [value, name];
          }}
          labelFormatter={(label: number) => `Année ${label}${historicalEvents[label] ? ` - ${historicalEvents[label]}` : ''}`}
        />
        <Legend wrapperStyle={{ color: '#ccc' }} />
        
        {/* Historical Data */}
        <defs>
          <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
          </linearGradient>
          <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#10B981" stopOpacity={0.1}/>
          </linearGradient>
        </defs>

        <Area 
          type="monotone" 
          dataKey="rate" 
          data={data}
          fill="url(#colorRate)" 
          stroke="#60A5FA"
          name="Ariary/USD"
          strokeWidth={2}
          dot={{ r: 3, strokeWidth: 1 }}
          activeDot={{ r: 6 }}
        />
        
        <Area 
          type="monotone" 
          dataKey="rate" 
          data={forecasts}
          fill="url(#colorForecast)" 
          stroke="#10B981"
          name="Projection"
          strokeWidth={2}
          strokeDasharray="5 5"
          dot={{ r: 3, strokeWidth: 1 }}
          activeDot={{ r: 6 }}
        />

        <ReferenceLine 
          x={2023} 
          stroke="#FBBF24" 
          strokeWidth={2} 
          label={{ 
            value: "Présent", 
            position: "top", 
            fill: "#FBBF24", 
            fontSize: 12 
          }} 
        />

        {/* Historical events with short name labels */}
        {sortedYears.map((year) => (
          <ReferenceLine
            key={year}
            x={year}
            stroke="#FF5252"
            strokeWidth={1.5}
            strokeDasharray="3 3"
            ifOverflow="extendDomain"
            onMouseEnter={() => setHoveredEvent(year)}
            onMouseLeave={() => setHoveredEvent(null)}
          >
            <Label
              content={({ viewBox }) => {
                // @ts-ignore
                const { x } = viewBox;
                const eventText = historicalEvents[year];
                return (
                  <g>
                    <text
                      x={x + 5}
                      y={140} // Ajuste ici selon ton besoin (plus bas ou plus haut)
                      fill="#FF5252"
                      fontSize={9}
                      fontWeight="bold"
                      textAnchor="start"
                      transform={`rotate(90, ${x + 5}, 140)`}
                    >
                      {eventText.length > 12 ? eventText.substring(0, 12) + "..." : eventText}
                    </text>
                  </g>
                );
              }}
            />
          </ReferenceLine>
        ))}
      </ComposedChart>
    </ResponsiveContainer>
  </div>

  <div className="mt-2 text-sm text-gray-300 mb-2">
    {hoveredEvent !== null ? (
      <div className="p-2 bg-gray-800 rounded-md">
        <span className="font-bold text-red-400">{hoveredEvent} : {historicalEvents[hoveredEvent]}</span>
      </div>
    ) : (
      <div className="text-xs text-gray-400">Survolez les lignes rouges pour voir les détails des événements</div>
    )}
  </div>

  <div className="text-xs text-gray-400">
    Source : Banque centrale de Madagascar, Banque mondiale | Prévisions 2024-2028
  </div>
</div>

  );
}
