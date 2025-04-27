
// #Analyse économique approfondie de Madagascar (1960-2023)
// # --------------------------------------------------------

// import pandas as pd
// import numpy as np
// import matplotlib.pyplot as plt
// import seaborn as sns
// from statsmodels.tsa.stattools import adfuller
// from statsmodels.graphics.tsaplots import plot_acf, plot_pacf
// from statsmodels.tsa.arima.model import ARIMA
// from sklearn.linear_model import LinearRegression
// import statsmodels.api as sm
// from sklearn.preprocessing import StandardScaler
// from sklearn.cluster import KMeans
// from scipy.stats import pearsonr
// # Configuration des graphiques

// plt.style.use('ggplot')
// sns.set(style="whitegrid")
// plt.rcParams['figure.figsize'] = (14, 8)

// # Charger les données
// # Note: Utilisez le chemin correct vers votre fichier
// df = pd.read_csv('/content/taux_change_ar_usd - Copie.csv', sep=';')
// # Fonction pour ajouter des événements historiques sur les graphiques
// def ajouter_evenements_historiques(ax):
    // evenements = {
    //     1960: "Indépendance de Madagascar",
    //     1972: "Renversement de la Première République",
    //     1975: "Nationalisation sous Ratsiraka",
    //     1980: "Crise économique/Plan d'ajustement structurel",
    //     1991: "Transition démocratique",
    //     2002: "Crise politique post-électorale",
    //     2009: "Coup d'état/Crise politique",
    //     2013: "Retour à l'ordre constitutionnel",
    //     2020: "Crise du COVID-19"
    // }

//     for annee, evenement in evenements.items():
//         if annee in df['Year'].values:
//             ax.axvline(x=annee, color='darkred', linestyle='--', alpha=0.5)
//             ax.annotate(evenement, xy=(annee, ax.get_ylim()[1]*0.9),
//                        xytext=(annee+1, ax.get_ylim()[1]*0.9), rotation=90,
//                        fontsize=8, ha='left', va='top')

// # Périodes de chocs exogènes majeurs
// chocs_exogenes = {
//     1973: "Premier choc pétrolier",
//     1979: "Deuxième choc pétrolier",
//     1991: "Guerre du Golfe",
//     2008: "Crise financière mondiale",
//     2011: "Crise de la dette européenne",
//     2020: "Pandémie de COVID-19",
//     2022: "Guerre en Ukraine/Crise énergétique"
// }
// # Préparation et nettoyage des données
// # Conversion des colonnes en types numériques appropriés
// for col in df.columns:
//     if col != 'Year':
//         df[col] = pd.to_numeric(df[col], errors='coerce')

// # Définir l'année comme index
// df['Year'] = pd.to_numeric(df['Year'])
// df_indexed = df.set_index('Year')

// # Vérifier les valeurs manquantes
// print("Nombre de valeurs manquantes par colonne:")
// print(df.isna().sum())
// # Calculer le pourcentage de valeurs manquantes par colonne
// missing_percentage = (df.isna().sum() / len(df)) * 100
// print("\nPourcentage de valeurs manquantes par colonne:")
// print(missing_percentage)
// # Statistiques descriptives générales
// print("\nStatistiques descriptives:")
// desc_stats = df.describe().T
// desc_stats['cv'] = desc_stats['std'] / desc_stats['mean']  # Coefficient de variation
// print(desc_stats)
// #PARTIE 2: ANALYSE DESCRIPTIVE DES INDICATEURS ÉCONOMIQUES PRINCIPAUX
// #Analyse de l'évolution du taux de change
// plt.figure(figsize=(14, 6))
// plt.plot(df['Year'], df['Official exchange rate (LCU per US$, period average)'], marker='o', linestyle='-', color='blue')
// plt.title('Évolution du taux de change Ariary/USD (1960-2023)', fontsize=16)
// plt.xlabel('Année', fontsize=12)
// plt.ylabel('Taux de change (Ariary par USD)', fontsize=12)
// plt.grid(True, alpha=0.3)
// ax = plt.gca()
// ajouter_evenements_historiques(ax)
// plt.tight_layout()
// # Calculer les variations annuelles du taux de change
// df['Variation taux de change (%)'] = df['Official exchange rate (LCU per US$, period average)'].pct_change() * 100

