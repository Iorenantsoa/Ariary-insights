'use client';

import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine, Bar, ComposedChart } from 'recharts';
import { BarChart2, TrendingUp, Info, Calendar, Filter, Activity, DollarSign } from 'lucide-react';

// Types
interface DataPoint {
    year: number;
    reserves: number;
    reservesMonths: number | null;
}

interface ChartDataPoint {
    year: number;
    reserves?: number;
    reservesMonths?: number | undefined | null;
    gdp?: number;
    reservesToGDP?: number;
}

interface HistoricalEvent {
    year: number;
    name: string;
}

type Period = 'all' | '20y' | '10y';

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

// Données des réserves totales (extraites du CSV)
const reservesData = [
    { year: 1962, reserves: 48000000, reservesMonths: null },
    { year: 1963, reserves: 42800000, reservesMonths: null },
    { year: 1964, reserves: 51080000, reservesMonths: null },
    { year: 1965, reserves: 49882000, reservesMonths: null },
    { year: 1966, reserves: 51482000, reservesMonths: null },
    { year: 1967, reserves: 42882000, reservesMonths: null },
    { year: 1968, reserves: 30582000, reservesMonths: null },
    { year: 1969, reserves: 19382000, reservesMonths: null },
    { year: 1970, reserves: 37122000, reservesMonths: null },
    { year: 1971, reserves: 46345063, reservesMonths: null },
    { year: 1972, reserves: 52241643, reservesMonths: null },
    { year: 1973, reserves: 67901725, reservesMonths: null },
    { year: 1974, reserves: 49408139, reservesMonths: 1.60 },
    { year: 1975, reserves: 35577006, reservesMonths: 0.85 },
    { year: 1976, reserves: 42161007, reservesMonths: 1.22 },
    { year: 1977, reserves: 68920781, reservesMonths: 1.81 },
    { year: 1978, reserves: 59221296, reservesMonths: 1.22 },
    { year: 1979, reserves: 5039520, reservesMonths: 0.06 },
    { year: 1980, reserves: 9100000, reservesMonths: 0.10 },
    { year: 1981, reserves: 26521652, reservesMonths: 0.38 },
    { year: 1982, reserves: 19959209, reservesMonths: 0.32 },
    { year: 1983, reserves: 29225635, reservesMonths: 0.52 },
    { year: 1984, reserves: 58899721, reservesMonths: 1.06 },
    { year: 1985, reserves: 48443937, reservesMonths: 0.91 },
    { year: 1986, reserves: 114524464, reservesMonths: 1.97 },
    { year: 1987, reserves: 185199306, reservesMonths: 3.06 },
    { year: 1988, reserves: 223721113, reservesMonths: 3.53 },
    { year: 1989, reserves: 245265708, reservesMonths: 3.89 },
    { year: 1990, reserves: 92084945, reservesMonths: 1.12 },
    { year: 1991, reserves: 88857217, reservesMonths: 1.26 },
    { year: 1992, reserves: 84427500, reservesMonths: 1.15 },
    { year: 1993, reserves: 80642850, reservesMonths: 1.00 },
    { year: 1994, reserves: 71640029, reservesMonths: 0.83 },
    { year: 1995, reserves: 108960784, reservesMonths: 1.13 },
    { year: 1996, reserves: 240880919, reservesMonths: 2.51 },
    { year: 1997, reserves: 281600527, reservesMonths: 3.23 },
    { year: 1998, reserves: 171378013, reservesMonths: 1.91 },
    { year: 1999, reserves: 227186729, reservesMonths: 2.52 },
    { year: 2000, reserves: 285182985, reservesMonths: 2.81 },
    { year: 2001, reserves: 398349961, reservesMonths: 3.65 },
    { year: 2002, reserves: 363272346, reservesMonths: 2.45 },
    { year: 2003, reserves: 414272747, reservesMonths: 3.40 },
    { year: 2004, reserves: 503524276, reservesMonths: 3.65 },
    { year: 2005, reserves: 481286831, reservesMonths: 2.52 },
    { year: 2006, reserves: 583182459, reservesMonths: 2.79 },
    { year: 2007, reserves: 846677005, reservesMonths: 2.87 },
    { year: 2008, reserves: 982306553, reservesMonths: 2.40 },
    { year: 2009, reserves: 982078790, reservesMonths: 2.88 },
    { year: 2010, reserves: 1022970696, reservesMonths: 3.36 },
    { year: 2011, reserves: 1134559590, reservesMonths: 3.30 },
    { year: 2012, reserves: 1052810916, reservesMonths: 2.91 },
    { year: 2013, reserves: 776146663, reservesMonths: 2.02 },
    { year: 2014, reserves: 773817323, reservesMonths: 2.11 },
    { year: 2015, reserves: 832008813, reservesMonths: 2.52 },
    { year: 2016, reserves: 1183690792, reservesMonths: 3.49 },
    { year: 2017, reserves: 1600175022, reservesMonths: 3.88 },
    { year: 2018, reserves: 1739588290, reservesMonths: 3.91 },
    { year: 2019, reserves: 1693147648, reservesMonths: 3.88 },
    { year: 2020, reserves: 1980766598, reservesMonths: 5.73 },
    { year: 2021, reserves: 2334564598, reservesMonths: 5.47 },
    { year: 2022, reserves: 2159914364, reservesMonths: 3.98 },
    { year: 2023, reserves: 2631980575, reservesMonths: null }
];

