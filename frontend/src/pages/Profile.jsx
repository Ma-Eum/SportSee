import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserData } from "../services/apiService";
import AverageSessionsChart from "../components/AverageSessionsChart";
import ActivityChart from "../components/ActivityChart";
import PerformanceChart from "../components/PerformanceChart";
import ScoreChart from "../components/ScoreChart";
import NutritionCard from "../components/NutritionCard";
import Page404 from "./404";

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

    if (!userId || isNaN(userId)) {
      console.warn("⚠️ ID utilisateur invalide, affichage de la page 404.");
      setError(true);
      setLoading(false);
      return;
    }

    getUserData(userId)
      .then((data) => {
        console.log("Données utilisateur récupérées : ", data);
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

  if (error) {
    return <Page404 />;
  }

  if (loading) {
    return <p>Chargement des données...</p>;
  }

  return (
    <div className="profile">
      {user ? (
        <>
          <h1>
            Bonjour <span className="user-name">{user.userInfos?.firstName || "Utilisateur inconnu"}</span> !
          </h1>
          <p className="congrats-message">Félicitations ! Vous avez explosé vos objectifs hier 🎉</p>

          <div className="dashboard-container">
            <div className="charts-container">
              <ActivityChart userId={userId} user={user} />
              <div className="charts-bottom">
                <AverageSessionsChart userId={userId} user={user} />
                <PerformanceChart userId={userId} user={user} />
                <ScoreChart userId={userId} user={user} />
              </div>
            </div>

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
  );
};

export default Profile;