// # Analyse de l'inflation et sa relation avec le taux de change
// fig, ax1 = plt.subplots(figsize=(14, 6))

// color = 'tab:blue'
// ax1.set_xlabel('Année', fontsize=12)
// ax1.set_ylabel('Inflation (%)', color=color, fontsize=12)
// ax1.plot(df['Year'], df['Inflation, consumer prices (annual %)'], color=color, marker='o', linestyle='-')
// ax1.tick_params(axis='y', labelcolor=color)

// ax2 = ax1.twinx()
// color = 'tab:red'
// ax2.set_ylabel('Variation taux de change (%)', color=color, fontsize=12)
// ax2.plot(df['Year'], df['Variation taux de change (%)'], color=color, marker='x', linestyle='-')
// ax2.tick_params(axis='y', labelcolor=color)

// plt.title('Inflation et variation du taux de change (1960-2023)', fontsize=16)
// ajouter_evenements_historiques(ax1)
// fig.tight_layout()
// ##Calculer la corrélation entre l'inflation et la variation du taux de change
// inflation_exchange_corr = df['Inflation, consumer prices (annual %)'].corr(df['Variation taux de change (%)'])
// print(f"\nCorrélation entre inflation et variation du taux de change: {inflation_exchange_corr:.4f}")
// # Analyse des réserves et de leur impact sur l'économie
// plt.figure(figsize=(14, 6))
// plt.plot(df['Year'], df['Total reserves (includes gold, current US$)'] / 1e6, marker='o', linestyle='-', color='green')
// plt.title('Évolution des réserves totales de Madagascar (1960-2023)', fontsize=16)
// plt.xlabel('Année', fontsize=12)
// plt.ylabel('Réserves totales (millions USD)', fontsize=12)
// plt.grid(True, alpha=0.3)
// ax = plt.gca()
// ajouter_evenements_historiques(ax)
// plt.tight_layout()
// # Analyser la relation entre les réserves et les importations
// plt.figure(figsize=(14, 6))
// plt.plot(df['Year'], df['Total reserves in months of imports'], marker='o', linestyle='-', color='purple')
// plt.title('Couverture des importations par les réserves (1960-2023)', fontsize=16)
// plt.xlabel('Année', fontsize=12)
// plt.ylabel('Réserves (en mois d\'importations)', fontsize=12)
// plt.axhline(y=3, color='r', linestyle='--', alpha=0.7)  # Standard international recommandé
// plt.annotate('Seuil recommandé\n(3 mois)', xy=(2000, 3), xytext=(2000, 4),
//              arrowprops=dict(facecolor='red', shrink=0.05), fontsize=10)
// plt.grid(True, alpha=0.3)
// ax = plt.gca()
// ajouter_evenements_historiques(ax)
// plt.tight_layout()

// # Analyse de la dette extérieure
// fig, ax1 = plt.subplots(figsize=(14, 6))

// color = 'tab:blue'
// ax1.set_xlabel('Année', fontsize=12)
// ax1.set_ylabel('Dette extérieure totale (USD)', color=color, fontsize=12)
// ax1.plot(df['Year'], df['External debt stocks, total (DOD, current US$)'] / 1e9, color=color, marker='o', linestyle='-')
// ax1.tick_params(axis='y', labelcolor=color)

// ax2 = ax1.twinx()
// color = 'tab:red'
// ax2.set_ylabel('Dette extérieure (% du RNB)', color=color, fontsize=12)
// ax2.plot(df['Year'], df['External debt stocks (% of GNI)'], color=color, marker='x', linestyle='-')  #PIB + revenus nets reçus de l’étranger ==>(RNB = richesses créées + revenus reçus de l’étranger).
// ax2.tick_params(axis='y', labelcolor=color)

