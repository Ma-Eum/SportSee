import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserData } from "../services/apiService";
import DashboardLayout from "../components/layout/DashboardLayout";
import AverageSessionsChart from "../components/AverageSessionsChart";
import ActivityChart from "../components/ActivityChart";
import PerformanceChart from "../components/PerformanceChart";
import ScoreChart from "../components/ScoreChart";
import NutritionCard from "../components/NutritionCard";
import Page404 from "./404"; // Page 404

import caloriesIcon from "../assets/images/calories-icon.png";
import proteinIcon from "../assets/images/protein-icon.png";
import carbsIcon from "../assets/images/carbs-icon.png";
import fatIcon from "../assets/images/fat-icon.png";

import "../styles/pages/_profile.scss";

const Profile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    console.log(`🔄 Récupération des données pour userId: ${userId}`);

    // Vérifie si userId est un nombre valide avant de faire l'appel API
    if (!userId || isNaN(userId)) {
      console.warn("⚠️ ID utilisateur invalide, affichage de la page 404.");
      setError(true);
      setLoading(false);
      return;
    }

    getUserData(userId)
      .then((data) => {
        if (!data) {
          console.warn("⚠️ Utilisateur non trouvé, affichage de la page 404");
          setError(true);
        } else {
          setUser(data);
        }
      })
      .catch((error) => {
        console.error("❌ Erreur récupération utilisateur :", error);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [userId]);

  // ⛔ Affichage de la page 404 en cas d'erreur
  if (error) {
    return <Page404 />;
  }

  // ⏳ Affichage du chargement des données
  if (loading) {
    return (
      <DashboardLayout>
        <p>Chargement des données...</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="profile">
        {user ? (
          <>
            <h1>
              Bonjour <span className="user-name">{user.userInfos?.firstName || "Utilisateur inconnu"}</span> !
            </h1>
            <p className="congrats-message">Félicitations ! Vous avez explosé vos objectifs hier 🎉</p>

            <div className="dashboard-container">
              <div className="charts-container">
                <ActivityChart userId={userId} />
                <div className="charts-bottom">
                  <AverageSessionsChart userId={userId} />
                  <PerformanceChart userId={userId} />
                  <ScoreChart userId={userId} />
                </div>
              </div>

              {/* 🔥 Ajout des cartes Nutrition */}
              <div className="key-info-container">
                {user.keyData ? (
                  <>
                    <NutritionCard type="Calories" value={user.keyData.calorieCount} unit="kCal" icon={caloriesIcon} />
                    <NutritionCard type="Protéines" value={user.keyData.proteinCount} unit="g" icon={proteinIcon} />
                    <NutritionCard type="Glucides" value={user.keyData.carbohydrateCount} unit="g" icon={carbsIcon} />
                    <NutritionCard type="Lipides" value={user.keyData.lipidCount} unit="g" icon={fatIcon} />
                  </>
                ) : (
                  <p>⚠️ Aucune donnée nutritionnelle disponible.</p>
                )}
              </div>
            </div>
          </>
        ) : (
          <p>❌ Impossible de charger les informations utilisateur.</p>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Profile;
