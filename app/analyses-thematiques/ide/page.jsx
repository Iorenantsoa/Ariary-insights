"use client"
import { BarChart2 } from 'lucide-react';
import React, { useState } from 'react';
import { Line } from 'recharts';
import { LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';

export default function IDEAnalysisApp() {

    // Données du graphique
    const data = [
        { year: 1960, ide: null },
        { year: 1961, ide: null },
        { year: 1962, ide: null },
        { year: 1963, ide: null },
        { year: 1964, ide: null },
        { year: 1965, ide: null },
        { year: 1966, ide: null },
        { year: 1967, ide: null },
        { year: 1968, ide: null },
        { year: 1969, ide: null },
        { year: 1970, ide: 0.899 },
        { year: 1971, ide: 0.090 },
        { year: 1972, ide: 0.894 },
        { year: 1973, ide: 0.665 },
        { year: 1974, ide: 0.715 },
        { year: 1975, ide: 0.200 },
        { year: 1976, ide: 0.063 },
        { year: 1977, ide: -0.117 },
        { year: 1978, ide: -0.138 },
        { year: 1979, ide: -0.190 },
        { year: 1980, ide: -0.015 },
        { year: 1981, ide: -0.017 },
        { year: 1982, ide: -0.002 },
        { year: 1983, ide: 0.079 },
        { year: 1984, ide: 0.219 },
        { year: 1985, ide: -0.005 },
        { year: 1986, ide: 0.323 },
        { year: 1987, ide: 0.108 },
        { year: 1988, ide: 0.091 },
        { year: 1989, ide: 0.404 },
        { year: 1990, ide: 0.569 },
        { year: 1991, ide: 0.420 },
        { year: 1992, ide: 0.569 },
        { year: 1993, ide: 0.378 },
        { year: 1994, ide: 0.163 },
        { year: 1995, ide: 0.253 },
        { year: 1996, ide: 0.206 },
        { year: 1997, ide: 0.329 },
        { year: 1998, ide: 0.378 },
        { year: 1999, ide: 1.365 },
        { year: 2000, ide: 1.792 },
        { year: 2001, ide: 1.711 },
        { year: 2002, ide: 0.274 },
        { year: 2003, ide: 0.202 },
        { year: 2004, ide: 1.045 },
        { year: 2005, ide: 1.458 },
        { year: 2006, ide: 4.607 },
        { year: 2007, ide: 9.260 },
        { year: 2008, ide: 10.578 },
        { year: 2009, ide: 13.449 },
        { year: 2010, ide: 9.139 },
        { year: 2011, ide: 7.060 },
        { year: 2012, ide: 7.037 },
        { year: 2013, ide: 4.555 },
        { year: 2014, ide: 2.978 },
        { year: 2015, ide: 2.897 },
        { year: 2016, ide: 4.565 },
        { year: 2017, ide: 3.528 },
        { year: 2018, ide: 4.448 },
        { year: 2019, ide: 3.363 },
        { year: 2020, ide: 2.747 },
        { year: 2021, ide: 2.456 },
        { year: 2022, ide: 3.091 },
        { year: 2023, ide: 2.625 }
    ];


    // Evénements historiques majeurs
    const historicalEvents = [
        { year: 1960, label: "Indépendance de Madagascar" },
        { year: 1972, label: "Renversement de la Première République" },
        { year: 1975, label: "Révolution socialiste" },
        { year: 1991, label: "Transition démocratique" },
        { year: 2002, label: "Crise politique post-électorale" },
        { year: 2006, label: "Début des grands projets miniers" },
        { year: 2009, label: "Crise politique et coup d'État" },
        { year: 2013, label: "Retour à l'ordre constitutionnel" },
        { year: 2018, label: "Élection présidentielle" },
        { year: 2020, label: "Crise du COVID-19" }
    ];

    // États pour les filtres
    const [selectedPeriod, setSelectedPeriod] = useState("all");
    const [showEvents, setShowEvents] = useState(true);

    // Filtrer les données en fonction de la période sélectionnée
    const filteredData = selectedPeriod === "all"
        ? data
        : selectedPeriod === "recent"
            ? data.filter(item => item.year >= 2000)
            : data.filter(item => item.year >= 1990 && item.year <= 2010);

    // Statistiques clés
    const nonNullIdeValues = data.filter(item => item.ide !== null).map(item => item.ide);
    const maxIde = Math.max(...nonNullIdeValues);
    const maxIdeYear = data.find(item => item.ide === maxIde)?.year;
    const avgIde = (nonNullIdeValues.reduce((acc, val) => acc + val, 0) / nonNullIdeValues.length).toFixed(2);
    const ideGdpCorr = 0.6115;

    return (
        <div className="min-h-screen w-full bg-[#212121] text-gray-200 p-4 md:p-8 flex flex-col gap-8">

            <div className="max-w-7xl mx-auto text-center">
                <div className="flex items-center justify-center mb-4">
                    <BarChart2 className="w-12 h-12 mr-3 text-blue-400" />
                    <h1 className="text-2xl md:text-4xl font-bold text-white">Analyse des Investissements Directs Étrangers<br /> à Madagascar (1960-2023)</h1>
                </div>
            </div>


            {/* Cartes statistiques */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 mt-8">
                <div className="bg-[#262626] border border-[#333] rounded-xl p-4 shadow-md">
                    <h3 className="text-blue-400 text-lg font-medium mb-2">Pic maximal d'IDE</h3>
                    <p className="text-2xl font-bold">{maxIde}% du PIB</p>
                    <p className="text-sm text-gray-400">Année: {maxIdeYear}</p>
                </div>
                <div className="bg-[#262626] border border-[#333] rounded-xl p-4 shadow-md">
                    <h3 className="text-blue-400 text-lg font-medium mb-2">Moyenne historique</h3>
                    <p className="text-2xl font-bold">{avgIde}% du PIB</p>
                    <p className="text-sm text-gray-400">Période 1970-2023</p>
                </div>
                <div className="bg-[#262626] border border-[#333] rounded-xl p-4 shadow-md">
                    <h3 className="text-blue-400 text-lg font-medium mb-2">Corrélation IDE-PIB</h3>
                    <p className="text-2xl font-bold">{ideGdpCorr.toFixed(2)}</p>
                    <p className="text-sm text-gray-400">Corrélation positive forte</p>
                </div>
                <div className="bg-[#262626] border border-[#333] rounded-xl p-4 shadow-md">
                    <h3 className="text-blue-400 text-lg font-medium mb-2">Tendance actuelle</h3>
                    <p className="text-2xl font-bold">↗ Stable</p>
                    <p className="text-sm text-gray-400">Autour de 3% du PIB</p>
                </div>
            </div>

            {/* Filtres */}
            <div className="flex flex-wrap gap-4 mb-6 justify-between items-center">
                <div className="flex gap-4">
                    <button
                        onClick={() => setSelectedPeriod("all")}
                        className={`px-4 py-2 rounded-lg ${selectedPeriod === "all" ? "bg-blue-500 text-white" : "bg-[#333] text-gray-300"}`}
                    >
                        Toute la période
                    </button>
                    <button
                        onClick={() => setSelectedPeriod("recent")}
                        className={`px-4 py-2 rounded-lg ${selectedPeriod === "recent" ? "bg-blue-500 text-white" : "bg-[#333] text-gray-300"}`}
                    >
                        Depuis 2000
                    </button>
                    <button
                        onClick={() => setSelectedPeriod("reform")}
                        className={`px-4 py-2 rounded-lg ${selectedPeriod === "reform" ? "bg-blue-500 text-white" : "bg-[#333] text-gray-300"}`}
                    >
                        Période 1990-2010
                    </button>
                </div>
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="showEvents"
                        checked={showEvents}
                        onChange={() => setShowEvents(!showEvents)}
                        className="mr-2 h-4 w-4"
                    />
                    <label htmlFor="showEvents" className="text-gray-300">Afficher les événements historiques</label>
                </div>
            </div>

            {/* Graphique principal */}
            <div className="bg-[#262626] border border-[#333] rounded-xl p-4 shadow-md mb-8 h-96">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={filteredData}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 10,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                        <XAxis
                            dataKey="year"
                            tick={{ fill: '#9ca3af' }}
                            tickCount={10}
                            domain={['dataMin', 'dataMax']}
                        />
                        <YAxis tick={{ fill: '#9ca3af' }} />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#1e1e1e', borderColor: '#333', borderRadius: '0.5rem' }}
                            labelStyle={{ color: '#9ca3af' }}
                            formatter={(value) => [`${value}% du PIB`, 'IDE']}
                            labelFormatter={(label) => `Année: ${label}`}
                        />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="ide"
                            name="IDE (% du PIB)"
                            stroke="#f97316"
                            strokeWidth={2}
                            dot={{ r: 4, fill: '#f97316' }}
                            activeDot={{ r: 6 }}
                        />

                        {/* Lignes verticales pour les événements historiques */}
                        {showEvents && historicalEvents
                            .filter(event => filteredData.some(d => d.year === event.year))
                            .map((event, index) => (
                                <ReferenceLine
                                    key={index}
                                    x={event.year}
                                    stroke="#6366f1"
                                    strokeDasharray="3 3"
                                    label={{
                                        value: event.label,
                                        position: 'top',
                                        fill: '#6366f1',
                                        fontSize: 10,
                                        angle: -45,
                                        offset: 10
                                    }}
                                />
                            ))
                        }
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Analyse et interprétation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#262626] border border-[#333] rounded-xl p-4 shadow-md">
                    <h2 className="text-xl font-bold mb-4 text-blue-400">Périodes clés</h2>
                    <ul className="space-y-2">
                        <li className="flex items-start">
                            <span className="text-blue-400 mr-2">•</span>
                            <span><strong>1970-1990</strong>: Période de faibles IDE avec une économie d'État dirigiste.</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-blue-400 mr-2">•</span>
                            <span><strong>1990-2005</strong>: Ouverture progressive à l'investissement étranger suite aux réformes économiques.</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-blue-400 mr-2">•</span>
                            <span><strong>2006-2010</strong>: Pic d'attractivité avec un sommet de 13.45% du PIB en 2009, principalement dans les secteurs minier et pétrolier.</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-blue-400 mr-2">•</span>
                            <span><strong>2011-2023</strong>: Stabilisation autour de 3-4% du PIB.</span>
                        </li>
                    </ul>
                </div>
                <div className="bg-[#262626] border border-[#333] rounded-xl p-4 shadow-md">
                    <h2 className="text-xl font-bold mb-4 text-blue-400">Impact sur l'économie</h2>
                    <p className="mb-4">
                        La corrélation de 0.61 entre IDE et PIB suggère une influence significative des investissements étrangers sur l'économie malgache.
                    </p>
                    <p>
                        Les périodes de forte hausse des IDE (2006-2010) correspondent principalement aux grands projets miniers et d'infrastructure, tandis que la diversification des IDE reste un enjeu majeur pour le développement économique du pays.
                    </p>
                </div>
            </div>

        </div> 
    );
}