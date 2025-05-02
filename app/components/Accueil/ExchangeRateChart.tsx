'use client';

import { useState, useEffect } from 'react';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  Area,
  ComposedChart,
  Label,
} from 'recharts';

// Types
type DataPoint = {
  year: number;
  rate: number;
};

type HistoricalEvents = {
  [year: number]: string;
};

type ExchangeRateChartProps = {
  period: 'all' | '10y' | '5y';
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

export default function ExchangeRateChart({ period = 'all' }: ExchangeRateChartProps) {
  const [hoveredEvent, setHoveredEvent] = useState<number | null>(null);
  const [hoveredPoint, setHoveredPoint] = useState<DataPoint | null>(null);
  const [filteredData, setFilteredData] = useState<DataPoint[]>([]);
  const [filteredForecasts, setFilteredForecasts] = useState<DataPoint[]>([]);
  const [yAxisDomain, setYAxisDomain] = useState<[number, number]>([0, 5500]);

  const historicalData: DataPoint[] = [
    { year: 1960, rate: 49.37 },
    { year: 1961, rate: 49.37 },
    { year: 1962, rate: 49.37 },
    { year: 1963, rate: 49.37 },
    { year: 1964, rate: 49.37 },
    { year: 1965, rate: 49.37 },
    { year: 1966, rate: 49.37 },
    { year: 1967, rate: 49.37 },
    { year: 1968, rate: 49.37 },
    { year: 1969, rate: 51.94 },
    { year: 1970, rate: 55.54 },
    { year: 1971, rate: 55.43 },
    { year: 1972, rate: 50.41 },
    { year: 1973, rate: 44.58 },
    { year: 1974, rate: 48.14 },
    { year: 1975, rate: 42.86 },
    { year: 1976, rate: 47.79 },
    { year: 1977, rate: 49.14 },
    { year: 1978, rate: 45.13 },
    { year: 1979, rate: 42.54 },
    { year: 1980, rate: 42.26 },
    { year: 1981, rate: 54.35 },
    { year: 1982, rate: 69.95 },
    { year: 1983, rate: 86.09 },
    { year: 1984, rate: 115.33 },
    { year: 1985, rate: 132.50 },
    { year: 1986, rate: 135.27 },
    { year: 1987, rate: 213.84 },
    { year: 1988, rate: 281.42 },
    { year: 1989, rate: 320.69 },
    { year: 1990, rate: 298.83 },
    { year: 1991, rate: 367.07 },
    { year: 1992, rate: 372.79 },
    { year: 1993, rate: 382.76 },
    { year: 1994, rate: 613.47 },
    { year: 1995, rate: 853.13 },
    { year: 1996, rate: 812.25 },
    { year: 1997, rate: 1018.18 },
    { year: 1998, rate: 1088.28 },
    { year: 1999, rate: 1256.76 },
    { year: 2000, rate: 1353.50 },
    { year: 2001, rate: 1317.70 },
    { year: 2002, rate: 1366.39 },
    { year: 2003, rate: 1238.33 },
    { year: 2004, rate: 1868.86 },
    { year: 2005, rate: 2003.03 },
    { year: 2006, rate: 2142.30 },
    { year: 2007, rate: 1873.88 },
    { year: 2008, rate: 1708.37 },
    { year: 2009, rate: 1956.21 },
    { year: 2010, rate: 2089.95 },
    { year: 2011, rate: 2025.12 },
    { year: 2012, rate: 2194.97 },
    { year: 2013, rate: 2206.91 },
    { year: 2014, rate: 2414.81 },
    { year: 2015, rate: 2933.51 },
    { year: 2016, rate: 3176.54 },
    { year: 2017, rate: 3116.11 },
    { year: 2018, rate: 3334.75 },
    { year: 2019, rate: 3618.32 },
    { year: 2020, rate: 3787.75 },
    { year: 2021, rate: 3829.98 },
    { year: 2022, rate: 4096.12 },
    { year: 2023, rate: 4429.58 }
  ];

  const forecasts: DataPoint[] = [
    { year: 2024, rate: 4587.73 },
    { year: 2025, rate: 4739.78 },
    { year: 2026, rate: 4893.17 },
    { year: 2027, rate: 5043.32 },
    { year: 2028, rate: 5193.09 }
  ];

  // Filtrer les données en fonction de la période sélectionnée
  useEffect(() => {
    const currentYear = 2023;
    let startYear = 1960;

    if (period === '10y') {
      startYear = currentYear - 10;
    } else if (period === '5y') {
      startYear = currentYear - 5;
    }

    setFilteredData(historicalData.filter(d => d.year >= startYear));
    setFilteredForecasts(forecasts);

    // Ajuster le domaine Y pour un meilleur affichage selon la période
    if (period === '5y' || period === '10y') {
      const minRate = Math.min(...historicalData.filter(d => d.year >= startYear).map(d => d.rate));
      const maxRate = Math.max(...forecasts.map(d => d.rate));
      // Ajouter une marge pour la lisibilité
      setYAxisDomain([minRate * 0.9, maxRate * 1.1]);
    } else {
      setYAxisDomain([0, 5500]);
    }
  }, [period]);

  const combinedData = [...filteredData, ...filteredForecasts];

  const relevantYears = Object.keys(historicalEvents)
    .map(year => parseInt(year, 10))
    .filter(year => {
      if (period === '5y') return year >= new Date().getFullYear() - 5;
      if (period === '10y') return year >= new Date().getFullYear() - 10;
      return true;
    })
    .sort((a, b) => a - b);

  // Calculer les tics appropriés selon la période
  const getAppropriateXTicks = () => {
    if (period === '5y') {
      return Array.from({ length: 6 }, (_, i) => new Date().getFullYear() - 5 + i);
    } else if (period === '10y') {
      return Array.from({ length: 11 }, (_, i) => new Date().getFullYear() - 10 + i).filter(y => y % 2 === 0);
    } else {
      return [1960, 1970, 1980, 1990, 2000, 2010, 2020];
    }
  };
  // Définition de l'interface pour les données du graphique
  interface ChartPoint {
    year: number;
    rate: number;
    // Ajoutez les autres propriétés que chaque point de données contient
  }

  // Interface pour les données de l'événement de survol
  interface MouseOverData {
    activePayload?: Array<{
      payload: ChartPoint;
    }>;
    // Autres propriétés potentielles de l'événement
  }
  const handleMouseOver = (data: MouseOverData) => {
    if (data && data.activePayload && data.activePayload[0]) {
      setHoveredPoint(data.activePayload[0].payload);
    }
  };
  const handleMouseLeave = () => {
    setHoveredPoint(null);
  };

  // Calculer le taux de dépréciation entre deux points si disponibles
  const getDepreciationRate = () => {
    if (!hoveredPoint) return null;

    const prevPoint = combinedData.find(d => d.year === hoveredPoint.year - 1);
    if (!prevPoint) return null;

    const depreciationRate = ((hoveredPoint.rate - prevPoint.rate) / prevPoint.rate) * 100;
    return depreciationRate.toFixed(2);
  };

  const depreciationRate = getDepreciationRate();

  return (
    <div className="w-full h-[580px] p-6 bg-[#2A2A2A] border border-[#333] rounded-2xl shadow-sm transition duration-300 ease-in-out hover:shadow-lg flex flex-col">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-bold text-white">
          Évolution du taux de change Ariary/USD ({period === 'all' ? '1960' : period === '10y' ? '10 dernières années' : '5 dernières années'}-2028)
        </h2>

        {hoveredPoint && (
          <div className="bg-gray-800 rounded-lg px-3 py-1 text-sm">
            <span className="font-medium text-blue-300">{hoveredPoint.year}</span>:
            <span className="font-bold text-white ml-1">{hoveredPoint.rate.toLocaleString()} Ar</span>
            {depreciationRate && (
              <span className={`ml-2 ${parseFloat(depreciationRate) > 0 ? 'text-red-400' : 'text-green-400'}`}>
                {parseFloat(depreciationRate) > 0 ? '+' : ''}{depreciationRate}%
              </span>
            )}
          </div>
        )}
      </div>

      <div className="flex-grow relative">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={combinedData}
            margin={{ top: 20, right: 60, left: 30, bottom: 40 }}
            onMouseMove={handleMouseOver}
            onMouseLeave={handleMouseLeave}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis
              dataKey="year"
              ticks={getAppropriateXTicks()}
              stroke="#ccc"
              domain={['dataMin', 'dataMax']}
              type="number"
              allowDataOverflow={false}
              padding={{ left: 10, right: 10 }}
            />
            <YAxis
              domain={yAxisDomain}
              tickFormatter={(value: number) => value.toLocaleString()}
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

            <defs>
              <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#10B981" stopOpacity={0.1} />
              </linearGradient>
            </defs>

            <Area
              type="monotone"
              dataKey="rate"
              data={filteredData}
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
              data={filteredForecasts}
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
            {relevantYears.map((year) => (
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
                    // @ts-expect-error viewBox devrait contenir une propriété x
                    const { x } = viewBox;
                    const eventText = historicalEvents[year];
                    return (
                      <g>
                        <text
                          x={x + 5}
                          y={140}
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
            {/* Ici, vous pourriez ajouter des détails supplémentaires pour chaque événement */}
          </div>
        ) : (
          <div className="text-xs text-gray-400">Survolez les lignes rouges pour les détails des événements et les points pour les valeurs exactes</div>
        )}
      </div>

      <div className="text-xs text-gray-400 flex justify-between">
        <span>Source : Banque centrale de Madagascar, Banque mondiale</span>
        <span>Prévisions 2024-2028 basées sur le taux de croissance moyen</span>
      </div>
    </div>
  );
}