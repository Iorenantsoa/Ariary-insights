"use client"
import React, { useState, useEffect } from 'react';
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
    TooltipProps
} from 'recharts'; 


// Définition des types
interface DebtData {
    year: number;
    debt: number;
    debtGNI: number;
}

interface Event {
    year: number;
    label: string;
}
interface CustomTooltipProps extends TooltipProps<number, string> {
    active?: boolean;
    payload?: Array<{
        value: number;
        name: string;
        dataKey: string;
        // Add other properties if needed
    }>;
    label?: string;
}
// Périodes de filtrage
type PeriodFilter = 'all' | 'pre-2000' | 'post-2000' | 'crisis';

const DettePage: React.FC = () => {
    // État pour stocker le filtre actif
    const [activeFilter, setActiveFilter] = useState<PeriodFilter>('all');
    // État pour stocker les données filtrées
    const [filteredData, setFilteredData] = useState<DebtData[]>([]);

    // Les données de la dette
    const data: DebtData[] = [
        { year: 1970, debt: 0.485, debtGNI: 43.75 },
        { year: 1971, debt: 0.488, debtGNI: 40.95 },
        { year: 1972, debt: 0.510, debtGNI: 38.09 },
        { year: 1973, debt: 0.505, debtGNI: 30.64 },
        { year: 1974, debt: 0.751, debtGNI: 39.45 },
        { year: 1975, debt: 0.791, debtGNI: 34.84 },
        { year: 1976, debt: 0.190, debtGNI: 8.75 },
        { year: 1977, debt: 0.782, debtGNI: 33.15 },
        { year: 1978, debt: 0.356, debtGNI: 13.34 },
        { year: 1979, debt: 0.773, debtGNI: 22.40 },
        { year: 1980, debt: 1.248, debtGNI: 24.20 },
        { year: 1981, debt: 1.613, debtGNI: 34.54 },
        { year: 1982, debt: 1.933, debtGNI: 41.21 },
        { year: 1983, debt: 2.041, debtGNI: 44.67 },
        { year: 1984, debt: 2.147, debtGNI: 57.10 },
        { year: 1985, debt: 2.529, debtGNI: 68.85 },
        { year: 1986, debt: 3.007, debtGNI: 71.73 },
        { year: 1987, debt: 3.684, debtGNI: 121.24 },
        { year: 1988, debt: 3.684, debtGNI: 122.37 },
        { year: 1989, debt: 3.431, debtGNI: 114.90 },
        { year: 1990, debt: 3.701, debtGNI: 98.16 },
        { year: 1991, debt: 3.908, debtGNI: 126.33 },
        { year: 1992, debt: 3.911, debtGNI: 109.63 },
        { year: 1993, debt: 3.805, debtGNI: 97.25 },
        { year: 1994, debt: 4.096, debtGNI: 121.67 },
        { year: 1995, debt: 4.322, debtGNI: 117.72 },
        { year: 1996, debt: 4.146, debtGNI: 86.93 },
        { year: 1997, debt: 4.109, debtGNI: 98.58 },
        { year: 1998, debt: 4.394, debtGNI: 101.63 },
        { year: 1999, debt: 4.782, debtGNI: 112.90 },
        { year: 2000, debt: 4.726, debtGNI: 103.02 },
        { year: 2001, debt: 4.184, debtGNI: 78.12 },
        { year: 2002, debt: 4.544, debtGNI: 87.05 },
        { year: 2003, debt: 4.980, debtGNI: 79.10 },
        { year: 2004, debt: 3.825, debtGNI: 76.64 },
        { year: 2005, debt: 3.525, debtGNI: 61.45 },
        { year: 2006, debt: 1.527, debtGNI: 24.44 },
        { year: 2007, debt: 2.332, debtGNI: 27.64 },
        { year: 2008, debt: 2.533, debtGNI: 23.84 },
        { year: 2009, debt: 2.847, debtGNI: 30.06 },
        { year: 2010, debt: 2.756, debtGNI: 28.11 },
        { year: 2011, debt: 2.867, debtGNI: 25.29 },
        { year: 2012, debt: 2.993, debtGNI: 26.71 },
        { year: 2013, debt: 2.941, debtGNI: 24.50 },
        { year: 2014, debt: 2.964, debtGNI: 24.34 },
        { year: 2015, debt: 3.008, debtGNI: 27.61 },
        { year: 2016, debt: 2.977, debtGNI: 26.16 },
        { year: 2017, debt: 3.383, debtGNI: 26.51 },
        { year: 2018, debt: 3.720, debtGNI: 27.97 },
        { year: 2019, debt: 4.045, debtGNI: 29.71 },
        { year: 2020, debt: 4.841, debtGNI: 38.07 },
        { year: 2021, debt: 5.345, debtGNI: 37.39 },
        { year: 2022, debt: 5.938, debtGNI: 40.21 },
        { year: 2023, debt: 6.452, debtGNI: 41.78 }
    ];

    // Les événements historiques importants
    const events: Event[] = [
        { year: 1960, label: "Indépendance de Madagascar" },
        { year: 1972, label: "Renversement de la Première République" },
        { year: 1975, label: "Nationalisation sous Ratsiraka" },
        { year: 1980, label: "Crise économique/Plan d'ajustement structurel" },
        { year: 1991, label: "Transition démocratique" },
        { year: 2002, label: "Crise politique" },
        { year: 2009, label: "Coup d'état/Crise politique" },
        { year: 2013, label: "Retour à l'ordre constitutionnel" },
        { year: 2020, label: "Crise du COVID-19" }
    ];

    // Fonction pour filtrer les données en fonction de la période sélectionnée
    const filterData = (period: PeriodFilter) => {
        switch (period) {
            case 'pre-2000':
                return data.filter(item => item.year < 2000);
            case 'post-2000':
                return data.filter(item => item.year >= 2000);
            case 'crisis':
                return data.filter(item => item.year >= 1980 && item.year <= 1995);
            case 'all':
            default:
                return data;
        }
    };

    // Mise à jour des données filtrées à chaque changement de filtre
    useEffect(() => {
        setFilteredData(filterData(activeFilter));
    }, [activeFilter]);

    // Définition d'une fonction pour le formatage des nombres
    const formatNumber = (value: number) => {
        return value.toFixed(2).replace('.', ',');
    };

    // Composant de tooltip personnalisé pour afficher les valeurs précises
    const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-[#262626] border border-[#333] p-2 text-xs">
                    <p className="font-bold text-white">{`Année: ${label}`}</p>
                    <p className="text-blue-400">{`Dette: ${formatNumber(payload[0].value)} milliards $`}</p>
                    <p className="text-red-400">{`Dette/RNB: ${formatNumber(payload[1].value)}%`}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="min-h-screen w-full bg-[#212121] text-gray-200 p-4 md:p-8 flex flex-col gap-8">
            {/* En-tête avec logo et titre */}
            <div className="max-w-7xl mx-auto text-center">
                <div className="flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 mr-3 text-blue-400">
                        <path d="M3 3v18h18"></path>
                        <path d="M18 9l-6-6-6 6"></path>
                        <path d="M6 10l6-6 6 6"></path>
                    </svg>
                    <h1 className="text-2xl md:text-4xl font-bold text-white">Analyse de la Dette Extérieure de Madagascar</h1>
                </div>
                <p className="text-gray-400 max-w-3xl mx-auto text-sm md:text-base">
                    Explorez l&apos;évolution de la dette extérieure de Madagascar depuis l&apos;indépendance jusqu&apos;à aujourd&apos;hui, en valeur absolue et en pourcentage du RNB.
                </p>
            </div>

            {/* KPIs et filtres */}
            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-5 gap-4">
                {/* Filtres */}
                <div className="md:col-span-1 bg-[#262626] border border-[#333] rounded-xl p-4 shadow-md flex flex-col gap-2">
                    <div className="flex items-center mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-2 text-blue-400">
                            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                        </svg>
                        <h3 className="text-sm font-semibold">Filtres</h3>
                    </div>
                    <div className="flex flex-col gap-2">
                        <button
                            onClick={() => setActiveFilter('all')}
                            className={`cursor-pointer text-xs py-2 px-3 rounded-md transition-all ${activeFilter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
                        >
                            Toute la période
                        </button>
                        <button
                            onClick={() => setActiveFilter('pre-2000')}
                            className={`cursor-pointer text-xs py-2 px-3 rounded-md transition-all ${activeFilter === 'pre-2000' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
                        >
                            Avant 2000
                        </button>
                        <button
                            onClick={() => setActiveFilter('post-2000')}
                            className={`cursor-pointer text-xs py-2 px-3 rounded-md transition-all ${activeFilter === 'post-2000' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
                        >
                            Après 2000
                        </button>
                        <button
                            onClick={() => setActiveFilter('crisis')}
                            className={`cursor-pointer text-xs py-2 px-3 rounded-md transition-all ${activeFilter === 'crisis' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
                        >
                            Période de crise (1980-1995)
                        </button>
                    </div>
                </div>

                {/* Stats */}
                <div className="md:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-4 ">

                    <div className="bg-[#262626] border border-[#333] rounded-xl p-4 shadow-md flex justify-between flex-col">
                        <p className="text-xs text-gray-400 mb-1 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 mr-1">
                                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                            </svg>
                            Dette actuelle
                        </p>
                        <div>
                            <p className="text-xl md:text-xl font-bold text-blue-400">6,45 milliards $</p>
                            <p className="text-xs text-gray-500">2023</p>
                        </div>
                        <div></div>
                    </div>


                    <div className="bg-[#262626] border border-[#333] rounded-xl p-4 shadow-md flex justify-between flex-col">
                        <p className="text-xs text-gray-400 mb-1">Dette en % du RNB</p>
                        <div>
                            <p className="text-xl md:text-xl font-bold text-red-400">41,78%</p>
                            <p className="text-xs text-gray-500">2023</p>
                        </div>
                        <div></div>
                    </div>
                    <div className="bg-[#262626] border border-[#333] rounded-xl p-4 shadow-md flex justify-between flex-col">
                        <p className="text-xs text-gray-400 mb-1">Point critique</p>
                        <div>
                            <p className="text-xl md:text-xl font-bold text-yellow-400">121,24%</p>
                            <p className="text-xs text-gray-500">1987 (% du RNB)</p>
                        </div>
                        <div></div>
                    </div>
                    <div className="bg-[#262626] border border-[#333] rounded-xl p-4 shadow-md flex justify-between flex-col">
                        <p className="text-xs text-gray-400 mb-1">Tendance récente</p>
                        <div>
                            <p className="text-xl md:text-xl font-bold text-yellow-400">Hausse modérée</p>
                            <p className="text-xs text-gray-500">2020-2023</p>
                        </div>
                        <div></div>
                    </div>
                </div>
            </div>

            {/* Graphique principal */}
            <div className="max-w-7xl mx-auto w-full bg-[#262626] border border-[#333] rounded-xl p-4 shadow-md">
                <div style={{ width: '100%', height: 400 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                            data={filteredData}
                            margin={{ top: 20, right: 80, bottom: 50, left: 60 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                            <XAxis
                                dataKey="year"
                                label={{
                                    value: 'Année',
                                    position: 'insideBottomRight',
                                    offset: -20,
                                    fill: '#e0e0e0'
                                }}
                                tick={{ fill: '#e0e0e0' }}
                            />
                            <YAxis
                                yAxisId="left"
                                domain={[0, 7]}
                                
                                label={{
                                    value: 'Dette extérieure totale (USD)',
                                    angle: -90,
                                    position: 'insideLeft',
                                    fill: '#ccc',
                                    offset: 0,
                                    dy: 100
                                }}
                                tick={{ fill: '#e0e0e0' }}
                            />
                            <YAxis
                                yAxisId="right"
                                orientation="right"
                                domain={[0, 130]}
                                label={{
                                    value: 'Dette extérieure (% du RNB)',
                                    angle: -90,
                                    position: 'insideRight',
                                    fill: '#ef4444',
                                    offset: 0,
                                    dy: -100
                                }}

                                tick={{ fill: '#e0e0e0' }}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend verticalAlign="top" />

                            {/* Lignes de référence pour les événements historiques */}
                            {events.map((event, index) => (
                                <ReferenceLine
                                    key={index}
                                    x={event.year}
                                    stroke="#a00"
                                    strokeDasharray="3 3"
                                    yAxisId="left"
                                    label={{
                                        value: event.label,
                                        angle: -90,
                                        position: 'insideTopRight',
                                        style: { fill: '#999', fontSize: 10 }
                                    }}
                                />
                            ))}

                            <Line
                                yAxisId="left"
                                type="monotone"
                                dataKey="debt"
                                name="Dette (milliards $)"
                                stroke="#3b82f6"
                                activeDot={{ r: 8 }}
                                dot={{ r: 3 }}
                            />
                            <Line
                                yAxisId="right"
                                type="monotone"
                                dataKey="debtGNI"
                                name="Dette (% du RNB)"
                                stroke="#ef4444"
                                activeDot={{ r: 8 }}
                                dot={{ r: 3 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Interprétation */}
            <div className="w-full max-w-7xl mx-auto bg-[#262626] border border-[#333] rounded-2xl p-6 shadow-lg flex flex-col gap-4">
                <div className="flex items-center mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mr-2 text-blue-400">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="16" x2="12" y2="12"></line>
                        <line x1="12" y1="8" x2="12.01" y2="8"></line>
                    </svg>
                    <h2 className="text-lg font-semibold text-white">Interprétation</h2>
                </div>
                <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                    L&apos;évolution de la dette extérieure de Madagascar révèle plusieurs périodes distinctes, fortement influencées par le contexte politique et économique national et international.
                </p>
                <blockquote className="border-l-4 border-blue-400 pl-4 italic text-gray-400 mt-2">
                &quot;La période 1985-1995 a connu une explosion de la dette, atteignant des niveaux critiques dépassant 120% du RNB, coincidant avec les programmes d&apos;ajustement structurel imposés par les institutions financières internationales.&quot;
                </blockquote>
                <p className="text-gray-300 text-sm md:text-base leading-relaxed mt-2">
                    Après une période de stabilisation relative dans les années 2000, on observe une nouvelle tendance à la hausse depuis 2019, accentuée par la crise sanitaire mondiale et les défis économiques actuels.
                </p>

                {/* Table comparative */}
                <div className="mt-4">
                    <h3 className="text-sm font-medium text-gray-300 mb-2">Indicateurs clés du service de la dette</h3>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-700 text-sm">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Période</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Service de la dette (% du RNB)</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Service de la dette (% des exportations)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700">
                                <tr>
                                    <td className="px-4 py-2 whitespace-nowrap">1980-1989</td>
                                    <td className="px-4 py-2 whitespace-nowrap">3,92%</td>
                                    <td className="px-4 py-2 whitespace-nowrap">28,45%</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 whitespace-nowrap">1990-1999</td>
                                    <td className="px-4 py-2 whitespace-nowrap">2,82%</td>
                                    <td className="px-4 py-2 whitespace-nowrap">21,67%</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 whitespace-nowrap">2000-2009</td>
                                    <td className="px-4 py-2 whitespace-nowrap">1,01%</td>
                                    <td className="px-4 py-2 whitespace-nowrap">6,31%</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 whitespace-nowrap">2010-2023</td>
                                    <td className="px-4 py-2 whitespace-nowrap">0,95%</td>
                                    <td className="px-4 py-2 whitespace-nowrap">3,74%</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Pied de page avec sources */}
            <div className="w-full max-w-7xl mx-auto text-center text-xs text-gray-500 mt-4 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 mr-1">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                <p>Sources: Banque mondiale, FMI | Dernière mise à jour: Avril 2025</p>
            </div>
        </div>
    );
};

export default DettePage;














