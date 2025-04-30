"use client"
import { useState } from 'react';

export default function AnalyseMultivariee() {
  const [activeTab, setActiveTab] = useState('resultats');

  const resultats = {
    rSquared: 0.915,
    adjRSquared: 0.895,
    fStatistic: 45.15,
    probF: "3.05e-19",
    numObservations: 53,
    significantFactors: [
      {
        name: "Total reserves (includes gold, current US$)",
        coef: 0.000001154,
        pValue: 0.027,
        significance: "Significatif (p<0.05)"
      },
      {
        name: "External debt stocks (% of GNI)_lag1",
        coef: 7.9572,
        pValue: 0.078,
        significance: "Marginalement significatif (p<0.10)"
      }
    ],
    autresFacteurs: [
      { name: "Inflation, consumer prices (annual %)", coef: 4.6965, pValue: 0.568 },
      { name: "Foreign direct investment, net inflows (% of GDP)", coef: 79.4791, pValue: 0.141 },
      { name: "External debt stocks (% of GNI)", coef: -5.1585, pValue: 0.256 },
      { name: "Balance commerciale (% PIB)", coef: 32.2253, pValue: 0.189 },
      { name: "Inflation, consumer prices (annual %)_lag1", coef: -10.2512, pValue: 0.217 },
      { name: "Total reserves (includes gold, current US$)_lag1", coef: 0.0000007122, pValue: 0.210 },
      { name: "Foreign direct investment, net inflows (% of GDP)_lag1", coef: -37.8602, pValue: 0.479 },
      { name: "Balance commerciale (% PIB)_lag1", coef: -10.3671, pValue: 0.663 }
    ],
    diagnostics: {
      durbinWatson: 0.605,
      conditionNumber: "4.56e+09",
      multicollinearity: "Élevée"
    }
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
          <h1 className="text-2xl md:text-4xl font-bold text-white">Analyse Multivariée: Facteurs Déterminants du Taux de Change</h1>
        </div>
        <p className="text-gray-400 max-w-3xl mx-auto text-sm md:text-base">
          Étude des facteurs macroéconomiques influençant le taux de change à Madagascar basée sur une régression linéaire multiple
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
            Détails Statistiques
          </button>
        </div>

        {/* Contenu des onglets */}
        <div className="max-w-6xl mx-auto w-full bg-[#262626] border border-[#333] rounded-xl p-4 p-6">
          {activeTab === 'resultats' && (
            <div className="space-y-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-blue-400 mb-4">Qualité du modèle</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-[#262626] border border-[#333] rounded-xl p-4">
                    <p className="text-gray-400 text-sm">R² ajusté</p>
                    <p className="text-3xl font-bold text-white">{resultats.adjRSquared}</p>
                    <p className="text-xs text-gray-500 mt-2">Pourcentage de variance expliquée</p>
                  </div>
                  <div className="bg-[#262626] border border-[#333] rounded-xl p-4">
                    <p className="text-gray-400 text-sm">F-statistique</p>
                    <p className="text-3xl font-bold text-white">{resultats.fStatistic}</p>
                    <p className="text-xs text-gray-500 mt-2">Significativité globale du modèle</p>
                  </div>
                  <div className="bg-[#262626] border border-[#333] rounded-xl p-4">
                    <p className="text-gray-400 text-sm">Observations</p>
                    <p className="text-3xl font-bold text-white">{resultats.numObservations}</p>
                    <p className="text-xs text-gray-500 mt-2">Nombre d'observations analysées</p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-blue-400 mb-4">Facteurs significatifs</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-[#262626] border border-[#333] rounded-xl p-4">
                    <thead>
                      <tr className="border-b border-[#333]">
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-400">Variable</th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-400">Coefficient</th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-400">P-valeur</th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-400">Signification</th>
                      </tr>
                    </thead>
                    <tbody>
                      {resultats.significantFactors.map((factor, index) => (
                        <tr key={index} className="border-b border-[#333]">
                          <td className="py-3 px-4 text-sm">{factor.name}</td>
                          <td className="py-3 px-4 text-sm">{factor.coef.toExponential(3)}</td>
                          <td className="py-3 px-4 text-sm">{factor.pValue}</td>
                          <td className="py-3 px-4 text-sm">
                            <span className={`px-2 py-1 rounded text-xs ${factor.pValue < 0.05 ? 'bg-green-900 text-green-300' : 'bg-yellow-900 text-yellow-300'}`}>
                              {factor.significance}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-[#262626] border border-[#333] rounded-xl p-4 mt-6">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-yellow-400 mr-2">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                    <line x1="12" y1="9" x2="12" y2="13"></line>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                  </svg>
                  <h3 className="text-lg font-medium text-white">Avertissement</h3>
                </div>
                <p className="mt-2 text-sm text-gray-400">
                  Le modèle présente une forte multicollinéarité (Condition Number: {resultats.diagnostics.conditionNumber}), ce qui peut affecter la stabilité des estimations des coefficients.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'interpretation' && (
            <div className="space-y-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-blue-400 mb-4">Interprétation des résultats</h2>
                
                <div className="bg-[#262626] border border-[#333] rounded-xl p-4 mt-6 mb-6">
                  <h3 className="text-lg font-medium text-white mb-3">Qualité globale du modèle</h3>
                  <p className="text-gray-300 mb-4">
                    Avec un R² ajusté de <span className="text-blue-400 font-medium">0.895</span>, le modèle explique environ <span className="text-blue-400 font-medium">89.5%</span> de la variance du taux de change à Madagascar. La significativité globale est très élevée (p-valeur de F-statistique: <span className="text-blue-400 font-medium">3.05e-19</span>), ce qui confirme la pertinence du modèle.
                  </p>
                </div>

                <div className="bg-[#262626] border border-[#333] rounded-xl p-4 mt-6 mb-6">
                  <h3 className="text-lg font-medium text-white mb-3">Facteurs influençant significativement le taux de change</h3>
                  
                  <div className="mb-4">
                    <h4 className="text-md font-medium text-blue-400">1. Réserves totales (incluant l'or)</h4>
                    <p className="text-gray-300 mt-1">
                      Ce facteur est statistiquement significatif (p=0.027) avec un coefficient positif, indiquant qu'une augmentation des réserves internationales est associée à une dépréciation du taux de change (augmentation de la valeur en ariary pour 1 USD). Ce résultat peut sembler contre-intuitif, car généralement des réserves plus importantes renforcent la monnaie nationale.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-md font-medium text-blue-400">2. Dette extérieure (% du RNB) avec décalage d'un an</h4>
                    <p className="text-gray-300 mt-1">
                      Ce facteur est marginalement significatif (p=0.078) avec un coefficient positif. Une augmentation de la dette extérieure de l'année précédente est associée à une dépréciation de l'ariary par rapport au dollar. Ce résultat est conforme aux attentes économiques: un endettement plus élevé augmente le risque pays et peut affecter négativement la confiance dans la monnaie nationale.
                    </p>
                  </div>
                </div>

                <div className="bg-[#262626] border border-[#333] rounded-xl p-4">
                  <h3 className="text-lg font-medium text-white mb-3">Limites et considérations</h3>
                  <ul className="list-disc pl-5 text-gray-300 space-y-2">
                    <li>
                      <span className="text-blue-400 font-medium">Multicollinéarité élevée</span> (Condition Number: 4.56e+09) - Certaines variables explicatives sont fortement corrélées entre elles, ce qui peut rendre l'interprétation des coefficients individuels moins fiable.
                    </li>
                    <li>
                      <span className="text-blue-400 font-medium">Autocorrélation potentielle</span> (Durbin-Watson: 0.605) - La valeur bien inférieure à 2 suggère une autocorrélation positive des résidus, ce qui pourrait affecter l'efficacité des estimateurs.
                    </li>
                    <li>
                      Le modèle inclut des variables contemporaines et retardées, ce qui peut compliquer l'interprétation des effets nets.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'details' && (
            <div className="space-y-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-blue-400 mb-4">Détails de la régression</h2>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-[#262626] border border-[#333] rounded-xl p-4">
                    <thead>
                      <tr className="border-b border-[#333]">
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-400">Variable</th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-400">Coefficient</th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-400">Écart-type</th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-400">t-statistic</th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-400">P-valeur</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-[#333]">
                        <td className="py-3 px-4 text-sm">const</td>
                        <td className="py-3 px-4 text-sm">247.6946</td>
                        <td className="py-3 px-4 text-sm">223.135</td>
                        <td className="py-3 px-4 text-sm">1.110</td>
                        <td className="py-3 px-4 text-sm">0.273</td>
                      </tr>
                      <tr className="border-b border-[#333]">
                        <td className="py-3 px-4 text-sm">Inflation, consumer prices (annual %)</td>
                        <td className="py-3 px-4 text-sm">4.6965</td>
                        <td className="py-3 px-4 text-sm">8.153</td>
                        <td className="py-3 px-4 text-sm">0.576</td>
                        <td className="py-3 px-4 text-sm">0.568</td>
                      </tr>
                      <tr className="border-b border-[#333] bg-green-900 bg-opacity-20">
                        <td className="py-3 px-4 text-sm">Total reserves (includes gold, current US$)</td>
                        <td className="py-3 px-4 text-sm">1.154e-06</td>
                        <td className="py-3 px-4 text-sm">5.02e-07</td>
                        <td className="py-3 px-4 text-sm">2.299</td>
                        <td className="py-3 px-4 text-sm font-medium text-green-400">0.027</td>
                      </tr>
                      <tr className="border-b border-[#333]">
                        <td className="py-3 px-4 text-sm">Foreign direct investment, net inflows (% of GDP)</td>
                        <td className="py-3 px-4 text-sm">79.4791</td>
                        <td className="py-3 px-4 text-sm">52.996</td>
                        <td className="py-3 px-4 text-sm">1.500</td>
                        <td className="py-3 px-4 text-sm">0.141</td>
                      </tr>
                      <tr className="border-b border-[#333]">
                        <td className="py-3 px-4 text-sm">External debt stocks (% of GNI)</td>
                        <td className="py-3 px-4 text-sm">-5.1585</td>
                        <td className="py-3 px-4 text-sm">4.478</td>
                        <td className="py-3 px-4 text-sm">-1.152</td>
                        <td className="py-3 px-4 text-sm">0.256</td>
                      </tr>
                      <tr className="border-b border-[#333]">
                        <td className="py-3 px-4 text-sm">Balance commerciale (% PIB)</td>
                        <td className="py-3 px-4 text-sm">32.2253</td>
                        <td className="py-3 px-4 text-sm">24.148</td>
                        <td className="py-3 px-4 text-sm">1.334</td>
                        <td className="py-3 px-4 text-sm">0.189</td>
                      </tr>
                      <tr className="border-b border-[#333]">
                        <td className="py-3 px-4 text-sm">Inflation, consumer prices (annual %)_lag1</td>
                        <td className="py-3 px-4 text-sm">-10.2512</td>
                        <td className="py-3 px-4 text-sm">8.176</td>
                        <td className="py-3 px-4 text-sm">-1.254</td>
                        <td className="py-3 px-4 text-sm">0.217</td>
                      </tr>
                      <tr className="border-b border-[#333]">
                        <td className="py-3 px-4 text-sm">Total reserves (includes gold, current US$)_lag1</td>
                        <td className="py-3 px-4 text-sm">7.122e-07</td>
                        <td className="py-3 px-4 text-sm">5.59e-07</td>
                        <td className="py-3 px-4 text-sm">1.273</td>
                        <td className="py-3 px-4 text-sm">0.210</td>
                      </tr>
                      <tr className="border-b border-[#333]">
                        <td className="py-3 px-4 text-sm">Foreign direct investment, net inflows (% of GDP)_lag1</td>
                        <td className="py-3 px-4 text-sm">-37.8602</td>
                        <td className="py-3 px-4 text-sm">53.000</td>
                        <td className="py-3 px-4 text-sm">-0.714</td>
                        <td className="py-3 px-4 text-sm">0.479</td>
                      </tr>
                      <tr className="border-b border-[#333] bg-yellow-900 bg-opacity-20">
                        <td className="py-3 px-4 text-sm">External debt stocks (% of GNI)_lag1</td>
                        <td className="py-3 px-4 text-sm">7.9572</td>
                        <td className="py-3 px-4 text-sm">4.399</td>
                        <td className="py-3 px-4 text-sm">1.809</td>
                        <td className="py-3 px-4 text-sm font-medium text-yellow-400">0.078</td>
                      </tr>
                      <tr className="border-b border-[#333]">
                        <td className="py-3 px-4 text-sm">Balance commerciale (% PIB)_lag1</td>
                        <td className="py-3 px-4 text-sm">-10.3671</td>
                        <td className="py-3 px-4 text-sm">23.613</td>
                        <td className="py-3 px-4 text-sm">-0.439</td>
                        <td className="py-3 px-4 text-sm">0.663</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="bg-[#262626] border border-[#333] rounded-xl p-4">
                    <h3 className="text-lg font-medium text-white mb-3">Statistiques du modèle</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-400">R-squared:</span>
                        <span>{resultats.rSquared}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Adj. R-squared:</span>
                        <span>{resultats.adjRSquared}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">F-statistic:</span>
                        <span>{resultats.fStatistic}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Prob (F-statistic):</span>
                        <span>{resultats.probF}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">No. Observations:</span>
                        <span>{resultats.numObservations}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Df Residuals:</span>
                        <span>42</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Df Model:</span>
                        <span>10</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#262626] border border-[#333] rounded-xl p-4">
                    <h3 className="text-lg font-medium text-white mb-3">Tests diagnostiques</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Omnibus:</span>
                        <span>5.665</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Prob(Omnibus):</span>
                        <span>0.059</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Durbin-Watson:</span>
                        <span className="text-yellow-400">{resultats.diagnostics.durbinWatson}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Jarque-Bera (JB):</span>
                        <span>5.122</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Prob(JB):</span>
                        <span>0.0772</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Skew:</span>
                        <span>0.760</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Kurtosis:</span>
                        <span>3.106</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Condition Number:</span>
                        <span className="text-red-400">{resultats.diagnostics.conditionNumber}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Pied de page */}
      <footer className="max-w-6xl mx-auto w-full mt-12 pt-6 border-t border-[#333] text-center text-sm text-gray-500">
        <p>Analyse des données macroéconomiques de Madagascar | {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}