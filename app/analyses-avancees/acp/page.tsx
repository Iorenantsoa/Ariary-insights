"use client"
import { useState } from 'react';
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
// Supprimez 'Legend' de l'import s'il n'est pas utilisé

export default function AnalyseACP() {
  const [activeTab, setActiveTab] = useState('resultats');

  // Données ACP
  const varianceExpliquee = [
    { component: 'CP1', value: 0.52425473, percentage: '52.43%' },
    { component: 'CP2', value: 0.17697624, percentage: '17.70%' },
    { component: 'CP3', value: 0.15850551, percentage: '15.85%' },
    { component: 'CP4', value: 0.09173324, percentage: '9.17%' },
    { component: 'CP5', value: 0.04022692, percentage: '4.02%' },
    { component: 'CP6', value: 0.00830336, percentage: '0.83%' }
  ];

  const COLORS = ['#3B82F6', '#60A5FA', '#93C5FD', '#BFDBFE', '#DBEAFE', '#EFF6FF'];

  const variablesNames = [
    'Taux de change officiel',
    'Inflation (prix à la consommation)',
    'Réserves totales (incl. or)',
    'Dette extérieure (% du RNB)',
    'IDE, entrées nettes (% du PIB)',
    'Balance commerciale (% PIB)'
  ];

  const shortVariablesNames = [
    'Taux de change',
    'Inflation',
    'Réserves',
    'Dette ext.',
    'IDE',
    'Balance comm.'
  ];

  const loadings = [
    [0.465641, -0.468122, -0.247297, -0.045915, -0.072835, -0.703897],
    [-0.264216, 0.187939, -0.793319, -0.509700, 0.075509, 0.004376],
    [0.476210, -0.444520, -0.203863, -0.110401, -0.155239, 0.705534],
    [-0.360111, -0.267407, -0.444590, 0.770794, -0.065524, 0.052314],
    [0.461591, 0.333015, -0.185833, 0.283879, 0.747039, 0.053354],
    [-0.379271, -0.604597, 0.189039, -0.226271, 0.634455, 0.033885]
  ];

  const loadingsCP1 = variablesNames.map((name, index) => ({
    name: name,
    shortName: shortVariablesNames[index],
    loading: loadings[index][0],
    absLoading: Math.abs(loadings[index][0])
  })).sort((a, b) => b.absLoading - a.absLoading);

  // Vous pouvez supprimer cette variable si vous ne l'utilisez pas ou la conserver pour une utilisation future
  // const loadingsCP2 = variablesNames.map((name, index) => ({
  //   name: name,
  //   shortName: shortVariablesNames[index],
  //   loading: loadings[index][1],
  //   absLoading: Math.abs(loadings[index][1])
  // })).sort((a, b) => b.absLoading - a.absLoading);

  // Caractéristiques des composantes principales
  const composantes = [
    {
      id: 1,
      variance: "52.43%",
      description: "Développement économique et modernisation",
      positives: ["Taux de change officiel", "Réserves totales", "IDE"],
      negatives: ["Balance commerciale", "Dette extérieure"],
      interpretation: "Cette composante principale semble représenter le niveau de développement économique et d'intégration internationale. Des valeurs élevées indiquent une économie plus ouverte avec des réserves importantes et des IDE, mais avec une balance commerciale déficitaire et une dette extérieure plus faible."
    },
    {
      id: 2,
      variance: "17.70%",
      description: "Équilibre commercial et monétaire",
      positives: ["IDE", "Inflation"],
      negatives: ["Balance commerciale", "Taux de change", "Réserves totales"],
      interpretation: "Cette composante semble capturer l'équilibre entre le secteur extérieur et la stabilité monétaire. Des valeurs élevées pourraient indiquer une économie avec des entrées de capitaux étrangers mais une balance commerciale déficitaire et une monnaie qui se déprécie."
    }
  ];

  return (
    <div className="min-h-screen w-full bg-[#212121] text-gray-200 p-4 md:p-8 flex flex-col gap-8">
      {/* En-tête avec logo et titre */}
      <div className="max-w-7xl mx-auto text-center">
        <div className="flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 mr-3 text-blue-400">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="2" y1="12" x2="22" y2="12"></line>
            <line x1="12" y1="2" x2="12" y2="22"></line>
          </svg>
          <h1 className="text-2xl md:text-4xl font-bold text-white">Analyse en Composantes Principales (ACP)</h1>
        </div>
        <p className="text-gray-400 max-w-3xl mx-auto text-sm md:text-base">
          Réduction de dimensionnalité et identification des facteurs macroéconomiques clés à Madagascar
        </p>
      </div>

      {/* Navigation par onglets */}
      <div className="max-w-6xl mx-auto w-full">
        <div className="flex border-b border-gray-700 mb-6">
          <button 
            onClick={() => setActiveTab('resultats')}
            className={`px-4 py-2 font-medium ${activeTab === 'resultats' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-gray-200'}`}
          >
            Résultats Principaux
          </button>
          <button 
            onClick={() => setActiveTab('interpretation')}
            className={`px-4 py-2 font-medium ${activeTab === 'interpretation' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-gray-200'}`}
          >
            Interprétation
          </button>
          <button 
            onClick={() => setActiveTab('details')}
            className={`px-4 py-2 font-medium ${activeTab === 'details' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-gray-200'}`}
          >
            Détails Techniques
          </button>
        </div>

        {/* Contenu des onglets */}
        <div className="max-w-6xl mx-auto w-full bg-[#262626] border border-[#333] rounded-xl  p-6">
          {activeTab === 'resultats' && (
            <div className="space-y-6">
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-blue-400 mb-4">Variance Expliquée par Composante</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-[#262626] border border-[#333] rounded-xl  p-6 flex items-center justify-center">
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={varianceExpliquee}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {varianceExpliquee.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value: number) => (value * 100).toFixed(2) + '%'} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="bg-[#262626] border border-[#333] rounded-xl  p-6">
                    <h3 className="text-lg font-medium text-white mb-3">Points clés</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <div className="w-4 h-4 mt-1 mr-2 bg-blue-400 rounded-full"></div>
                        <p>Les deux premières composantes expliquent <span className="text-blue-400 font-medium">70.13%</span> de la variance totale</p>
                      </li>
                      <li className="flex items-start">
                        <div className="w-4 h-4 mt-1 mr-2 bg-blue-400 rounded-full"></div>
                        <p>La première composante à elle seule capture <span className="text-blue-400 font-medium">52.43%</span> de l&apos;information</p>
                      </li>
                      <li className="flex items-start">
                        <div className="w-4 h-4 mt-1 mr-2 bg-blue-400 rounded-full"></div>
                        <p>Avec trois composantes, on atteint <span className="text-blue-400 font-medium">85.97%</span> de variance expliquée</p>
                      </li>
                      <li className="flex items-start">
                        <div className="w-4 h-4 mt-1 mr-2 bg-blue-400 rounded-full"></div>
                        <p>Les trois dernières composantes apportent relativement peu d&apos;information supplémentaire</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-blue-400 mb-4">Contributions des Variables - CP1 (52.43%)</h2>
                <div className="bg-[#262626] border border-[#333] rounded-xl  p-6">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={loadingsCP1}
                      layout="vertical"
                      margin={{ top: 20, right: 30, left: 130, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                      <XAxis type="number" domain={[-0.6, 0.6]} tickFormatter={(value) => value.toFixed(2)} />
                      <YAxis dataKey="shortName" type="category" width={100} />
                      <Tooltip formatter={(value: number) => value.toFixed(4)} />
                      <Bar dataKey="loading">
                        {loadingsCP1.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.loading > 0 ? '#3B82F6' : '#EF4444'} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'interpretation' && (
            <div className="space-y-8">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-blue-400 mb-4">Interprétation des Composantes Principales</h2>
                
                {composantes.map((comp) => (
                  <div key={comp.id} className="bg-gray-900 p-6 rounded-lg mb-6">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold mr-3">
                        CP{comp.id}
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-white">{comp.description}</h3>
                        <p className="text-sm text-blue-400">Variance expliquée: {comp.variance}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h4 className="text-md font-medium text-green-400 mb-2">Contributions positives</h4>
                        <ul className="list-disc pl-5 text-gray-300">
                          {comp.positives.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-md font-medium text-red-400 mb-2">Contributions négatives</h4>
                        <ul className="list-disc pl-5 text-gray-300">
                          {comp.negatives.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <h4 className="text-md font-medium text-blue-400 mb-2">Interprétation</h4>
                      <p className="text-gray-300">{comp.interpretation}</p>
                    </div>
                  </div>
                ))}
                
                <div className="bg-gray-900 p-6 rounded-lg">
                  <h3 className="text-lg font-medium text-white mb-3">Implications pour l&apos;économie malgache</h3>
                  
                  <p className="text-gray-300 mb-4">
                    L&apos;ACP révèle une structure économique où le développement, l&apos;ouverture internationale et la stabilité sont étroitement liés. La première composante principale suggère un arbitrage entre le développement économique (associé à des réserves plus importantes et des IDE) et l&apos;endettement extérieur.
                  </p>
                  
                  <p className="text-gray-300 mb-4">
                    La deuxième composante met en évidence les tensions entre les flux commerciaux (balance commerciale) et les flux financiers (IDE). Ces résultats suggèrent que les politiques économiques à Madagascar doivent prendre en compte ces arbitrages fondamentaux, en particulier la relation entre l&apos;ouverture économique et la stabilité monétaire.
                  </p>
                  
                  <div className="bg-blue-900 bg-opacity-30 p-4 rounded-lg border-l-4 border-blue-400">
                    <p className="text-sm text-blue-200">
                      <span className="font-bold">Recommandation:</span> Ces résultats suggèrent qu&apos;une approche équilibrée, tenant compte des interactions complexes entre ces variables économiques, serait bénéfique pour la stabilité économique à long terme de Madagascar.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'details' && (
            <div className="space-y-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-blue-400 mb-4">Détails Techniques de l&apos;ACP</h2>
                
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-white mb-3">Variables incluses dans l&apos;analyse</h3>
                  <ul className="list-disc pl-5 text-gray-300 space-y-2">
                    {variablesNames.map((name, index) => (
                      <li key={index}>{name}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-gray-900 p-4 rounded-lg mb-6">
                  <h3 className="text-lg font-medium text-white mb-3">Variance expliquée par composante</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-gray-800">
                      <thead>
                        <tr className="border-b border-gray-700">
                          <th className="py-2 px-4 text-left text-sm font-medium text-gray-400">Composante</th>
                          <th className="py-2 px-4 text-left text-sm font-medium text-gray-400">Valeur propre</th>
                          <th className="py-2 px-4 text-left text-sm font-medium text-gray-400">% Variance</th>
                          <th className="py-2 px-4 text-left text-sm font-medium text-gray-400">% Cumulé</th>
                        </tr>
                      </thead>
                      <tbody>
                        {varianceExpliquee.map((comp, index) => {
                          const cumulativePercentage = varianceExpliquee
                            .slice(0, index + 1)
                            .reduce((sum, item) => sum + item.value, 0) * 100;
                            
                          return (
                            <tr key={index} className="border-b border-gray-700">
                              <td className="py-2 px-4 text-sm">{comp.component}</td>
                              <td className="py-2 px-4 text-sm">{comp.value.toFixed(4)}</td>
                              <td className="py-2 px-4 text-sm">{(comp.value * 100).toFixed(2)}%</td>
                              <td className="py-2 px-4 text-sm">{cumulativePercentage.toFixed(2)}%</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
                
                <div className="bg-gray-900 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-white mb-3">Matrice des loadings</h3>
                  <p className="text-gray-400 mb-4 text-sm">Coefficients des variables originales sur chaque composante principale</p>
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-gray-800">
                      <thead>
                        <tr className="border-b border-gray-700">
                          <th className="py-2 px-3 text-left text-sm font-medium text-gray-400">Variable</th>
                          {[...Array(6)].map((_, i) => (
                            <th key={i} className="py-2 px-3 text-center text-sm font-medium text-gray-400">CP{i+1}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {variablesNames.map((name, varIndex) => (
                          <tr key={varIndex} className="border-b border-gray-700">
                            <td className="py-2 px-3 text-sm font-medium">{shortVariablesNames[varIndex]}</td>
                            {[...Array(6)].map((_, cpIndex) => {
                              const value = loadings[varIndex][cpIndex];
                              const absValue = Math.abs(value);
                              // Mettre en surbrillance les valeurs significatives
                              let cellClass = "py-2 px-3 text-center text-sm";
                              if (absValue > 0.4) {
                                cellClass += value > 0 ? " font-bold text-blue-400" : " font-bold text-red-400";
                              }
                              return (
                                <td key={cpIndex} className={cellClass}>
                                  {value.toFixed(3)}
                                </td>
                              );
                            })}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="text-gray-400 mt-4 text-sm italic">Note: Les valeurs{">"}0.4 sont considérées comme contributions significatives (bleues pour positives, rouges pour négatives)</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Pied de page */}
      <footer className="max-w-6xl mx-auto w-full mt-12 pt-6 border-t border-gray-800 text-center text-sm text-gray-500">
        <p>Analyse des données macroéconomiques de Madagascar | {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}