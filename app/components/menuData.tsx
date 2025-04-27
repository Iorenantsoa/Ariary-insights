export interface SubMenuItem {
    label: string;
  }
  
  export interface MenuItem {
    icon: React.ReactNode;
    label: string;
    subMenu?: SubMenuItem[];
  }
  
  import { Home, LineChart, Brain, AlertCircle, Gauge , BarChart3, Settings } from 'lucide-react';
  
  export const menuItems: MenuItem[] = [
    {
      icon: <Home size={20} />,
      label: "Accueil / Résumé",
    },
    {
      icon: <LineChart size={20} />,
      label: "Analyses descriptives",
      subMenu: [
        { label: "Taux de change" },
        { label: "Inflation et taux de change" },
        { label: "Réserves internationales" },
        { label: "Dette extérieure" },
        { label: "Balance commerciale" },
        { label: "Croissance économique" },
      ],
    },
    {
      icon: <Brain size={20} />,
      label: "Analyses avancées",
      subMenu: [
        { label: "Régression multiple" },
        { label: "ACP" },
        { label: "Clustering économique" },
      ],
    },
    {
      icon: <AlertCircle size={20} />,
      label: "Analyses thématiques",
      subMenu: [
        { label: "Volatilité du taux de change" },
        { label: "IDE" },
        { label: "Remises de fonds" },
        { label: "Taux de change réel" },
      ],
    },
    {
      icon: <Gauge  size={20} />,
      label: "Prévisions (optionnel)",
    },
    {
      icon: <BarChart3 size={20} />,
      label: "Rapport et recommandations",
    },
    {
      icon: <Settings size={20} />,
      label: "Paramètres / À propos",
    },
  ];
  