// plt.title('Évolution de la dette extérieure de Madagascar (1960-2023)', fontsize=16)
// ajouter_evenements_historiques(ax1)
// fig.tight_layout()
// # Analyse de la balance commerciale
// # Calculer la balance commerciale
// df['Balance commerciale (USD)'] = df['Exports of goods and services (current US$)'] - df['Imports of goods and services (current US$)']
// df['Balance commerciale (% PIB)'] = df['Balance commerciale (USD)'] / df['GDP (current US$)'] * 100
// # Graphique de la balance commerciale
// plt.figure(figsize=(14, 6))
// plt.bar(df['Year'], df['Balance commerciale (% PIB)'])
// plt.title('Balance commerciale de Madagascar en % du PIB (1960-2023)', fontsize=16)
// plt.xlabel('Année', fontsize=12)
// plt.ylabel('Balance commerciale (% du PIB)', fontsize=12)
// plt.grid(True, alpha=0.3)
// plt.axhline(y=0, color='black', linestyle='-')
// ax = plt.gca()
// ajouter_evenements_historiques(ax)
// plt.tight_layout()

// # Cycles économiques
// # Identification des cycles économiques à partir du PIB
// df['PIB_croissance'] = df['GDP (current US$)'].pct_change() * 100

// plt.figure(figsize=(14, 6))
// plt.plot(df['Year'], df['PIB_croissance'], marker='o', linestyle='-', color='green')
// plt.title('Cycles économiques de Madagascar - Croissance du PIB (1960-2023)', fontsize=16)
// plt.xlabel('Année', fontsize=12)
// plt.ylabel('Croissance du PIB (%)', fontsize=12)
// plt.grid(True, alpha=0.3)
// plt.axhline(y=0, color='r', linestyle='-', alpha=0.7)
// ax = plt.gca()
// ajouter_evenements_historiques(ax)
// plt.tight_layout()
// # Analyse multivariée: facteurs déterminants du taux de change
// # Sélectionner les variables potentiellement explicatives
// explanatory_vars = ['Inflation, consumer prices (annual %)',
//                     'Total reserves (includes gold, current US$)',
//                     'Foreign direct investment, net inflows (% of GDP)',
//                     'External debt stocks (% of GNI)',
//                     'Balance commerciale (% PIB)']

// # Préparer les données en supprimant les valeurs manquantes
// model_data = df[['Year', 'Official exchange rate (LCU per US$, period average)'] + explanatory_vars].dropna()

// # Créer des variables décalées pour tenir compte des effets retardés
// for var in explanatory_vars:
//     model_data[f"{var}_lag1"] = model_data[var].shift(1)

// model_data = model_data.dropna()

// # Modèle de régression multiple
// X = model_data[[col for col in model_data.columns if col not in ['Year', 'Official exchange rate (LCU per US$, period average)']]]
// y = model_data['Official exchange rate (LCU per US$, period average)']

// X = sm.add_constant(X)
// model = sm.OLS(y, X)
// results = model.fit()

// print("\nRésultats de la régression multiple pour le taux de change:")
// print(results.summary())
// # Analyse en composantes principales (ACP)
// # Sélectionner les variables économiques clés
// key_vars = ['Official exchange rate (LCU per US$, period average)',
//             'Inflation, consumer prices (annual %)',
//             'Total reserves (includes gold, current US$)',
//             'External debt stocks (% of GNI)',
//             'Foreign direct investment, net inflows (% of GDP)',
//             'Balance commerciale (% PIB)']

