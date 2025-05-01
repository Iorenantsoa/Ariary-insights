"use client"
import { useState, } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import { ArrowUpRight, DollarSign, TrendingUp, Percent, BarChart2, Activity } from 'lucide-react';

// Extraction des données importantes du CSV
const remittanceData = [
  { year: 1960, remittances: 0, gdp: 673081724.75, exchangeRate: 49.37 },
  { year: 1961, remittances: 0, gdp: 699161944.56, exchangeRate: 49.37 },
  { year: 1962, remittances: 0, gdp: 739286907.59, exchangeRate: 49.37 },
  { year: 1963, remittances: 0, gdp: 759345863.73, exchangeRate: 49.37 },
  { year: 1964, remittances: 0, gdp: 802482183.73, exchangeRate: 49.37 },
  { year: 1965, remittances: 0, gdp: 833563472.99, exchangeRate: 49.37 },
  { year: 1966, remittances: 0, gdp: 900264584.59, exchangeRate: 49.37 },
  { year: 1967, remittances: 0, gdp: 956436932.10, exchangeRate: 49.37 },
  { year: 1968, remittances: 0, gdp: 1031669637.39, exchangeRate: 49.37 },
  { year: 1969, remittances: 0, gdp: 1056391055.59, exchangeRate: 51.94 },
  { year: 1970, remittances: 0, gdp: 1111859570.88, exchangeRate: 55.54 },
  { year: 1971, remittances: 0, gdp: 1199507631.07, exchangeRate: 55.42 },
  { year: 1972, remittances: 0, gdp: 1341590690.41, exchangeRate: 50.40 },
  { year: 1973, remittances: 0, gdp: 1653062335.00, exchangeRate: 44.57 },
  { year: 1974, remittances: 415448.46, gdp: 1917508190.04, exchangeRate: 48.14 },
  { year: 1975, remittances: 466609.24, gdp: 2283049215.35, exchangeRate: 42.86 },
  { year: 1976, remittances: 711447.18, gdp: 2181844178.55, exchangeRate: 47.79 },
  { year: 1977, remittances: 325628.49, gdp: 2358930406.07, exchangeRate: 49.13 },
  { year: 1978, remittances: 398838.94, gdp: 2669755115.11, exchangeRate: 45.13 },
  { year: 1979, remittances: 47009.97, gdp: 3463565853.81, exchangeRate: 42.54 },
  { year: 1980, remittances: 378646.70, gdp: 5201818347.80, exchangeRate: 42.26 },
  { year: 1981, remittances: 220807.08, gdp: 4759333998.37, exchangeRate: 54.35 },
  { year: 1982, remittances: 114372.04, gdp: 4784977325.96, exchangeRate: 69.95 },
  { year: 1983, remittances: 116157.73, gdp: 4686457031.23, exchangeRate: 86.09 },
  { year: 1984, remittances: 5636074.54, gdp: 3905938480.86, exchangeRate: 115.33 },
  { year: 1985, remittances: 4573740.00, gdp: 3802557894.87, exchangeRate: 132.50 },
  { year: 1986, remittances: 5869821.55, gdp: 4347989788.09, exchangeRate: 135.27 },
  { year: 1987, remittances: 4648277.28, gdp: 3212900555.81, exchangeRate: 213.84 },
  { year: 1988, remittances: 4029545.31, gdp: 3189456965.05, exchangeRate: 281.42 },
  { year: 1989, remittances: 9741570.47, gdp: 3175638332.64, exchangeRate: 320.69 },
  { year: 1990, remittances: 7870713.23, gdp: 3931334875.01, exchangeRate: 298.83 },
  { year: 1991, remittances: 13130938.53, gdp: 3254713056.02, exchangeRate: 367.07 },
  { year: 1992, remittances: 15214864.73, gdp: 3714966678.33, exchangeRate: 372.79 },
  { year: 1993, remittances: 13543858.53, gdp: 4063298919.29, exchangeRate: 382.76 },
  { year: 1994, remittances: 12743958.47, gdp: 3522227092.23, exchangeRate: 613.47 },
  { year: 1995, remittances: 9102989.44, gdp: 3838100903.75, exchangeRate: 853.13 },
  { year: 1996, remittances: 6241918.03, gdp: 4931861038.71, exchangeRate: 812.25 },
  { year: 1997, remittances: 12184519.95, gdp: 4262965419.75, exchangeRate: 1018.18 },
  { year: 1998, remittances: 11462127.23, gdp: 4401967632.74, exchangeRate: 1088.28 },
  { year: 1999, remittances: 11621994.74, gdp: 4277903780.29, exchangeRate: 1256.76 },
  { year: 2000, remittances: 11270072.55, gdp: 4629247203.85, exchangeRate: 1353.50 },
  { year: 2001, remittances: 10871296.09, gdp: 5438332601.91, exchangeRate: 1317.70 },
  { year: 2002, remittances: 29323596.14, gdp: 5351701663.41, exchangeRate: 1366.39 },
  { year: 2003, remittances: 16231547.70, gdp: 6372498889.67, exchangeRate: 1238.33 },
  { year: 2004, remittances: 11506654.20, gdp: 5064732626.29, exchangeRate: 1868.86 },
  { year: 2005, remittances: 101672956.27, gdp: 5859269752.61, exchangeRate: 2003.03 },
  { year: 2006, remittances: 150260189.03, gdp: 6395712490.94, exchangeRate: 2142.30 },
  { year: 2007, remittances: 254488696.95, gdp: 8524620889.58, exchangeRate: 1873.88 },
  { year: 2008, remittances: 313991941.10, gdp: 10725137723.65, exchangeRate: 1708.37 },
  { year: 2009, remittances: 283721276.65, gdp: 9616879409.44, exchangeRate: 1956.21 },
  { year: 2010, remittances: 455825544.21, gdp: 9982711338.07, exchangeRate: 2089.95 },
  { year: 2011, remittances: 335015246.96, gdp: 11551819617.87, exchangeRate: 2025.12 },
  { year: 2012, remittances: 330495619.94, gdp: 11578975061.95, exchangeRate: 2194.97 },
  { year: 2013, remittances: 357754330.94, gdp: 12423555455.39, exchangeRate: 2206.91 },
  { year: 2014, remittances: 344438244.03, gdp: 12522957399.23, exchangeRate: 2414.81 },
  { year: 2015, remittances: 326844541.40, gdp: 11323020701.30, exchangeRate: 2933.51 },
  { year: 2016, remittances: 299204626.14, gdp: 11848613858.44, exchangeRate: 3176.54 },
  { year: 2017, remittances: 342776977.92, gdp: 13176313593.55, exchangeRate: 3116.11 },
  { year: 2018, remittances: 425502225.72, gdp: 13760033282.29, exchangeRate: 3334.75 },
  { year: 2019, remittances: 407676204.20, gdp: 14104664678.51, exchangeRate: 3618.32 },
  { year: 2020, remittances: 495356527.45, gdp: 13051441203.95, exchangeRate: 3787.75 },
  { year: 2021, remittances: 439712454.83, gdp: 14554754116.54, exchangeRate: 3830.00 },
  { year: 2022, remittances: 385290310.63, gdp: 15134700203.05, exchangeRate: 4096.12 },
  { year: 2023, remittances: 385290310.63, gdp: 15790113246.75, exchangeRate: 4429.58 }
];

