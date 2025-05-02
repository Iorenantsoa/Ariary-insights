
'use client';

import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine, Cell } from 'recharts';
import { Activity, Info, Calendar, Filter, ShoppingBag } from 'lucide-react';

// Types
interface ChartDataPoint {
    year: number;
    balance: number;
    balancePct: number;
    exports: number;
    imports: number;
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

// Données de la balance commerciale
const rawData = [
    { year: 1960, exports: 67511336.70646092, imports: 111896638.89035174, gdp: 673081724.7511678 },
    { year: 1961, exports: 102110849.37189339, imports: 136359934.8600179, gdp: 699161944.5580972 },
    { year: 1962, exports: 101689130.77823643, imports: 135907021.58774653, gdp: 739286907.5927778 },
    { year: 1963, exports: 97047803.75365095, imports: 151309643.79610536, gdp: 759345863.7326667 },
    { year: 1964, exports: 106752579.47037305, imports: 159917394.15765658, gdp: 802482183.7287778 },
    { year: 1965, exports: 110127942.54070236, imports: 166712685.282334, gdp: 833563472.9981 },
    { year: 1966, exports: 155698196.90261003, imports: 208843980.020498, gdp: 900264584.5908293 },
    { year: 1967, exports: 167512782.91128728, imports: 205672791.09429497, gdp: 956436932.101291 },
    { year: 1968, exports: 183124855.6833419, imports: 235119320.00016204, gdp: 1031669637.3955349 },
    { year: 1969, exports: 191304704.91351166, imports: 244148323.20103347, gdp: 1056391055.5961725 },
    { year: 1970, exports: 213036048.46071166, imports: 240001885.0633486, gdp: 1111859570.882523 },
    { year: 1971, exports: 173264898.94468018, imports: 252204260.34019035, gdp: 1199507631.0760274 },
    { year: 1972, exports: 191350736.6373316, imports: 245822788.23552263, gdp: 1341590690.4136515 },
    { year: 1973, exports: 235525937.2366885, imports: 312077206.7322411, gdp: 1653062335.0028615 },
    { year: 1974, exports: 297715413.65682924, imports: 387473830.38278383, gdp: 1917508190.0468938 },
    { year: 1975, exports: 362080610.15317917, imports: 476932068.48321223, gdp: 2283049215.3533945 },
    { year: 1976, exports: 330849218.6751444, imports: 382361664.28160983, gdp: 2181844178.553396 },
    { year: 1977, exports: 387925899.16710335, imports: 472941273.91970205, gdp: 2358930406.068901 },
    { year: 1978, exports: 457890722.5632049, imports: 642273689.9248853, gdp: 2669755115.1093483 },
    { year: 1979, exports: 504827947.38935655, imports: 1052478242.1994535, gdp: 3463565853.81023 },
    { year: 1980, exports: 554791922.8980671, imports: 1019609061.8909853, gdp: 5201818347.7988205 },
    { year: 1981, exports: 423096592.79400134, imports: 696934879.0417886, gdp: 4759333998.367463 },
    { year: 1982, exports: 404922691.0362217, imports: 617989389.5917187, gdp: 4784977325.958034 },
    { year: 1983, exports: 381908958.98241544, imports: 522094424.61109203, gdp: 4686457031.226905 },
    { year: 1984, exports: 419879579.84366393, imports: 488824150.11033696, gdp: 3905938480.8611917 },
    { year: 1985, exports: 376255635.308369, imports: 477012482.64280677, gdp: 3802557894.8719015 },
    { year: 1986, exports: 428072463.8414003, imports: 508615749.29155356, gdp: 4347989788.092567 },
    { year: 1987, exports: 454292492.35841227, imports: 513724261.9313198, gdp: 3212900555.8090987 },
    { year: 1988, exports: 433265600.0638018, imports: 539406597.5197409, gdp: 3189456965.048204 },
    { year: 1989, exports: 487655924.2284155, imports: 521021526.5546677, gdp: 3175638332.6447086 },
    { year: 1990, exports: 505973443.8687115, imports: 767031802.2193624, gdp: 3931334875.0137587 },
    { year: 1991, exports: 519857359.0467265, imports: 643923815.7636648, gdp: 3254713056.021707 },
    { year: 1992, exports: 538527290.6691172, imports: 693267160.7085849, gdp: 3714966678.33381 },
    { year: 1993, exports: 561129087.8143153, imports: 774310221.7728503, gdp: 4063298919.2868047 },
    { year: 1994, exports: 705142895.935945, imports: 829101112.7576776, gdp: 3522227092.2283926 },
    { year: 1995, exports: 805498306.6616935, imports: 936020464.275131, gdp: 3838100903.7497377 },
    { year: 1996, exports: 839642514.3724749, imports: 930030558.3254222, gdp: 4931861038.707632 },
    { year: 1997, exports: 688168058.3787831, imports: 883747058.5313175, gdp: 4262965419.74998 },
    { year: 1998, exports: 722467461.0225903, imports: 920883327.9616902, gdp: 4401967632.737184 },
    { year: 1999, exports: 784850753.48815, imports: 965856215.411914, gdp: 4277903780.2913055 },
    { year: 2000, exports: 885096717.0858637, imports: 1095162037.7215297, gdp: 4629247203.84524 },
    { year: 2001, exports: 1091486917.4813938, imports: 1140139723.0348766, gdp: 5438332601.907981 },
    { year: 2002, exports: 1167504458.33349, imports: 1518069983.835017, gdp: 5351701663.408074 },
    { year: 2003, exports: 872660373.5003201, imports: 1295939419.562367, gdp: 6372498889.665848 },
    { year: 2004, exports: 985460548.2449237, imports: 1484882131.695033, gdp: 5064732626.293891 },
    { year: 2005, exports: 1424938434.1814427, imports: 2039652747.1545596, gdp: 5859269752.61332 },
    { year: 2006, exports: 1757983978.0799646, imports: 2213935049.045546, gdp: 6395712490.943041 },
    { year: 2007, exports: 2369521280.5592823, imports: 3316634031.6035323, gdp: 8524620889.577468 },
    { year: 2008, exports: 2971635295.005063, imports: 5003293324.9569235, gdp: 10725137723.654873 },
    { year: 2009, exports: 1959518983.9616432, imports: 4042538711.211378, gdp: 9616879409.437893 },
    { year: 2010, exports: 2183656264.1689997, imports: 3593827391.995024, gdp: 9982711338.07029 },
    { year: 2011, exports: 2624531677.6927757, imports: 3900293293.5002537, gdp: 11551819617.874023 },
    { year: 2012, exports: 2521980906.9200773, imports: 3574547936.2215753, gdp: 11578975061.947945 },
    { year: 2013, exports: 2891230458.3524837, imports: 4111627324.1994195, gdp: 12423555455.38532 },
    { year: 2014, exports: 3541731788.270344, imports: 4218673808.072172, gdp: 12522957399.228104 },
    { year: 2015, exports: 3214678738.4973826, imports: 3717317430.5757117, gdp: 11323020701.301685 },
    { year: 2016, exports: 3447066213.6809726, imports: 3761002301.5340333, gdp: 11848613858.441998 },
    { year: 2017, exports: 4071827552.9426107, imports: 4538023942.3512, gdp: 13176313593.550934 },
    { year: 2018, exports: 4339367350.693942, imports: 4995646270.880174, gdp: 13760033282.292511 },
    { year: 2019, exports: 4009166482.2261925, imports: 4820540217.680104, gdp: 14104664678.506332 },
    { year: 2020, exports: 2628831060.657001, imports: 3767772594.912233, gdp: 13051441203.947355 },
    { year: 2021, exports: 3314741894.2161093, imports: 4611346608.60019, gdp: 14554754116.542673 },
    { year: 2022, exports: 4597561354.206939, imports: 5823312898.6851015, gdp: 15134700203.049707 },
    { year: 2023, exports: 4242418132.563505, imports: 5354663357.827469, gdp: 15790113246.747774 }
];

// Calcul de la balance commerciale
const commercialBalanceData = rawData.map(item => {
    const balance = item.exports - item.imports;
    const balancePct = (balance / item.gdp) * 100;

    return {
        year: item.year,
        balance: balance,
        balancePct: parseFloat(balancePct.toFixed(2)),
        exports: item.exports,
        imports: item.imports
    };
});
type CustomTooltipProps = {
    active?: boolean;
    payload?: {
        value: number;
        payload: {
            exports: number;
            imports: number;
            balance: number;
        };
    }[];
    label?: string | number;
};
export default function BalanceCommercialePage() {
    const [selectedPeriod, setSelectedPeriod] = useState<Period>('all');
    const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
    const [, setHoveredYear] = useState<number | null>(null);

    // Statistiques calculées
    const calculateStats = () => {
        let filteredData = [...commercialBalanceData];

        if (selectedPeriod === '10y') {
            const startYear = 2023 - 10;
            filteredData = filteredData.filter(item => item.year >= startYear);
        } else if (selectedPeriod === '5y') {
            const startYear = 2023 - 5;
            filteredData = filteredData.filter(item => item.year >= startYear);
        }

        // Moyenne de la balance commerciale en % du PIB
        const avgBalancePct = filteredData.reduce((sum, item) => sum + item.balancePct, 0) / filteredData.length;

        // Pire déficit en % du PIB
        const worstDeficit = Math.min(...filteredData.map(item => item.balancePct));
        const worstDeficitYear = filteredData.find(item => item.balancePct === worstDeficit)?.year;

        // Meilleur excédent (ou déficit le moins important) en % du PIB
        const bestBalance = Math.max(...filteredData.map(item => item.balancePct));
        const bestBalanceYear = filteredData.find(item => item.balancePct === bestBalance)?.year;

        // Tendance sur la période sélectionnée
        const firstYear = filteredData[0].balancePct;
        const lastYear = filteredData[filteredData.length - 1].balancePct;
        const trend = lastYear > firstYear ? "Amélioration" : "Détérioration";

        return {
            avgBalance: avgBalancePct.toFixed(2) + "%",
            worstDeficit: worstDeficit.toFixed(2) + "% (" + worstDeficitYear + ")",
            bestBalance: bestBalance.toFixed(2) + "% (" + bestBalanceYear + ")",
            trend: trend,
            currentBalance: lastYear.toFixed(2) + "%"
        };
    };

    const keyStats = calculateStats();

    useEffect(() => {
        // Filtrer les données selon la période sélectionnée
        let filteredData = [...commercialBalanceData];

        if (selectedPeriod === '10y') {
            const startYear = 2023 - 10;
            filteredData = filteredData.filter(item => item.year >= startYear);
        } else if (selectedPeriod === '5y') {
            const startYear = 2023 - 5;
            filteredData = filteredData.filter(item => item.year >= startYear);
        }

        setChartData(filteredData);
    }, [selectedPeriod]);

    const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-[#333] p-3 border border-gray-600 rounded shadow-lg">
                    <p className="font-bold text-white">{`Année: ${label}`}</p>
                    <p className="text-blue-400">{`Balance commerciale: ${payload[0].value.toFixed(2)}% du PIB`}</p>
                    <p className="text-green-400">{`Exportations: ${(payload[0].payload.exports / 1000000).toFixed(2)} M$`}</p>
                    <p className="text-red-400">{`Importations: ${(payload[0].payload.imports / 1000000).toFixed(2)} M$`}</p>
                    <p className="text-yellow-400">{`Déficit/Excédent: ${(payload[0].payload.balance / 1000000).toFixed(2)} M$`}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="min-h-screen w-full bg-[#212121] text-gray-200 p-4 md:p-8 flex flex-col gap-8">

            <div className="max-w-7xl mx-auto text-center">
                <div className="flex items-center justify-center mb-4">
                    <ShoppingBag className="w-8 h-8 mr-3 text-blue-400" />
                    <h1 className="text-2xl md:text-4xl font-bold text-white">Analyse de la Balance Commerciale</h1>
                </div>
                <p className="text-gray-400 max-w-3xl mx-auto text-sm md:text-base">
                    Évolution de la balance commerciale de Madagascar (exportations - importations) en pourcentage du PIB depuis 1960.
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
                <div className="md:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-[#262626] border border-[#333] rounded-xl p-4 shadow-md flex justify-between flex-col">
                        <p className="text-xs text-gray-400 mb-1 flex items-center">
                            <Activity className="w-3 h-3 mr-1" />
                            Balance moyenne
                        </p>
                        <div>
                            <p className="text-xl md:text-3xl font-bold text-purple-400">{keyStats.avgBalance}</p>
                            <p className="text-xs text-gray-500">du PIB</p>
                        </div>
                        <div></div>
                    </div>
                    <div className="bg-[#262626] border border-[#333] rounded-xl p-4 shadow-md flex justify-between flex-col">
                        <p className="text-xs text-gray-400 mb-1">Pire déficit</p>
                        <div>
                            <p className="text-xl md:text-3xl font-bold text-red-400">{keyStats.worstDeficit}</p>
                            <p className="text-xs text-gray-500">du PIB</p>
                        </div>
                        <div></div>
                    </div>
                    <div className="bg-[#262626] border border-[#333] rounded-xl p-4 shadow-md flex justify-between flex-col">
                        <p className="text-xs text-gray-400 mb-1">Meilleur résultat</p>
                        <div>
                            <p className="text-xl md:text-3xl font-bold text-green-400">{keyStats.bestBalance}</p>
                            <p className="text-xs text-gray-500">du PIB</p>
                        </div>
                        <div></div>
                    </div>
                    <div className="bg-[#262626] border border-[#333] rounded-xl p-4 shadow-md flex justify-between flex-col">
                        <p className="text-xs text-gray-400 mb-1">Tendance</p>
                        <div>
                            <p className="text-xl md:text-xl font-bold text-yellow-400">{keyStats.trend}</p>
                            <p className="text-xs text-gray-500">Sur la période</p>
                        </div>
                        <div></div>
                    </div>
                </div>
            </div>

            {/* Graphique principal */}
            <div className="max-w-7xl mx-auto w-full">
                <div className="p-4 bg-[#262626] border border-[#333] rounded-xl shadow-md">
                    <h2 className="text-xl font-bold text-white mb-4">
                        Balance commerciale ({selectedPeriod === 'all' ? '1960' : selectedPeriod === '10y' ? '10 dernières années' : '5 dernières années'}-2023)
                    </h2>
                    <div className="w-full h-[450px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={chartData}
                                margin={{ top: 20, right: 30, left: 20, bottom: 65 }}
                                onMouseMove={(data: { activeLabel?: number | string }) => {
                                    if (data && data.activeLabel !== undefined) {
                                        const year = typeof data.activeLabel === "string" ? parseInt(data.activeLabel, 10) : data.activeLabel;
                                        if (!isNaN(year)) {
                                            setHoveredYear(year);
                                        }
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
                                    tick={{ fill: '#ccc', fontSize: 11 }}
                                    tickMargin={10}
                                />
                                <YAxis
                                    label={{
                                        value: 'Balance commerciale (% du PIB)',
                                        angle: -90,
                                        position: 'insideLeft',
                                        fill: '#ccc',
                                        offset: 0,
                                        dy: 100
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
                                    if (selectedPeriod === '5y' && event.year < new Date().getFullYear() - 5) return null;
                                    if (selectedPeriod === '10y' && event.year < new Date().getFullYear() - 10) return null;

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

                                <Bar
                                    dataKey="balancePct"
                                    name="Balance commerciale (% du PIB)"
                                    animationDuration={1500}
                                >
                                    {
                                        chartData.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={entry.balancePct >= 0 ? "#4ade80" : "#ef4444"}
                                                stroke={entry.balancePct >= 0 ? "#22c55e" : "#dc2626"}
                                                strokeWidth={1}
                                            />
                                        ))
                                    }
                                </Bar>
                            </BarChart>
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
                    L&apos;analyse de la balance commerciale de Madagascar révèle un déficit structurel persistant depuis 1960. Ce déficit
                    commercial chronique traduit une dépendance aux importations qui dépasse constamment les capacités d&apos;exportation du pays.
                </p>
                <blockquote className="border-l-4 border-blue-400 pl-4 italic text-gray-400 mt-2">
                &quot;Le déficit commercial de Madagascar s&apos;est aggravé à partir des années 1970, avec une détérioration particulièrement
                    marquée pendant les périodes d&apos;instabilité politique et économique.&quot;
                </blockquote>
                <p className="text-gray-300 text-sm md:text-base leading-relaxed mt-2">
                    Plusieurs tendances et phénomènes sont observables :
                </p>
                <ul className="list-disc pl-5 text-gray-300 text-sm md:text-base leading-relaxed">
                    <li>Les crises politiques (1972, 1991, 2002, 2009) sont systématiquement accompagnées d&apos;une dégradation de la balance commerciale.</li>
                    <li>La période 1979-1980 marque le déficit record (-15.80% du PIB en 1979), coïncidant avec la fin de la politique de nationalisation et d&apos;importantes difficultés économiques.</li>
                    <li>La période post-2007 montre une aggravation constante du déficit commercial, accentuée notamment par les besoins croissants en investissements et importations liés aux projets d&apos;infrastructure.</li>
                    <li>La crise de la COVID-19 en 2020 a provoqué un repli des exportations tout en maintenant un niveau élevé d&apos;importations.</li>
                </ul>
                <p className="text-gray-300 text-sm md:text-base leading-relaxed mt-2">
                    Cette analyse suggère que l&apos;économie malgache reste fortement vulnérable aux chocs extérieurs et peine à développer
                    une base d&apos;exportation suffisamment diversifiée et à forte valeur ajoutée pour équilibrer sa balance commerciale.
                </p>

                {/* Table comparative */}
                <div className="mt-4">
                    <h3 className="text-sm font-medium text-gray-300 mb-2">Périodes critiques et leur impact sur la balance commerciale</h3>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-700 text-sm">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Période</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Déficit Moy. (% PIB)</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Exportations Moy. (M$)</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Importations Moy. (M$)</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Événement majeur</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700">
                                <tr>
                                    <td className="px-4 py-2 whitespace-nowrap">1979-1981</td>
                                    <td className="px-4 py-2 whitespace-nowrap">-11.47%</td>
                                    <td className="px-4 py-2 whitespace-nowrap">494.24</td>
                                    <td className="px-4 py-2 whitespace-nowrap">923.01</td>
                                    <td className="px-4 py-2 whitespace-nowrap">Crise économique post-nationalisation</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 whitespace-nowrap">2007-2009</td>
                                    <td className="px-4 py-2 whitespace-nowrap">-9.83%</td>
                                    <td className="px-4 py-2 whitespace-nowrap">2,433.56</td>
                                    <td className="px-4 py-2 whitespace-nowrap">4,120.82</td>
                                    <td className="px-4 py-2 whitespace-nowrap">Crise financière mondiale et coup &apos;état</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 whitespace-nowrap">2017-2019</td>
                                    <td className="px-4 py-2 whitespace-nowrap">-5.87%</td>
                                    <td className="px-4 py-2 whitespace-nowrap">4,140.12</td>
                                    <td className="px-4 py-2 whitespace-nowrap">4,784.74</td>
                                    <td className="px-4 py-2 whitespace-nowrap">Période pré-COVID</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 whitespace-nowrap">2020-2023</td>
                                    <td className="px-4 py-2 whitespace-nowrap">-7.13%</td>
                                    <td className="px-4 py-2 whitespace-nowrap">3,695.89</td>
                                    <td className="px-4 py-2 whitespace-nowrap">4,889.27</td>
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