// pca_data = df[key_vars].dropna()
// # Standardisation des données
// scaler = StandardScaler()
// pca_data_scaled = scaler.fit_transform(pca_data)
// # Calculer les composantes principales avec statsmodels
// pca = sm.PCA(pca_data_scaled)
// print("\nRésultats de l'ACP:")
// print(f"Variance expliquée par composante: {pca.eigenvals / sum(pca.eigenvals)}")
// print("Loadings (coefficients des variables originales):")
// print(pd.DataFrame(pca.loadings, index=key_vars))
// # Clustering: identifier les périodes économiques similaires
// # Données pour clustering
// cluster_data = df[['Inflation, consumer prices (annual %)',
//                    'Foreign direct investment, net inflows (% of GDP)',
//                    'External debt stocks (% of GNI)',
//                    'Balance commerciale (% PIB)']].dropna()

// # Standardisation
// scaler = StandardScaler()
// cluster_data_scaled = scaler.fit_transform(cluster_data)
// # Déterminer le nombre optimal de clusters (méthode du coude)
// inertia = []
// k_range = range(1, 10)
// for k in k_range:
//     kmeans = KMeans(n_clusters=k, random_state=42)
//     kmeans.fit(cluster_data_scaled)
//     inertia.append(kmeans.inertia_)

// # Graphique de la méthode du coude
// plt.figure(figsize=(10, 6))
// plt.plot(k_range, inertia, marker='o')
// plt.title('Méthode du coude pour déterminer le nombre optimal de clusters', fontsize=16)
// plt.xlabel('Nombre de clusters', fontsize=12)
// plt.ylabel('Inertie', fontsize=12)
// plt.grid(True, alpha=0.3)
// plt.tight_layout()
// # Application du clustering avec k=4
// kmeans = KMeans(n_clusters=4, random_state=42)
// cluster_labels = kmeans.fit_predict(cluster_data_scaled)

// # Ajouter les labels de cluster aux données originales
// cluster_years = df.loc[cluster_data.index, 'Year'].values
// cluster_result = pd.DataFrame({'Year': cluster_years, 'Cluster': cluster_labels})
// print("\nClassification des périodes économiques par cluster:")
// print(cluster_result.sort_values('Year'))
// # PARTIE 4: ANALYSES THÉMATIQUES SPÉCIFIQUES
// # ==========================================

// # Analyse des crises économiques et périodes de stabilité
// # Calcul de la volatilité du taux de change (écart-type mobile sur 5 ans)
// df['Volatilité taux de change'] = df['Official exchange rate (LCU per US$, period average)'].rolling(window=5).std()

// # Graphique de la volatilité
// plt.figure(figsize=(14, 6))
// plt.plot(df['Year'], df['Volatilité taux de change'], marker='o', linestyle='-', color='red')
// plt.title('Volatilité du taux de change Ariary/USD (fenêtre mobile de 5 ans)', fontsize=16)
// plt.xlabel('Année', fontsize=12)
// plt.ylabel('Écart-type', fontsize=12)
// plt.grid(True, alpha=0.3)
// ax = plt.gca()
// ajouter_evenements_historiques(ax)
// plt.tight_layout()

// # Identifier les périodes de crise (forte volatilité) +-2
// volatility_threshold = df['Volatilité taux de change'].mean() + 1.5 * df['Volatilité taux de change'].std()
// crisis_periods = df[df['Volatilité taux de change'] > volatility_threshold]

// print("\nPériodes de crise économique potentielle (forte volatilité du taux de change):")
// print(crisis_periods[['Year', 'Volatilité taux de change']])
// # Analyse de l'impact des investissements directs étrangers (IDE)
// plt.figure(figsize=(14, 6))
// plt.plot(df['Year'], df['Foreign direct investment, net inflows (% of GDP)'], marker='o', linestyle='-', color='orange')
// plt.title('Investissements directs étrangers en % du PIB (1960-2023)', fontsize=16)
// plt.xlabel('Année', fontsize=12)
// plt.ylabel('IDE (% du PIB)', fontsize=12)
// plt.grid(True, alpha=0.3)
// ax = plt.gca()
// ajouter_evenements_historiques(ax)
// plt.tight_layout()
// # Corrélation entre IDE et PIB
// ide_gdp_corr = df['Foreign direct investment, net inflows (% of GDP)'].corr(df['GDP (current US$)'])
// print(f"\nCorrélation entre IDE (% du PIB) et PIB: {ide_gdp_corr:.4f}")

