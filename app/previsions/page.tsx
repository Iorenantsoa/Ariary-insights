// app/forecast/page.tsx (ou /pages/forecast.tsx selon ta structure)

"use client";

import { AlertTriangle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, Legend } from 'recharts';
// import { Button } from "@/components/ui/button";

const data = [
    { year: 2020, rate: 3800 },
    { year: 2021, rate: 4000 },
    { year: 2022, rate: 4200 },
    { year: 2023, rate: 4400 },
    { year: 2024, rate: 4587.73, lower: 4128.96, upper: 5046.49 },
    { year: 2025, rate: 4739.78, lower: 4265.80, upper: 5213.75 },
    { year: 2026, rate: 4893.17, lower: 4403.85, upper: 5382.48 },
    { year: 2027, rate: 5047.98, lower: 4543.18, upper: 5152.78 },
    { year: 2028, rate: 5204.20, lower: 4683.78, upper: 5724.62 },
];

export default function ForecastPage() {
    return (
        <div className="min-h-screen bg-[#212121] text-white py-12 px-4 md:px-8">
            {/* En-tête avec titre et description */}
            <div className="max-w-7xl mx-auto mb-12 text-center">
                <div className="flex items-center justify-center mb-4">
                    <AlertTriangle className="w-8 h-8 mr-3 text-blue-400" />
                    <h1 className="text-3xl md:text-4xl font-bold">Prévision Taux de Change Ariary/USD (2024-2028)</h1>
                </div>
                <p className="text-gray-400 max-w-3xl mx-auto">
                    Cette projection est réalisée à partir de l’analyse de tendances économiques passées et présentes.
                    Les valeurs futures sont des estimations sujettes à variation en fonction des dynamiques du marché.
                </p>
            </div>


            {/* Graphique */}
            <div className="w-full max-w-6xl h-[450px] bg-[#2a2a2a] rounded-3xl p-6 shadow-2xl mx-auto mb-16">
    <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="year" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" domain={['dataMin - 500', 'dataMax + 500']} />
            <Tooltip contentStyle={{ backgroundColor: "#1F2937", borderColor: "#3B82F6" }} />
            <Legend verticalAlign="top" align="center" wrapperStyle={{ color: "#9CA3AF" }} />

            {/* Intervalle de confiance : VRAI "Area" entre Lower et Upper */}
            <Area
                type="monotone"
                dataKey="rate"
                stroke="none"
                fill="#60A5FA"
                fillOpacity={0.1}
                activeDot={false} 
                connectNulls
            />

            {/* Bord supérieur de l'intervalle */}
            <Line
                type="monotone"
                dataKey="upper"
                stroke="#60A5FA"
                strokeDasharray="3 3"
                strokeWidth={1.5}
                dot={false}
            />

            {/* Bord inférieur de l'intervalle */}
            <Line
                type="monotone"
                dataKey="lower"
                stroke="#60A5FA"
                strokeDasharray="3 3"
                strokeWidth={1.5}
                dot={false}
            />

            {/* Courbe principale */}
            <Line
                type="monotone"
                dataKey="rate"
                stroke="#3B82F6"
                strokeWidth={3}
                dot={{ stroke: '#3B82F6', strokeWidth: 2 }}
                activeDot={{ r: 6 }}
            />
        </LineChart>
    </ResponsiveContainer>
</div>


            {/* Tableau résumé */}
            <div className="overflow-x-auto w-full max-w-4xl mb-10 mx-auto">
                <table className="w-full text-sm text-left text-gray-400 border border-gray-700">
                    <thead className="text-xs uppercase bg-[#2a2a2a] text-gray-300">
                        <tr>
                            <th scope="col" className="px-6 py-3">Année</th>
                            <th scope="col" className="px-6 py-3">Prévision</th>
                            <th scope="col" className="px-6 py-3">Intervalle de Confiance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.filter(d => d.year >= 2024).map((d) => (
                            <tr key={d.year} className="border-t border-gray-700">
                                <td className="px-6 py-4">{d.year}</td>
                                <td className="px-6 py-4">{d.rate.toFixed(2)} Ar</td>
                                <td className="px-6 py-4">
                                    [{d.lower?.toFixed(2)} Ar - {d.upper?.toFixed(2)} Ar]
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="max-w-2xl text-gray-400 mb-10 text-center mx-auto">
                <p>
                    Selon nos prévisions, le taux de change de l’Ariary devrait continuer à se déprécier modérément jusqu’en 2028.
                    Ces résultats restent sensibles aux évolutions économiques mondiales et aux politiques monétaires.
                </p>
            </div>
        </div>
    );
}
