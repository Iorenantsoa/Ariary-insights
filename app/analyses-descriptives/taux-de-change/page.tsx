'use client';

import { useState } from 'react';
import { BarChart2, TrendingDown, Info, Calendar, Filter } from 'lucide-react';
import ExchangeRateChart from '@/app/components/Accueil/ExchangeRateChart';

// Types
type DataPoint = {
    year: number;
    rate: number;
};

type Period = 'all' | '10y' | '5y';

export default function TauxDeChangePage() {
    const [selectedPeriod, setSelectedPeriod] = useState<Period>('all');

    // Stats calculés
    const keyStats = {
        totalDepreciation: "8,872.10%",
        avgAnnualRate: "7.40%",
        worstYear: "1990 (60.28%)",
        bestYear: "2003 (-12.53%)",
        currentTrend: "Dépréciation modérée"

    };

    return (
        <div className="min-h-screen w-full bg-[#212121] text-gray-200 p-4 md:p-8 flex flex-col gap-8">
            {/* En-tête avec logo et titre */}
            <div className="max-w-7xl mx-auto text-center">
                <div className="flex items-center justify-center mb-4">
                    <BarChart2 className="w-8 h-8 mr-3 text-blue-400" />
                    <h1 className="text-2xl md:text-4xl font-bold text-white">Analyse du Taux de Change Ariary/USD</h1>
                </div>
                <p className="text-gray-400 max-w-3xl mx-auto text-sm md:text-base">
                    Explorez l'évolution du taux de change de l'Ariary malgache face au Dollar américain, depuis l'indépendance jusqu'aux projections futures.
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
                            className={`cursor-pointer text-xs py-2 px-3 rounded-md transition-all ${selectedPeriod === '10y' ? 'bg-blue-600 text-white' : 'bg-[#333] text-gray-300'}`}
                            onClick={() => setSelectedPeriod('10y')}
                        >
                            10 dernières années
                        </button>
                        <button
                            className={`cursor-pointer text-xs py-2 px-3 rounded-md transition-all ${selectedPeriod === '5y' ? 'bg-blue-600 text-white' : 'bg-[#333] text-gray-300'}`}
                            onClick={() => setSelectedPeriod('5y')}
                        >
                            5 dernières années
                        </button>
                    </div>
                </div>

                {/* Stats */}
                <div className="md:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-4 ">
                    <div className="bg-[#262626] border border-[#333] rounded-xl p-4 shadow-md flex justify-between  flex-col">
                        <p className="text-xs text-gray-400 mb-1 flex items-center">
                            <TrendingDown className="w-3 h-3 mr-1" />
                            Dépréciation totale
                        </p>
                        <div >
                            <p className=" text-xl md:text-3xl font-bold text-blue-400">{keyStats.totalDepreciation}</p>
                            <p className="text-xs text-gray-500">Depuis 1960</p>
                        </div>
                        <div></div>
                    </div>
                    <div className="bg-[#262626] border border-[#333] rounded-xl p-4 shadow-md flex justify-between  flex-col">
                        <p className="text-xs text-gray-400 mb-1">Taux annuel moyen</p>
                        <div>
                            <p className="text-xl md:text-3xl font-bold text-red-400">{keyStats.avgAnnualRate}</p>
                            <p className="text-xs text-gray-500">Dépréciation moyenne</p>
                        </div>
                        <div></div>

                    </div>
                    <div className="bg-[#262626] border border-[#333] rounded-xl p-4 shadow-md flex justify-between  flex-col">
                        <p className="text-xs text-gray-400 mb-1">Pire année</p>
                        <div>
                            <p className="text-xl md:text-3xl font-bold text-yellow-400">{keyStats.worstYear}</p>
                            <p className="text-xs text-gray-500">Dévaluation maximale</p>
                        </div>
                        <div></div>

                    </div>
                    <div className="bg-[#262626] border border-[#333] rounded-xl p-4 shadow-md flex justify-between  flex-col">
                        <p className="text-xs text-gray-400 mb-1">Tendance actuelle</p>
                        <div>
                            <p className="text-xl md:text-xl font-bold text-green-400">{keyStats.currentTrend}</p>
                            <p className="text-xs text-gray-500">2023-2024</p>
                        </div>
                        <div></div>

                    </div>
                </div>
            </div>

            {/* Graphique principal */}
            <div className="max-w-7xl mx-auto w-full">
                <ExchangeRateChart period={selectedPeriod} />
            </div>

            {/* Interprétation */}
            <div className="w-full max-w-7xl mx-auto bg-[#262626] border border-[#333] rounded-2xl p-6 shadow-lg flex flex-col gap-4">
                <div className="flex items-center mb-2">
                    <Info className="w-5 h-5 mr-2 text-blue-400" />
                    <h2 className="text-lg font-semibold text-white">Interprétation</h2>
                </div>
                <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                    Depuis l'indépendance, la monnaie malgache s'est progressivement dépréciée face au dollar, avec des périodes d'accélération marquées par l'instabilité politique et les chocs économiques mondiaux.
                </p>
                <blockquote className="border-l-4 border-blue-400 pl-4 italic text-gray-400 mt-2">
                    "Les années 1980-1990 ont vu une explosion de la dévaluation, coïncidant avec des programmes d'ajustement structurel imposés par les bailleurs internationaux."
                </blockquote>
                <p className="text-gray-300 text-sm md:text-base leading-relaxed mt-2">
                    Plus récemment, des facteurs tels que la pandémie de COVID-19 et les tensions géopolitiques ont maintenu la pression sur l'Ariary, justifiant des prévisions prudentes jusqu'en 2028.
                </p>

                {/* Table comparative */}
                <div className="mt-4">
                    <h3 className="text-sm font-medium text-gray-300 mb-2">Comparaison avec d'autres monnaies africaines (Dépréciation depuis 2015)</h3>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-700 text-sm">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Monnaie</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Dépréciation</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Classement</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700">
                                <tr>
                                    <td className="px-4 py-2 whitespace-nowrap">Ariary (Madagascar)</td>
                                    <td className="px-4 py-2 whitespace-nowrap">51%</td>
                                    <td className="px-4 py-2 whitespace-nowrap">Modérée</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 whitespace-nowrap">Shilling (Kenya)</td>
                                    <td className="px-4 py-2 whitespace-nowrap">32%</td>
                                    <td className="px-4 py-2 whitespace-nowrap">Faible</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 whitespace-nowrap">Naira (Nigeria)</td>
                                    <td className="px-4 py-2 whitespace-nowrap">86%</td>
                                    <td className="px-4 py-2 whitespace-nowrap">Forte</td>
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