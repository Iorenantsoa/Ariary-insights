'use client';

import { 
  FileText, 
  ChevronDown,
  BarChart3,
  Download,
  LineChart,
  TrendingUp,
  PieChart,
  DollarSign,
  Globe,
  Briefcase
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

// Définition des sections du rapport avec leur contenu
const reportSections = [
  { 
    id: "taux-change",
    label: "Évolution du taux de change Ariary/USD", 
    icon: <DollarSign className="w-6 h-6" />,
    color: "blue-600",
    content: `L'Ariary malgache a connu une dépréciation continue et significative face au dollar américain, passant d'environ 50 Ariary/USD dans les années 1960 à plus de 4400 Ariary/USD en 2023. Cette dépréciation s'est accélérée à partir des années 1990, avec une pente particulièrement abrupte après 2010.

Périodes critiques :
Les données révèlent une forte volatilité du taux de change entre 2005-2007 et 2015-2018, suggérant des épisodes d'instabilité économique et financière.

Impact des chocs exogènes :
Le taux de change moyen pendant les périodes de choc s'élève à 1724,51 Ariary/USD, contre 1008,85 Ariary/USD hors période de choc.`
  },
  { 
    id: "inflation",
    label: "Inflation et variation du taux de change", 
    icon: <TrendingUp className="w-6 h-6" />,
    color: "cyan-600",
    content: `Le graphique met en évidence une relation complexe entre l'inflation et les variations du taux de change, marquée par plusieurs pics d'inflation :

• Début des années 1980 (>30%),
• Début des années 1990 (près de 50%),
• Début des années 2000 (>15%).

Ces pics coïncident souvent avec des phases de forte dépréciation monétaire, illustrant le phénomène de "pass-through" où la dépréciation se traduit par une inflation importée.

Paradoxalement, l'inflation moyenne pendant les chocs (8,56%) est inférieure à celle hors choc (11,50%), suggérant que des politiques de stabilisation plus agressives ont été mises en œuvre durant les crises.`
  },
  { 
    id: "reserves",
    label: "Évolution des réserves totales de Madagascar", 
    icon: <BarChart3 className="w-6 h-6" />,
    color: "green-600",
    content: `Depuis les années 2000, les réserves de change ont fortement progressé, dépassant 2,5 milliards USD en 2023. L'accélération est particulièrement marquée après 2015.

Cette accumulation reflète une amélioration partielle de la situation économique et une intégration accrue dans le commerce international. Toutefois, les fluctuations notables signalent une certaine vulnérabilité aux chocs externes et aux flux de capitaux.

La hausse récente semble davantage liée à des prêts internationaux et à l'aide au développement qu'à une amélioration structurelle de la balance commerciale.`
  },
  { 
    id: "couverture",
    label: "Couverture des importations par les réserves", 
    icon: <PieChart className="w-6 h-6" />,
    color: "yellow-600",
    content: `Depuis les années 1990, Madagascar a nettement amélioré son ratio de couverture des importations, dépassant régulièrement le seuil recommandé de 3 mois.

La période 2020-2021 montre un pic exceptionnel (>5,5 mois), probablement dû à la contraction des importations pendant la pandémie de COVID-19, plus qu'à une accumulation structurelle de réserves.

Cette situation est positive pour la stabilité macroéconomique mais implique également un coût d'opportunité pour un pays en développement.`
  },
  { 
    id: "dette",
    label: "Évolution de la dette extérieure de Madagascar", 
    icon: <Globe className="w-6 h-6" />,
    color: "red-600",
    content: `La trajectoire de la dette extérieure présente plusieurs phases :

• Croissance progressive dans les années 1970-1980,
• Stabilisation à des niveaux élevés dans les années 1990 (>100% du RNB à certaines périodes),
• Chute significative en 2006-2007 (effet des initiatives PPTE/IADM),
• Remontée préoccupante depuis 2015, atteignant plus de 6 milliards USD en 2023.

La récente hausse du ratio dette/RNB (>40%) est inquiétante, d'autant plus qu'elle s'accompagne d'une nouvelle dépréciation de l'Ariary, alourdissant le service de la dette.`
  },
  { 
    id: "balance",
    label: "Balance commerciale en % du PIB", 
    icon: <LineChart className="w-6 h-6" />,
    color: "purple-600",
    content: `Madagascar affiche une balance commerciale structurellement déficitaire, généralement entre -5% et -10% du PIB, avec un creux historique autour de 2009-2011 (-20% du PIB).

Effet des chocs :
La balance se détériore davantage en période de choc (-10,15% en moyenne contre -5,60% hors choc), reflétant une forte dépendance aux importations essentielles et une concentration des exportations sur quelques produits sensibles aux fluctuations mondiales.`
  },
  { 
    id: "pib",
    label: "Cycles économiques et croissance du PIB", 
    icon: <TrendingUp className="w-6 h-6" />,
    color: "indigo-600",
    content: `Les cycles économiques révèlent une grande volatilité :

• Pics de croissance proches de +50% autour de 1980, +33% entre 2005-2010,
• Récessions sévères atteignant -25% dans les années 1990.

Cette instabilité traduit une économie insuffisamment diversifiée et une forte exposition aux chocs internes et externes.`
  },
  { 
    id: "volatilite",
    label: "Volatilité du taux de change", 
    icon: <LineChart className="w-6 h-6" />,
    color: "pink-600",
    content: `Depuis les années 1990, la volatilité du taux de change a explosé, particulièrement après 2000.

Les périodes 2005-2010 et 2015-2020 présentent les plus fortes volatilités, coïncidant avec des crises politiques et économiques majeures. Cette instabilité complique la gestion macroéconomique et crée un environnement d'incertitude pour les investissements.`
  },
  { 
    id: "investissements",
    label: "Investissements directs étrangers en % du PIB", 
    icon: <Briefcase className="w-6 h-6" />,
    color: "orange-600",
    content: `Les IDE étaient presque inexistants jusqu'aux années 2000, avant un boom spectaculaire entre 2005-2010 (près de 14% du PIB), suivi d'une chute après la crise de 2009.

La corrélation positive entre IDE et PIB (r = 0,6115) souligne l'importance du climat des affaires pour soutenir la croissance par les capitaux étrangers.`
  },
  { 
    id: "remises",
    label: "Remises de fonds de la diaspora", 
    icon: <DollarSign className="w-6 h-6" />,
    color: "teal-600",
    content: `Les remises ont explosé depuis 2000, atteignant près de 500 millions USD en 2020-2021.

Elles constituent aujourd'hui une source stable de devises pour le pays, plus résiliente que les flux d'IDE, et représentent un levier majeur pour le financement du développement.`
  },
  { 
    id: "exportations",
    label: "Volatilité des exportations - Dépendance aux matières premières", 
    icon: <BarChart3 className="w-6 h-6" />,
    color: "blue-600",
    content: `La volatilité élevée des exportations (généralement >10%) avec des pics à 30% lors des crises mondiales (2008-2009, 2020-2023) confirme la dépendance problématique de Madagascar aux matières premières.

Cela alimente les déficits commerciaux et la dépréciation de l'Ariary.`
  },
];

// Contenu des recommandations
const recommendations = [
  {
    title: "Stabilisation monétaire et financière",
    items: [
      "Politique monétaire prudente visant la stabilisation de l'Ariary sans étouffer la croissance.",
      "Gestion optimale des réserves de change (couvrir >3 mois d'importations tout en finançant des projets productifs).",
      "Développement d'instruments de couverture contre la volatilité du change."
    ]
  },
  {
    title: "Diversification et transformation économique",
    items: [
      "Investir dans la transformation locale des produits agricoles et miniers.",
      "Promouvoir de nouveaux secteurs : services numériques, tourisme durable, énergies renouvelables.",
      "Stratégie ciblée de substitution aux importations."
    ]
  },
  {
    title: "Gestion prudente de la dette et attraction des IDE",
    items: [
      "Maintenir le ratio dette extérieure/RNB sous 50%.",
      "Prioriser les emprunts orientés vers des projets générateurs de devises.",
      "Améliorer le climat des affaires pour reproduire l'élan des IDE de 2005-2010."
    ]
  },
  {
    title: "Valorisation des remises de la diaspora",
    items: [
      "Créer des produits financiers attractifs pour canaliser les remises vers l'investissement.",
      "Mobiliser la diaspora qualifiée pour le transfert de compétences.",
      "Réduire les coûts de transfert des fonds."
    ]
  },
  {
    title: "Renforcement de la résilience aux chocs",
    items: [
      "Diversifier les marchés d'exportation.",
      "Créer un fonds de stabilisation pour amortir les chocs d'exportations.",
      "Mieux coordonner politique monétaire et budgétaire."
    ]
  },
  {
    title: "Amélioration des fondamentaux économiques",
    items: [
      "Investir dans les infrastructures critiques (énergie, transport, télécommunications).",
      "Renforcer le capital humain (éducation, formation).",
      "Améliorer la gouvernance économique et la transparence."
    ]
  }
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

export default function RapportPage() {
  const [activeTab, setActiveTab] = useState('analyse');
  const [expandedSection, setExpandedSection] = useState<string | number | null>(null);

  const toggleSection = (id:string| number) => {
    if (expandedSection === id) {
      setExpandedSection(null);
    } else {
      setExpandedSection(id);
    }
  };

  const downloadPDF = () => {
    // Dans une application réelle, cette fonction se connecterait à une API 
    // pour générer ou récupérer le PDF depuis le serveur
    alert("Téléchargement du rapport en PDF");
    // Ici, vous implémenteriez la logique réelle de téléchargement
  };

  return (
    <div className="min-h-screen bg-[#212121] text-white py-12 px-4 md:px-8">
      {/* En-tête avec titre et description */}
      <div className="max-w-7xl mx-auto mb-8 text-center">
        <div className="flex items-center justify-center mb-4">
          <FileText className="w-8 h-8 mr-3 text-blue-400" />
          <h1 className="text-3xl md:text-4xl font-bold">Analyse macroéconomique de Madagascar</h1>
        </div>
        <p className="text-gray-400 max-w-3xl mx-auto">
          Évolution des indicateurs économiques et financiers de Madagascar (1960-2023)
        </p>
        <div className="mt-6">
          <button 
            onClick={downloadPDF}
            className="bg-blue-500 hover:bg-blue-600 transition-colors duration-300 text-white py-2 px-6 rounded-full flex items-center mx-auto"
          >
            <Download className="w-5 h-5 mr-2" />
            Télécharger le rapport PDF
          </button>
        </div>
      </div>

      {/* Onglets */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex justify-center space-x-4 border-b border-gray-800 pb-2">
          <button 
            className={`pb-2 px-4 font-medium ${activeTab === 'analyse' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-blue-300'}`}
            onClick={() => setActiveTab('analyse')}
          >
            Analyse
          </button>
          <button 
            className={`pb-2 px-4 font-medium ${activeTab === 'recommandations' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-blue-300'}`}
            onClick={() => setActiveTab('recommandations')}
          >
            Recommandations
          </button>
        </div>
      </div>

      {/* Contenu de l'onglet Analyse */}
      {activeTab === 'analyse' && (
        <motion.div 
          className="max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {reportSections.map((section, index) => (
            <motion.div key={index} variants={itemVariants} className="mb-4">
              <div className="bg-[#2A2A2A] rounded-xl overflow-hidden shadow-lg border border-gray-800 hover:border-blue-400 transition-all duration-300">
                <div 
                  className="flex items-stretch cursor-pointer"
                  onClick={() => toggleSection(section.id)}
                >
                  <div className={`bg-${section.color} w-16 flex items-center justify-center p-4`}>
                    <div className="text-white">
                      {section.icon}
                    </div>
                  </div>
                  <div className="p-4 flex-1 flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-white">
                      {index + 1}. {section.label}
                    </h3>
                    <ChevronDown className={`w-5 h-5 text-blue-400 transition-transform duration-300 ${expandedSection === section.id ? 'transform rotate-180' : ''}`} />
                  </div>
                </div>
                
                {expandedSection === section.id && (
                  <div className="p-6 border-t border-gray-800 bg-[#252525]">
                    <div className="text-gray-300 whitespace-pre-line">
                      {section.content}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Contenu de l'onglet Recommandations */}
      {activeTab === 'recommandations' && (
        <motion.div 
          className="max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {recommendations.map((rec, index) => (
            <motion.div key={index} variants={itemVariants} className="mb-6">
              <div className="bg-[#2A2A2A] rounded-xl overflow-hidden shadow-lg border border-gray-800 p-6">
                <h3 className="text-xl font-semibold mb-4 text-blue-400 flex items-center">
                  {index + 1}. {rec.title}
                </h3>
                <ul className="text-gray-300 space-y-2">
                  {rec.items.map((item, i) => (
                    <li key={i} className="flex items-start">
                      <div className="mr-2 mt-1 text-blue-400">•</div>
                      <div>{item}</div>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Note informative */}
      <div className="max-w-7xl mx-auto mt-12 text-center">
        <p className="text-gray-500 text-sm">
          Cette analyse est basée sur des données de la Banque Mondiale, du FMI et 
          de la Banque Centrale de Madagascar collectées entre 1960 et 2023.
        </p>
      </div>
    </div>
  );
}