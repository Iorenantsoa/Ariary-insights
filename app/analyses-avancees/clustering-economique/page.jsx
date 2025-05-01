"use client"
import { Activity } from 'lucide-react';
import { useState, useEffect } from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function MadagascarEconomicClustering() {
  // États pour stocker les données
  const [clusterData, setClusterData] = useState([]);
  const [elbowData, setElbowData] = useState([]);
  const [clusterCenters, setClusterCenters] = useState([]);
  const [selectedCluster, setSelectedCluster] = useState(null);
  const [timelineData, setTimelineData] = useState([]);
  const [clusterDistribution, setClusterDistribution] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Données simulées basées sur les résultats du clustering
  useEffect(() => {
    // Simulation des données de la méthode du coude
    const simulatedElbowData = [
      { k: 1, inertia: 400 },
      { k: 2, inertia: 200 },
      { k: 3, inertia: 100 },
      { k: 4, inertia: 50 },
      { k: 5, inertia: 40 },
      { k: 6, inertia: 35 },
      { k: 7, inertia: 30 },
      { k: 8, inertia: 27 },
      { k: 9, inertia: 25 },
    ];

    // Simuler les résultats de clustering basés sur les années et les clusters fournis
    const yearClusterMapping = {
      1970: 1, 1971: 1, 1972: 1, 1973: 1, 1974: 2, 1975: 1, 1976: 1, 1977: 1, 1978: 1, 1979: 1,
      1980: 1, 1981: 2, 1982: 2, 1983: 2, 1984: 0, 1985: 0, 1986: 0, 1987: 0, 1988: 2, 1989: 0,
      1990: 0, 1991: 0, 1992: 0, 1993: 0, 1994: 2, 1995: 2, 1996: 0, 1997: 0, 1998: 0, 1999: 0,
      2000: 0, 2001: 0, 2002: 0, 2003: 0, 2004: 0, 2005: 1, 2006: 1, 2007: 3, 2008: 3, 2009: 3,
      2010: 3, 2011: 3, 2012: 3, 2013: 1, 2014: 1, 2015: 1, 2016: 1, 2017: 1, 2018: 1, 2019: 1,
      2020: 1, 2021: 1, 2022: 1, 2023: 1
    };

    // Créer la timeline pour visualisation
    const timeline = Object.entries(yearClusterMapping).map(([year, cluster]) => ({
      year: parseInt(year),
      cluster,
      // Ajout d'une propriété displayCluster pour s'assurer que le cluster 0 s'affiche correctement
      displayCluster: cluster + 1  // Ajouter 1 pour éviter les problèmes avec la valeur 0
    }));

    // Calculer la distribution des clusters
    const distribution = {};
    Object.values(yearClusterMapping).forEach(cluster => {
      distribution[cluster] = (distribution[cluster] || 0) + 1;
    });

    const distributionData = Object.entries(distribution).map(([cluster, count]) => ({
      cluster: `Cluster ${cluster}`,
      count,
      percentage: (count / Object.keys(yearClusterMapping).length * 100).toFixed(1)
    }));

    // Simuler les centres de clusters
    const simulatedClusterCenters = [
      {
        id: 0,
        name: "Stabilité économique modérée",
        description: "Période de stabilité relative avec une inflation modérée, investissements étrangers limités, et endettement contrôlé",
        indicators: {
          inflation: 6.2,
          fdi: 0.8,
          debt: 29.5,
          tradeBalance: -4.2
        },
        years: "1984-1993, 1996-2004"
      },
      {
        id: 1,
        name: "Croissance avec stabilité",
        description: "Période marquée par une croissance stable, inflation modérée et une meilleure gestion de la dette",
        indicators: {
          inflation: 5.4,
          fdi: 1.5,
          debt: 34.2,
          tradeBalance: -2.8
        },
        years: "1970-1973, 1975-1980, 2005-2006, 2013-2023"
      },
      {
        id: 2,
        name: "Instabilité et crises",
        description: "Périodes d'instabilité économique avec forte inflation, déséquilibres extérieurs importants",
        indicators: {
          inflation: 27.9,
          fdi: 0.3,
          debt: 78.3,
          tradeBalance: -8.6
        },
        years: "1974, 1981-1983, 1988, 1994-1995"
      },
      {
        id: 3,
        name: "Boom des investissements",
        description: "Période marquée par un fort afflux d'investissements directs étrangers et une croissance soutenue",
        indicators: {
          inflation: 9.2,
          fdi: 7.8,
          debt: 26.8,
          tradeBalance: -5.3
        },
        years: "2007-2012"
      }
    ];

    setClusterData(simulatedClusterCenters);
    setElbowData(simulatedElbowData);
    setTimelineData(timeline);
    setClusterDistribution(distributionData);
    setIsLoading(false);
  }, []);

  // Définir les couleurs pour les clusters
  const clusterColors = ['#3b82f6', '#10b981', '#ef4444', '#f59e0b'];

  // Debug pour vérifier les données de timeline et les couleurs
  useEffect(() => {
    console.log('Timeline data:', timelineData);
    console.log('Cluster colors:', clusterColors);
    // Vérifier combien d'éléments avec cluster 0 existent
    const cluster0Count = timelineData.filter(item => item.cluster === 0).length;
    console.log('Nombre d\'années dans le cluster 0:', cluster0Count);
  }, [timelineData]);


  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#212121] text-white flex items-center justify-center">
        <div className="text-blue-400 text-xl">Chargement des données...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#212121] text-white p-6">
      <div className="max-w-7xl mx-auto text-center">
        <div className="flex items-center justify-center mb-4">
          <Activity className="w-8 h-8 mr-3 text-blue-400" />
          <h1 className="text-2xl md:text-4xl font-bold text-white">Analyse de Clustering Économique de Madagascar</h1>
        </div>
        <p className="text-gray-400 max-w-3xl mx-auto text-sm md:text-base">
          Identification des périodes économiques similaires (1970-2023)
        </p>
      </div>


      {/* Section explicative du clustering */}
      <div className="bg-[#262626] border border-[#333] rounded-xl p-6 mb-8">
        <h2 className="text-xl font-semibold text-blue-400 mb-4">Méthodologie de Clustering Économique</h2>
        <p className="mb-4">
          Cette analyse utilise l'algorithme K-means pour identifier des périodes économiques similaires à Madagascar
          sur la base de 4 indicateurs clés: l'inflation, les investissements directs étrangers, la dette extérieure
          et la balance commerciale. Les données ont été standardisées avant l'analyse.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-blue-400 mb-3">Méthode du coude</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={elbowData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="k" label={{ value: 'Nombre de clusters', position: 'insideBottom', offset: -5, fill: '#888' }} />
                  <YAxis label={{ value: 'Inertie', angle: -90, position: 'insideLeft', fill: '#888' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e1e1e',
                      borderColor: '#444',
                      borderRadius: '8px',
                      padding: '10px',
                      color: '#fff',
                      boxShadow: '0 0 10px rgba(0,0,0,0.3)',
                    }}
                    itemStyle={{
                      color: '#fff',
                      fontWeight: 500,
                      fontSize: '14px',
                    }}
                    labelStyle={{
                      color: '#aaa',
                      fontWeight: 'bold',
                      fontSize: '13px',
                      marginBottom: '4px',
                    }}

                  />
                  <Line type="monotone" dataKey="inertia" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
              <p className="text-xs text-gray-400 mt-2 text-center">La méthode du coude suggère 4 clusters comme nombre optimal</p>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium text-blue-400 mb-3">Distribution des clusters</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={clusterDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                    nameKey="cluster"
                    label={({ cluster, percentage }) => `${cluster}: ${percentage}%`}
                  >
                    {clusterDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={clusterColors[entry.cluster.split(' ')[1]]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e1e1e',
                      borderColor: '#444',
                      borderRadius: '8px',
                      padding: '10px',
                      color: '#fff',
                      boxShadow: '0 0 10px rgba(0,0,0,0.3)',
                    }}
                    itemStyle={{
                      color: '#fff',
                      fontWeight: 500,
                      fontSize: '14px',
                    }}
                    labelStyle={{
                      color: '#aaa',
                      fontWeight: 'bold',
                      fontSize: '13px',
                      marginBottom: '4px',
                    }}

                  />
                </PieChart>
              </ResponsiveContainer>
              <p className="text-xs text-gray-400 mt-2 text-center">Répartition des années par cluster</p>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline des clusters */}
      <div className="bg-[#262626] border border-[#333] rounded-xl p-6 mb-8">
        <h2 className="text-xl font-semibold text-blue-400 mb-4">Évolution Chronologique des Clusters</h2>
        <div className="h-92">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={timelineData}
              margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
              barCategoryGap={1}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis
                dataKey="year"
                interval={4}
                angle={-45}
                textAnchor="end"
                height={50}
                tick={{ fill: '#888' }}
              />
              <YAxis
                label={{ value: 'Cluster', angle: -90, position: 'insideLeft', fill: '#888' }}
                tick={{ fill: '#888' }}
                tickCount={4}
                domain={[0, 4]}
                allowDecimals={false}
                tickFormatter={(value) => value - 1}  //
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e1e1e',
                  borderColor: '#444',
                  borderRadius: '8px',
                  padding: '10px',
                  color: '#fff',
                  boxShadow: '0 0 10px rgba(0,0,0,0.3)',
                }}
                itemStyle={{
                  color: '#fff',
                  fontWeight: 500,
                  fontSize: '14px',
                }}
                labelStyle={{
                  color: '#aaa',
                  fontWeight: 'bold',
                  fontSize: '13px',
                  marginBottom: '4px',
                }}
                formatter={(value, name, props) => {
                  const realClusterValue = value - 1;
                  return [`Cluster ${realClusterValue}`, 'Cluster'];
                }}
                labelFormatter={(label) => `Année : ${label}`}
              />
              <Bar
                dataKey="displayCluster"
                name="Cluster"
                isAnimationActive={true}
              >
                {timelineData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={clusterColors[entry.cluster]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="flex justify-center">
            {[0, 1, 2, 3].map(cluster => (
              <div key={cluster} className="flex items-center mx-3">
                <div className="w-4 h-4 mr-2" style={{ backgroundColor: clusterColors[cluster] }}></div>
                <span className="text-sm">Cluster {cluster}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Caractéristiques des clusters */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-blue-400 mb-4">Caractéristiques des Clusters</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {clusterData.map(cluster => (
            <div
              key={cluster.id}
              className="bg-[#262626] border border-[#333] rounded-xl p-6 hover:border-blue-400 cursor-pointer transition-all"
              onClick={() => setSelectedCluster(selectedCluster === cluster.id ? null : cluster.id)}
            >
              <div className="flex items-center mb-3">
                <div className="w-6 h-6 rounded-full mr-3" style={{ backgroundColor: clusterColors[cluster.id] }}></div>
                <h3 className="text-lg font-medium">{cluster.name}</h3>
              </div>
              <p className="text-gray-300 mb-3">{cluster.description}</p>
              <div className="text-sm text-gray-400 mb-3">Périodes: <span className="text-blue-400">{cluster.years}</span></div>

              {(selectedCluster === cluster.id) && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium mb-2">Indicateurs moyens :</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-[#333] p-3 rounded">
                      <div className="text-xs text-gray-400">Inflation</div>
                      <div className="text-lg font-semibold">{cluster.indicators.inflation}%</div>
                    </div>
                    <div className="bg-[#333] p-3 rounded">
                      <div className="text-xs text-gray-400">IDE (% PIB)</div>
                      <div className="text-lg font-semibold">{cluster.indicators.fdi}%</div>
                    </div>
                    <div className="bg-[#333] p-3 rounded">
                      <div className="text-xs text-gray-400">Dette/RNB</div>
                      <div className="text-lg font-semibold">{cluster.indicators.debt}%</div>
                    </div>
                    <div className="bg-[#333] p-3 rounded">
                      <div className="text-xs text-gray-400">Balance commerciale</div>
                      <div className="text-lg font-semibold">{cluster.indicators.tradeBalance}%</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Comparaison des caractéristiques de clusters */}
      <div className="bg-[#262626] border border-[#333] rounded-xl p-6">
        <h2 className="text-xl font-semibold text-blue-400 mb-4">Comparaison des Indicateurs par Cluster</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm text-center text-gray-300 mb-3">Inflation et IDE</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={clusterData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  barSize={20}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="id" tickFormatter={(id) => `C${id}`} />
                  <YAxis />
                  <Tooltip contentStyle={{ backgroundColor: '#333', borderColor: '#444' }} />
                  <Legend />
                  <Bar name="Inflation (%)" dataKey="indicators.inflation" fill="#3b82f6" />
                  <Bar name="IDE (% PIB)" dataKey="indicators.fdi" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div>
            <h3 className="text-sm text-center text-gray-300 mb-3">Dette et Balance Commerciale</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={clusterData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  barSize={20}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="id" tickFormatter={(id) => `C${id}`} />
                  <YAxis />
                  <Tooltip contentStyle={{ backgroundColor: '#333', borderColor: '#444' }} />
                  <Legend />
                  <Bar name="Dette/RNB (%)" dataKey="indicators.debt" fill="#ef4444" />
                  <Bar name="Balance commerciale (%)" dataKey="indicators.tradeBalance" fill="#f59e0b" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      <footer className="mt-12 text-center text-gray-500 text-sm">
        <p>Analyse basée sur les données macroéconomiques de Madagascar (1970-2023)</p>
        <p className="mt-1">© 2025 - Analyse Économique Madagascar</p>
      </footer>
    </div>
  );
}