// Traitement pour obtenir les données en million USD et le ratio remittances/PIB
const processedData = remittanceData.map(item => {
  return {
    ...item,
    remittancesInMillions: item.remittances / 1000000,
    remittancesToGDP: (item.remittances / item.gdp) * 100
  };
});

// Événements historiques de Madagascar
const historicalEvents = [
  { year: 1960, event: "Indépendance de Madagascar" },
  { year: 1972, event: "Renversement de la Première République" },
  { year: 1975, event: "Nationalisation sous Ratsiraka" },
  { year: 1982, event: "Crise économique/Plan d'ajustement structurel" },
  { year: 1991, event: "Transition démocratique" },
  { year: 2002, event: "Crise politique post-électorale" },
  { year: 2009, event: "Coup d'État/Crise politique" },
  { year: 2013, event: "Retour à l'ordre constitutionnel" },
  { year: 2020, event: "Crise du COVID-19" }
];

export default function RemittancesDashboard() {
  const [activeTab, setActiveTab] = useState('remittances');
  const [hoveredEvent, setHoveredEvent] = useState(null);

  const formatMoney = (value) => {
    if (value === 0) return '0';
    if (value < 1) return value.toFixed(2);
    return value.toFixed(1);
  };

  const getEventMarkers = () => {
    return historicalEvents.map(event => (
      <ReferenceLine
        key={event.year}
        x={event.year}
        stroke="#f87171"
        strokeDasharray="3 3"
        isFront={true}
        onMouseOver={() => setHoveredEvent(event)}
        onMouseOut={() => setHoveredEvent(null)}
      />
    ));
  };

  const renderEventTooltip = () => {
    if (!hoveredEvent) return null;

    return (
      <div className="absolute left-4 top-4 bg-[#333] p-2 rounded shadow-lg border border-[#444] z-10">
        <p className="text-white font-medium">{hoveredEvent.year}: {hoveredEvent.event}</p>
      </div>
    );
  };

  const activeTabClass = "bg-blue-400 text-white";
  const inactiveTabClass = "bg-[#333] text-gray-300 hover:bg-[#444]";

  return (

    <div className="min-h-screen w-full bg-[#212121] text-gray-200 p-4 md:p-8 flex flex-col gap-8">
      <div className="max-w-7xl mx-auto text-center">

        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center mb-4">
            <Activity className="w-8 h-8 mr-3 text-blue-400" />
            <h1 className="text-2xl md:text-4xl font-bold text-white">Analyse Économique de Madagascar (1960-2023)</h1>
          </div>
          <p className="text-gray-400">Impact des remises de fonds de la diaspora sur l'économie malgache</p>

        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-[#262626] border border-[#333] rounded-xl p-4 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Remises de fonds (2023)</p>
              <h2 className="text-2xl font-bold flex items-center">
                <DollarSign className="h-6 w-6 text-blue-400 mr-1" />
                {formatMoney(processedData[processedData.length - 1].remittancesInMillions)} M
              </h2>
            </div>
            <div className="bg-blue-400/10 p-2 rounded-lg">
              <ArrowUpRight className="h-6 w-6 text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-[#262626] border border-[#333] rounded-xl p-4 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Taux de change (2023)</p>
              <h2 className="text-2xl font-bold flex items-center">
                <TrendingUp className="h-6 w-6 text-blue-400 mr-1" />
                {formatMoney(processedData[processedData.length - 1].exchangeRate)} Ar
              </h2>
            </div>
            <div className="bg-blue-400/10 p-2 rounded-lg">
              <ArrowUpRight className="h-6 w-6 text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-[#262626] border border-[#333] rounded-xl p-4 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">% du PIB (2023)</p>
              <h2 className="text-2xl font-bold flex items-center">
                <Percent className="h-6 w-6 text-blue-400 mr-1" />
                {formatMoney(processedData[processedData.length - 1].remittancesToGDP)}%
              </h2>
            </div>
            <div className="bg-blue-400/10 p-2 rounded-lg">
              <ArrowUpRight className="h-6 w-6 text-blue-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#262626] border border-[#333] rounded-xl p-4 shadow-md mb-6">
        <div className="flex space-x-2 mb-4">
          <button
            className={`px-4 py-2 rounded-lg transition-colors ${activeTab === 'remittances' ? activeTabClass : inactiveTabClass}`}
            onClick={() => setActiveTab('remittances')}
          >
            Remises de fonds
          </button>
          <button
            className={`px-4 py-2 rounded-lg transition-colors ${activeTab === 'exchange' ? activeTabClass : inactiveTabClass}`}
            onClick={() => setActiveTab('exchange')}
          >
            Taux de change
          </button>
          <button
            className={`px-4 py-2 rounded-lg transition-colors ${activeTab === 'ratio' ? activeTabClass : inactiveTabClass}`}
            onClick={() => setActiveTab('ratio')}
          >
            Ratio Remises/PIB
          </button>
        </div>

        <div className="relative h-96">
          {renderEventTooltip()}
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={processedData}
              margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis
                dataKey="year"
                stroke="#999"
                tick={{ fill: '#999' }}
              />
              <YAxis
                stroke="#999"
                tick={{ fill: '#999' }}
                domain={['auto', 'auto']}
                tickFormatter={(value) => activeTab === 'ratio' ? `${value}%` : activeTab === 'exchange' ? `${value}` : `${value}M`}
              />
              <Tooltip
                contentStyle={{ backgroundColor: '#333', borderColor: '#444' }}
                formatter={(value) => {
                  if (activeTab === 'ratio') return [`${value.toFixed(2)}%`, 'Ratio Remises/PIB'];
                  if (activeTab === 'exchange') return [`${value.toFixed(2)} Ar`, 'Taux de change'];
                  return [`${value.toFixed(2)}M`, 'Remises de fonds'];
                }}
                labelFormatter={(label) => `Année: ${label}`}
              />
              <Legend />
              {activeTab === 'remittances' && (
                <Line
                  type="monotone"
                  dataKey="remittancesInMillions"
                  name="Remises de fonds (millions USD)"
                  stroke="#9333ea"
                  dot={{ fill: '#9333ea', r: 4 }}
                  activeDot={{ r: 6 }}
                  strokeWidth={2}
                />
              )}
              {activeTab === 'exchange' && (
                <Line
                  type="monotone"
                  dataKey="exchangeRate"
                  name="Taux de change (Ar/USD)"
                  stroke="#3b82f6"
                  dot={{ fill: '#3b82f6', r: 4 }}
                  activeDot={{ r: 6 }}
                  strokeWidth={2}
                />
              )}
              {activeTab === 'ratio' && (
                <Line
                  type="monotone"
                  dataKey="remittancesToGDP"
                  name="Ratio Remises/PIB (%)"
                  stroke="#10b981"
                  dot={{ fill: '#10b981', r: 4 }}
                  activeDot={{ r: 6 }}
                  strokeWidth={2}
                />
              )}
              {getEventMarkers()}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-[#262626] border border-[#333] rounded-xl p-4 shadow-md">
        <h2 className="text-xl font-semibold mb-4">Événements Historiques Majeurs à Madagascar</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {historicalEvents.map((event) => (
            <div key={event.year} className="border border-[#333] rounded-lg p-3 hover:bg-[#333] transition-colors">
              <div className="flex items-center">
                <div className="bg-blue-400 text-white font-bold rounded w-16 py-1 text-center mr-3">
                  {event.year}
                </div>
                <p>{event.event}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 bg-[#262626] border border-[#333] rounded-xl p-4 shadow-md">
        <h2 className="text-xl font-semibold mb-4">Analyse des données</h2>
        <div className="space-y-4 text-gray-300">
          <p>L'évolution des remises de fonds de la diaspora malgache montre une augmentation significative à partir de 2005, atteignant un pic à plus de 495 millions USD en 2020 pendant la crise du COVID-19.</p>
          <p>Ces transferts représentent environ 2.44% du PIB malgache en 2023, constituant une source importante de devises étrangères pour l'économie nationale.</p>
          <p>On observe également une corrélation entre les événements politiques majeurs (crises de 2002 et 2009) et les variations des remises de fonds, suggérant un rôle de filet de sécurité économique joué par la diaspora.</p>
          <p>Le taux de change a connu une dépréciation constante, passant de 49 Ariary pour 1 USD en 1960 à plus de 4400 Ariary en 2023, reflétant les défis macroéconomiques persistants du pays.</p>
        </div>
      </div>
    </div>
  );
}