// # Analyse de l'impact des remises de fonds de la diaspora
// plt.figure(figsize=(14, 6))
// plt.plot(df['Year'], df['Personal remittances, received (current US$)'] / 1e6,
//          marker='o', linestyle='-', color='purple')
// plt.title('Remises de fonds de la diaspora (1960-2023)', fontsize=16)
// plt.xlabel('Année', fontsize=12)
// plt.ylabel('Remises de fonds (millions USD)', fontsize=12)
// plt.grid(True, alpha=0.3)
// ax = plt.gca()
// ajouter_evenements_historiques(ax)
// plt.tight_layout()

// # Calculer le ratio remises/PIB
// df['Remises_PIB'] = df['Personal remittances, received (current US$)'] / df['GDP (current US$)'] * 100

// # Analyse de la compétitivité et la relation avec le taux de change réel
// # Calcul d'un indice approximatif du taux de change réel
// df['Taux_change_reel'] = df['Official exchange rate (LCU per US$, period average)'] * \
//                         (100 / (100 + df['Inflation, consumer prices (annual %)']))

// plt.figure(figsize=(14, 6))
// plt.plot(df['Year'], df['Taux_change_reel'], marker='o', linestyle='-', color='blue')
// plt.title('Évolution du taux de change réel approximatif (1960-2023)', fontsize=16)
// plt.xlabel('Année', fontsize=12)
// plt.ylabel('Indice du taux de change réel', fontsize=12)
// plt.grid(True, alpha=0.3)
// ax = plt.gca()
// ajouter_evenements_historiques(ax)
// plt.tight_layout()

// # Analyse des chocs exogènes et leur impact
// # Créer une variable indicatrice pour les périodes de choc
// df['Choc_exogene'] = 0
// for annee in chocs_exogenes.keys():
//     if annee in df['Year'].values:
//         idx = df[df['Year'] == annee].index
//         df.loc[idx, 'Choc_exogene'] = 1

// # Analyser l'impact des chocs sur les principales variables
// variables_impact = ['Inflation, consumer prices (annual %)',
//                    'Official exchange rate (LCU per US$, period average)',
//                    'Balance commerciale (% PIB)']

// # Comparaison des périodes avec/sans chocs
// for var in variables_impact:
//     avec_choc = df[df['Choc_exogene'] == 1][var].mean()
//     sans_choc = df[df['Choc_exogene'] == 0][var].mean()
//     print(f"Impact des chocs exogènes sur {var}: Moyenne avec choc = {avec_choc:.2f}, sans choc = {sans_choc:.2f}")

// # Analyse de la dépendance aux matières premières
// # Cette partie nécessiterait des données supplémentaires sur la structure des exportations
// # Mais nous pouvons créer un proxy en analysant la volatilité des exportations
// df['Volatilite_exports'] = df['Exports of goods and services (current US$)'].pct_change().rolling(window=5).std() * 100

// plt.figure(figsize=(14, 6))
// plt.plot(df['Year'][5:], df['Volatilite_exports'][5:], marker='o', linestyle='-', color='orange')
// plt.title('Volatilité des exportations - Proxy de dépendance aux matières premières (1965-2023)', fontsize=16)
// plt.xlabel('Année', fontsize=12)
// plt.ylabel('Volatilité des exportations (%)', fontsize=12)
// plt.grid(True, alpha=0.3)
// ax = plt.gca()
// ajouter_evenements_historiques(ax)
// plt.tight_layout()

// # PARTIE 3: ANALYSES AVANCÉES ET MODÉLISATION
// # ===========================================

// # Préparation des données pour modélisation ARIMA
// exchange_rate = df.set_index('Year')['Official exchange rate (LCU per US$, period average)'].dropna()

// # ============================
// # 2. Test de stationnarité
// # ============================
// result = adfuller(exchange_rate)
// print(f"Test ADF - p-value: {result[1]:.4f}")

