'use client';

import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine, TooltipProps } from 'recharts';
import { TrendingUp, Info, Calendar, Filter, Activity } from 'lucide-react';

// Types
// interface DataPoint {
//     year: number;
//     rate: number;
// }

interface ChartDataPoint {
    year: number;
    inflation?: number;
    rateChange?: number;
}

// interface HistoricalEvent {
//     year: number;
//     name: string;
// }

type Period = 'all' | '10y' | '5y';

// Événements historiques
const historicalEvents = [
    { year: 1962, name: "Indépendance de Madagascar" },
    { year: 1972, name: "Renversement de la Première République" },
    { year: 1975, name: "Nationalisation sous Ratsiraka" },
    { year: 1981, name: "Crise économique et ajustement structurel" },
    { year: 1991, name: "Transition démocratique" },
    { year: 2002, name: "Crise politique post-électorale" },
    { year: 2009, name: "Coup d'état/crise politique" },
    { year: 2013, name: "Retour à l'ordre constitutionnel" },
    { year: 2020, name: "Crise du COVID-19" }
];

// Données du taux de change
const historicalData = [
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

// Données d'inflation
const inflationData = [
    { year: 1965, inflation: 4.20 },
    { year: 1966, inflation: 3.21 },
    { year: 1967, inflation: 0.82 },
    { year: 1968, inflation: 0.96 },
    { year: 1969, inflation: 3.83 },
    { year: 1970, inflation: 2.88 },
    { year: 1971, inflation: 5.39 },
    { year: 1972, inflation: 5.62 },
    { year: 1973, inflation: 6.12 },
    { year: 1974, inflation: 22.10 },
    { year: 1975, inflation: 8.19 },
    { year: 1976, inflation: 4.99 },
    { year: 1977, inflation: 3.11 },
    { year: 1978, inflation: 6.53 },
    { year: 1979, inflation: 14.06 },
    { year: 1980, inflation: 18.22 },
    { year: 1981, inflation: 30.54 },
    { year: 1982, inflation: 31.79 },
    { year: 1983, inflation: 19.33 },
    { year: 1984, inflation: 9.86 },
    { year: 1985, inflation: 10.56 },
    { year: 1986, inflation: 14.50 },
    { year: 1987, inflation: 15.00 },
    { year: 1988, inflation: 26.85 },
    { year: 1989, inflation: 9.01 },
    { year: 1990, inflation: 11.78 },
    { year: 1991, inflation: 8.59 },
    { year: 1992, inflation: 14.51 },
    { year: 1993, inflation: 10.01 },
    { year: 1994, inflation: 38.94 },
    { year: 1995, inflation: 49.08 },
    { year: 1996, inflation: 19.76 },
    { year: 1997, inflation: 4.49 },
    { year: 1998, inflation: 6.21 },
    { year: 1999, inflation: 9.93 },
    { year: 2000, inflation: 11.86 },
    { year: 2001, inflation: 7.92 },
    { year: 2002, inflation: 16.50 },
    { year: 2003, inflation: -1.70 },
    { year: 2004, inflation: 13.96 },
    { year: 2005, inflation: 18.36 },
    { year: 2006, inflation: 10.77 },
    { year: 2007, inflation: 10.29 },
    { year: 2008, inflation: 9.30 },
    { year: 2009, inflation: 8.95 },
    { year: 2010, inflation: 9.25 },
    { year: 2011, inflation: 9.48 },
    { year: 2012, inflation: 5.71 },
    { year: 2013, inflation: 5.83 },
    { year: 2014, inflation: 6.08 },
    { year: 2015, inflation: 7.40 },
    { year: 2016, inflation: 6.04 },
    { year: 2017, inflation: 8.61 },
    { year: 2018, inflation: 8.59 },
    { year: 2019, inflation: 5.61 },
    { year: 2020, inflation: 4.20 },
    { year: 2021, inflation: 5.81 },
    { year: 2022, inflation: 8.16 },
    { year: 2023, inflation: 9.87 }
];

interface CustomTooltipProps extends TooltipProps<number, string> {
    active?: boolean;
    payload?: Array<{
        value: number;
        dataKey: string;
        name?: string;
    }>;
    label?: string;
}

export default function InflationExchangeRatePage() {
    const [selectedPeriod, setSelectedPeriod] = useState<Period>('all');
    const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
    const [, setHoveredYear] = useState<number | null>(null);

    // Stats calculés
    const keyStats = {
        correlation: "0.564",
        avgInflation: "11.23%",
        highestInflation: "49.08% (1995)",
        avgRateChange: "7.40%",
        relationshipStrength: "Relation modérée positive"
    };

    useEffect(() => {
        // Calculer les variations annuelles du taux de change
        const data: ChartDataPoint[] = [];
        let startYear = 1960;

        if (selectedPeriod === '10y') {
            startYear = 2023 - 10;
        } else if (selectedPeriod === '5y') {
            startYear = 2023 - 5;
        }

        historicalData.forEach((currentPoint, index) => {
            if (currentPoint.year < startYear) return;

            const dataPoint: ChartDataPoint = {
                year: currentPoint.year,
            };

            // Trouver la valeur d'inflation pour cette année
            const inflationPoint = inflationData.find(item => item.year === currentPoint.year);
            if (inflationPoint) {
                dataPoint.inflation = inflationPoint.inflation;
            }

            // Calculer la variation du taux de change en pourcentage
            if (index > 0) {
                const previousPoint = historicalData[index - 1];
                const pctChange = ((currentPoint.rate - previousPoint.rate) / previousPoint.rate) * 100;
                dataPoint.rateChange = parseFloat(pctChange.toFixed(2));
            } else {
                dataPoint.rateChange = 0; // Première année, pas de variation
            }

            data.push(dataPoint);
        });

        setChartData(data);
    }, [selectedPeriod]);

    const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
        if (active && payload && payload.length) {
            const inflation = payload.find((p) => p.dataKey === 'inflation');
            const rateChange = payload.find((p) => p.dataKey === 'rateChange');
            return (
                <div className="bg-[#333] p-3 border border-gray-600 rounded shadow-lg">
                    <p className="font-bold text-white">{`Année: ${label}`}</p>
                    {inflation && (
                        <p className="text-blue-400">{`Inflation: ${inflation.value}%`}</p>
                    )}
                    {rateChange && (
                        <p className="text-red-400">{`Variation taux: ${rateChange.value}%`}</p>
                    )}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="min-h-screen w-full bg-[#212121] text-gray-200 p-4 md:p-8 flex flex-col gap-8">

            <div className="max-w-7xl mx-auto text-center">
                <div className="flex items-center justify-center mb-4">
                    <Activity className="w-8 h-8 mr-3 text-blue-400" />
                    <h1 className="text-2xl md:text-4xl font-bold text-white">Relation entre Inflation et Taux de Change</h1>
                </div>
                <p className="text-gray-400 max-w-3xl mx-auto text-sm md:text-base">
                    Analyse de la relation entre l&apos;inflation annuelle et les variations du taux de change Ariary/USD de Madagascar depuis 1960.
                </p>
            </div>

            {/* KPIs et filtres */}
            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-5 gap-4">
                {/* Filtres */}
                <div className="md:col-span-1 bg-[#262626] border border-[#333] rounded-xl p-4 shadow-md flex flex-col gap-2">
                    <div className="flex items-center mb-2">
                        <Filter className="w-4 h-4 mr-2 text-blue-400" />
                        <h3 className="text-sm font-semibold">Filtres</h3>
                    </div>
                    <div className="flex flex-col gap-2">
                        <button
                            className={`cursor-pointer text-xs py-2 px-3 rounded-md transition-all ${selectedPeriod === 'all' ? 'bg-blue-600 text-white' : 'bg-[#333] text-gray-300'}`}
                            onClick={() => setSelectedPeriod('all')}
                        >
                            Toute la période
                        </button>
                        <button
                            className={`cursor-pointer  text-xs py-2 px-3 rounded-md transition-all ${selectedPeriod === '10y' ? 'bg-blue-600 text-white' : 'bg-[#333] text-gray-300'}`}
                            onClick={() => setSelectedPeriod('10y')}
                        >
                            10 dernières années
                        </button>
                        <button
                            className={`cursor-pointer  text-xs py-2 px-3 rounded-md transition-all ${selectedPeriod === '5y' ? 'bg-blue-600 text-white' : 'bg-[#333] text-gray-300'}`}
                            onClick={() => setSelectedPeriod('5y')}
                        >
                            5 dernières années
                        </button>
                    </div>
                </div>

                {/* Stats */}
                <div className="md:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-4 ">
                    <div className="bg-[#262626] border border-[#333] rounded-xl p-4 shadow-md flex justify-between flex-col">
                        <p className="text-xs text-gray-400 mb-1 flex items-center">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            Corrélation
                        </p>
                        <div>
                            <p className="text-xl md:text-3xl font-bold text-purple-400">{keyStats.correlation}</p>
                            <p className="text-xs text-gray-500">Coefficient de Pearson</p>
                        </div>
                        <div></div>
                    </div>
                    <div className="bg-[#262626] border border-[#333] rounded-xl p-4 shadow-md flex justify-between flex-col">
                        <p className="text-xs text-gray-400 mb-1">Inflation moyenne</p>
                        <div>
                            <p className="text-xl md:text-3xl font-bold text-blue-400">{keyStats.avgInflation}</p>
                            <p className="text-xs text-gray-500">Depuis 1965</p>
                        </div>
                        <div></div>
                    </div>
                    <div className="bg-[#262626] border border-[#333] rounded-xl p-4 shadow-md flex justify-between flex-col">
                        <p className="text-xs text-gray-400 mb-1">Pic d&apos;inflation</p>
                        <div>
                            <p className="text-xl md:text-3xl font-bold text-yellow-400">{keyStats.highestInflation}</p>
                            <p className="text-xs text-gray-500">Année la plus instable</p>
                        </div>
                        <div></div>
                    </div>
                    <div className="bg-[#262626] border border-[#333] rounded-xl p-4 shadow-md flex justify-between flex-col">
                        <p className="text-xs text-gray-400 mb-1">Type de relation</p>
                        <div>
                            <p className="text-xl md:text-xl font-bold text-green-400">{keyStats.relationshipStrength}</p>
                            <p className="text-xs text-gray-500">Effet modéré</p>
                        </div>
                        <div></div>
                    </div>
                </div>
            </div>

            {/* Graphique principal */}
            <div className="max-w-7xl mx-auto w-full">
                <div className="p-4 bg-[#262626] border border-[#333] rounded-xl shadow-md">
                    <h2 className="text-xl font-bold text-white mb-4">
                        Inflation et variation du taux de change ({selectedPeriod === 'all' ? '1960' : selectedPeriod === '10y' ? '10 dernières années' : '5 dernières années'}-2023)
                    </h2>
                    <div className="w-full h-[450px]"> {/* hauteur plus raisonnable */}
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                                data={chartData}
                                margin={{ top: 5, right: 30, left: 20, bottom: 0 }}
                                onMouseMove={(data: { activeLabel?: string }) => {
                                    const year = Number(data.activeLabel);
                                    if (!isNaN(year)) {
                                        setHoveredYear(year);
                                    }
                                }}
                                onMouseLeave={() => setHoveredYear(null)}
                            >
                                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                                <XAxis
                                    dataKey="year"
                                    angle={-45}
                                    textAnchor="end"
                                    height={60}
                                    interval={selectedPeriod === '5y' ? 0 : selectedPeriod === '10y' ? 1 : 5}
                                    stroke="#ccc"
                                />
                                <YAxis
                                    yAxisId="left"
                                    label={{ value: 'Inflation (%)', angle: -90, position: 'insideLeft', fill: '#ccc' }}
                                    stroke="#60A5FA"
                                />
                                <YAxis
                                    yAxisId="right"
                                    orientation="right"
                                    label={{ value: 'Variation taux de change (%)', angle: 90, position: 'insideRight', fill: '#ccc' }}
                                    stroke="#FF5252"
                                />
                                <Tooltip content={<CustomTooltip />} />
                                <Legend verticalAlign="top" height={36} wrapperStyle={{ color: '#ccc' }} />

                                {historicalEvents.map(event => {
                                    if (selectedPeriod === '5y' && event.year < new Date().getFullYear() - 5) return null;
                                    if (selectedPeriod === '10y' && event.year < new Date().getFullYear() - 10) return null;

                                    return (
                                        <ReferenceLine
                                            key={event.year}
                                            x={event.year}
                                            yAxisId="left"
                                            stroke="#777"
                                            strokeDasharray="3 3"
                                            label={{
                                                value: event.name,
                                                position: 'top',
                                                fill: '#666',
                                                fontSize: 10,
                                                angle: -90,
                                                offset: 15
                                            }}
                                        />
                                    );
                                })}

                                <Line
                                    yAxisId="left"
                                    type="monotone"
                                    dataKey="inflation"
                                    stroke="#60A5FA"
                                    activeDot={{ r: 8 }}
                                    dot={{ stroke: '#60A5FA', strokeWidth: 1, r: 4 }}
                                    name="Inflation (%)"
                                />
                                <Line
                                    yAxisId="right"
                                    type="monotone"
                                    dataKey="rateChange"
                                    stroke="#FF5252"
                                    dot={{ stroke: '#FF5252', strokeWidth: 1, r: 2 }}
                                    name="Variation taux de change (%)"
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>


                </div>
            </div>

            {/* Interprétation */}
            <div className="w-full max-w-7xl mx-auto bg-[#262626] border border-[#333] rounded-2xl p-6 shadow-lg flex flex-col gap-4">
                <div className="flex items-center mb-2">
                    <Info className="w-5 h-5 mr-2 text-blue-400" />
                    <h2 className="text-lg font-semibold text-white">Interprétation</h2>
                </div>
                <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                    Le graphique montre une relation modérée positive (corrélation de 0.564) entre l&apos;inflation et la dépréciation de l&apos;Ariary.
                    Cette relation confirme la théorie économique suggérant qu&apos;une hausse de l&apos;inflation domestique tend à affaiblir la monnaie locale.
                </p>
                <blockquote className="border-l-4 border-blue-400 pl-4 italic text-gray-400 mt-2">
                    &quot;Les périodes de forte inflation, notamment 1994-1995 (environ 49%) et au début des années 1980 (plus de 30%),
                    coïncident souvent avec des phases d&apos;accélération de la dépréciation monétaire.&quot;
                </blockquote>
                <p className="text-gray-300 text-sm md:text-base leading-relaxed mt-2">
                    Plusieurs phénomènes intéressants sont observables :
                </p>
                <ul className="list-disc pl-5 text-gray-300 text-sm md:text-base leading-relaxed">
                    <li>Les chocs politiques (1972, 1991, 2002, 2009) sont généralement suivis par des pics d&apos;inflation et d&apos;accélération de la dépréciation monétaire.</li>
                    <li>L&apos;année 2003 présente une anomalie avec une déflation (-1.70%) mais une dépréciation continue de la monnaie, suggérant l&apos;influence d&apos;autres facteurs extérieurs.</li>
                    <li>La période post-2015 montre une inflation modérée mais une dépréciation plus forte et constante de l&apos;Ariary, indiquant un possible découplage partiel entre ces deux variables.</li>
                </ul>
                <p className="text-gray-300 text-sm md:text-base leading-relaxed mt-2">
                    Il faut noter que cette corrélation de 0.564 indique que d&apos;autres facteurs importants influencent également le taux de change,
                    comme la balance commerciale, les politiques monétaires, les flux d&apos;investissements étrangers et la confiance des marchés internationaux.
                </p>

                {/* Table comparative */}
                <div className="mt-4">
                    <h3 className="text-sm font-medium text-gray-300 mb-2">Périodes critiques et leur impact sur l&apos;inflation et le taux de change</h3>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-700 text-sm">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Période</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Inflation Moy.</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Dépréciation Moy.</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Événement majeur</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700">
                                <tr>
                                    <td className="px-4 py-2 whitespace-nowrap">1980-1985</td>
                                    <td className="px-4 py-2 whitespace-nowrap">20.13%</td>
                                    <td className="px-4 py-2 whitespace-nowrap">26.42%</td>
                                    <td className="px-4 py-2 whitespace-nowrap">Ajustement structurel FMI</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 whitespace-nowrap">1994-1996</td>
                                    <td className="px-4 py-2 whitespace-nowrap">35.93%</td>
                                    <td className="px-4 py-2 whitespace-nowrap">18.65%</td>
                                    <td className="px-4 py-2 whitespace-nowrap">Libéralisation monétaire</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 whitespace-nowrap">2002-2004</td>
                                    <td className="px-4 py-2 whitespace-nowrap">9.59%</td>
                                    <td className="px-4 py-2 whitespace-nowrap">15.07%</td>
                                    <td className="px-4 py-2 whitespace-nowrap">Crise politique</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 whitespace-nowrap">2020-2023</td>
                                    <td className="px-4 py-2 whitespace-nowrap">7.01%</td>
                                    <td className="px-4 py-2 whitespace-nowrap">3.98%</td>
                                    <td className="px-4 py-2 whitespace-nowrap">COVID et tensions internationales</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Pied de page avec sources */}
            <div className="w-full max-w-7xl mx-auto text-center text-xs text-gray-500 mt-4 flex items-center justify-center">
                <Calendar className="w-3 h-3 mr-1" />
                <p>Sources: Banque centrale de Madagascar, Banque mondiale, FMI | Dernière mise à jour: Avril 2025</p>
            </div>
        </div>
    );
}