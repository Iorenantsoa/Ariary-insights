'use client';

import DashboardIndicators from "./components/Accueil/DashboardIndicators";
import ExchangeRateChart from "./components/Accueil/ExchangeRateChart";
import KeyInsights from "./components/Accueil/KeyInsights";
import WelcomeBanner from "./components/Accueil/WelcomBanner";

export default function Home() {
  return (
    <div >
      <WelcomeBanner />
      <div className="px-8  ">
        <div>
          <DashboardIndicators />
        </div>
        <div>
          <ExchangeRateChart  period="all"/>
        </div>
        <div>
          <KeyInsights />
        </div>
      </div>
    </div>
  );
}