// Données PIB pour contexte
const gdpData = [
    { year: 1960, gdp: 673081725 },
    { year: 1970, gdp: 1111859571 },
    { year: 1980, gdp: 5201818348 },
    { year: 1990, gdp: 3931334875 },
    { year: 2000, gdp: 4629247204 },
    { year: 2010, gdp: 9982711338 },
    { year: 2015, gdp: 11323020701 },
    { year: 2020, gdp: 13051441204 },
    { year: 2021, gdp: 14554754117 },
    { year: 2022, gdp: 15134700203 },
    { year: 2023, gdp: 15790113247 }
];

export default function ReservesTotalesPage() {
    const [selectedPeriod, setSelectedPeriod] = useState<Period>('all');
    const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
    const [hoveredYear, setHoveredYear] = useState<number | null>(null);

    // Stats calculés
    const keyStats = {
        currentReserves: "2.63 milliards $",
        maxReserves: "2.63 milliards $ (2023)",
        avgMonths: "2.31 mois",
        reservesToGDP2023: "16.7%"
    };

    useEffect(() => {
        // Préparer les données pour le graphique
        const data: ChartDataPoint[] = [];
        let startYear = 1960;

        if (selectedPeriod === '20y') {
            startYear = 2023 - 20;
        } else if (selectedPeriod === '10y') {
            startYear = 2023 - 10;
        }

        reservesData.forEach((currentPoint) => {
            if (currentPoint.year < startYear) return;

            const dataPoint: ChartDataPoint = {
                year: currentPoint.year,
                reserves: currentPoint.reserves / 1000000, // Convertir en millions pour lisibilité
                reservesMonths: currentPoint.reservesMonths
            };

            // Trouver le PIB pour cette année s'il existe
            const gdpPoint = gdpData.find(item => item.year === currentPoint.year);
            if (gdpPoint) {
                dataPoint.gdp = gdpPoint.gdp / 1000000; // Convertir en millions
                dataPoint.reservesToGDP = (currentPoint.reserves / gdpPoint.gdp) * 100; // En pourcentage
            }

            data.push(dataPoint);
        });

        setChartData(data);
    }, [selectedPeriod]);

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-[#333] p-3 border border-gray-600 rounded shadow-lg">
                    <p className="font-bold text-white">{`Année: ${label}`}</p>
                    {payload[0] && (
                        <p className="text-blue-400">{`Réserves: ${payload[0].value.toFixed(2)} millions $`}</p>
                    )}
                    {payload[1] && payload[1].value !== null && (
                        <p className="text-blue-400">{`Couverture: ${payload[1].value.toFixed(2)} mois d'importations`}</p>
                    )}
                    {payload.find((p: any) => p.dataKey === 'reservesToGDP') && (
                        <p className="text-purple-400">{`% du PIB: ${payload.find((p: any) => p.dataKey === 'reservesToGDP').value.toFixed(2)}%`}</p>
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
                    <DollarSign className="w-8 h-8 mr-3 text-blue-400" />
                    <h1 className="text-2xl md:text-4xl font-bold text-white">Réserves Internationales de Madagascar</h1>
                </div>
                <p className="text-gray-400 max-w-3xl mx-auto text-sm md:text-base">
                    Évolution des réserves totales (incluant l'or) et leur couverture en mois d'importations depuis 1962.
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
                            className={`cursor-pointer text-xs py-2 px-3 rounded-md transition-all ${selectedPeriod === 'all' ? 'bg-blue-400 text-white' : 'bg-[#333] text-gray-300'}`}
                            onClick={() => setSelectedPeriod('all')}
                        >
                            Toute la période
                        </button>
                        <button
                            className={`cursor-pointer text-xs py-2 px-3 rounded-md transition-all ${selectedPeriod === '20y' ? 'bg-blue-400 text-white' : 'bg-[#333] text-gray-300'}`}
                            onClick={() => setSelectedPeriod('20y')}
                        >
                            20 dernières années
                        </button>
                        <button
                            className={`cursor-pointer text-xs py-2 px-3 rounded-md transition-all ${selectedPeriod === '10y' ? 'bg-blue-400 text-white' : 'bg-[#333] text-gray-300'}`}
                            onClick={() => setSelectedPeriod('10y')}
                        >
                            10 dernières années
                        </button>
                    </div>
                </div>

                {/* Stats */}
                <div className="md:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-[#262626] border border-[#333] rounded-xl p-4 shadow-md flex justify-between flex-col">
                        <p className="text-xs text-gray-400 mb-1 flex items-center">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            Réserves actuelles
                        </p>
                        <div>
                            <p className="text-xl  font-bold text-blue-400">{keyStats.currentReserves}</p>
                            <p className="text-xs text-gray-500">Dernière année (2023)</p>
                        </div>
                        <div></div>
                    </div>
                    <div className="bg-[#262626] border border-[#333] rounded-xl p-4 shadow-md flex justify-between flex-col">
                        <p className="text-xs text-gray-400 mb-1">Maximum historique</p>
                        <div>
                            <p className="text-xl  font-bold text-red-400">{keyStats.maxReserves}</p>
                            <p className="text-xs text-gray-500">Record atteint</p>
                        </div>
                        <div></div>
                    </div>
                    <div className="bg-[#262626] border border-[#333] rounded-xl p-4 shadow-md flex justify-between flex-col">
                        <p className="text-xs text-gray-400 mb-1">Couverture moyenne</p>
                        <div>
                            <p className="text-xl  font-bold text-gray-300">{keyStats.avgMonths}</p>
                            <p className="text-xs text-gray-500">Mois d'importations</p>
                        </div>
                        <div></div>
                    </div>
                    <div className="bg-[#262626] border border-[#333] rounded-xl p-4 shadow-md flex justify-between flex-col">
                        <p className="text-xs text-gray-400 mb-1">Ratio au PIB</p>
                        <div>
                            <p className="text-xl md:text-xl font-bold text-purple-400">{keyStats.reservesToGDP2023}</p>
                            <p className="text-xs text-gray-500">Année 2023</p>
                        </div>
                        <div></div>
                    </div>
                </div>
            </div>

            {/* Graphique principal */}
            <div className="max-w-7xl mx-auto w-full">
    <div className="p-4 bg-[#262626] border border-[#333] rounded-xl shadow-md">
        <h2 className="text-xl font-bold text-white mb-4">
            Réserves internationales ({selectedPeriod === 'all' ? '1962' : selectedPeriod === '20y' ? '20 dernières années' : '10 dernières années'}-2023)
        </h2>
        <div className="w-full h-[450px]">
            <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                    data={chartData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    onMouseMove={(data: any) => {
                        if (data && data.activeLabel) {
                            setHoveredYear(data.activeLabel);
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
                        interval={selectedPeriod === '10y' ? 0 : selectedPeriod === '20y' ? 2 : 5}
                        stroke="#ccc"
                    />
                    <YAxis
                        yAxisId="left"
                        label={{ value: 'Réserves (millions $)', angle: -90, position: 'insideLeft', fill: '#ccc' }}
                        stroke="#38BDF8"  // bleu clair propre
                    />
                    <YAxis
                        yAxisId="right"
                        orientation="right"
                        label={{ value: 'Mois d\'importations', angle: 90, position: 'insideRight', fill: '#ccc' }}
                        stroke="#38BDF8"
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend verticalAlign="top" height={36} wrapperStyle={{ color: '#ccc' }} />

                    {/* Événements historiques */}
                    {historicalEvents.map(event => {
                        if (selectedPeriod === '10y' && event.year < new Date().getFullYear() - 10) return null;
                        if (selectedPeriod === '20y' && event.year < new Date().getFullYear() - 20) return null;

                        return (
                            <ReferenceLine
                                key={event.year}
                                x={event.year}
                                yAxisId="left"
                                stroke="#6B7280"  // gris moyen, discret
                                strokeDasharray="3 3"
                                label={{
                                    value: event.name,
                                    position: 'top',
                                    fill: '#9CA3AF',
                                    fontSize: 10,
                                    angle: -90,
                                    offset: 15
                                }}
                            />
                        );
                    })}

                    {/* SEUIL 3 MOIS */}
                    <ReferenceLine
                        y={3}
                        yAxisId="right"
                        stroke="#F87171"  // rouge clair pour signal d'alerte
                        strokeDasharray="4 4"
                        label={{
                            value: 'Seuil 3 mois',
                            position: 'right',
                            fill: '#F87171',
                            fontSize: 12,
                            fontWeight: 'bold'
                        }}
                    />

                    {/* Barres de réserves */}
                    <Bar
                        yAxisId="left"
                        dataKey="reserves"
                        fill="#6b7280"  
                        name="Réserves (millions $)"
                        barSize={20}
                        opacity={0.8}
                    />

                    {/* Ligne mois d'importations */}
                    <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="reservesMonths"
                        stroke="#38BDF8"   
                        activeDot={{ r: 8 }}
                        dot={{ stroke: '#38BDF8', strokeWidth: 3, r: 4 }}
                        name="Mois d'importations"
                        
                    />

                    {/* % du PIB si applicable */}
                    {selectedPeriod !== 'all' && (
                        <Line
                            yAxisId="left"
                            type="monotone"
                            dataKey="reservesToGDP"
                            stroke="#A78BFA"  // violet clair pastel
                            dot={{ stroke: '#A78BFA', strokeWidth: 1, r: 2 }}
                            name="% du PIB"
                        />
                    )}
                </ComposedChart>
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
                    L'évolution des réserves internationales de Madagascar montre une tendance générale à la hausse depuis les années 2000, avec une accélération significative à partir de 2015.
                    Cette croissance reflète l'intégration progressive du pays dans l'économie mondiale et l'amélioration relative de sa position financière externe.
                </p>
                <blockquote className="border-l-4 border-blue-400 pl-4 italic text-gray-400 mt-2">
                    "Les niveaux records atteints en 2023 avec 2,63 milliards de dollars représentent près de 16,7% du PIB national,
                    témoignant d'une volonté de renforcer la résilience économique face aux chocs extérieurs."
                </blockquote>
                <p className="text-gray-300 text-sm md:text-base leading-relaxed mt-2">
                    Plusieurs phases distinctes sont observables :
                </p>
                <ul className="list-disc pl-5 text-gray-300 text-sm md:text-base leading-relaxed">
                    <li>Une période de faibles réserves (1960-1985) caractérisée par une forte volatilité et des niveaux généralement inférieurs à 60 millions de dollars.</li>
                    <li>Une phase de consolidation modérée (1986-1995) avec des pics notables suivis de chutes brutales, reflétant l'instabilité politique et économique.</li>
                    <li>Une période de croissance progressive (1996-2012) interrompue par les crises politiques de 2002 et 2009.</li>
                    <li>Une phase de forte expansion (2013-2023) malgré une légère baisse en 2022, aboutissant au niveau record actuel.</li>
                </ul>
                <p className="text-gray-300 text-sm md:text-base leading-relaxed mt-2">
                    En termes de couverture des importations, Madagascar a évolué d'une situation précaire (moins d'un mois) dans les années 1970-80
                    à une position plus confortable avec plus de 3 mois de couverture depuis 2017, et un pic à 5,73 mois pendant la crise COVID.
                    Le standard international recommandé étant de 3 mois, Madagascar se situe désormais au-dessus de ce seuil.
                </p>

                {/* Table comparative */}
                <div className="mt-4">
                    <h3 className="text-sm font-medium text-gray-300 mb-2">Périodes significatives dans l'évolution des réserves</h3>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-700 text-sm">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Période</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Réserves Moy.</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Couverture Moy.</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Contexte économique</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700">
                                <tr>
                                    <td className="px-4 py-2 whitespace-nowrap">1970-1979</td>
                                    <td className="px-4 py-2 whitespace-nowrap">41.1 millions $</td>
                                    <td className="px-4 py-2 whitespace-nowrap">~1.0 mois</td>
                                    <td className="px-4 py-2 whitespace-nowrap">Socialisme et nationalisation</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 whitespace-nowrap">1986-1989</td>
                                    <td className="px-4 py-2 whitespace-nowrap">192.2 millions $</td>
                                    <td className="px-4 py-2 whitespace-nowrap">~3.1 mois</td>
                                    <td className="px-4 py-2 whitespace-nowrap">Période d'ajustement structurel</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 whitespace-nowrap">2008-2012</td>
                                    <td className="px-4 py-2 whitespace-nowrap">1.04 milliards $</td>
                                    <td className="px-4 py-2 whitespace-nowrap">~2.9 mois</td>
                                    <td className="px-4 py-2 whitespace-nowrap">Crise politique et sanctions</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 whitespace-nowrap">2017-2023</td>
                                    <td className="px-4 py-2 whitespace-nowrap">2.0 milliards $</td>
                                    <td className="px-4 py-2 whitespace-nowrap">~4.3 mois</td>
                                    <td className="px-4 py-2 whitespace-nowrap">Stabilisation politique et COVID</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <p className="text-gray-300 text-sm md:text-base leading-relaxed mt-4">
                    Il est important de noter que malgré cette amélioration notable, les réserves de Madagascar restent modestes par rapport à d'autres pays
                    de taille similaire dans la région, reflétant les défis persistants en matière de balance commerciale et d'investissements étrangers.
                    La dépendance aux bailleurs de fonds internationaux reste également un facteur significatif dans la constitution de ces réserves.
                </p>
            </div>

            {/* Pied de page avec sources */}
            <div className="w-full max-w-7xl mx-auto text-center text-xs text-gray-500 mt-4 flex items-center justify-center">
                <Calendar className="w-3 h-3 mr-1" />
                <p>Sources: Banque centrale de Madagascar, Banque mondiale, FMI | Dernière mise à jour: Avril 2025</p>
            </div>
        </div>
    );
}