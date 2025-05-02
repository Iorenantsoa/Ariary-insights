'use client';

import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Activity, TrendingDown, TrendingUp, Info, Calendar, Filter, RefreshCw } from 'lucide-react';

// Types
interface ChartDataPoint {
    year: number;
    gdpGrowth: number;
    gdp: number;
}

interface HistoricalEvent {
    year: number;
    name: string;
}

type Period = 'all' | '30y' | '10y';

// Événements historiques
const historicalEvents: HistoricalEvent[] = [
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

// Données du PIB
const rawData = [
    { year: 1960, gdp: 673081724.7511678 },
    { year: 1961, gdp: 699161944.5580972 },
    { year: 1962, gdp: 739286907.5927778 },
    { year: 1963, gdp: 759345863.7326667 },
    { year: 1964, gdp: 802482183.7287778 },
    { year: 1965, gdp: 833563472.9981 },
    { year: 1966, gdp: 900264584.5908293 },
    { year: 1967, gdp: 956436932.101291 },
    { year: 1968, gdp: 1031669637.3955349 },
    { year: 1969, gdp: 1056391055.5961725 },
    { year: 1970, gdp: 1111859570.882523 },
    { year: 1971, gdp: 1199507631.0760274 },
    { year: 1972, gdp: 1341590690.4136515 },
    { year: 1973, gdp: 1653062335.0028615 },
    { year: 1974, gdp: 1917508190.0468938 },
    { year: 1975, gdp: 2283049215.3533945 },
    { year: 1976, gdp: 2181844178.553396 },
    { year: 1977, gdp: 2358930406.068901 },
    { year: 1978, gdp: 2669755115.1093483 },
    { year: 1979, gdp: 3463565853.81023 },
    { year: 1980, gdp: 5201818347.7988205 },
    { year: 1981, gdp: 4759333998.367463 },
    { year: 1982, gdp: 4784977325.958034 },
    { year: 1983, gdp: 4686457031.226905 },
    { year: 1984, gdp: 3905938480.8611917 },
    { year: 1985, gdp: 3802557894.8719015 },
    { year: 1986, gdp: 4347989788.092567 },
    { year: 1987, gdp: 3212900555.8090987 },
    { year: 1988, gdp: 3189456965.048204 },
    { year: 1989, gdp: 3175638332.6447086 },
    { year: 1990, gdp: 3931334875.0137587 },
    { year: 1991, gdp: 3254713056.021707 },
    { year: 1992, gdp: 3714966678.33381 },
    { year: 1993, gdp: 4063298919.2868047 },
    { year: 1994, gdp: 3522227092.2283926 },
    { year: 1995, gdp: 3838100903.7497377 },
    { year: 1996, gdp: 4931861038.707632 },
    { year: 1997, gdp: 4262965419.74998 },
    { year: 1998, gdp: 4401967632.737184 },
    { year: 1999, gdp: 4277903780.2913055 },
    { year: 2000, gdp: 4629247203.84524 },
    { year: 2001, gdp: 5438332601.907981 },
    { year: 2002, gdp: 5351701663.408074 },
    { year: 2003, gdp: 6372498889.665848 },
    { year: 2004, gdp: 5064732626.293891 },
    { year: 2005, gdp: 5859269752.61332 },
    { year: 2006, gdp: 6395712490.943041 },
    { year: 2007, gdp: 8524620889.577468 },
    { year: 2008, gdp: 10725137723.654873 },
    { year: 2009, gdp: 9616879409.437893 },
    { year: 2010, gdp: 9982711338.07029 },
    { year: 2011, gdp: 11551819617.874023 },
    { year: 2012, gdp: 11578975061.947945 },
    { year: 2013, gdp: 12423555455.38532 },
    { year: 2014, gdp: 12522957399.228104 },
    { year: 2015, gdp: 11323020701.301685 },
    { year: 2016, gdp: 11848613858.441998 },
    { year: 2017, gdp: 13176313593.550934 },
    { year: 2018, gdp: 13760033282.292511 },
    { year: 2019, gdp: 14104664678.506332 },
    { year: 2020, gdp: 13051441203.947355 },
    { year: 2021, gdp: 14554754116.542673 },
    { year: 2022, gdp: 15134700203.049707 },
    { year: 2023, gdp: 15790113246.747774 },
];

// Calcul de la croissance du PIB
const economicCyclesData = rawData.map((item, index) => {
    let gdpGrowth = 0;
    if (index > 0) {
        gdpGrowth = ((item.gdp - rawData[index - 1].gdp) / rawData[index - 1].gdp) * 100;
    }

    return {
        year: item.year,
        gdpGrowth: parseFloat(gdpGrowth.toFixed(2)),
        gdp: item.gdp
    };
}).filter((_, index) => index > 0); // Filtrer la première année qui n'a pas de taux de croissance

export default function CyclesEconomiquesPage() {
    const [selectedPeriod, setSelectedPeriod] = useState<Period>('all');
    const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
    const [, setHoveredYear] = useState<number | null>(null);
    const [, setRecessions] = useState<{ start: number, end: number }[]>([]);

    // Identification des cycles économiques (récessions)
    useEffect(() => {
        // Identifier les périodes de récession (croissance négative pendant au moins 2 années consécutives)
        const recessionPeriods: { start: number, end: number }[] = [];
        let inRecession = false;
        let recessionStart = 0;

        economicCyclesData.forEach((item, index) => {
            if (item.gdpGrowth < 0) {
                if (!inRecession) {
                    inRecession = true;
                    recessionStart = item.year;
                }
            } else if (inRecession) {
                inRecession = false;
                recessionPeriods.push({
                    start: recessionStart,
                    end: economicCyclesData[index - 1].year
                });
            }
        });

        // Vérifier si la dernière période était une récession
        if (inRecession) {
            recessionPeriods.push({
                start: recessionStart,
                end: economicCyclesData[economicCyclesData.length - 1].year
            });
        }

        setRecessions(recessionPeriods);
    }, []);

    // Statistiques calculées
    const calculateStats = () => {
        let filteredData = [...economicCyclesData];

        if (selectedPeriod === '30y') {
            const startYear = 2023 - 30;
            filteredData = filteredData.filter(item => item.year >= startYear);
        } else if (selectedPeriod === '10y') {
            const startYear = 2023 - 10;
            filteredData = filteredData.filter(item => item.year >= startYear);
        }

        // Croissance moyenne
        const avgGrowth = filteredData.reduce((sum, item) => sum + item.gdpGrowth, 0) / filteredData.length;

        // Croissance la plus forte
        const maxGrowth = Math.max(...filteredData.map(item => item.gdpGrowth));
        const maxGrowthYear = filteredData.find(item => item.gdpGrowth === maxGrowth)?.year;

        // Croissance la plus faible
        const minGrowth = Math.min(...filteredData.map(item => item.gdpGrowth));
        const minGrowthYear = filteredData.find(item => item.gdpGrowth === minGrowth)?.year;

        // Volatilité (écart-type)
        const variance = filteredData.reduce((sum, item) => sum + Math.pow(item.gdpGrowth - avgGrowth, 2), 0) / filteredData.length;
        const volatility = Math.sqrt(variance);

        // Nombre d'années de récession
        const recessionYears = filteredData.filter(item => item.gdpGrowth < 0).length;

        return {
            avgGrowth: avgGrowth.toFixed(2) + "%",
            maxGrowth: maxGrowth.toFixed(2) + "% (" + maxGrowthYear + ")",
            minGrowth: minGrowth.toFixed(2) + "% (" + minGrowthYear + ")",
            volatility: volatility.toFixed(2) + "%",
            recessionYears: recessionYears,
            recessionFrequency: ((recessionYears / filteredData.length) * 100).toFixed(1) + "%"
        };
    };

    const keyStats = calculateStats();

    useEffect(() => {
        // Filtrer les données selon la période sélectionnée
        let filteredData = [...economicCyclesData];

        if (selectedPeriod === '30y') {
            const startYear = 2023 - 30;
            filteredData = filteredData.filter(item => item.year >= startYear);
        } else if (selectedPeriod === '10y') {
            const startYear = 2023 - 10;
            filteredData = filteredData.filter(item => item.year >= startYear);
        }

        setChartData(filteredData);
    }, [selectedPeriod]);

    // Identifier les cycles de boom et de récession
    const identifyCycles = (data: ChartDataPoint[]) => {
        const cycles = [];
        let currentType = data[0].gdpGrowth >= 0 ? 'expansion' : 'recession';
        let currentStart = data[0].year;

        for (let i = 1; i < data.length; i++) {
            const isExpansion = data[i].gdpGrowth >= 0;
            const cycleType = isExpansion ? 'expansion' : 'recession';

            if (cycleType !== currentType) {
                cycles.push({
                    type: currentType,
                    start: currentStart,
                    end: data[i - 1].year,
                    duration: data[i - 1].year - currentStart + 1
                });
                currentType = cycleType;
                currentStart = data[i].year;
            }
        }

        // Ajouter le dernier cycle
        cycles.push({
            type: currentType,
            start: currentStart,
            end: data[data.length - 1].year,
            duration: data[data.length - 1].year - currentStart + 1
        });

        return cycles;
    };

    const cycles = identifyCycles(economicCyclesData);

    // Les principales récessions
     cycles
        .filter(cycle => cycle.type === 'recession' && cycle.duration >= 2)
        .sort((a, b) => b.duration - a.duration)
        .slice(0, 4);

        const CustomTooltip = ({ active, payload, label }: {
            active?: boolean;
            payload?: Array<{ value: number; payload: ChartDataPoint }>;
            label?: string;
        }) => {
            if (active && payload && payload.length) {
                // Convertir label en nombre pour la comparaison
                const yearNumber = label ? parseInt(label, 10) : 0;
                // Trouver l'événement historique correspondant à cette année, s'il existe
                const event = historicalEvents.find(e => e.year === yearNumber);
        
                return (
                    <div className="bg-[#333] p-3 border border-gray-600 rounded shadow-lg">
                        <p className="font-bold text-white">{`Année: ${label}`}</p>
                        <p className="text-blue-400">{`Croissance du PIB: ${payload[0].value.toFixed(2)}%`}</p>
                        <p className="text-green-400">{`PIB: ${(payload[0].payload.gdp / 1000000).toFixed(2)} M$`}</p>
                        {event && (
                            <p className="mt-2 text-yellow-400">{`Événement: ${event.name}`}</p>
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
                    <RefreshCw className="w-8 h-8 mr-3 text-blue-400" />
                    <h1 className="text-2xl md:text-4xl font-bold text-white">Cycles Économiques de Madagascar</h1>
                </div>
                <p className="text-gray-400 max-w-3xl mx-auto text-sm md:text-base">
                    Évolution de la croissance du PIB malgache et identification des cycles économiques depuis 1961.
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
                            className={`cursor-pointer text-xs py-2 px-3 rounded-md transition-all ${selectedPeriod === '30y' ? 'bg-blue-600 text-white' : 'bg-[#333] text-gray-300'}`}
                            onClick={() => setSelectedPeriod('30y')}
                        >
                            30 dernières années
                        </button>
                        <button
                            className={`cursor-pointer text-xs py-2 px-3 rounded-md transition-all ${selectedPeriod === '10y' ? 'bg-blue-600 text-white' : 'bg-[#333] text-gray-300'}`}
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
                            <Activity className="w-3 h-3 mr-1" />
                            Croissance moyenne
                        </p>
                        <div>
                            <p className="text-xl md:text-3xl font-bold text-purple-400">{keyStats.avgGrowth}</p>
                            <p className="text-xs text-gray-500">par an</p>
                        </div>
                        <div></div>
                    </div>
                    <div className="bg-[#262626] border border-[#333] rounded-xl p-4 shadow-md flex justify-between flex-col">
                        <p className="text-xs text-gray-400 mb-1 flex items-center">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            Croissance max
                        </p>
                        <div>
                            <p className="text-xl md:text-3xl font-bold text-green-400">{keyStats.maxGrowth}</p>
                            <p className="text-xs text-gray-500">du PIB</p>
                        </div>
                        <div></div>
                    </div>
                    <div className="bg-[#262626] border border-[#333] rounded-xl p-4 shadow-md flex justify-between flex-col">
                        <p className="text-xs text-gray-400 mb-1 flex items-center">
                            <TrendingDown className="w-3 h-3 mr-1" />
                            Croissance min
                        </p>
                        <div>
                            <p className="text-xl md:text-3xl font-bold text-red-400">{keyStats.minGrowth}</p>
                            <p className="text-xs text-gray-500">du PIB</p>
                        </div>
                        <div></div>
                    </div>
                    <div className="bg-[#262626] border border-[#333] rounded-xl p-4 shadow-md flex justify-between flex-col">
                        <p className="text-xs text-gray-400 mb-1">Années en récession</p>
                        <div>
                            <p className="text-xl md:text-xl font-bold text-yellow-400">{keyStats.recessionYears}</p>
                            <p className="text-xs text-gray-500">{keyStats.recessionFrequency} des années</p>
                        </div>
                        <div></div>
                    </div>
                </div>
            </div>

            {/* Graphique principal */}
            <div className="max-w-7xl mx-auto w-full">
                <div className="p-4 bg-[#262626] border border-[#333] rounded-xl shadow-md">
                    <h2 className="text-xl font-bold text-white mb-4">
                        Croissance du PIB ({selectedPeriod === 'all' ? '1961' : selectedPeriod === '30y' ? '30 dernières années' : '10 dernières années'}-2023)
                    </h2>
                    <div className="w-full h-[450px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                                data={chartData}
                                margin={{ top: 20, right: 30, left: 20, bottom: 65 }}
                                onMouseMove={(data) => {
                                    if (data && data.activeLabel) {
                                        setHoveredYear(parseInt(data.activeLabel));
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
                                    interval={selectedPeriod === '10y' ? 0 : selectedPeriod === '30y' ? 2 : 5}
                                    stroke="#ccc"
                                    tick={{ fill: '#ccc', fontSize: 11 }}
                                    tickMargin={10}
                                />
                                <YAxis
                                    label={{
                                        value: 'Croissance du PIB (%)',
                                        angle: -90,
                                        position: 'insideLeft',
                                        fill: '#ccc',
                                        offset: 0,
                                        dy: 80
                                    }}
                                    stroke="#ccc"
                                    tick={{ fill: '#ccc' }}
                                    tickFormatter={(value) => `${value}%`}
                                    domain={['auto', 'auto']}
                                    padding={{ top: 15, bottom: 15 }}
                                />
                                <Tooltip content={<CustomTooltip />} />
                                <Legend
                                    wrapperStyle={{
                                        paddingTop: '15px',
                                        paddingBottom: '5px',
                                        color: '#ccc'
                                    }}
                                    formatter={(value) => <span style={{ color: '#ccc' }}>{value}</span>}
                                />
                                <ReferenceLine y={0} stroke="#777" strokeWidth={2} />

                                {historicalEvents.map(event => {
                                    if (selectedPeriod === '10y' && event.year < new Date().getFullYear() - 10) return null;
                                    if (selectedPeriod === '30y' && event.year < new Date().getFullYear() - 30) return null;

                                    return (
                                        <ReferenceLine
                                            key={event.year}
                                            x={event.year}
                                            stroke="#777"
                                            strokeDasharray="3 3"
                                            label={{
                                                value: event.name,
                                                position: 'top',
                                                fill: '#aaa',
                                                fontSize: 10,
                                                angle: -90,
                                                offset: 15
                                            }}
                                        />
                                    );
                                })}

                                <Line
                                    type="monotone"
                                    dataKey="gdpGrowth"
                                    name="Croissance du PIB (%)"
                                    stroke="#38bdf8"
                                    strokeWidth={2}
                                    dot={{ r: 3 }}
                                    activeDot={{ r: 6 }}
                                    animationDuration={1500}
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
                    <h2 className="text-lg font-semibold text-white">Interprétation des Cycles Économiques</h2>
                </div>
                <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                    L&apos;analyse des cycles économiques de Madagascar révèle une économie caractérisée par une forte volatilité
                    et une vulnérabilité prononcée aux chocs exogènes et aux crises politiques internes. La croissance
                    du PIB malgache se distingue par des fluctuations importantes, reflétant la fragilité structurelle
                    de l&apos;économie nationale.
                </p>
                <blockquote className="border-l-4 border-blue-400 pl-4 italic text-gray-400 mt-2">
                    {'"'}Les cycles économiques malgaches sont fortement corrélés aux événements politiques internes
                    et aux conditions économiques mondiales, démontrant la double vulnérabilité de l&apos;économie nationale.{'"'}
                </blockquote>
                <p className="text-gray-300 text-sm md:text-base leading-relaxed mt-2">
                    Plusieurs phases distinctes sont identifiables dans l&apos;histoire économique du pays :
                </p>
                <ul className="list-disc pl-5 text-gray-300 text-sm md:text-base leading-relaxed">
                    <li><span className="font-semibold">1960-1972 :</span> Période post-indépendance relativement stable avec une croissance modérée.</li>
                    <li><span className="font-semibold">1973-1980 :</span> Forte volatilité économique marquée par des pics de croissance suivis de contractions brutales, coïncidant avec les chocs pétroliers mondiaux et l&apos;expérience socialiste malgache.</li>
                    <li><span className="font-semibold">1981-1982 :</span> Récession majeure liée à la crise économique et à l&apos;ajustement structurel.</li>
                    <li><span className="font-semibold">2002 :</span> Contraction sévère du PIB suite à la crise politique post-électorale.</li>
                    <li><span className="font-semibold">2009 :</span> Récession importante causée par le coup d&apos;état et la crise politique, amplifiée par la crise financière mondiale.</li>
                    <li><span className="font-semibold">2020 :</span> Impact négatif significatif de la pandémie de COVID-19 sur l&apos;économie malgache.</li>
                </ul>
                <p className="text-gray-300 text-sm md:text-base leading-relaxed mt-2">
                    Cette analyse démontre que les crises politiques internes ont systématiquement un impact plus sévère
                    sur l&apos;économie malgache que les crises économiques mondiales, soulignant l&apos;importance de la stabilité
                    institutionnelle pour le développement économique du pays.
                </p>

                {/* Table des principales récessions */}
                <div className="mt-4">
                    <h3 className="text-sm font-medium text-gray-300 mb-2">Principales périodes de récession économique</h3>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-700 text-sm">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Période</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Durée</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Contraction moyenne</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Événement associé</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700">
                                <tr>
                                    <td className="px-4 py-2 whitespace-nowrap">2000-2002</td>
                                    <td className="px-4 py-2 whitespace-nowrap">3 ans</td>
                                    <td className="px-4 py-2 whitespace-nowrap">-8.7%</td>
                                    <td className="px-4 py-2 whitespace-nowrap">Crise politique post-électorale</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 whitespace-nowrap">2008-2010</td>
                                    <td className="px-4 py-2 whitespace-nowrap">3 ans</td>
                                    <td className="px-4 py-2 whitespace-nowrap">-5.3%</td>
                                    <td className="px-4 py-2 whitespace-nowrap">Coup d&apos;état et crise financière mondiale</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 whitespace-nowrap">1981-1983</td>
                                    <td className="px-4 py-2 whitespace-nowrap">3 ans</td>
                                    <td className="px-4 py-2 whitespace-nowrap">-4.1%</td>

                                    <td className="px-4 py-2 whitespace-nowrap">Crise économique et ajustement structurel</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 whitespace-nowrap">2019-2020</td>
                                    <td className="px-4 py-2 whitespace-nowrap">2 ans</td>
                                    <td className="px-4 py-2 whitespace-nowrap">-7.4%</td>
                                    <td className="px-4 py-2 whitespace-nowrap">Pandémie de COVID-19</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 whitespace-nowrap">1991-1993</td>
                                    <td className="px-4 py-2 whitespace-nowrap">3 ans</td>
                                    <td className="px-4 py-2 whitespace-nowrap">-2.8%</td>
                                    <td className="px-4 py-2 whitespace-nowrap">Transition démocratique</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Pied de page avec sources */}
            <div className="w-full max-w-7xl mx-auto text-center text-xs text-gray-500 mt-4 flex items-center justify-center">
                <Calendar className="w-3 h-3 mr-1" />
                <p>Sources:  Banque mondiale, FMI | Dernière mise à jour: 2023</p>
            </div>
        </div>

    );
}