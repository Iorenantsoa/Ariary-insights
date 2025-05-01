"use client";
import { useState, MouseEvent, JSX } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  BarChart2,
  Brain,
  AlertTriangle,
  Gauge,
  FileText,
  Settings,
  ChevronRight,
} from "lucide-react";

interface SubItem {
  label: string;
  path: string;
}

interface MenuItem {
  id: string;
  icon: JSX.Element;
  label: string;
  path: string;
  subItems: SubItem[];
}

const Sidebar = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [subMenuPosition, setSubMenuPosition] = useState<{ top: number }>({ top: 0 });
  const pathname = usePathname();

  const menuItems: MenuItem[] = [
    {
      id: "home",
      icon: <Home className="w-5 h-5" />,
      label: "Accueil",
      path: "/",
      subItems: [],
    },
    {
      id: "descriptive",
      icon: <BarChart2 className="w-5 h-5" />,
      label: "Analyses descriptives",
      path: "/analyses-descriptives",
      subItems: [
        { label: "Taux de change", path: "/analyses-descriptives/taux-de-change" },
        { label: "Inflation et taux de change", path: "/analyses-descriptives/inflation-taux-de-change" },
        { label: "Réserves internationales", path: "/analyses-descriptives/reserves" },
        { label: "Dette extérieure", path: "/analyses-descriptives/dette" },
        { label: "Balance commerciale", path: "/analyses-descriptives/balance-commerciale" },
        { label: "Croissance économique", path: "/analyses-descriptives/croissance-economique" },
      ],
    },
    {
      id: "advanced",
      icon: <Brain className="w-5 h-5" />,
      label: "Analyses avancées",
      path: "/analyses-avancees",
      subItems: [
        { label: "Analyse multivariée", path: "/analyses-avancees/analyse-multivariee" },
        { label: "ACP", path: "/analyses-avancees/acp" },
        { label: "Clustering économique", path: "/analyses-avancees/clustering-economique" },
      ],
    },
    {
      id: "thematic",
      icon: <AlertTriangle className="w-5 h-5" />,
      label: "Analyses thématiques",
      path: "/analyses-thematiques",
      subItems: [
        { label: "Volatilité du taux de change", path: "/analyses-thematiques/volatilite-taux-change" },
        { label: "IDE", path: "/analyses-thematiques/ide" },
        { label: "Remises de fonds", path: "/analyses-thematiques/remises-de-fonds" },
        { label: "Impacts des Chocs Exogènes", path: "/analyses-thematiques/impacts-chocs-exogenes" },
      ],
    },
    {
      id: "forecast",
      icon: <Gauge className="w-5 h-5" />,
      label: "Prévisions",
      path: "/previsions",
      subItems: [],
    },
    {
      id: "reports",
      icon: <FileText className="w-5 h-5" />,
      label: "Rapport et recommandations",
      path: "/rapport-recommandations",
      subItems: [],
    },
    {
      id: "settings",
      icon: <Settings className="w-5 h-5" />,
      label: "Paramètres / À propos",
      path: "/parametres",
      subItems: [],
    },
  ];

  const handleMouseEnter = (id: string, e?: MouseEvent<HTMLAnchorElement>) => {
    const menuItem = menuItems.find((item) => item.id === id);
    if (!menuItem || menuItem.subItems.length === 0) {
      setActiveMenu(null);
      return;
    }
    if (e?.currentTarget) {
      const rect = e.currentTarget.getBoundingClientRect();
      setSubMenuPosition({ top: rect.top });
    }
    setActiveMenu(id);
  };

  const handleMouseLeave = () => {
    setActiveMenu(null);
  };

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(path + "/");
  };

  const hasActiveChild = (item: MenuItem) => {
    return item.subItems && item.subItems.some((subItem) => isActive(subItem.path));
  };

  return (
    <>
      {/* Sidebar toujours visible */}
      <div
        className="w-20 md:w-64 bg-[#1A1A1A] text-white h-screen fixed left-0 overflow-y-auto z-20"
        onMouseLeave={handleMouseLeave}
      >
        <div className="py-6 px-4 border-b border-gray-800">
          <h1 className="hidden md:block text-xl font-bold text-center">
            Ariary Insights
          </h1>
          <div className="md:hidden text-xl font-bold text-center">🌍</div>
        </div>

        <nav className="mt-6">
          {menuItems.map((item) => (
            <Link
              href={item.path}
              key={item.id}
              className={`flex items-center py-3 px-4 transition-all duration-200 hover:bg-gray-800 relative
                ${isActive(item.path) || hasActiveChild(item)
                  ? "bg-gray-800 border-l-4 border-blue-400"
                  : ""
                }`}
              onMouseEnter={(e) => handleMouseEnter(item.id, e)}
            >
              <div className="flex items-center justify-center md:justify-start w-full">
                <span
                  className={`${isActive(item.path) || hasActiveChild(item)
                      ? "text-blue-300"
                      : "text-gray-200"
                    }`}
                >
                  {item.icon}
                </span>
                <span
                  className={`ml-4 hidden md:block ${isActive(item.path) || hasActiveChild(item) ? "font-medium" : ""
                    }`}
                >
                  {item.label}
                </span>
                {item.subItems.length > 0 && (
                  <ChevronRight
                    className={`ml-auto hidden md:block w-4 h-4 transition-transform duration-200 
                      ${activeMenu === item.id || hasActiveChild(item) ? "rotate-90" : ""}`}
                  />
                )}
              </div>
            </Link>
          ))}
        </nav>
      </div>

      {/* Sous-menus */}
      {activeMenu &&
        menuItems.find((item) => item.id === activeMenu)?.subItems.length! > 0 && (
          <div
            className="fixed left-20 md:left-64 bg-[#1A1A1A] text-white shadow-lg rounded-r-lg p-4 min-w-64 z-100 opacity-0 animate-fadeIn"
            style={{
              top: `${subMenuPosition.top}px`,
              animation: "fadeIn 0.2s forwards",
            }}
            onMouseEnter={() => handleMouseEnter(activeMenu)}
            onMouseLeave={handleMouseLeave}
          >
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-300 pb-2 text-gray-100">
              {menuItems.find((item) => item.id === activeMenu)?.label}
            </h3>
            <ul className="space-y-2">
              {menuItems
                .find((item) => item.id === activeMenu)
                ?.subItems.map((subItem, index) => (
                  <li key={index}>
                    <Link
                      href={subItem.path}
                      className={`block px-3 py-2 rounded transition-colors duration-200
                        ${isActive(subItem.path)
                          ? "bg-gray-700 text-blue-500 font-medium"
                          : "hover:bg-gray-800"
                        }`}
                    >
                      {subItem.label}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        )}

      {/* Animation CSS */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
};

export default Sidebar;