// if result[1] > 0.05:
//     print("Série non stationnaire ➤ on applique une différenciation")
//     exchange_rate_diff = exchange_rate.diff().dropna()
//     d = 1
// else:
//     print("Série déjà stationnaire")
//     exchange_rate_diff = exchange_rate
//     d = 0

// # ============================
// # 3. ACF & PACF pour choisir p et q
// # ============================
// plot_acf(exchange_rate_diff)
// plot_pacf(exchange_rate_diff)
// plt.show()

// # ➤ Tu peux regarder les plots :
// # - p = lag max significatif sur PACF
// # - q = lag max significatif sur ACF

// p, q = 2,2

// # ============================
// # 4. Modèle ARIMA
// # ============================
// model = ARIMA(exchange_rate, order=(p, d, q))
// model_fit = model.fit()
// print(model_fit.summary())

// # ============================
// # 5. Prévisions (5 ans)
// # ============================
// forecast = model_fit.forecast(steps=5)
// forecast_years = range(2024, 2029)

// print("\nPrévisions Ariary/USD de 2024 à 2028 :")
// for year, value in zip(forecast_years, forecast):
//     print(f"{year} : {value:.2f}")


// # Graphique d'évolution historique et prévisions du taux de change
// plt.figure(figsize=(16, 8))

// # Tracer les données historiques
// plt.plot(df['Year'], df['Official exchange rate (LCU per US$, period average)'],
//          marker='o', linestyle='-', color='blue', label='Taux de change historique')

// # Ajouter les prévisions
// plt.plot(forecast_years, forecast, marker='x', linestyle='--', color='red', label='Prévisions')

// # Ajouter un intervalle de confiance pour les prévisions
// forecast_lower = forecast * 0.9
// forecast_upper = forecast * 1.1
// plt.fill_between(forecast_years, forecast_lower, forecast_upper, color='red', alpha=0.2, label='Intervalle de confiance')

// # Personnaliser le graphique
// plt.title('Évolution et prévision du taux de change Ariary/USD (1960-2028)', fontsize=16)
// plt.xlabel('Année', fontsize=12)
// plt.ylabel('Taux de change (Ariary par USD)', fontsize=12)
// plt.grid(True, alpha=0.3)
// plt.legend(fontsize=12)

// # Ajouter les événements historiques
// ax = plt.gca()
// ajouter_evenements_historiques(ax)

// # Ajouter une ligne verticale pour séparer les données historiques des prévisions
// plt.axvline(x=2023, color='green', linestyle='--', alpha=0.7)
// plt.annotate('Début des prévisions', xy=(2023, ax.get_ylim()[0]),
//              xytext=(2023, ax.get_ylim()[0]*1.1), rotation=90,
//              fontsize=10, ha='right', va='bottom', color='green')

// plt.tight_layout()



// voici mes menus et sous menu et je veux que tu me donne des idées à faire dans la page d'accueil pour le moment

// ------------------------------------------------------
// | 🌍 Analyse macroéconomique                       |
// |----------------------------------------------------|
// | 🏠 Accueil / Résumé                               |
// | 📈 Analyses descriptives                         |
// |   ├─ Taux de change                               |
// |   ├─ Inflation et taux de change                  |
// |   ├─ Réserves internationales                     |
// |   ├─ Dette extérieure                             |
// |   ├─ Balance commerciale                          |
// |   ├─ Croissance économique                        |
// | 🧠 Analyses avancées                              |
// |   ├─ Régression multiple                          |
// |   ├─ ACP                                          |
// |   ├─ Clustering économique                        |
// | 🚨 Analyses thématiques                           |
// |   ├─ Volatilité du taux de change                 |
// |   ├─ IDE                                          |
// |   ├─ Remises de fonds                             |
// |   ├─ Taux de change réel                          |
// | 🔮 Prévisions (optionnel)                         |
// | 📊 Rapport et recommandations                     |
// | ⚙️ Paramètres / À propos                         |
// ------------------------------------------------------
